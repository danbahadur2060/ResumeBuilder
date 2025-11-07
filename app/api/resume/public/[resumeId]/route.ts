import Resume from "../../../../../models/Resume";
import { connectDB } from "../../../../../configs/db.js";
import { errorResponse, successResponse } from "../../../utils/apiHelpers";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(
  _request: NextRequest,
  context: any
) {
  try {
    await connectDB();
    const { params } = await context;
    const { resumeId } = params || {};

    const resume = await (Resume as any)
      .findOne({ public: true, _id: resumeId })
      .select("-__v -createdAt -updatedAt")
      .lean();

    if (!resume) {
      return errorResponse(null, "Resume not found", 404);
    }
    return successResponse(resume, "", 200);
  } catch (error) {
    return errorResponse(error, "Failed to fetch resume", 500);
  }
}
