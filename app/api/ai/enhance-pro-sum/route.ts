// POST: /api/ai/enhance-pro-sum
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
      // Fallback: echo back trimmed text so UI can proceed in dev without AI
      return NextResponse.json(
        { enhanceContent: userContext.trim() },
        { status: 200 }
      );
    }

    const response = await ai.chat.completions.create({
      model: process.env.AI_MODEL as string,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. Improve the professional summary to 1–2 compelling, ATS-friendly sentences that highlight key skills, experience, and goals. Return only the improved text with no extra commentary.",
        },
        {
          role: "user",
          content: `Enhance the following professional summary for a resume: ${userContext.trim()}`,
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
