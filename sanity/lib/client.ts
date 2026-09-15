import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "../env";

export function getClient(options: { preview?: boolean } = {}): SanityClient | null {
  if (!isSanityConfigured) return null;
  const preview = Boolean(options.preview);
  const token = preview
    ? process.env.SANITY_API_READ_TOKEN?.trim() || process.env.SANITY_API_WRITE_TOKEN?.trim()
    : undefined;
  if (preview && !token) return null;
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: !preview,
    perspective: preview ? "previewDrafts" : "published",
    ...(token ? { token } : {}),
  });
}
