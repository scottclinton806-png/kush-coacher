"use client";

import { useState } from "react";

const VEG_SCHEDULE = [
  {
    week: "Veg Week 1", targetPPM: "500–750", pH: "5.8–5.9",
    nutrients: [
      { name: "SI", defaultUnit: "mL", dose: 2 },
      { name: "Base Nutrients (5-12-26)", defaultUnit: "g", dose: 1.5, toggleable: true },
      { name: "Epsom Salt", defaultUnit: "g", dose: 0.5 },
      { name: "Cal-Nit (15-0-0)", defaultUnit: "g", dose: 1 },
      { name: "Beneficial Microbes", defaultUnit: "mL", dose: 1, toggleable: true },
      { name: "SuperThrive", defaultUnit: "mL", dose: 1.25 },
    ]
  },
  {
    week: "Veg Week 2", targetPPM: "900–1000", pH: "5.8–5.9",
    nutrients: [
      { name: "SI", defaultUnit: "mL", dose: 2 },
      { name: "Base Nutrients (5-12-26)", defaultUnit: "g", dose: 3, toggleable: true },
      { name: "Epsom Salt", defaultUnit: "g", dose: 1 },
      { name: "Cal-Nit (15-0-0)", defaultUnit: "g", dose: 2 },
      { name: "Beneficial Microbes", defaultUnit: "mL", dose: 1, toggleable: true },
      { name: "SuperThrive", defaultUnit: "mL", dose: 1.25 },
    ]
  },
  {
    week: "Veg Week 3", targetPPM: "900–1000", pH: "5.8–5.9",
    nutrients: [
      { name: "SI", defaultUnit: "mL", dose: 2 },
      { name: "Base Nutrients (5-12-26)", defaultUnit: "g", dose: 3, toggleable: true },
      { name: "Epsom Salt", defaultUnit: "g", dose: 1 },
      { name: "Cal-Nit (15-0-0)", defaultUnit: "g", dose: 2 },
      { name: "Beneficial Microbes", defaultUnit: "mL", dose: 1, toggleable: true },
      { name: "SuperThrive", defaultUnit: "mL", dose: 1.25 },
    ]
  },
  {
    week: "Veg Week 4", targetPPM: "900–1000", pH: "5.8–5.9",
    nutrients: [
      { name: "SI", defaultUnit: "mL", dose: 2 },
      { name: "Base Nutrients (5-12-26)", defaultUnit: "g", dose: 3.6, toggleable: true },
      { name: "Epsom Salt", defaultUnit: "g", dose: 1.1 },
      { name: "Cal-Nit (15-0-0)", defaultUnit: "g", dose: 2.4 },
      { name: "Beneficial Microbes", defaultUnit: "mL", dose: 1, toggleable: true },
      { name: "SuperThrive", defaultUnit: "mL", dose: 1.25 },
    ]
  },
];

