import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { getWriteClient, isWriteConfigured } from "@/sanity/lib/write-client";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: { email?: string; source?: string; company?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: acknowledge automated submissions without storing them.
  if (payload.company?.trim()) {
    return NextResponse.json({ subscribed: true }, { status: 201 });
  }

  const email = payload.email?.trim().toLowerCase() ?? "";
  const source = (payload.source?.trim() || "website").replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 60);

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  if (!isWriteConfigured()) {
    return NextResponse.json(
      { error: "Newsletter signup is temporarily unavailable. Please try again soon." },
      { status: 503 },
    );
  }

  const client = getWriteClient();
  if (!client) {
    return NextResponse.json({ error: "Newsletter signup is unavailable." }, { status: 503 });
  }

  const now = new Date().toISOString();
  const id = `newsletter-${createHash("sha256").update(email).digest("hex")}`;

  try {
    const existing = await client.getDocument<{ _id: string; status?: string }>(id);
    await client.createIfNotExists({
      _id: id,
      _type: "newsletterSubscriber",
      email,
      source,
      status: "subscribed",
      consentedAt: now,
      lastSubscribedAt: now,
    });

    await client
      .patch(id)
      .set({ email, source, status: "subscribed", lastSubscribedAt: now })
      .setIfMissing({ consentedAt: now })
      .commit();

    return NextResponse.json({ subscribed: true, duplicate: Boolean(existing) }, { status: existing ? 200 : 201 });
  } catch {
    return NextResponse.json(
      { error: "We could not save your signup. Please try again soon." },
      { status: 503 },
    );
  }

}
