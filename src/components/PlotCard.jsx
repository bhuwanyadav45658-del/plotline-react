import { Link } from "react-router-dom";
import { colonyById } from "../data/data.js";
import { money, num, cap, statusChip } from "../utils/format.js";
import { useEnquiry } from "../context/EnquiryContext.jsx";
import { PlotSVG } from "./Illustrations.jsx";

export default function PlotCard({ plot }) {
  const { openEnquiry } = useEnquiry();
  const colony = colonyById(plot.colony);
  const sold = plot.status === "sold";
  return (
    <article className="card">
      <div className="card-media"><PlotSVG plot={plot} /></div>
      <div className="card-body">
        <div className="card-top"><h3>Plot {plot.id}</h3><span className="price">{money(plot.lakh)}</span></div>
        <div>
          <span className={statusChip(plot.status)}>{cap(plot.status)}</span>{" "}
          {plot.corner && <span className="chip chip--dark">Corner plot</span>}
        </div>
        <ul className="specs"><li>{num(plot.size)} sq ft</li><li>{plot.facing} facing</li><li>₹{num(colony.rate)}/sq ft</li></ul>
        <p className="muted" style={{ margin: 0, fontSize: ".92rem" }}>{colony.name}, {colony.area}</p>
        <div className="card-actions">
          <button className="btn btn--sm btn--solid" disabled={sold}
            onClick={() => openEnquiry(`Plot ${plot.id}, ${colony.name}`, `${num(plot.size)} sq ft, ${plot.facing} facing, ${money(plot.lakh)}`)}>
            {sold ? "Sold out" : "Enquire"}
          </button>
          <Link className="btn btn--sm" to={`/colonies/${colony.id}`}>See on site plan</Link>
        </div>
      </div>
    </article>
  );
}
