// src/app/api/files/route.ts
import { list } from '@vercel/blob';

export async function GET() {
  const { blobs } = await list();

  return Response.json({
    files: blobs.map((blob) => ({
      url: blob.url,
      pathname: blob.pathname,
      size: blob.size,
      uploadedAt: blob.uploadedAt,
    })),
  });
}