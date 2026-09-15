import { timingSafeEqual } from "node:crypto";
import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

function matchesSecret(received: string, expected: string) {
  const left = Buffer.from(received);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret") ?? "";
  const slug = (url.searchParams.get("slug") ?? "").replace(/[^a-z0-9-]/gi, "").slice(0, 96);
  const expected = process.env.SANITY_PREVIEW_SECRET?.trim() ?? "";

  if (!expected || !secret || !matchesSecret(secret, expected) || !slug) {
    return NextResponse.json({ error: "Invalid preview request." }, { status: 401 });
  }

  const mode = await draftMode();
  mode.enable();
  return NextResponse.redirect(new URL(`/blog/${slug}`, request.url));
}
