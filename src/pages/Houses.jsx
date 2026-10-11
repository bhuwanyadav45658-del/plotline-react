import { useMemo, useState } from "react";
import { COLONIES, HOUSES } from "../data/data.js";
import HouseCard from "../components/HouseCard.jsx";

const DEFAULTS = { colony: "", type: "", beds: "0", sort: "" };
const TYPES = ["Villa", "Bungalow", "Duplex", "Row house"];

export default function Houses() {
  const [f, setF] = useState(DEFAULTS);
  const set = (key) => (e) => setF((v) => ({ ...v, [key]: e.target.value }));

  const list = useMemo(() => {
    const beds = Number(f.beds);
    const out = HOUSES.filter((h) =>
      (!f.colony || h.colony === f.colony) && (!f.type || h.type === f.type) && (!beds || h.beds >= beds));
    if (f.sort === "low") out.sort((a, b) => a.lakh - b.lakh);
    if (f.sort === "high") out.sort((a, b) => b.lakh - a.lakh);
    return out;
  }, [f]);

  return (
    <>
      <div className="wrap page-head">
        <h1>Houses</h1>
        <p>Finished homes and homes under construction, each inside one of our colonies.</p>
      </div>
      <div className="wrap">
        <form className="filters" onSubmit={(e) => e.preventDefault()}>
          <div className="field"><label htmlFor="f-colony">Colony</label>
            <select id="f-colony" value={f.colony} onChange={set("colony")}>
              <option value="">All colonies</option>
              {COLONIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select></div>
          <div className="field"><label htmlFor="f-type">Type</label>
            <select id="f-type" value={f.type} onChange={set("type")}>
              <option value="">Any type</option>
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select></div>
          <div className="field"><label htmlFor="f-beds">Bedrooms</label>
            <select id="f-beds" value={f.beds} onChange={set("beds")}>
              <option value="0">Any</option><option value="2">2 or more</option><option value="3">3 or more</option><option value="4">4 or more</option>
            </select></div>
          <div className="field"><label htmlFor="f-sort">Sort by</label>
            <select id="f-sort" value={f.sort} onChange={set("sort")}>
              <option value="">Featured</option><option value="low">Price, low to high</option><option value="high">Price, high to low</option>
            </select></div>
          <button type="button" className="btn btn--sm" onClick={() => setF(DEFAULTS)}>Clear filters</button>
        </form>

        <p className="result-count" aria-live="polite">{list.length} house{list.length === 1 ? "" : "s"} found</p>
        <div className="grid">
          {list.length
            ? list.map((h) => <HouseCard key={h.id} house={h} />)
            : <div className="empty"><strong>No houses match.</strong><br />Try fewer bedrooms or another colony.</div>}
        </div>
      </div>
    </>
  );
}
