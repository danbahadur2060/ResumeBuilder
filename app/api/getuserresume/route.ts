import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import Resume from "../../../models/Resume";
import { connectDB } from "../../../configs/db.js";
import {
  errorResponse,
  successResponse,
  unauthorizedError,
} from "../utils/apiHelpers";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();

    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user?.id) {
      return unauthorizedError("Please login to continue");
    }

    const resumes = await (Resume as any)
      .find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .lean();

    return successResponse(resumes);
  } catch (error) {
    return errorResponse(error, "Failed to fetch user resumes", 500);
  }
}
