import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

function matchesSecret(received: string, expected: string) {
  const left = Buffer.from(received);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function POST(request: Request) {
  const expected = process.env.SANITY_REVALIDATE_SECRET?.trim() ?? "";
  const received = request.headers.get("x-sanity-secret")?.trim() ?? "";
  if (!expected || !received || !matchesSecret(received, expected)) {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 401 });
  }

  const payload = (await request.json().catch(() => ({}))) as { _type?: string; slug?: string; topic?: string };
  if (payload._type !== "post") return NextResponse.json({ revalidated: false, reason: "Unsupported document type." });

  revalidateTag("sanity-post", "max");
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/topics");
  if (payload.slug) revalidatePath(`/blog/${payload.slug.replace(/[^a-z0-9-]/gi, "")}`);
  if (payload.topic) revalidatePath(`/topics/${payload.topic.replace(/[^a-z0-9-]/gi, "")}`);

  return NextResponse.json({ revalidated: true, now: new Date().toISOString() });
}
