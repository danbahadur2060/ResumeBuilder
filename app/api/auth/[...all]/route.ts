import { auth } from "@/app/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const runtime = "nodejs";

// Lazily create the handler at request time to avoid build-time env checks
export async function GET(request: Request, context: any) {
  const handlers = toNextJsHandler(auth.handler);
  // @ts-ignore
  return handlers.GET(request, context);
}

export async function POST(request: Request, context: any) {
  const handlers = toNextJsHandler(auth.handler);
  // @ts-ignore
  return handlers.POST(request, context);
}
