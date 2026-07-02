import React from "react";
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

// ---- brand tokens (change these to re-theme every reel) ----
const CORAL = "#E08A66", GOLD = "#CBA968", INK = "#F2EADB", INK2 = "#B9AF9E", BG = "#0d0b10";
const SANS = "Inter, system-ui, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

type Slide = {
  kind: "hook" | "tool" | "cta";
  n?: number; tag?: string; headline?: string; emphasis?: string; body?: string; important?: boolean;
};
export type ReelProps = { slides: Slide[]; handle?: string };

const Word: React.FC<{ delay: number; children: React.ReactNode }> = ({ delay, children }) => {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 13, stiffness: 200, mass: 0.7 } });
  return <span style={{ display: "inline-block", opacity: s, transform: `translateY(${interpolate(s, [0, 1], [26, 0])}px)` }}>{children}</span>;
};

const Chrome: React.FC<{ handle: string; children: React.ReactNode }> = ({ handle, children }) => (
  <AbsoluteFill style={{ background: `radial-gradient(120% 100% at 50% 30%, #17130f 0%, ${BG} 60%, #08070a 100%)`, fontFamily: SANS, overflow: "hidden" }}>
    {children}
    <div style={{ position: "absolute", bottom: 90, left: 96, color: "#8a8594", fontFamily: MONO, fontSize: 30, letterSpacing: 3, textTransform: "uppercase" }}>✳ {handle}</div>
  </AbsoluteFill>
);

const HookScene: React.FC<{ s: Slide; handle: string }> = ({ s, handle }) => {
  const words = (s.headline || s.emphasis || "Your hook here").split(" ");
  return (<Chrome handle={handle}>
    {s.tag ? <div style={{ position: "absolute", top: 300, left: 0, right: 0, textAlign: "center", color: CORAL, fontFamily: MONO, fontWeight: 700, letterSpacing: 4, fontSize: 28 }}>{s.tag}</div> : null}
    <div style={{ position: "absolute", top: 700, left: 60, right: 60, textAlign: "center", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 18px", fontWeight: 900, fontSize: 92, color: "#fff", letterSpacing: -2, lineHeight: 1.05, textShadow: "0 6px 30px rgba(0,0,0,.6)" }}>
      {words.map((w, i) => <Word key={i} delay={4 + i * 3}>{w}</Word>)}
    </div>
  </Chrome>);
};

const ToolScene: React.FC<{ s: Slide; handle: string }> = ({ s, handle }) => {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const A = s.important ? GOLD : CORAL;
  const pop = spring({ frame: frame - 4, fps, config: { damping: 12, stiffness: 180, mass: 0.8 } });
  return (<Chrome handle={handle}>
    <div style={{ position: "absolute", top: 620, left: 110, right: 110, transform: `translateY(${interpolate(pop, [0, 1], [24, 0])}px) scale(${interpolate(pop, [0, 1], [0.9, 1])})` }}>
      {s.important ? <div style={{ textAlign: "center", marginBottom: 24 }}><span style={{ background: GOLD, color: "#1a1206", fontWeight: 900, fontSize: 30, padding: "10px 24px", borderRadius: 999 }}>★ MOST IMPORTANT</span></div> : null}
      <div style={{ background: "#0f0d14", border: `1px solid ${A}66`, borderRadius: 28, padding: "40px 44px", boxShadow: `0 0 44px ${A}22` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 84, height: 84, borderRadius: 20, background: `${A}22`, border: `2px solid ${A}`, color: A, fontWeight: 900, fontSize: 46, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>{s.n ?? 1}</div>
          <div style={{ color: INK, fontWeight: 800, fontSize: 48, lineHeight: 1.1 }}>{s.headline}{s.emphasis ? <span style={{ color: A }}> {s.emphasis}</span> : null}</div>
        </div>
        {s.body ? <div style={{ color: INK2, fontSize: 32, marginTop: 24, lineHeight: 1.3 }}>{s.body}</div> : null}
      </div>
    </div>
  </Chrome>);
};

const CtaScene: React.FC<{ s: Slide; handle: string }> = ({ s, handle }) => {
  const kw = (s.emphasis || "AUTOMATE").toUpperCase();
  return (<Chrome handle={handle}>
    <div style={{ position: "absolute", top: 760, left: 60, right: 60, textAlign: "center" }}>
      <div style={{ fontWeight: 900, fontSize: 76, color: INK }}>Comment <span style={{ color: CORAL }}>"{kw}"</span></div>
      <div style={{ color: INK2, fontSize: 36, marginTop: 16 }}>{s.body || "and I'll DM you the setup"}</div>
      <div style={{ marginTop: 50, display: "inline-flex", alignItems: "center", gap: 16, background: "#151118", border: `2px solid ${CORAL}`, borderRadius: 999, padding: "20px 30px" }}>
        <span style={{ color: INK, fontWeight: 700, fontSize: 38 }}>{kw}</span>
        <span style={{ background: CORAL, color: "#fff", fontWeight: 800, fontSize: 30, padding: "12px 28px", borderRadius: 999 }}>Post</span>
      </div>
    </div>
  </Chrome>);
};

export const Reel: React.FC<ReelProps> = ({ slides = [], handle = "@yourbusiness" }) => {
  const { fps } = useVideoConfig();
  const per = Math.round(3.4 * fps);
  return (
    <AbsoluteFill style={{ background: BG }}>
      <Series>
        {slides.map((s, i) => (
          <Series.Sequence key={i} durationInFrames={per}>
            {s.kind === "hook" ? <HookScene s={s} handle={handle} />
              : s.kind === "cta" ? <CtaScene s={s} handle={handle} />
                : <ToolScene s={s} handle={handle} />}
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