const FLOWER_SCHEDULE = [
  {
    week: "Flower Week 1", targetPPM: "750–900", pH: "5.9–6.1",
    nutrients: [
      { name: "SI", defaultUnit: "mL", dose: 2.5 },
      { name: "Base Nutrients (5-12-26)", defaultUnit: "g", dose: 2, toggleable: true },
      { name: "Epsom Salt", defaultUnit: "g", dose: 2 },
      { name: "Cal-Nit (15-0-0)", defaultUnit: "g", dose: 2.5 },
      { name: "MKP PK Booster", defaultUnit: "g", dose: 1.2, toggleable: true },
      { name: "Beneficial Microbes", defaultUnit: "mL", dose: 1.5, toggleable: true },
      { name: "Humic Acid", defaultUnit: "mL", dose: 10 },
    ]
  },
  {
    week: "Flower Week 2", targetPPM: "750–900", pH: "5.9–6.1",
    nutrients: [
      { name: "SI", defaultUnit: "mL", dose: 2.5 },
      { name: "Base Nutrients (5-12-26)", defaultUnit: "g", dose: 2, toggleable: true },
      { name: "Epsom Salt", defaultUnit: "g", dose: 2 },
      { name: "Cal-Nit (15-0-0)", defaultUnit: "g", dose: 2.5 },
      { name: "MKP PK Booster", defaultUnit: "g", dose: 1.2, toggleable: true },
      { name: "Beneficial Microbes", defaultUnit: "mL", dose: 1.5, toggleable: true },
      { name: "Humic Acid", defaultUnit: "mL", dose: 10 },
    ]
  },
  {
    week: "Flower Week 3", targetPPM: "900", pH: "5.9–6.1",
    nutrients: [
      { name: "SI", defaultUnit: "mL", dose: 2.5 },
      { name: "Base Nutrients (5-12-26)", defaultUnit: "g", dose: 3.6, toggleable: true },
      { name: "Epsom Salt", defaultUnit: "g", dose: 1.1 },
      { name: "Cal-Nit (15-0-0)", defaultUnit: "g", dose: 2.4 },
      { name: "MKP PK Booster", defaultUnit: "g", dose: 0, skip: true, toggleable: true },
      { name: "Beneficial Microbes", defaultUnit: "mL", dose: 1.5, toggleable: true },
      { name: "Humic Acid", defaultUnit: "mL", dose: 10 },
    ]
  },
  {
    week: "Flower Week 4", targetPPM: "900", pH: "5.9–6.1",
    nutrients: [
      { name: "SI", defaultUnit: "mL", dose: 2.5 },
      { name: "Base Nutrients (5-12-26)", defaultUnit: "g", dose: 3.6, toggleable: true },
      { name: "Epsom Salt", defaultUnit: "g", dose: 1.1 },
      { name: "Cal-Nit (15-0-0)", defaultUnit: "g", dose: 2.4 },
      { name: "MKP PK Booster", defaultUnit: "g", dose: 0, skip: true, toggleable: true },
      { name: "Beneficial Microbes", defaultUnit: "mL", dose: 1.5, toggleable: true },
      { name: "Humic Acid", defaultUnit: "mL", dose: 10 },
    ]
  },
  {
    week: "Flower Week 5", targetPPM: "900", pH: "5.9–6.1",
    nutrients: [
      { name: "SI", defaultUnit: "mL", dose: 2.5 },
      { name: "Base Nutrients (5-12-26)", defaultUnit: "g", dose: 3.6, toggleable: true },
      { name: "Epsom Salt", defaultUnit: "g", dose: 1.1 },
      { name: "Cal-Nit (15-0-0)", defaultUnit: "g", dose: 2.4 },
      { name: "MKP PK Booster", defaultUnit: "g", dose: 0, skip: true, toggleable: true },
      { name: "Beneficial Microbes", defaultUnit: "mL", dose: 1.5, toggleable: true },
      { name: "Humic Acid", defaultUnit: "mL", dose: 10 },
    ]
  },
  {
    week: "Flower Week 6", targetPPM: "1100–1250", pH: "5.9–6.1",
    nutrients: [
      { name: "SI", defaultUnit: "mL", dose: 0, skip: true },
      { name: "Base Nutrients (5-12-26)", defaultUnit: "g", dose: 2, toggleable: true },
      { name: "Epsom Salt", defaultUnit: "g", dose: 2 },
      { name: "Cal-Nit (15-0-0)", defaultUnit: "g", dose: 2.5 },
      { name: "MKP PK Booster", defaultUnit: "g", dose: 1.2, toggleable: true },
      { name: "Beneficial Microbes", defaultUnit: "mL", dose: 1.5, toggleable: true },
      { name: "Humic Acid", defaultUnit: "mL", dose: 20 },
    ]
  },
  {
    week: "Flower Week 7", targetPPM: "1100–1250", pH: "5.9–6.1",
    nutrients: [
      { name: "SI", defaultUnit: "mL", dose: 0, skip: true },
      { name: "Base Nutrients (5-12-26)", defaultUnit: "g", dose: 2, toggleable: true },
      { name: "Epsom Salt", defaultUnit: "g", dose: 2 },
      { name: "Cal-Nit (15-0-0)", defaultUnit: "g", dose: 2.5 },
      { name: "MKP PK Booster", defaultUnit: "g", dose: 1.2, toggleable: true },
      { name: "Beneficial Microbes", defaultUnit: "mL", dose: 1.5, toggleable: true },
      { name: "Humic Acid", defaultUnit: "mL", dose: 20 },
    ]
  },
  {
    week: "Flower Week 8", targetPPM: "1100–1250", pH: "5.9–6.1",
    nutrients: [
      { name: "SI", defaultUnit: "mL", dose: 0, skip: true },
      { name: "Base Nutrients (5-12-26)", defaultUnit: "g", dose: 2, toggleable: true },
      { name: "Epsom Salt", defaultUnit: "g", dose: 2 },
      { name: "Cal-Nit (15-0-0)", defaultUnit: "g", dose: 2.5 },
      { name: "MKP PK Booster", defaultUnit: "g", dose: 1.2, toggleable: true },
      { name: "Beneficial Microbes", defaultUnit: "mL", dose: 1.5, toggleable: true },
      { name: "Humic Acid", defaultUnit: "mL", dose: 20 },
    ]
  },
  { week: "Flower Week 9", targetPPM: "0", pH: "6.1–6.3", flush: true, nutrients: [] },
  { week: "Flower Week 10", targetPPM: "0", pH: "6.1–6.3", flush: true, nutrients: [] },
];

