import { plotsOf } from "../data/data.js";
import { ColonySVG } from "./Illustrations.jsx";

/* Card content only. The parent wraps it in a <button> or <Link className="colony-card">. */
export default function ColonyCardBody({ colony }) {
  const mine = plotsOf(colony.id);
  const free = mine.filter((p) => p.status === "available").length;
  const pct = Math.round(((mine.length - free) / mine.length) * 100);
  return (
    <>
      <div className="card-media"><ColonySVG colony={colony} /></div>
      <div className="card-body">
        <h3>{colony.name}</h3>
        <span className="muted">{colony.area}. {colony.possession}.</span>
        <div className="meter" aria-hidden="true"><span style={{ width: `${pct}%` }} /></div>
        <span className="muted" style={{ fontSize: ".88rem" }}>{free} of {mine.length} plots available</span>
      </div>
    </>
  );
}
