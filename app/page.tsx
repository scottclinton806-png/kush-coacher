"use client";

import { useState } from "react";

interface Nutrient {
  name: string;
  defaultUnit: string;
  dose: number;
  skip?: boolean;
  toggleable?: boolean;
  note?: string;
}

interface WeekSchedule {
  week: string;
  targetPPM: string;
  pH: string;
  flush?: boolean;
  nutrients: Nutrient[];
}

interface LogEntry {
  id: number;
  date: string;
  phase: string;
  week: string;
  gallons: string;
  ph: string;
  ppm: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const VEG_SCHEDULE: WeekSchedule[] = [
  {
    week: "Veg Week 1", targetPPM: "500–750", pH: "5.8–5.9",
    nutrients: [
      { name: "Bulletproof SI", defaultUnit: "mL", dose: 2 },
      { name: "Base Nutrients (5-12-26)", defaultUnit: "g", dose: 1.5, toggleable: true },
      { name: "Epsom Salt", defaultUnit: "g", dose: 0.5 },
      { name: "Cal-Nit (15-0-0)", defaultUnit: "g", dose: 1 },
      { name: "Great White", defaultUnit: "tsp", dose: 0.1, note: "1 heaping tsp per 10 gal" },
      { name: "SuperThrive", defaultUnit: "mL", dose: 1.25 },
    ]
  },
  {
    week: "Veg Week 2", targetPPM: "900–1000", pH: "5.8–5.9",
    nutrients: [
      { name: "Bulletproof SI", defaultUnit: "mL", dose: 2 },
      { name: "Base Nutrients (5-12-26)", defaultUnit: "g", dose: 3, toggleable: true },
      { name: "Epsom Salt", defaultUnit: "g", dose: 1 },
      { name: "Cal-Nit (15-0-0)", defaultUnit: "g", dose: 2 },
      { name: "Great White", defaultUnit: "tsp", dose: 0.1, note: "1 heaping tsp per 10 gal" },
      { name: "SuperThrive", defaultUnit: "mL", dose: 1.25 },
    ]
  },
  {
    week: "Veg Week 3", targetPPM: "900–1000", pH: "5.8–5.9",
    nutrients: [
      { name: "Bulletproof SI", defaultUnit: "mL", dose: 2.5 },
      { name: "Base Nutrients (5-12-26)", defaultUnit: "g", dose: 3, toggleable: true },
      { name: "Epsom Salt", defaultUnit: "g", dose: 1 },
      { name: "Cal-Nit (15-0-0)", defaultUnit: "g", dose: 2 },
      { name: "Great White", defaultUnit: "tsp", dose: 0.1, note: "1 heaping tsp per 10 gal" },
      { name: "SuperThrive", defaultUnit: "mL", dose: 1.25 },
    ]
  },
  {
    week: "Veg Week 4", targetPPM: "900–1000", pH: "5.8–5.9",
    nutrients: [
      { name: "Bulletproof SI", defaultUnit: "mL", dose: 2.5 },
      { name: "Base Nutrients (5-12-26)", defaultUnit: "g", dose: 3.6, toggleable: true },
      { name: "Epsom Salt", defaultUnit: "g", dose: 1.1 },
      { name: "Cal-Nit (15-0-0)", defaultUnit: "g", dose: 2.4 },
      { name: "Great White", defaultUnit: "tsp", dose: 0.1, note: "1 heaping tsp per 10 gal" },
      { name: "SuperThrive", defaultUnit: "mL", dose: 1.25 },
    ]
  },
];

const FLOWER_SCHEDULE: WeekSchedule[] = [
  {
    week: "Flower Week 1", targetPPM: "750–900", pH: "5.9–6.1",
    nutrients: [
      { name: "Bulletproof SI", defaultUnit: "mL", dose: 2.5 },
      { name: "Base Nutrients (5-12-26)", defaultUnit: "g", dose: 2, toggleable: true },
      { name: "Epsom Salt", defaultUnit: "g", dose: 2.5 },
      { name: "Cal-Nit (15-0-0)", defaultUnit: "g", dose: 2.5 },
      { name: "Cutting Edge Bloom 0-6-5", defaultUnit: "mL", dose: 10 },
      { name: "Sour-Dee", defaultUnit: "mL", dose: 10 },
      { name: "Great White", defaultUnit: "tsp", dose: 0.1, note: "1 heaping tsp per 10 gal" },
      { name: "Ful-Power", defaultUnit: "mL", dose: 10 },
    ]
  },
  {
    week: "Flower Week 2", targetPPM: "750–900", pH: "5.9–6.1",
    nutrients: [
      { name: "Bulletproof SI", defaultUnit: "mL", dose: 2.5 },
      { name: "Base Nutrients (5-12-26)", defaultUnit: "g", dose: 2, toggleable: true },
      { name: "Epsom Salt", defaultUnit: "g", dose: 2.5 },
      { name: "Cal-Nit (15-0-0)", defaultUnit: "g", dose: 2.5 },
      { name: "Cutting Edge Bloom 0-6-5", defaultUnit: "mL", dose: 10 },
      { name: "Sour-Dee", defaultUnit: "mL", dose: 10 },
      { name: "Great White", defaultUnit: "tsp", dose: 0.1, note: "1 heaping tsp per 10 gal" },
      { name: "Ful-Power", defaultUnit: "mL", dose: 10 },
    ]
  },
  {
    week: "Flower Week 3", targetPPM: "900", pH: "5.9–6.1",
    nutrients: [
      { name: "Bulletproof SI", defaultUnit: "mL", dose: 2.5 },
      { name: "Base Nutrients (5-12-26)", defaultUnit: "g", dose: 3.6, toggleable: true },
      { name: "Epsom Salt", defaultUnit: "g", dose: 3.5 },
      { name: "Cal-Nit (15-0-0)", defaultUnit: "g", dose: 2.5 },
      { name: "Sour-Dee", defaultUnit: "mL", dose: 10 },
      { name: "Great White", defaultUnit: "tsp", dose: 0.1, note: "1 heaping tsp per 10 gal" },
      { name: "Ful-Power", defaultUnit: "mL", dose: 10 },
    ]
  },
  {
    week: "Flower Week 4", targetPPM: "900", pH: "5.9–6.1",
    nutrients: [
      { name: "Bulletproof SI", defaultUnit: "mL", dose: 2.5 },
      { name: "Base Nutrients (5-12-26)", defaultUnit: "g", dose: 3.6, toggleable: true },
      { name: "Epsom Salt", defaultUnit: "g", dose: 3.5 },
      { name: "Cal-Nit (15-0-0)", defaultUnit: "g", dose: 2.5 },
      { name: "Cutting Edge Bloom 0-6-5", defaultUnit: "mL", dose: 15 },
      { name: "Sour-Dee", defaultUnit: "mL", dose: 10 },
      { name: "Great White", defaultUnit: "tsp", dose: 0.1, note: "1 heaping tsp per 10 gal" },
      { name: "Ful-Power", defaultUnit: "mL", dose: 10 },
    ]
  },
  {
    week: "Flower Week 5", targetPPM: "900", pH: "5.9–6.1",
    nutrients: [
      { name: "Bulletproof SI", defaultUnit: "mL", dose: 2.5 },
      { name: "Base Nutrients (5-12-26)", defaultUnit: "g", dose: 3.6, toggleable: true },
      { name: "Epsom Salt", defaultUnit: "g", dose: 3.5 },
      { name: "Cal-Nit (15-0-0)", defaultUnit: "g", dose: 1.5 },
      { name: "Cutting Edge Bloom 0-6-5", defaultUnit: "mL", dose: 15 },
      { name: "Sour-Dee", defaultUnit: "mL", dose: 15 },
      { name: "Great White", defaultUnit: "tsp", dose: 0.1, note: "1 heaping tsp per 10 gal" },
      { name: "Ful-Power", defaultUnit: "mL", dose: 10 },
    ]
  },
  {
    week: "Flower Week 6", targetPPM: "1100–1250", pH: "5.9–6.1",
    nutrients: [
      { name: "Bulletproof SI", defaultUnit: "mL", dose: 2.5 },
      { name: "Base Nutrients (5-12-26)", defaultUnit: "g", dose: 2, toggleable: true },
      { name: "Epsom Salt", defaultUnit: "g", dose: 3.5 },
      { name: "Cal-Nit (15-0-0)", defaultUnit: "g", dose: 1 },
      { name: "Cutting Edge Bloom 0-6-5", defaultUnit: "mL", dose: 15 },
      { name: "Sour-Dee", defaultUnit: "mL", dose: 15 },
      { name: "Shooting Powder", defaultUnit: "g", dose: 2.6 },
      { name: "Great White", defaultUnit: "tsp", dose: 0.1, note: "1 heaping tsp per 10 gal" },
      { name: "Ful-Power", defaultUnit: "mL", dose: 20 },
    ]
  },
  {
    week: "Flower Week 7", targetPPM: "1100–1250", pH: "5.9–6.1",
    nutrients: [
      { name: "Base Nutrients (5-12-26)", defaultUnit: "g", dose: 2, toggleable: true },
      { name: "Epsom Salt", defaultUnit: "g", dose: 1 },
      { name: "Cutting Edge Bloom 0-6-5", defaultUnit: "mL", dose: 5 },
      { name: "Sour-Dee", defaultUnit: "mL", dose: 20 },
      { name: "Shooting Powder", defaultUnit: "g", dose: 2.6 },
      { name: "Great White", defaultUnit: "tsp", dose: 0.1, note: "1 heaping tsp per 10 gal" },
      { name: "Ful-Power", defaultUnit: "mL", dose: 20 },
    ]
  },
  {
    week: "Flower Week 8", targetPPM: "1100–1250", pH: "5.9–6.1",
    nutrients: [
      { name: "Base Nutrients (5-12-26)", defaultUnit: "g", dose: 2, toggleable: true },
      { name: "Epsom Salt", defaultUnit: "g", dose: 1 },
      { name: "Cutting Edge Bloom 0-6-5", defaultUnit: "mL", dose: 5 },
      { name: "Sour-Dee", defaultUnit: "mL", dose: 20, note: "20–30 mL/gal" },
      { name: "Shooting Powder", defaultUnit: "g", dose: 5.2 },
      { name: "Great White", defaultUnit: "tsp", dose: 0.1, note: "1 heaping tsp per 10 gal" },
      { name: "Ful-Power", defaultUnit: "mL", dose: 20 },
    ]
  },
  {
    week: "Flower Week 9", targetPPM: "1100–1250", pH: "5.9–6.1",
    nutrients: [
      { name: "Base Nutrients (5-12-26)", defaultUnit: "g", dose: 2, toggleable: true },
      { name: "Epsom Salt", defaultUnit: "g", dose: 1 },
      { name: "Cutting Edge Bloom 0-6-5", defaultUnit: "mL", dose: 5 },
      { name: "Sour-Dee", defaultUnit: "mL", dose: 20, note: "20–30 mL/gal" },
      { name: "Shooting Powder", defaultUnit: "g", dose: 5.2 },
      { name: "Ful-Power", defaultUnit: "mL", dose: 20 },
    ]
  },
  {
    week: "Flower Week 10", targetPPM: "0", pH: "6.1–6.3", flush: true,
    nutrients: [],
  },
];

const MIXING_ORDER = [
  { step: "1", label: "Bulletproof SI", note: "Add FIRST — SI naturally brings pH to the perfect range. No adjustment needed." },
  { step: "2", label: "Base Nutrients (5-12-26)", note: "Add 2nd — mix until fully dissolved" },
  { step: "3", label: "Epsom Salt", note: "Add 3rd — mix until dissolved, then PAUSE 5–10 min" },
  { step: "4", label: "Cal-Nit (15-0-0)", note: "Add last of dry ingredients — mix until dissolved" },
  { step: "5", label: "Ful-Power", note: "Flower only — add very last" },
  { step: "6", label: "Check PPM", note: "Check your PPM and compare to target. Your pH should be perfect." },
];

const AI_SYSTEM_PROMPT = `You are the Kush Coacher AI assistant, built into the Kush Coacher app by MushLuvv. You are an expert cannabis cultivation assistant with deep knowledge of Clinton's expert feeding recipe and growing methodology.

Here is Clinton's complete nutrient recipe:

VEG PHASE (pH 5.8-5.9):
- Week 1: Bulletproof SI 2mL/gal, Base Nutrients (5-12-26) 1.5g/gal, Epsom Salt 0.5g/gal, Cal-Nit 1g/gal, Great White 1 heaping tsp/10gal, SuperThrive 1.25mL/gal. Target PPM 500-750
- Week 2: Bulletproof SI 2mL/gal, Base Nutrients 3g/gal, Epsom Salt 1g/gal, Cal-Nit 2g/gal, Great White, SuperThrive 1.25mL/gal. Target PPM 900-1000
- Week 3: Bulletproof SI 2.5mL/gal, Base Nutrients 3g/gal, Epsom Salt 1g/gal, Cal-Nit 2g/gal, Great White, SuperThrive 1.25mL/gal. Target PPM 900-1000
- Week 4: Bulletproof SI 2.5mL/gal, Base Nutrients 3.6g/gal, Epsom Salt 1.1g/gal, Cal-Nit 2.4g/gal, Great White, SuperThrive 1.25mL/gal. Target PPM 900-1000

FLOWER PHASE (pH 5.9-6.1):
- Week 1: SI 2.5mL, Base Nutrients 2g, Epsom Salt 2.5g, Cal-Nit 2.5g, Cutting Edge Bloom 0-6-5 10mL, Sour-Dee 10mL, Great White, Ful-Power 10mL. PPM 750-900
- Week 2: Same as Week 1. PPM 750-900
- Week 3: SI 2.5mL, Base Nutrients 3.6g, Epsom Salt 3.5g, Cal-Nit 2.5g, Sour-Dee 10mL, Great White, Ful-Power 10mL. PPM 900
- Week 4: SI 2.5mL, Base Nutrients 3.6g, Epsom Salt 3.5g, Cal-Nit 2.5g, Cutting Edge Bloom 15mL, Sour-Dee 10mL, Great White, Ful-Power 10mL. PPM 900
- Week 5: SI 2.5mL, Base Nutrients 3.6g, Epsom Salt 3.5g, Cal-Nit 1.5g, Cutting Edge Bloom 15mL, Sour-Dee 15mL, Great White, Ful-Power 10mL. PPM 900
- Week 6: SI 2.5mL, Base Nutrients 2g, Epsom Salt 3.5g, Cal-Nit 1g, Cutting Edge Bloom 15mL, Sour-Dee 15mL, Shooting Powder 2.6g, Great White, Ful-Power 20mL. PPM 1100-1250
- Week 7: Base Nutrients 2g, Epsom Salt 1g, Cutting Edge Bloom 5mL, Sour-Dee 20mL, Shooting Powder 2.6g, Great White, Ful-Power 20mL. PPM 1100-1250
- Week 8: Base Nutrients 2g, Epsom Salt 1g, Cutting Edge Bloom 5mL, Sour-Dee 20-30mL, Shooting Powder 5.2g, Great White, Ful-Power 20mL. PPM 1100-1250
- Week 9: Same as Week 8 but no Great White. PPM 1100-1250
- Week 10: Optional flush/harvest

MIXING ORDER: SI first (raises pH naturally — no adjustment needed), Base Nutrients 2nd, Epsom Salt 3rd (pause 5-10 min), Cal-Nit last of dry ingredients, Ful-Power very last in flower.

TAP WATER starts at roughly 75 PPM — factor this into target PPM.

You answer questions about:
- Nutrient dosing and deficiencies
- pH and PPM troubleshooting  
- Plant health and what to look for each week
- Mixing instructions
- General cannabis cultivation advice

Keep answers concise, practical, and helpful. You are talking to real growers. Be direct and knowledgeable like a seasoned expert. Never give medical advice. Always refer to cannabis cultivation only.`;

export default function KushCoacher() {
  const [phase, setPhase] = useState<string>("veg");
  const [weekIndex, setWeekIndex] = useState<number>(0);
  const [gallons, setGallons] = useState<string>("");
  const [ph, setPh] = useState<string>("");
  const [ppm, setPpm] = useState<string>("");
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [saved, setSaved] = useState<boolean>(false);
  const [showMixing, setShowMixing] = useState<boolean>(false);
  const [showLog, setShowLog] = useState<boolean>(false);
  const [growNotes, setGrowNotes] = useState<Record<string, string>>({});
  const [activeNotesKey, setActiveNotesKey] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState<string>("");
  const [noteSaved, setNoteSaved] = useState<boolean>(false);
  const [unitOverrides, setUnitOverrides] = useState<Record<string, string>>({});
  const [myAmounts, setMyAmounts] = useState<Record<string, string>>({});
  const [showAI, setShowAI] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState<string>("");
  const [chatLoading, setChatLoading] = useState<boolean>(false);

  const schedule = phase === "veg" ? VEG_SCHEDULE : FLOWER_SCHEDULE;
  const currentWeek = schedule[weekIndex];
  const gal = parseFloat(gallons) || 0;
  const phaseColor = phase === "veg" ? "#4ade80" : "#fb923c";
  const phaseDark = phase === "veg" ? "#052e16" : "#1c0700";

  function getUnit(nutrient: Nutrient): string {
    const key = `${currentWeek.week}-${nutrient.name}`;
    return unitOverrides[key] || nutrient.defaultUnit;
  }

  function toggleUnit(nutrient: Nutrient): void {
    const key = `${currentWeek.week}-${nutrient.name}`;
    const current = getUnit(nutrient);
    setUnitOverrides((prev: Record<string, string>) => ({
      ...prev,
      [key]: current === "g" ? "mL" : "g",
    }));
  }

  function getMyAmount(nutrientName: string): string {
    return myAmounts[`${currentWeek.week}-${nutrientName}`] || "";
  }

  function setMyAmount(nutrientName: string, val: string): void {
    setMyAmounts((prev: Record<string, string>) => ({
      ...prev,
      [`${currentWeek.week}-${nutrientName}`]: val,
    }));
  }

  function calcDose(nutrient: Nutrient): string | null {
    if (!gal || !nutrient.dose) return null;
    if (nutrient.defaultUnit === "tsp") {
      const tsp = gal / 10;
      return tsp < 0.5 ? "< 1/2 tsp" : `${tsp.toFixed(1)} tsp`;
    }
    return (nutrient.dose * gal).toFixed(2);
  }

  function getDiff(
    recommended: string | null,
    myAmt: string
  ): { label: string; color: string } | null {
    if (!recommended || !myAmt || recommended.includes("tsp")) return null;
    const diff = parseFloat(myAmt) - parseFloat(recommended);
    if (isNaN(diff)) return null;
    if (Math.abs(diff) < 0.01) return { label: "✓ Match", color: "#4ade80" };
    if (diff > 0) return { label: `+${diff.toFixed(2)} over`, color: "#fb923c" };
    return { label: `${diff.toFixed(2)} under`, color: "#60a5fa" };
  }

  function openNotes(weekLabel: string): void {
    setActiveNotesKey(weekLabel);
    setNoteInput(growNotes[weekLabel] || "");
    setNoteSaved(false);
  }

  function saveNote(): void {
    if (!activeNotesKey) return;
    setGrowNotes((prev: Record<string, string>) => ({
      ...prev,
      [activeNotesKey as string]: noteInput,
    }));
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  }

  function handleLog(): void {
    if (!gallons) return;
    setLogEntries((prev: LogEntry[]) => [
      {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        phase,
        week: currentWeek.week,
        gallons,
        ph: ph || "—",
        ppm: ppm || "—",
      },
      ...prev,
    ]);
    setPh("");
    setPpm("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  async function sendMessage(): Promise<void> {
    if (!chatInput.trim() || chatLoading) return;
    const userMessage = chatInput.trim();
    setChatInput("");
    setChatMessages((prev: ChatMessage[]) => [...prev, { role: "user", content: userMessage }]);
    setChatLoading(true);
    try {
      const messages = [
        ...chatMessages,
        { role: "user" as const, content: userMessage },
      ];
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: AI_SYSTEM_PROMPT,
          messages: messages.map((m: ChatMessage) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();
      const reply = data.content
        .filter((block: { type: string; text?: string }) => block.type === "text")
        .map((block: { type: string; text?: string }) => block.text || "")
        .join("\n");
      setChatMessages((prev: ChatMessage[]) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setChatMessages((prev: ChatMessage[]) => [...prev, { role: "assistant", content: "Sorry, I had trouble connecting. Please try again." }]);
    } finally {
      setChatLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "11px 12px",
    borderRadius: 10,
    border: "1px solid #222",
    background: "#0a0a0a",
    color: "#e4ddd0",
    fontFamily: "Georgia, serif",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080808", fontFamily: "'Georgia', serif", color: "#e4ddd0" }}>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(160deg, #0f1a0f 0%, #1a0f1a 100%)", borderBottom: "1px solid #1f1f1f", padding: "28px 20px 18px", textAlign: "center" }}>
        <div style={{ fontSize: 10, letterSpacing: 7, color: "#555", marginBottom: 4, textTransform: "uppercase" }}>by MushLuvv</div>
        <div style={{ fontSize: 30, fontWeight: "bold", color: "#e4ddd0", letterSpacing: 1 }}>Kush Coacher 🌿</div>
        <div style={{ fontSize: 12, color: "#666", marginTop: 5 }}>Expert chart by Clinton</div>
      </div>

      <div style={{ maxWidth: 580, margin: "0 auto", padding: "20px 16px 100px" }}>

        {/* PHASE TOGGLE */}
        <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
          {[
            { id: "veg", label: "🌱 Veg", color: "#4ade80", dark: "#052e16" },
            { id: "flower", label: "🌸 Flower", color: "#fb923c", dark: "#1c0700" },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => { setPhase(p.id); setWeekIndex(0); }}
              style={{ flex: 1, padding: "13px 0", borderRadius: 12, border: `2px solid ${phase === p.id ? p.color : "#222"}`, background: phase === p.id ? p.dark : "#111", color: phase === p.id ? p.color : "#555", fontFamily: "Georgia, serif", fontSize: 15, fontWeight: "bold", cursor: "pointer", transition: "all 0.2s" }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* WEEK PILLS */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#555", marginBottom: 10, textTransform: "uppercase" }}>Select Week</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {schedule.map((w: WeekSchedule, i: number) => (
              <div key={i} style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <button
                  onClick={() => setWeekIndex(i)}
                  style={{ padding: "7px 14px", borderRadius: 20, border: `1px solid ${weekIndex === i ? phaseColor : "#222"}`, background: weekIndex === i ? phaseDark : "#111", color: weekIndex === i ? phaseColor : "#666", fontFamily: "Georgia, serif", fontSize: 12, cursor: "pointer" }}
                >
                  {w.flush ? `Wk ${i + 1} 💧` : `Wk ${i + 1}`}
                </button>
                <button
                  onClick={() => openNotes(w.week)}
                  style={{ padding: "5px 8px", borderRadius: 16, border: `1px solid ${growNotes[w.week] ? "#7c6f2a" : "#222"}`, background: growNotes[w.week] ? "#1a1700" : "#111", color: growNotes[w.week] ? "#e2c94a" : "#444", fontSize: 11, cursor: "pointer", fontFamily: "Georgia, serif" }}
                >
                  {growNotes[w.week] ? "📝" : "✏️"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* WEEK INFO CARD */}
        <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 14, padding: "16px 18px", marginBottom: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: "bold", color: phaseColor, marginBottom: 6 }}>{currentWeek.week}</div>
            <div style={{ fontSize: 12, color: "#666" }}>
              Target PPM: <span style={{ color: "#bbb" }}>{currentWeek.targetPPM}</span>&nbsp;·&nbsp;pH: <span style={{ color: "#bbb" }}>{currentWeek.pH}</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
            {currentWeek.flush && (
              <div style={{ background: "#111", border: "1px solid #333", borderRadius: 8, padding: "5px 12px", fontSize: 12, color: "#888" }}>OPTIONAL</div>
            )}
            <button
              onClick={() => openNotes(currentWeek.week)}
              style={{ padding: "7px 14px", borderRadius: 10, border: `1px solid ${growNotes[currentWeek.week] ? "#7c6f2a" : phaseColor}`, background: growNotes[currentWeek.week] ? "#1a1700" : phaseDark, color: growNotes[currentWeek.week] ? "#e2c94a" : phaseColor, fontFamily: "Georgia, serif", fontSize: 12, fontWeight: "bold", cursor: "pointer" }}
            >
              {growNotes[currentWeek.week] ? "📝 View Notes" : "📝 Grow Notes"}
            </button>
          </div>
        </div>

        {/* RESERVOIR */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 10, letterSpacing: 4, color: "#555", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Reservoir Size (Gallons)</label>
          <input
            type="number" min="0" step="0.5" placeholder="e.g. 10"
            value={gallons}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGallons(e.target.value)}
            style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "1px solid #222", background: "#111", color: "#e4ddd0", fontFamily: "Georgia, serif", fontSize: 17, outline: "none", boxSizing: "border-box" }}
          />
          <div style={{ fontSize: 11, color: "#444", marginTop: 6 }}>💧 Tap water starts at ~75 PPM — factor this into your target</div>
        </div>

        {/* NUTRIENT TABLE */}
        {!currentWeek.flush ? (
          <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 14, overflow: "hidden", marginBottom: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 88px 88px", padding: "10px 18px", borderBottom: "1px solid #1a1a1a", fontSize: 9, letterSpacing: 3, color: "#444", textTransform: "uppercase" }}>
              <div>Nutrient</div>
              <div style={{ textAlign: "center" }}>Recommended</div>
              <div style={{ textAlign: "center" }}>Your Amount</div>
            </div>

            {currentWeek.nutrients.filter((n: Nutrient) => !n.skip).map((n: Nutrient, i: number, arr: Nutrient[]) => {
              const unit = getUnit(n);
              const recommended = calcDose(n);
              const myAmt = getMyAmount(n.name);
              const diff = getDiff(recommended, myAmt);
              return (
                <div key={i} style={{ padding: "14px 18px", borderBottom: i < arr.length - 1 ? "1px solid #161616" : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <div style={{ fontSize: 14, color: "#ddd", flex: 1 }}>
                      {n.name}
                      {n.note && <span style={{ fontSize: 10, color: "#555", marginLeft: 6 }}>({n.note})</span>}
                    </div>
                    {n.toggleable ? (
                      <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", border: "1px solid #2a2a2a" }}>
                        {["g", "mL"].map((u: string) => (
                          <button
                            key={u}
                            onClick={() => toggleUnit(n)}
                            style={{ padding: "4px 10px", fontSize: 11, background: unit === u ? phaseColor : "#1a1a1a", color: unit === u ? "#000" : "#555", border: "none", cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: unit === u ? "bold" : "normal" }}
                          >
                            {u}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div style={{ fontSize: 11, color: "#444" }}>{n.defaultUnit}/gal</div>
                    )}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 88px 88px", gap: 8, alignItems: "start" }}>
                    <div style={{ fontSize: 11, color: "#444" }}>{n.dose} {unit}/gal</div>
                    <div style={{ textAlign: "center" }}>
                      {n.toggleable && unit !== n.defaultUnit ? (
                        <div style={{ fontSize: 11, color: "#888", fontStyle: "italic", lineHeight: 1.4 }}>Recommended dose</div>
                      ) : recommended ? (
                        <>
                          <div style={{ fontSize: 18, fontWeight: "bold", color: phaseColor }}>{recommended}</div>
                          <div style={{ fontSize: 10, color: "#555" }}>{n.defaultUnit === "tsp" ? "" : unit}</div>
                        </>
                      ) : (
                        <div style={{ fontSize: 12, color: "#333" }}>enter gal ↑</div>
                      )}
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <input
                        type="number" step="0.1" placeholder="—"
                        value={myAmt}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMyAmount(n.name, e.target.value)}
                        style={{ width: "100%", padding: "6px 4px", borderRadius: 8, textAlign: "center", border: "1px solid #222", background: "#0a0a0a", color: "#e4ddd0", fontFamily: "Georgia, serif", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                      />
                      {diff && <div style={{ fontSize: 10, color: diff.color, marginTop: 3 }}>{diff.label}</div>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ background: "#0a0f1a", border: "1px solid #1a2030", borderRadius: 14, padding: "28px 20px", marginBottom: 20, textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>👁️</div>
            <div style={{ fontSize: 16, color: "#8899aa", marginBottom: 8 }}>Optional — Keep Your Eye On It</div>
            <div style={{ fontSize: 13, color: "#556677", lineHeight: 1.6 }}>If your leaves are mostly dead and faded, go ahead and harvest. Trust what you see. 🌿</div>
          </div>
        )}

        {/* MIXING ORDER */}
        <button
          onClick={() => setShowMixing((v: boolean) => !v)}
          style={{ width: "100%", padding: "13px", borderRadius: 12, border: "1px solid #222", background: showMixing ? "#161616" : "#111", color: "#888", fontFamily: "Georgia, serif", fontSize: 13, cursor: "pointer", marginBottom: showMixing ? 0 : 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <span>📋 Mixing Order & Instructions</span>
          <span style={{ fontSize: 18 }}>{showMixing ? "▲" : "▼"}</span>
        </button>
        {showMixing && (
          <div style={{ background: "#0e0e0e", border: "1px solid #1e1e1e", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "4px 0 8px", marginBottom: 20 }}>
            {MIXING_ORDER.map((m: { step: string; label: string; note: string }, i: number) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "12px 18px", borderBottom: i < MIXING_ORDER.length - 1 ? "1px solid #161616" : "none" }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: phaseDark, border: `1px solid ${phaseColor}`, color: phaseColor, fontSize: 11, fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{m.step}</div>
                <div>
                  <div style={{ fontSize: 13, color: "#ccc", marginBottom: 2 }}>{m.label}</div>
                  <div style={{ fontSize: 11, color: "#555" }}>{m.note}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* pH & PPM LOG */}
        <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 14, padding: "16px 18px", marginBottom: 20 }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#555", textTransform: "uppercase", marginBottom: 14 }}>Log pH & PPM After Mixing</div>
          <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 5 }}>pH Reading</label>
              <input type="number" step="0.1" placeholder="e.g. 6.0" value={ph} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPh(e.target.value)} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 5 }}>PPM Reading</label>
              <input type="number" placeholder="e.g. 850" value={ppm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPpm(e.target.value)} style={inputStyle} />
            </div>
          </div>
          <button
            onClick={handleLog}
            style={{ width: "100%", padding: "13px", borderRadius: 10, background: saved ? "#1a3a1a" : phaseDark, color: saved ? "#4ade80" : phaseColor, fontFamily: "Georgia, serif", fontSize: 14, fontWeight: "bold", cursor: "pointer", transition: "all 0.3s", border: `1px solid ${saved ? "#4ade80" : phaseColor}` }}
          >
            {saved ? "✓ Saved to Log" : "Save to Log"}
          </button>
        </div>

        {/* LOG HISTORY */}
        {logEntries.length > 0 && (
          <>
            <button
              onClick={() => setShowLog((v: boolean) => !v)}
              style={{ width: "100%", padding: "13px", borderRadius: 12, border: "1px solid #222", background: "#111", color: "#888", fontFamily: "Georgia, serif", fontSize: 13, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <span>📓 Mix Log ({logEntries.length} {logEntries.length === 1 ? "entry" : "entries"})</span>
              <span style={{ fontSize: 18 }}>{showLog ? "▲" : "▼"}</span>
            </button>
            {showLog && (
              <div style={{ background: "#0e0e0e", border: "1px solid #1e1e1e", borderTop: "none", borderRadius: "0 0 12px 12px", overflow: "hidden" }}>
                {logEntries.map((e: LogEntry, i: number) => (
                  <div key={e.id} style={{ padding: "12px 18px", borderBottom: i < logEntries.length - 1 ? "1px solid #161616" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 13, color: "#ccc" }}>{e.week}</div>
                      <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{e.date} · {e.gallons} gal</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 12, color: "#888" }}>pH <span style={{ color: "#bbb" }}>{e.ph}</span></div>
                      <div style={{ fontSize: 12, color: "#888" }}>PPM <span style={{ color: "#bbb" }}>{e.ppm}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* AI ASSISTANT FLOATING BUTTON */}
      <button
        onClick={() => setShowAI(true)}
        style={{ position: "fixed", bottom: 24, right: 24, width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg, #4ade80, #22c55e)", border: "none", fontSize: 26, cursor: "pointer", boxShadow: "0 4px 20px rgba(74,222,128,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}
      >
        🌿
      </button>

      {/* AI ASSISTANT MODAL */}
      {showAI && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "#0e0e0e", border: "1px solid #2a2a2a", borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 580, height: "80vh", display: "flex", flexDirection: "column" }}>

            {/* AI Header */}
            <div style={{ padding: "18px 20px", borderBottom: "1px solid #1a1a1a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: 4, color: "#555", textTransform: "uppercase", marginBottom: 4 }}>Kush Coacher AI</div>
                <div style={{ fontSize: 16, fontWeight: "bold", color: "#4ade80" }}>🌿 Ask the Coach</div>
              </div>
              <button
                onClick={() => setShowAI(false)}
                style={{ background: "#222", border: "none", borderRadius: "50%", width: 34, height: 34, color: "#888", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >×</button>
            </div>

            {/* Chat Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
              {chatMessages.length === 0 && (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>🌿</div>
                  <div style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>Ask me anything about your grow — nutrients, pH, PPM, deficiencies, or what to look for this week.</div>
                  <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      "My pH keeps dropping, what do I do?",
                      "What should my plants look like in week 4 of flower?",
                      "My PPM is too high, how do I fix it?",
                    ].map((q: string, i: number) => (
                      <button
                        key={i}
                        onClick={() => setChatInput(q)}
                        style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #222", background: "#111", color: "#888", fontFamily: "Georgia, serif", fontSize: 12, cursor: "pointer", textAlign: "left" }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {chatMessages.map((msg: ChatMessage, i: number) => (
                <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{ maxWidth: "85%", padding: "12px 14px", borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: msg.role === "user" ? "#052e16" : "#141414", border: `1px solid ${msg.role === "user" ? "#4ade80" : "#2a2a2a"}`, color: msg.role === "user" ? "#4ade80" : "#ccc", fontSize: 13, lineHeight: 1.6 }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div style={{ padding: "12px 14px", borderRadius: "14px 14px 14px 4px", background: "#141414", border: "1px solid #2a2a2a", color: "#555", fontSize: 13 }}>
                    🌿 thinking...
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div style={{ padding: "12px 16px", borderTop: "1px solid #1a1a1a", display: "flex", gap: 10 }}>
              <input
                type="text"
                placeholder="Ask the coach..."
                value={chatInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChatInput(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === "Enter") sendMessage(); }}
                style={{ flex: 1, padding: "12px 14px", borderRadius: 12, border: "1px solid #222", background: "#111", color: "#e4ddd0", fontFamily: "Georgia, serif", fontSize: 14, outline: "none" }}
              />
              <button
                onClick={sendMessage}
                disabled={chatLoading || !chatInput.trim()}
                style={{ padding: "12px 16px", borderRadius: 12, border: "none", background: chatLoading || !chatInput.trim() ? "#1a1a1a" : "#052e16", color: chatLoading || !chatInput.trim() ? "#444" : "#4ade80", fontFamily: "Georgia, serif", fontSize: 14, fontWeight: "bold", cursor: chatLoading || !chatInput.trim() ? "default" : "pointer", border: `1px solid ${chatLoading || !chatInput.trim() ? "#222" : "#4ade80"}` }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GROW NOTES MODAL */}
      {activeNotesKey && (
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement>) => { if (e.target === e.currentTarget) setActiveNotesKey(null); }}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 100 }}
        >
          <div style={{ background: "#141414", border: "1px solid #2a2a2a", borderRadius: "20px 20px 0 0", padding: "24px 20px 40px", width: "100%", maxWidth: 580 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: 4, color: "#555", textTransform: "uppercase", marginBottom: 4 }}>Grow Notes</div>
                <div style={{ fontSize: 16, fontWeight: "bold", color: phaseColor }}>{activeNotesKey}</div>
              </div>
              <button
                onClick={() => setActiveNotesKey(null)}
                style={{ background: "#222", border: "none", borderRadius: "50%", width: 34, height: 34, color: "#888", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >×</button>
            </div>
            <textarea
              placeholder="How are the plants looking? Any issues, observations, or things to remember this week..."
              value={noteInput}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNoteInput(e.target.value)}
              rows={6}
              style={{ width: "100%", padding: "14px", borderRadius: 12, border: "1px solid #2a2a2a", background: "#0e0e0e", color: "#e4ddd0", fontFamily: "Georgia, serif", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box", lineHeight: 1.6 }}
            />
            <button
              onClick={saveNote}
              style={{ width: "100%", marginTop: 12, padding: "14px", borderRadius: 12, border: `1px solid ${noteSaved ? "#4ade80" : phaseColor}`, background: noteSaved ? "#052e16" : phaseDark, color: noteSaved ? "#4ade80" : phaseColor, fontFamily: "Georgia, serif", fontSize: 14, fontWeight: "bold", cursor: "pointer", transition: "all 0.3s" }}
            >
              {noteSaved ? "✓ Note Saved" : "Save Note"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
