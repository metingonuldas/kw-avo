import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? "KW Alesta • Viya • Orsa").slice(0, 80);

  return new ImageResponse(
    (
      <div style={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        background: "white",
        fontSize: 56,
        fontWeight: 700,
      }}>
        {title}
      </div>
    ),
    { width: 1200, height: 630 }
  );
}