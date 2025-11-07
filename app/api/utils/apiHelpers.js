import { NextResponse } from "next/server";

export function successResponse(data, message = "Success", statusCode = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    },
    { status: statusCode }
  );
}

export function errorResponse(
  error,
  message = "An error occurred",
  statusCode = 500
) {
  console.error(`API Error (${statusCode}):`, error);

  return NextResponse.json(
    {
      success: false,
      error: message,
      message: error?.message || error || "Unknown error",
    },
    { status: statusCode }
  );
}

export function validationError(errors) {
  return NextResponse.json(
    {
      success: false,
      error: "Validation failed",
      errors,
    },
    { status: 400 }
  );
}

export function unauthorizedError(message = "Unauthorized") {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: 401 }
  );
}

export function forbiddenError(message = "Forbidden") {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: 403 }
  );
}

export function notFoundError(resource = "Resource") {
  return NextResponse.json(
    {
      success: false,
      error: `${resource} not found`,
    },
    { status: 404 }
  );
}

export async function withAuth(handler) {
  return async (req, context) => {
    try {
      const { auth } = await import("@/app/lib/auth");
      const { headers: getHeaders } = await import("next/headers");

      const session = await auth.api.getSession({
        headers: await getHeaders(),
      });

      if (!session?.user?.id) {
        return unauthorizedError("Please login to continue");
      }

      return await handler(req, context, session);
    } catch (error) {
      return errorResponse(error, "Authentication failed", 401);
    }
  };
}

export function validateObjectId(id) {
  const mongoose = require("mongoose");
  return mongoose.Types.ObjectId.isValid(id);
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function sanitizeInput(input) {
  if (typeof input === "string") {
    return input.trim();
  }
  return input;
}

export async function asyncHandler(handler) {
  return async (req, context) => {
    try {
      return await handler(req, context);
    } catch (error) {
      console.error("Async handler error:", error);
      return errorResponse(error);
    }
  };
}
