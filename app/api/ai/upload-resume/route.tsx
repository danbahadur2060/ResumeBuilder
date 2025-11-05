// POST: /api/ai/upload-resume
import { NextResponse } from "next/server";
import ai from "../../../../configs/ai";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import Resume from "../../../../models/Resume";
import { connectDB } from "../../../../configs/db";

// Lazy imports with any typing to avoid TS issues if packages lack types
let pdfParse: any;
let mammoth: any;

export const runtime = "nodejs";

async function extractTextFromUpload(formData: FormData) {
  const file = formData.get("file") as unknown as File | null;
  const title = (formData.get("title") as string) || "Imported Resume";
  if (!file) {
    return { error: "Missing file" } as const;
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const name = (file as any)?.name || "uploaded";
  const type = (file as any)?.type || "";
  const lower = name.toLowerCase();

  let text = "";
  try {
    if (type.includes("pdf") || lower.endsWith(".pdf")) {
      pdfParse = pdfParse || (await import("pdf-parse")).default;
      const result = await pdfParse(buffer);
      text = (result?.text || "").toString();
    } else if (
      type.includes("wordprocessingml.document") || lower.endsWith(".docx")
    ) {
      mammoth = mammoth || (await import("mammoth"));
      const result = await mammoth.extractRawText({ buffer });
      text = (result?.value || "").toString();
    } else if (type.startsWith("text/") || lower.endsWith(".txt")) {
      text = buffer.toString("utf8");
    } else {
      // Fallback: try text() from Blob
      text = await (file as any).text();
    }
  } catch (e) {
    // Best-effort fallback
    try {
      text = buffer.toString("utf8");
    } catch {}
  }

  return { text, title } as const;
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Please login to continue" },
        { status: 401 }
      );
    }

    const contentType = request.headers.get("content-type") || "";

    let resumeText = "";
    let title = "Imported Resume";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const extracted = await extractTextFromUpload(formData);
      if ("error" in extracted) {
        return NextResponse.json(
          { error: extracted.error },
          { status: 400 }
        );
      }
      resumeText = (extracted.text || "").toString();
      title = extracted.title || title;
    } else {
      const body = await request.json();
      resumeText = (body?.resumeText || "").toString();
      title = (body?.title || title).toString();
    }

    if (!resumeText || typeof resumeText !== "string" || !resumeText.trim()) {
      return NextResponse.json(
        { error: "Missing required resume content" },
        { status: 400 }
      );
    }

    if (!process.env.AI_MODEL) {
      // Fallback: create a minimal resume without AI parsing so the UI keeps working in dev
      const newResume = await (Resume as any).create({
        userId: session.user.id,
        title: (typeof title === "string" && title.trim()) || "Imported Resume",
        professional_summary: resumeText.toString().trim().slice(0, 1000),
        skills: [],
        personal_info: {},
        experience: [],
        project: [],
        education: [],
      });
      return NextResponse.json({ resumeId: newResume._id }, { status: 200 });
    }

    const systemPrompt = "You are an expert AI agent that extracts structured data from resumes.";
    const userPrompt = `Extract data from the following resume text and return ONLY a single JSON object with exactly these keys and types. Use empty strings, null, or empty arrays when information is missing; do NOT include extra keys.\n\nResume Text:\n${resumeText.trim()}\n\nExpected JSON shape:\n{\n  \"professional_summary\": \"string\",\n  \"skills\": [\"string\"],\n  \"personal_info\": {\n    \"full_name\": \"string\",\n    \"profession\": \"string\",\n    \"email\": \"string\",\n    \"phone\": \"string\",\n    \"location\": \"string\",\n    \"linkedin\": \"string\",\n    \"website\": \"string\"\n  },\n  \"experience\": [\n    {\n      \"company\": \"string\",\n      \"position\": \"string\",\n      \"start_date\": \"string\",\n      \"end_date\": \"string\",\n      \"description\": \"string\",\n      \"is_current\": true\n    }\n  ],\n  \"project\": [\n    {\n      \"name\": \"string\",\n      \"type\": \"string\",\n      \"description\": \"string\"\n    }\n  ],\n  \"education\": [\n    {\n      \"institution\": \"string\",\n      \"degree\": \"string\",\n      \"field\": \"string\",\n      \"graduation_date\": \"string\",\n      \"gpa\": \"string\"\n    }\n  ]\n}`;

    let parsedData: any = null;
    try {
      const response = await ai.chat.completions.create({
        model: process.env.AI_MODEL as string,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      });
      const extractedData = response.choices?.[0]?.message?.content || "";
      parsedData = JSON.parse(extractedData);
    } catch (_err) {
      // Robust fallback if AI request or parsing fails
      parsedData = {
        professional_summary: resumeText.toString().trim().slice(0, 1000),
        skills: [],
        personal_info: {},
        experience: [],
        project: [],
        education: [],
      };
    }

    const newResume = await (Resume as any).create({
      userId: session.user.id,
      title: (typeof title === "string" && title.trim()) || "Untitled Resume",
      ...parsedData,
    });

    return NextResponse.json({ resumeId: newResume._id }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error?.message || String(error) },
      { status: 500 }
    );
  }
}
