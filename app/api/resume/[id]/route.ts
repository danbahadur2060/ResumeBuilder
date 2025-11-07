import { auth } from "@/app/lib/auth";
import Resume from "../../../../models/Resume";
import { connectDB } from "../../../../configs/db.js";
import { imagekit } from "../../../../configs/imagekit";
import {
  errorResponse,
  successResponse,
  unauthorizedError,
} from "../../utils/apiHelpers";
import { NextRequest } from "next/server";
import { headers } from "next/headers";

export const runtime = "nodejs";

export async function DELETE(
  _request: NextRequest,
  context: any
) {
  try {
    await connectDB();
    const params = await context.params;
    const { id } = params || {};
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user?.id) {
      return unauthorizedError("Please login to continue");
    }

    const deleted = await (Resume as any).findOneAndDelete({
      userId: session.user.id,
      _id: id,
    });

    if (!deleted) {
      return errorResponse(null, "Resume not found", 404);
    }

    return successResponse("", "Resume deleted successfully", 200);
  } catch (error) {
    return errorResponse(error, "Failed to delete resume", 500);
  }
}

export async function GET(
  _request: NextRequest,
  context: any
) {
  try {
    await connectDB();
    const params = await context.params;
    const { id } = params || {};
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user?.id) {
      return unauthorizedError("Please login to continue");
    }

    const resume = await (Resume as any)
      .findOne({ userId: session.user.id, _id: id })
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

export async function PUT(
  request: NextRequest,
  context: any
) {
  try {
    await connectDB();
    const params = await context.params;
    const { id } = params || {};

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return unauthorizedError("Please login to continue");
    }

    const formData = await request.formData();
    const image = formData.get("image") as File | null;
    const resumeDataStr = formData.get("resumeData") as string | null;
    const removeBackgroundStr = formData.get("removeBackground") as string | null;

    let resumeDataCopy: any = resumeDataStr ? JSON.parse(resumeDataStr) : {};

    if (image) {
      const isImageKitConfigured = Boolean(
        process.env.IMAGEKIT_PRIVATE_KEY &&
          process.env.IMAGEKIT_PUBLIC_KEY &&
          process.env.IMAGEKIT_URL_ENDPOINT
      );

      if (isImageKitConfigured) {
        try {
          const arrayBuffer = await image.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const response = await imagekit.files.upload({
            file: buffer,
            fileName: image.name || "resume.png",
            folder: "user_resume",
            transformation: {
              pre:
                "w-300,h-300,fo-face,z-0.75" +
                (removeBackgroundStr === "true" ? ",e-bgremove" : ""),
            },
          });
          if (!resumeDataCopy.personal_info) resumeDataCopy.personal_info = {};
          resumeDataCopy.personal_info.image = response.url;
        } catch (e) {
          console.warn("Image upload skipped:", e);
          // proceed without setting image if upload fails in non-configured envs
        }
      } else {
        // Skip upload silently if ImageKit isn't configured
      }
    }

    // Remove immutable/sensitive fields if present in payload
    ["_id", "userId", "createdAt", "updatedAt", "__v"].forEach((k) => {
      if (k in resumeDataCopy) delete (resumeDataCopy as any)[k];
    });

    const updated = await (Resume as any).findOneAndUpdate(
      { _id: id, userId: session.user.id },
      { $set: resumeDataCopy },
      { new: true }
    );

    if (!updated) {
      return errorResponse(null, "Resume not found", 404);
    }

    return successResponse(updated, "Resume updated successfully", 200);
  } catch (error: any) {
    console.error("PUT /resume/:id error:", error);
    return errorResponse(error, error?.message || "Internal server error", 500);
  }
}
