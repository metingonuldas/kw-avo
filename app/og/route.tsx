// app/og/route.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  // Sadece static PNG göstereceğiz → Next ImageResponse üzerinden PNG embed edeceğiz.
  const imageUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/images/kw-hero-cover.png`;

  return new ImageResponse(
    (
      <img
        src={imageUrl}
        alt="KWAVO"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}