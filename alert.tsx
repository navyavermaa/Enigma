import { useState } from "react";
import {
  Zap,
  ChevronDown,
  Upload,
  Timer,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  BarChart2,
  Activity,
  Users,
  Clock,
  Menu,
  X,
  Play,
  Cpu,
} from "lucide-react";

// Brand palette constants
const BROWN = "#3B2010";
const IVORY = "#FAF7F2";
const SAGE = "#6B8F71";
const AMBER = "#C49A3C";
const SAGE_BG = "#EEF3EF";
const AMBER_BG = "#FBF5E8";

// ── Semicircle Gauge ──────────────────────────────────────────────────────────
function RiskGauge({ pct }: { pct: number }) {
  const r = 62;
  const cx = 80;
  const cy = 76;
  const arc = Math.PI * r;
  const offset = arc * (1 - pct / 100);

  return (
    <svg width="160" height="90" viewBox="0 0 160 90" aria-label={`Risk gauge at ${pct}%`}>
      {/* Track */}
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke="#E8E0D2"
        strokeWidth="10"
        strokeLinecap="round"
      />
      {/* Fill */}
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke={AMBER}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={arc}
        strokeDashoffset={offset}
      />
      {/* Needle dot */}
      <circle cx={cx} cy={cy} r="4" fill={BROWN} />
      {/* Percentage */}
      <text
        x={cx}
        y={cy - 16}
        textAnchor="middle"
        fontSize="26"
        fontWeight="700"
        fill={BROWN}
        fontFamily="'Fraunces', Georgia, serif"
      >
        {pct}%
      </text>
    </svg>
  );
}

// ── Flowchart Node ────────────────────────────────────────────────────────────
function FlowNode({ label, isLast }: { label: string; isLast?: boolean }) {
  return (
    <div className="flex items-center gap-0">
      <div
        className="flex-shrink-0 px-3.5 py-2 text-xs font-medium rounded-[8px] border whitespace-nowrap"
        style={{
          background: IVORY,
          borderColor: "rgba(44,26,14,0.18)",
          color: BROWN,
          fontFamily: "'DM Mono', monospace",
        }}
      >
        {label}
      </div>
      {!isLast && (
        <div className="flex items-center" style={{ color: "rgba(44,26,14,0.3)" }}>
          <div className="w-5 h-px bg-current" />
          <ArrowRight size={10} />
        </div>
      )}
    </div>
  );
}

// ── Metric Bar ────────────────────────────────────────────────────────────────
function MetricBar({
  icon,
  label,
  value,
  pct,
  color,
  note,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  pct: number;
  color: string;
  note: string;
}) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-[6px] flex items-center justify-center flex-shrink-0"
          style={{ background: "#EDE5D8" }}
        >
          <span style={{ color: BROWN }}>{icon}</span>
        </div>
        <span
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "#7A6147", fontFamily: "'DM Mono', monospace" }}
        >
          {label}
        </span>
      </div>
      <div
        className="text-2xl font-bold"
        style={{ fontFamily: "'Fraunces', Georgia, serif", color: BROWN }}
      >
        {value}
      </div>
      <div className="w-full rounded-full h-1.5" style={{ background: "#E8E0D2" }}>
        <div
          className="h-1.5 rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <p className="text-xs leading-relaxed" style={{ color: "#7A6147" }}>
        {note}
      </p>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
const RIPPLE_NODES = [
  "Price Increase",
  "Demand Drops",
  "Inventory Piles Up",
  "Storage Costs Rise",
];

const NAV_LINKS = ["Strategic Simulator", "Survival Game", "Dashboard", "Docs"];

