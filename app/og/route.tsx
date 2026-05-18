import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title");

  const heroBuffer = await readFile(
    join(process.cwd(), "public/images/kw-hero-cover.png")
  );
  const heroBase64 = `data:image/png;base64,${heroBuffer.toString("base64")}`;

  const logoBuffer = await readFile(
    join(process.cwd(), "public/images/kw-alestaviyaorsa-white.svg")
  );
  const logoBase64 = `data:image/svg+xml;base64,${Buffer.from(
    logoBuffer
  ).toString("base64")}`;

  const heroTextBuffer = await readFile(
    join(process.cwd(), "public/images/avo-herotext.svg")
  );
  const heroTextBase64 = `data:image/svg+xml;base64,${Buffer.from(
    heroTextBuffer
  ).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          position: "relative",
        }}
      >
        {/* Hero background */}
        <img
          src={heroBase64}
          width={1200}
          height={630}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            objectFit: "cover",
          }}
        />

        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            backgroundColor: "rgba(0,0,0,0.65)",
            display: "flex",
          }}
        />

        {/* Content — centered */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 28,
            }}
          >
            {/* Title or hero text SVG */}
            {title ? (
              <div
                style={{
                  fontSize: title.length > 35 ? 48 : 60,
                  fontWeight: 800,
                  color: "white",
                  lineHeight: 1.15,
                  letterSpacing: -1,
                  textAlign: "center",
                  maxWidth: 900,
                }}
              >
                {title}
              </div>
            ) : (
              <img
                src={heroTextBase64}
                height={80}
                style={{ height: 80 }}
              />
            )}

            {/* Red accent divider */}
            <div
              style={{
                width: 64,
                height: 4,
                borderRadius: 2,
                backgroundColor: "#ce011f",
                display: "flex",
              }}
            />

            {/* Logo */}
            <img
              src={logoBase64}
              height={44}
              style={{ height: 44 }}
            />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
