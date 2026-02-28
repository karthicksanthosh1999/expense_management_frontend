import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const amount = searchParams.get("amount") ?? "0";
    const title = searchParams.get("title") ?? "Transaction";
    const category = searchParams.get("category") ?? "Category";
    const user = searchParams.get("user") ?? "User";

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    background: "#000000",
                    color: "#ffffff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ fontSize: 60, color: "#22c55e" }}>
                    Payment Successful!
                </div>

                <div style={{ fontSize: 80, marginTop: 40 }}>
                    ₹ {amount}
                </div>

                <div style={{ fontSize: 40, marginTop: 20 }}>
                    {title}
                </div>

                <div style={{ fontSize: 30, marginTop: 20 }}>
                    {category}
                </div>

                <div style={{ fontSize: 25, marginTop: 40, opacity: 0.7 }}>
                    {user}
                </div>
            </div>
        ),
        {
            width: 1080,
            height: 1080,
        }
    );
}
