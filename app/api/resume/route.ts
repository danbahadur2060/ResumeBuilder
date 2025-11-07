import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import { NextRequest } from "next/server";
import Resume from "../../../models/Resume";
import { connectDB } from "../../../configs/db.js";
import {
  errorResponse,
  successResponse,
  unauthorizedError,
} from "../utils/apiHelpers";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user?.id) {
      return unauthorizedError("Please login to continue");
    }

    const resume = new (Resume as any)({
      ...body,
      userId: session.user.id,
    });
    await resume.save();
    return successResponse(resume, "Resume created successfully", 201);
  } catch (error) {
    return errorResponse(error, "Failed to create resume", 500);
  }
}