const MIXING_ORDER = [
  { step: "1", label: "SI", note: "Add FIRST — pH water to 7.5–8.0 before adding anything else" },
  { step: "2", label: "Base Nutrients", note: "Add 2nd — mix until fully dissolved" },
  { step: "3", label: "Epsom Salt", note: "Add 3rd — mix until dissolved, then PAUSE 5–10 min" },
  { step: "4", label: "Cal-Nit (15-0-0)", note: "Add last — mix until dissolved" },
  { step: "5", label: "Humic Acid", note: "Flower only — add very last" },
  { step: "6", label: "Check pH & EC/PPM", note: "Final pH should read 6.1–6.3. Add RO water if needed." },
];

export default function KushCoacher() {
  const [phase, setPhase] = useState("veg");
  const [weekIndex, setWeekIndex] = useState(0);
  const [gallons, setGallons] = useState("");
  const [ph, setPh] = useState("");
  const [ppm, setPpm] = useState("");
  const [logEntries, setLogEntries] = useState([]);
  const [saved, setSaved] = useState(false);
  const [showMixing, setShowMixing] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [growNotes, setGrowNotes] = useState({});
  const [activeNotesKey, setActiveNotesKey] = useState(null);
  const [noteInput, setNoteInput] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);
  const [unitOverrides, setUnitOverrides] = useState<Record<string, string>>({});
  const [myAmounts, setMyAmounts] = useState<Recrd<srting, string>>({});

  const schedule = phase === "veg" ? VEG_SCHEDULE : FLOWER_SCHEDULE;
  const currentWeek = schedule[weekIndex];
  const gal = parseFloat(gallons) || 0;
  const phaseColor = phase === "veg" ? "#4ade80" : "#fb923c";
  const phaseDark = phase === "veg" ? "#052e16" : "#1c0700";

  function getUnit(nutrient: any) {
    const key = `${currentWeek.week}-${nutrient.name}`;
    return unitOverrides[key] || nutrient.defaultUnit;
  }

  function toggleUnit(nutrient: any) {
    const key = `${currentWeek.week}-${nutrient.name}`;
    const current = getUnit(nutrient);
    setUnitOverrides(prev => ({ ...prev, [key]: current === "g" ? "mL" : "g" }));
  }

  function getMyAmount(nutrientName: string) {
    return myAmounts[`${currentWeek.week}-${nutrientName}`] || "";
  }

  function setMyAmount(nutrientName, val) {
    setMyAmounts(prev => ({ ...prev, [`${currentWeek.week}-${nutrientName}`]: val }));
  }

  function calcDose(dose) {
    if (!gal || !dose) return null;
    return (dose * gal).toFixed(2);
  }

  function getDiff(recommended: string, myAmt: string) {
    if (!recommended || !myAmt) return null;
    const diff = parseFloat(myAmt) - parseFloat(recommended);
    if (isNaN(diff)) return null;
    if (Math.abs(diff) < 0.01) return { label: "✓ Match", color: "#4ade80" };
    if (diff > 0) return { label: `+${diff.toFixed(2)} over`, color: "#fb923c" };
    return { label: `${diff.toFixed(2)} under`, color: "#60a5fa" };
  }

  function openNotes(weekLabel) {
    setActiveNotesKey(weekLabel);
    setNoteInput(growNotes[weekLabel] || "");
    setNoteSaved(false);
  }

  function saveNote() {
    if (!activeNotesKey) return;
    setGrowNotes(prev => ({ ...prev, [activeNotesKey]: noteInput }));
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  }

  function handleLog() {
    if (!gallons) return;
    setLogEntries(prev => [{
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      phase, week: currentWeek.week, gallons,
      ph: ph || "—", ppm: ppm || "—",
    }, ...prev]);
    setPh(""); setPpm("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const inputStyle = {
    width: "100%", padding: "11px 12px", borderRadius: 10,
    border: "1px solid #222", background: "#0a0a0a",
    color: "#e4ddd0", fontFamily: "Georgia, serif", fontSize: 15,
    outline: "none", boxSizing: "border-box",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080808", fontFamily: "'Georgia', serif", color: "#e4ddd0" }}>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(160deg, #0f1a0f 0%, #1a0f1a 100%)", borderBottom: "1px solid #1f1f1f", padding: "28px 20px 18px", textAlign: "center" }}>
        <div style={{ fontSize: 10, letterSpacing: 7, color: "#555", marginBottom: 4, textTransform: "uppercase" }}>by MushLuvv</div>
        <div style={{ fontSize: 30, fontWeight: "bold", color: "#e4ddd0", letterSpacing: 1 }}>Kush Coacher 🌿</div>
        <div style={{ fontSize: 12, color: "#666", marginTop: 5 }}>Expert chart by Clinton</div>
      </div>

      <div style={{ maxWidth: 580, margin: "0 auto", padding: "20px 16px 60px" }}>

        {/* PHASE TOGGLE */}
        <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
          {[{ id: "veg", label: "🌱 Veg", color: "#4ade80", dark: "#052e16" }, { id: "flower", label: "🌸 Flower", color: "#fb923c", dark: "#1c0700" }].map(p => (
            <button key={p.id} onClick={() => { setPhase(p.id); setWeekIndex(0); }}
              style={{ flex: 1, padding: "13px 0", borderRadius: 12, border: `2px solid ${phase === p.id ? p.color : "#222"}`, background: phase === p.id ? p.dark : "#111", color: phase === p.id ? p.color : "#555", fontFamily: "Georgia, serif", fontSize: 15, fontWeight: "bold", cursor: "pointer", transition: "all 0.2s" }}>
              {p.label}
            </button>
          ))}
        </div>

        {/* WEEK PILLS */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#555", marginBottom: 10, textTransform: "uppercase" }}>Select Week</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {schedule.map((w, i) => (
              <div key={i} style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <button onClick={() => setWeekIndex(i)}
                  style={{ padding: "7px 14px", borderRadius: 20, border: `1px solid ${weekIndex === i ? phaseColor : "#222"}`, background: weekIndex === i ? phaseDark : "#111", color: weekIndex === i ? phaseColor : "#666", fontFamily: "Georgia, serif", fontSize: 12, cursor: "pointer" }}>
                  {w.flush ? `Wk ${i - 7} 💧` : `Wk ${i + 1}`}
                </button>
                <button onClick={() => openNotes(w.week)}
                  style={{ padding: "5px 8px", borderRadius: 16, border: `1px solid ${growNotes[w.week] ? "#7c6f2a" : "#222"}`, background: growNotes[w.week] ? "#1a1700" : "#111", color: growNotes[w.week] ? "#e2c94a" : "#444", fontSize: 11, cursor: "pointer", fontFamily: "Georgia, serif" }}>
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
            {currentWeek.flush && <div style={{ background: "#111", border: "1px solid #333", borderRadius: 8, padding: "5px 12px", fontSize: 12, color: "#888" }}>FLUSH</div>}
            <button onClick={() => openNotes(currentWeek.week)}
              style={{ padding: "7px 14px", borderRadius: 10, border: `1px solid ${growNotes[currentWeek.week] ? "#7c6f2a" : phaseColor}`, background: growNotes[currentWeek.week] ? "#1a1700" : phaseDark, color: growNotes[currentWeek.week] ? "#e2c94a" : phaseColor, fontFamily: "Georgia, serif", fontSize: 12, fontWeight: "bold", cursor: "pointer" }}>
              {growNotes[currentWeek.week] ? "📝 View Notes" : "📝 Grow Notes"}
            </button>
          </div>
        </div>

        {/* RESERVOIR */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 10, letterSpacing: 4, color: "#555", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Reservoir Size (Gallons)</label>
          <input type="number" min="0" step="0.5" placeholder="e.g. 10" value={gallons} onChange={e => setGallons(e.target.value)}
            style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "1px solid #222", background: "#111", color: "#e4ddd0", fontFamily: "Georgia, serif", fontSize: 17, outline: "none", boxSizing: "border-box" }} />
        </div>

        {/* NUTRIENT TABLE */}
        {!currentWeek.flush ? (
          <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 14, overflow: "hidden", marginBottom: 20 }}>
            {/* Header row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 88px 88px", padding: "10px 18px", borderBottom: "1px solid #1a1a1a", fontSize: 9, letterSpacing: 3, color: "#444", textTransform: "uppercase" }}>
              <div>Nutrient</div>
              <div style={{ textAlign: "center" }}>Recommended</div>
              <div style={{ textAlign: "center" }}>Your Amount</div>
            </div>

            {currentWeek.nutrients.filter(n => !n.skip).map((n, i, arr) => {
              const unit = getUnit(n);
              const recommended = calcDose(n.dose);
              const myAmt = getMyAmount(n.name);
              const diff = getDiff(recommended, myAmt);
              return (
                <div key={i} style={{ padding: "14px 18px", borderBottom: i < arr.length - 1 ? "1px solid #161616" : "none" }}>
                  {/* Name + toggle */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <div style={{ fontSize: 14, color: "#ddd", flex: 1 }}>{n.name}</div>
                    {n.toggleable ? (
                      <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", border: "1px solid #2a2a2a" }}>
                        {["g", "mL"].map(u => (
                          <button key={u} onClick={() => toggleUnit(n)}
                            style={{ padding: "4px 10px", fontSize: 11, background: unit === u ? phaseColor : "#1a1a1a", color: unit === u ? "#000" : "#555", border: "none", cursor: "pointer", fontFamily: "Georgia, serif", fontWeight: unit === u ? "bold" : "normal" }}>
                            {u}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div style={{ fontSize: 11, color: "#444" }}>{unit}/gal</div>
                    )}
                  </div>
                  {/* Amounts grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 88px 88px", gap: 8, alignItems: "start" }}>
                    <div style={{ fontSize: 11, color: "#444" }}>{n.dose} {unit}/gal</div>
                    {/* Recommended */}
                    <div style={{ textAlign: "center" }}>
                      {n.toggleable && unit !== n.defaultUnit ? (
                        <div style={{ fontSize: 11, color: "#888", fontStyle: "italic", lineHeight: 1.4 }}>Recommended dose</div>
                      ) : recommended ? (
                        <><div style={{ fontSize: 18, fontWeight: "bold", color: phaseColor }}>{recommended}</div><div style={{ fontSize: 10, color: "#555" }}>{unit}</div></>
                      ) : (
                        <div style={{ fontSize: 12, color: "#333" }}>enter gal ↑</div>
                      )}
                    </div>
                    {/* Your amount */}
                    <div style={{ textAlign: "center" }}>
                      <input type="number" step="0.1" placeholder="—" value={myAmt} onChange={e => setMyAmount(n.name, e.target.value)}
                        style={{ width: "100%", padding: "6px 4px", borderRadius: 8, textAlign: "center", border: `1px solid ${diff ? "#2a2a2a" : "#222"}`, background: "#0a0a0a", color: "#e4ddd0", fontFamily: "Georgia, serif", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                      {diff && <div style={{ fontSize: 10, color: diff.color, marginTop: 3 }}>{diff.label}</div>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ background: "#0a0f1a", border: "1px solid #1a2030", borderRadius: 14, padding: "28px 20px", marginBottom: 20, textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>💧</div>
            <div style={{ fontSize: 16, color: "#8899aa" }}>Flush week — plain RO water only</div>
            <div style={{ fontSize: 12, color: "#445566", marginTop: 6 }}>Target pH: {currentWeek.pH}</div>
          </div>
        )}

        {/* MIXING ORDER */}
        <button onClick={() => setShowMixing(v => !v)}
          style={{ width: "100%", padding: "13px", borderRadius: 12, border: "1px solid #222", background: showMixing ? "#161616" : "#111", color: "#888", fontFamily: "Georgia, serif", fontSize: 13, cursor: "pointer", marginBottom: showMixing ? 0 : 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>📋 Mixing Order & Instructions</span>
          <span style={{ fontSize: 18 }}>{showMixing ? "▲" : "▼"}</span>
        </button>
        {showMixing && (
          <div style={{ background: "#0e0e0e", border: "1px solid #1e1e1e", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "4px 0 8px", marginBottom: 20 }}>
            {MIXING_ORDER.map((m, i) => (
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
              <input type="number" step="0.1" placeholder="e.g. 6.0" value={ph} onChange={e => setPh(e.target.value)} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 5 }}>PPM Reading</label>
              <input type="number" placeholder="e.g. 850" value={ppm} onChange={e => setPpm(e.target.value)} style={inputStyle} />
            </div>
          </div>
          <button onClick={handleLog}
            style={{ width: "100%", padding: "13px", borderRadius: 10, background: saved ? "#1a3a1a" : phaseDark, color: saved ? "#4ade80" : phaseColor, fontFamily: "Georgia, serif", fontSize: 14, fontWeight: "bold", cursor: "pointer", transition: "all 0.3s", border: `1px solid ${saved ? "#4ade80" : phaseColor}` }}>
            {saved ? "✓ Saved to Log" : "Save to Log"}
          </button>
        </div>

        {/* LOG HISTORY */}
        {logEntries.length > 0 && (
          <>
            <button onClick={() => setShowLog(v => !v)}
              style={{ width: "100%", padding: "13px", borderRadius: 12, border: "1px solid #222", background: "#111", color: "#888", fontFamily: "Georgia, serif", fontSize: 13, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>📓 Mix Log ({logEntries.length} {logEntries.length === 1 ? "entry" : "entries"})</span>
              <span style={{ fontSize: 18 }}>{showLog ? "▲" : "▼"}</span>
            </button>
            {showLog && (
              <div style={{ background: "#0e0e0e", border: "1px solid #1e1e1e", borderTop: "none", borderRadius: "0 0 12px 12px", overflow: "hidden" }}>
                {logEntries.map((e, i) => (
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

      {/* GROW NOTES MODAL */}
      {activeNotesKey && (
        <div onClick={e => { if (e.target === e.currentTarget) setActiveNotesKey(null); }}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "#141414", border: "1px solid #2a2a2a", borderRadius: "20px 20px 0 0", padding: "24px 20px 40px", width: "100%", maxWidth: 580 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: 4, color: "#555", textTransform: "uppercase", marginBottom: 4 }}>Grow Notes</div>
                <div style={{ fontSize: 16, fontWeight: "bold", color: phaseColor }}>{activeNotesKey}</div>
              </div>
              <button onClick={() => setActiveNotesKey(null)}
                style={{ background: "#222", border: "none", borderRadius: "50%", width: 34, height: 34, color: "#888", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
            </div>
            <textarea placeholder="How are the plants looking? Any issues, observations, or things to remember this week..."
              value={noteInput} onChange={e => setNoteInput(e.target.value)} rows={6}
              style={{ width: "100%", padding: "14px", borderRadius: 12, border: "1px solid #2a2a2a", background: "#0e0e0e", color: "#e4ddd0", fontFamily: "Georgia, serif", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box", lineHeight: 1.6 }} />
            <button onClick={saveNote}
              style={{ width: "100%", marginTop: 12, padding: "14px", borderRadius: 12, border: `1px solid ${noteSaved ? "#4ade80" : phaseColor}`, background: noteSaved ? "#052e16" : phaseDark, color: noteSaved ? "#4ade80" : phaseColor, fontFamily: "Georgia, serif", fontSize: 14, fontWeight: "bold", cursor: "pointer", transition: "all 0.3s" }}>
              {noteSaved ? "✓ Note Saved" : "Save Note"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
