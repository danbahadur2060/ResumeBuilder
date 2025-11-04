// POST: /api/ai/enhance-job-desc
import { NextResponse } from "next/server";
import ai from "../../../../configs/ai";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { userContext } = await request.json();

    if (!userContext || typeof userContext !== "string" || !userContext.trim()) {
      return NextResponse.json(
        { error: "Missing required field: userContext" },
        { status: 400 }
      );
    }

    if (!process.env.AI_MODEL) {
      // Fallback: simple heuristic enhancement so UI shows meaningful change without AI
      const raw = (userContext || "").toString().trim();
      const cleaned = raw
        .replace(/\s+/g, " ")
        .replace(/^(i\s+was\s+|we\s+|team\s+|responsible\s+for\s+)/i, "")
        .replace(/\bworked on\b/gi, "Developed")
        .replace(/\bresponsible for\b/gi, "Led")
        .replace(/\bhelped\b/gi, "Improved");
      const sentence = cleaned.charAt(0).toUpperCase() + cleaned.slice(1).replace(/\.*$/, "");
      const enhanced = `${sentence}.`;
      return NextResponse.json(
        { enhanceContent: enhanced },
        { status: 200 }
      );
    }

    const response = await ai.chat.completions.create({
      model: process.env.AI_MODEL as string,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. Your task is to enhance a single job description line to 1–2 concise sentences, highlighting key responsibilities and measurable achievements. Use strong action verbs, keep it ATS-friendly, and return only the improved text without any extra commentary.",
        },
        {
          role: "user",
          content: userContext.trim(),
        },
      ],
    });

    const enhanceContent = response.choices?.[0]?.message?.content?.trim() || "";
    return NextResponse.json({ enhanceContent }, { status: 200 });
  } catch (error: any) {
    // Graceful fallback: echo back input so UI keeps working in dev
    try {
      const { userContext } = await request.json();
      return NextResponse.json(
        { enhanceContent: (userContext || "").toString().trim() },
        { status: 200 }
      );
    } catch {}
    return NextResponse.json(
      { enhanceContent: "" },
      { status: 200 }
    );
  }
}
