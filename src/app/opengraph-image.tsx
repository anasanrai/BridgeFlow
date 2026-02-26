import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "BridgeFlow — AI-Powered Automation Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "linear-gradient(135deg, #0A0F1E 0%, #0F1428 50%, #0A0F1E 100%)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Inter, system-ui, sans-serif",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Gold accent glow */}
                <div
                    style={{
                        position: "absolute",
                        top: "-200px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "600px",
                        height: "600px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(230,180,34,0.08) 0%, transparent 70%)",
                    }}
                />

                {/* Top gold line */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: "20%",
                        right: "20%",
                        height: "2px",
                        background: "linear-gradient(90deg, transparent 0%, #E6B422 50%, transparent 100%)",
                    }}
                />

                {/* Logo B */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "80px",
                        height: "80px",
                        borderRadius: "18px",
                        background: "linear-gradient(135deg, #F5D060, #E6B422)",
                        marginBottom: "24px",
                        fontSize: "42px",
                        fontWeight: 800,
                        color: "#0A0F1E",
                    }}
                >
                    B
                </div>

                {/* Title */}
                <div
                    style={{
                        fontSize: "64px",
                        fontWeight: 800,
                        background: "linear-gradient(135deg, #FFFFFF, #E0E0E0)",
                        backgroundClip: "text",
                        color: "transparent",
                        letterSpacing: "-1px",
                        marginBottom: "12px",
                    }}
                >
                    BridgeFlow
                </div>

                {/* Tagline */}
                <div
                    style={{
                        fontSize: "24px",
                        fontWeight: 500,
                        color: "#E6B422",
                        letterSpacing: "3px",
                        textTransform: "uppercase",
                        marginBottom: "32px",
                    }}
                >
                    AI-Powered Automation Agency
                </div>

                {/* Description */}
                <div
                    style={{
                        fontSize: "18px",
                        color: "#9CA3AF",
                        maxWidth: "600px",
                        textAlign: "center",
                        lineHeight: 1.5,
                    }}
                >
                    Streamline workflows. Scale operations. Deliver results.
                </div>

                {/* Bottom gold line */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: "20%",
                        right: "20%",
                        height: "2px",
                        background: "linear-gradient(90deg, transparent 0%, #E6B422 50%, transparent 100%)",
                    }}
                />

                {/* URL */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "24px",
                        fontSize: "14px",
                        color: "#6B7280",
                        letterSpacing: "1px",
                    }}
                >
                    www.bridgeflow.agency
                </div>
            </div>
        ),
        { ...size }
    );
}
