import { useMemo, useState } from "react";
import { COLONIES, PLOTS, PLOT_SIZES, FACINGS } from "../data/data.js";
import PlotCard from "../components/PlotCard.jsx";

const PAGE_SIZE = 9;
const DEFAULTS = { colony: "", size: "", facing: "", budget: "0", status: "available", sort: "" };

export default function Plots() {
  const [f, setF] = useState(DEFAULTS);
  const [shown, setShown] = useState(PAGE_SIZE);

  const set = (key) => (e) => { setF((v) => ({ ...v, [key]: e.target.value })); setShown(PAGE_SIZE); };

  const list = useMemo(() => {
    const budget = Number(f.budget);
    const out = PLOTS.filter((p) =>
      (!f.colony || p.colony === f.colony) &&
      (!f.size || p.size === Number(f.size)) &&
      (!f.facing || p.facing === f.facing) &&
      (!f.status || p.status === f.status) &&
      (!budget || p.lakh <= budget));
    if (f.sort === "low") out.sort((a, b) => a.lakh - b.lakh);
    if (f.sort === "high") out.sort((a, b) => b.lakh - a.lakh);
    if (f.sort === "size") out.sort((a, b) => b.size - a.size);
    return out;
  }, [f]);

  return (
    <>
      <div className="wrap page-head">
        <h1>Plots for sale</h1>
        <p>Every plot is shown with its size, facing and price. Narrow the list, then book a visit.</p>
      </div>
      <div className="wrap">
        <form className="filters" onSubmit={(e) => e.preventDefault()}>
          <div className="field"><label htmlFor="f-colony">Colony</label>
            <select id="f-colony" value={f.colony} onChange={set("colony")}>
              <option value="">All colonies</option>
              {COLONIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select></div>
          <div className="field"><label htmlFor="f-size">Plot size (sq ft)</label>
            <select id="f-size" value={f.size} onChange={set("size")}>
              <option value="">Any size</option>
              {PLOT_SIZES.map((s) => <option key={s}>{s}</option>)}
            </select></div>
          <div className="field"><label htmlFor="f-facing">Facing</label>
            <select id="f-facing" value={f.facing} onChange={set("facing")}>
              <option value="">Any facing</option>
              {FACINGS.map((s) => <option key={s}>{s}</option>)}
            </select></div>
          <div className="field"><label htmlFor="f-budget">Budget</label>
            <select id="f-budget" value={f.budget} onChange={set("budget")}>
              <option value="0">Any budget</option><option value="40">Up to ₹40 L</option><option value="60">Up to ₹60 L</option>
              <option value="80">Up to ₹80 L</option><option value="100">Up to ₹1 Cr</option>
            </select></div>
          <div className="field"><label htmlFor="f-status">Status</label>
            <select id="f-status" value={f.status} onChange={set("status")}>
              <option value="available">Available</option><option value="booked">Booked</option>
              <option value="sold">Sold</option><option value="">Any status</option>
            </select></div>
          <div className="field"><label htmlFor="f-sort">Sort by</label>
            <select id="f-sort" value={f.sort} onChange={set("sort")}>
              <option value="">Plot number</option><option value="low">Price, low to high</option>
              <option value="high">Price, high to low</option><option value="size">Largest first</option>
            </select></div>
          <button type="button" className="btn btn--sm" onClick={() => { setF(DEFAULTS); setShown(PAGE_SIZE); }}>Clear filters</button>
        </form>

        <p className="result-count" aria-live="polite">{list.length} plot{list.length === 1 ? "" : "s"} match your filters</p>
        <div className="grid">
          {list.length
            ? list.slice(0, shown).map((p) => <PlotCard key={`${p.colony}-${p.id}`} plot={p} />)
            : <div className="empty"><strong>No plots match.</strong><br />Try a higher budget or set status to "Any status".</div>}
        </div>
        {shown < list.length && (
          <div className="more"><button className="btn" onClick={() => setShown((n) => n + PAGE_SIZE)}>Show more plots</button></div>
        )}
      </div>
    </>
  );
}