export default function App() {
  const [mode, setMode] = useState<"simulator" | "stresstest">("simulator");
  const [sector, setSector] = useState("Pricing");
  const [decision, setDecision] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const [dragging, setDragging] = useState(false);

  return (
    <div
      className="min-h-screen text-foreground"
      style={{ background: "#F5F0E8", fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* Subtle grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(44,26,14,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(44,26,14,0.04) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── HEADER ── */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: "rgba(245,240,232,0.94)",
          backdropFilter: "blur(12px)",
          borderColor: "rgba(44,26,14,0.1)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 flex-shrink-0">
            <div
              className="w-8 h-8 rounded-[7px] flex items-center justify-center"
              style={{ background: BROWN }}
            >
              <Zap size={15} fill={IVORY} color={IVORY} />
            </div>
            <span
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: "'Fraunces', Georgia, serif", color: BROWN }}
            >
              FlutterIQ
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-medium transition-colors"
                style={{ color: "#7A6147" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = BROWN)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#7A6147")}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* CTA + mobile menu */}
          <div className="flex items-center gap-3">
            <button
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-[8px] text-sm font-semibold transition-opacity hover:opacity-85"
              style={{ background: BROWN, color: IVORY }}
            >
              <Play size={12} fill={IVORY} color={IVORY} />
              Launch Simulator
            </button>
            <button
              className="md:hidden p-2 rounded-[6px] transition-colors"
              style={{ color: BROWN }}
              onClick={() => setNavOpen(!navOpen)}
              aria-label="Toggle navigation"
            >
              {navOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile nav drawer */}
        {navOpen && (
          <div
            className="md:hidden border-t px-6 py-4 space-y-3"
            style={{ borderColor: "rgba(44,26,14,0.1)", background: "#FAF7F2" }}
          >
            {NAV_LINKS.map((link) => (
              <a key={link} href="#" className="block text-sm font-medium py-1" style={{ color: BROWN }}>
                {link}
              </a>
            ))}
            <button
              className="w-full mt-2 py-2.5 rounded-[8px] text-sm font-semibold"
              style={{ background: BROWN, color: IVORY }}
            >
              Launch Simulator
            </button>
          </div>
        )}
      </header>

      <main className="relative max-w-7xl mx-auto px-6 pb-20 space-y-20">

        {/* ── HERO ── */}
        <section className="pt-16 pb-4 text-center space-y-7">
          {/* Badge */}
          <div className="flex justify-center">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border"
              style={{
                fontFamily: "'DM Mono', monospace",
                background: "#EDE5D8",
                borderColor: "rgba(44,26,14,0.15)",
                color: "#7A6147",
                letterSpacing: "0.08em",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: SAGE }}
              />
              Hackathon Edition &middot; Live
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1
              className="text-7xl md:text-9xl font-black leading-none tracking-tighter"
              style={{ fontFamily: "'Fraunces', Georgia, serif", color: BROWN }}
            >
              FlutterIQ
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-wide" style={{ color: "#7A6147" }}>
              Predict the ripple.{" "}
              <span className="font-semibold" style={{ color: BROWN }}>
                Survive the crisis.
              </span>
            </p>
          </div>

          {/* Mode toggle */}
          <div className="flex justify-center">
            <div
              className="inline-flex items-center gap-1 p-1 rounded-[10px] border"
              style={{ background: "#EDE5D8", borderColor: "rgba(44,26,14,0.12)" }}
            >
              {[
                { id: "simulator" as const, label: "Strategic Simulator Mode" },
                { id: "stresstest" as const, label: "Startup Stress Test Mode" },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setMode(id)}
                  className="px-5 py-2.5 rounded-[8px] text-sm font-semibold transition-all"
                  style={
                    mode === id
                      ? { background: BROWN, color: IVORY, boxShadow: "0 1px 4px rgba(0,0,0,0.18)" }
                      : { color: "#7A6147", background: "transparent" }
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── DUAL INPUT CARDS ── */}
        <section className="grid md:grid-cols-2 gap-5">

          {/* Card A — Strategic Simulator */}
          <div
            className="rounded-[8px] p-7 space-y-5 border transition-shadow hover:shadow-lg"
            style={{ background: "#FAF7F2", borderColor: "rgba(44,26,14,0.12)" }}
          >
            <div className="flex items-start justify-between">
              <div>
                <div
                  className="text-[10px] font-medium uppercase tracking-[0.12em] mb-1"
                  style={{ fontFamily: "'DM Mono', monospace", color: "#7A6147" }}
                >
                  Card A
                </div>
                <h2
                  className="text-xl font-bold"
                  style={{ fontFamily: "'Fraunces', Georgia, serif", color: BROWN }}
                >
                  Strategic Simulator
                </h2>
              </div>
              <div
                className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0"
                style={{ background: "#EDE5D8" }}
              >
                <BarChart2 size={16} style={{ color: BROWN }} />
              </div>
            </div>

            {/* Sector dropdown */}
            <div className="space-y-1.5">
              <label
                className="text-[10px] font-semibold uppercase tracking-[0.1em]"
                style={{ fontFamily: "'DM Mono', monospace", color: "#7A6147" }}
              >
                Select Sector
              </label>
              <div className="relative">
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 text-sm rounded-[8px] border cursor-pointer focus:outline-none"
                  style={{
                    background: "#F5F0E8",
                    borderColor: "rgba(44,26,14,0.15)",
                    color: BROWN,
                  }}
                >
                  {["Pricing", "Marketing", "Operations", "Product", "Finance", "HR"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "#7A6147" }}
                />
              </div>
            </div>

            {/* Decision input */}
            <div className="space-y-1.5">
              <label
                className="text-[10px] font-semibold uppercase tracking-[0.1em]"
                style={{ fontFamily: "'DM Mono', monospace", color: "#7A6147" }}
              >
                Describe Your Decision
              </label>
              <input
                type="text"
                value={decision}
                onChange={(e) => setDecision(e.target.value)}
                placeholder="Increase price by 10%"
                className="w-full px-4 py-2.5 text-sm rounded-[8px] border focus:outline-none focus:ring-2"
                style={{
                  background: "#F5F0E8",
                  borderColor: "rgba(44,26,14,0.15)",
                  color: BROWN,
                  "--tw-ring-color": "rgba(59,32,16,0.2)",
                } as React.CSSProperties}
              />
            </div>

            <button
              className="w-full py-3 rounded-[8px] text-sm font-bold flex items-center justify-center gap-2 transition-opacity hover:opacity-85"
              style={{ background: BROWN, color: IVORY }}
            >
              Run Simulation 🚀
            </button>
          </div>

          {/* Card B — Startup Stress Test */}
          <div
            className="rounded-[8px] p-7 space-y-5 border transition-shadow hover:shadow-lg"
            style={{ background: "#FAF7F2", borderColor: "rgba(44,26,14,0.12)" }}
          >
            <div className="flex items-start justify-between">
              <div>
                <div
                  className="text-[10px] font-medium uppercase tracking-[0.12em] mb-1"
                  style={{ fontFamily: "'DM Mono', monospace", color: "#7A6147" }}
                >
                  Card B
                </div>
                <h2
                  className="text-xl font-bold"
                  style={{ fontFamily: "'Fraunces', Georgia, serif", color: BROWN }}
                >
                  Startup Stress Test
                </h2>
              </div>
              <div
                className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0"
                style={{ background: "#EDE5D8" }}
              >
                <Activity size={16} style={{ color: BROWN }} />
              </div>
            </div>

            {/* Callout */}
            <div
              className="rounded-[8px] px-4 py-3 text-sm border"
              style={{ background: "#EDE5D8", borderColor: "rgba(44,26,14,0.1)", color: "#7A6147" }}
            >
              Got a new idea? Put it through the{" "}
              <span className="font-semibold" style={{ color: BROWN }}>
                gauntlet.
              </span>
            </div>

            {/* Upload zone */}
            <div
              className="rounded-[8px] border-2 border-dashed py-9 flex flex-col items-center gap-3 cursor-pointer transition-all"
              style={{
                borderColor: dragging ? BROWN : "rgba(44,26,14,0.2)",
                background: dragging ? "#EDE5D8" : "transparent",
              }}
              onDragEnter={() => setDragging(true)}
              onDragLeave={() => setDragging(false)}
              onDrop={() => setDragging(false)}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center transition-colors"
                style={{ background: "#EDE5D8" }}
              >
                <Upload size={17} style={{ color: BROWN }} />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold" style={{ color: BROWN }}>
                  Upload Startup Pitch / Idea
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#7A6147" }}>
                  PDF, DOCX, or plain text &middot; Max 10MB
                </p>
              </div>
              <button
                className="text-xs font-semibold px-4 py-1.5 rounded-[6px] border transition-colors"
                style={{
                  borderColor: "rgba(44,26,14,0.2)",
                  color: BROWN,
                  background: "#FAF7F2",
                }}
              >
                Browse files
              </button>
            </div>

            {/* Gamified CTA */}
            <button
              className="w-full py-3.5 rounded-[8px] text-sm font-bold border-2 flex items-center justify-center gap-2 transition-opacity hover:opacity-85"
              style={{ background: BROWN, color: IVORY, borderColor: BROWN }}
            >
              <Timer size={15} color={IVORY} />
              Launch 3-Minute Survival Game ⏱️
            </button>
          </div>
        </section>

        {/* ── RESULTS DASHBOARD ── */}
        <section className="space-y-5">
          {/* Section divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: "rgba(44,26,14,0.12)" }} />
            <div className="flex items-center gap-2">
              <Cpu size={13} style={{ color: "#7A6147" }} />
              <span
                className="text-[10px] font-medium uppercase tracking-[0.14em]"
                style={{ fontFamily: "'DM Mono', monospace", color: "#7A6147" }}
              >
                Results Dashboard
              </span>
            </div>
            <div className="flex-1 h-px" style={{ background: "rgba(44,26,14,0.12)" }} />
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* ① Risk Assessment */}
            <div
              className="rounded-[8px] p-6 border flex flex-col items-center gap-3"
              style={{ background: "#FAF7F2", borderColor: "rgba(44,26,14,0.12)" }}
            >
              <div className="w-full flex items-center justify-between">
                <span
                  className="text-[10px] font-medium uppercase tracking-[0.12em]"
                  style={{ fontFamily: "'DM Mono', monospace", color: "#7A6147" }}
                >
                  Risk Assessment
                </span>
                <span
                  className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full border"
                  style={{
                    background: AMBER_BG,
                    borderColor: "rgba(196,154,60,0.35)",
                    color: "#8B6510",
                  }}
                >
                  Medium Risk
                </span>
              </div>

              <RiskGauge pct={70} />

              <div className="text-center space-y-1">
                <p
                  className="text-base font-bold"
                  style={{ fontFamily: "'Fraunces', Georgia, serif", color: BROWN }}
                >
                  Risk Level: 70% 🟡
                </p>
                <p className="text-xs" style={{ color: "#7A6147" }}>
                  Monitor closely — approaching High Risk threshold
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full rounded-full h-2" style={{ background: "#E8E0D2" }}>
                <div
                  className="h-2 rounded-full"
                  style={{ width: "70%", background: AMBER }}
                />
              </div>
            </div>

            {/* ② Benefits & Risks */}
            <div
              className="rounded-[8px] overflow-hidden border flex flex-col"
              style={{ borderColor: "rgba(44,26,14,0.12)" }}
            >
              {/* Benefits */}
              <div className="p-5 flex-1" style={{ background: SAGE_BG }}>
                <div className="flex items-center gap-2 mb-3.5">
                  <TrendingUp size={13} style={{ color: SAGE }} />
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.12em]"
                    style={{ fontFamily: "'DM Mono', monospace", color: SAGE }}
                  >
                    📈 Benefits
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {["Higher profit margins", "Increased revenue per unit"].map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm" style={{ color: BROWN }}>
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: SAGE }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="h-px" style={{ background: "rgba(44,26,14,0.1)" }} />
              {/* Risks */}
              <div className="p-5 flex-1" style={{ background: AMBER_BG }}>
                <div className="flex items-center gap-2 mb-3.5">
                  <AlertTriangle size={13} style={{ color: AMBER }} />
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.12em]"
                    style={{ fontFamily: "'DM Mono', monospace", color: "#8B6510" }}
                  >
                    ⚠️ Risks
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {["Immediate lower consumer demand", "Risk of losing legacy user base"].map((r) => (
                    <li key={r} className="flex items-start gap-2.5 text-sm" style={{ color: BROWN }}>
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: AMBER }}
                      />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ⑤ AI Suggestions */}
            <div
              className="rounded-[8px] p-6 border-2 flex flex-col gap-5"
              style={{ background: "#FAF7F2", borderColor: BROWN }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-[6px] flex items-center justify-center flex-shrink-0"
                  style={{ background: "#EDE5D8" }}
                >
                  <Lightbulb size={15} style={{ color: BROWN }} />
                </div>
                <div>
                  <div
                    className="text-[10px] font-medium uppercase tracking-[0.1em]"
                    style={{ fontFamily: "'DM Mono', monospace", color: "#7A6147" }}
                  >
                    FlutterIQ Suggests
                  </div>
                </div>
              </div>

              <p className="text-sm leading-relaxed flex-1" style={{ color: BROWN }}>
                <span className="font-bold">💡</span> Buffer the demand drop by running a{" "}
                <span className="font-semibold underline decoration-dotted">5% price increase</span> combined
                with a{" "}
                <span className="font-semibold underline decoration-dotted">
                  customer loyalty tier reward system.
                </span>
              </p>

              <div
                className="pt-4 space-y-2 border-t"
                style={{ borderColor: "rgba(44,26,14,0.12)" }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] uppercase tracking-[0.1em]"
                    style={{ fontFamily: "'DM Mono', monospace", color: "#7A6147" }}
                  >
                    Confidence score
                  </span>
                  <span className="text-sm font-bold" style={{ color: BROWN }}>
                    87%
                  </span>
                </div>
                <div className="w-full rounded-full h-1.5" style={{ background: "#E8E0D2" }}>
                  <div
                    className="h-1.5 rounded-full"
                    style={{ width: "87%", background: SAGE }}
                  />
                </div>
              </div>
            </div>

            {/* ③ Ripple Effect Flowchart — full width */}
            <div
              className="md:col-span-3 rounded-[8px] p-6 border"
              style={{ background: "#FAF7F2", borderColor: "rgba(44,26,14,0.12)" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                  <div
                    className="text-[10px] font-medium uppercase tracking-[0.12em] mb-0.5"
                    style={{ fontFamily: "'DM Mono', monospace", color: "#7A6147" }}
                  >
                    Causality Engine
                  </div>
                  <h3
                    className="text-base font-bold"
                    style={{ fontFamily: "'Fraunces', Georgia, serif", color: BROWN }}
                  >
                    The Ripple Effect Map
                  </h3>
                </div>
                <span
                  className="text-[10px] px-3 py-1.5 rounded-full border font-medium"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    background: "#EDE5D8",
                    borderColor: "rgba(44,26,14,0.15)",
                    color: "#7A6147",
                  }}
                >
                  2nd-order consequences
                </span>
              </div>

              <div className="overflow-x-auto pb-1">
                <div className="flex items-center min-w-max">
                  {RIPPLE_NODES.map((node, i) => (
                    <FlowNode key={node} label={node} isLast={i === RIPPLE_NODES.length - 1} />
                  ))}
                </div>
              </div>

              {/* Secondary ripple row */}
              <div
                className="mt-5 pt-5 border-t grid grid-cols-2 md:grid-cols-4 gap-3"
                style={{ borderColor: "rgba(44,26,14,0.08)" }}
              >
                {[
                  { label: "Revenue Impact", value: "−18%", delta: "down" },
                  { label: "Customer Churn Risk", value: "+23%", delta: "up" },
                  { label: "Competitor Response", value: "High", delta: "neutral" },
                  { label: "Break-even Timeline", value: "+4 mo.", delta: "up" },
                ].map(({ label, value, delta }) => (
                  <div
                    key={label}
                    className="rounded-[6px] px-4 py-3 border"
                    style={{ background: "#F5F0E8", borderColor: "rgba(44,26,14,0.1)" }}
                  >
                    <div
                      className="text-[10px] font-medium mb-1 uppercase tracking-wider"
                      style={{ fontFamily: "'DM Mono', monospace", color: "#7A6147" }}
                    >
                      {label}
                    </div>
                    <div
                      className="text-lg font-bold"
                      style={{
                        fontFamily: "'Fraunces', Georgia, serif",
                        color:
                          delta === "up"
                            ? "#8B1A1A"
                            : delta === "down"
                            ? SAGE
                            : BROWN,
                      }}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ④ Crisis Survival Analytics — full width */}
            <div
              className="md:col-span-3 rounded-[8px] p-6 border"
              style={{ background: "#FAF7F2", borderColor: "rgba(44,26,14,0.12)" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-7">
                <div>
                  <div
                    className="text-[10px] font-medium uppercase tracking-[0.12em] mb-0.5"
                    style={{ fontFamily: "'DM Mono', monospace", color: "#7A6147" }}
                  >
                    Survival Mode Output
                  </div>
                  <h3
                    className="text-base font-bold"
                    style={{ fontFamily: "'Fraunces', Georgia, serif", color: BROWN }}
                  >
                    Crisis Survival Analytics
                  </h3>
                </div>
                <div
                  className="flex items-center gap-2 text-[10px] font-medium px-3 py-1.5 rounded-full border"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    background: SAGE_BG,
                    borderColor: "rgba(107,143,113,0.3)",
                    color: "#3D6B44",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: SAGE }} />
                  Game Score Active
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-7">
                <MetricBar
                  icon={<Users size={14} />}
                  label="Team Alignment"
                  value="85%"
                  pct={85}
                  color={SAGE}
                  note="Co-founders remained aligned under pressure"
                />
                <MetricBar
                  icon={<Activity size={14} />}
                  label="Emotional Resilience"
                  value="High"
                  pct={90}
                  color={SAGE}
                  note="Opted for logic over panic responses"
                />
                <MetricBar
                  icon={<Clock size={14} />}
                  label="Decision Velocity"
                  value="42s avg."
                  pct={72}
                  color={AMBER}
                  note="Fast operational reflex under chaos"
                />
              </div>

              {/* Overall score strip */}
              <div
                className="mt-7 pt-5 border-t flex flex-wrap items-center justify-between gap-4"
                style={{ borderColor: "rgba(44,26,14,0.1)" }}
              >
                <div>
                  <div
                    className="text-[10px] uppercase tracking-[0.1em] mb-1"
                    style={{ fontFamily: "'DM Mono', monospace", color: "#7A6147" }}
                  >
                    Overall Survival Score
                  </div>
                  <div
                    className="text-4xl font-black"
                    style={{ fontFamily: "'Fraunces', Georgia, serif", color: BROWN }}
                  >
                    82
                    <span className="text-base font-normal" style={{ color: "#7A6147" }}>
                      {" "}
                      / 100
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: SAGE_BG, color: "#3D6B44" }}
                  >
                    Resilient Operator
                  </span>
                  <p className="text-xs text-right" style={{ color: "#7A6147" }}>
                    Top 18% among tested startups this session
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer
          className="border-t pt-8 pb-2 flex flex-wrap items-center justify-between gap-3"
          style={{ borderColor: "rgba(44,26,14,0.12)" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-[5px] flex items-center justify-center"
              style={{ background: BROWN }}
            >
              <Zap size={11} fill={IVORY} color={IVORY} />
            </div>
            <span
              className="text-sm font-bold"
              style={{ fontFamily: "'Fraunces', Georgia, serif", color: BROWN }}
            >
              FlutterIQ
            </span>
          </div>
          <span
            className="text-xs"
            style={{ fontFamily: "'DM Mono', monospace", color: "#7A6147" }}
          >
            Hackathon Edition · 2024 · Built with strategic foresight
          </span>
        </footer>
      </main>
    </div>
  );
}
