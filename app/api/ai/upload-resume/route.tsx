// POST: /api/ai/upload-resume
import { NextResponse } from "next/server";
import ai from "../../../../configs/ai";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import Resume from "../../../../models/Resume";
import { connectDB } from "../../../../configs/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    await connectDB();
    const { resumeText, title } = await request.json();

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Please login to continue" },
        { status: 401 }
      );
    }

    if (!resumeText || typeof resumeText !== "string" || !resumeText.trim()) {
      return NextResponse.json(
        { error: "Missing required field: resumeText" },
        { status: 400 }
      );
    }

    if (!process.env.AI_MODEL) {
      // Fallback: create a minimal resume without AI parsing so the UI keeps working in dev
      const newResume = await (Resume as any).create({
        userId: session.user.id,
        title: (typeof title === "string" && title.trim()) || "Imported Resume",
        professional_summary: (resumeText || "").toString().trim().slice(0, 1000),
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
        professional_summary: (resumeText || "").toString().trim().slice(0, 1000),
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
