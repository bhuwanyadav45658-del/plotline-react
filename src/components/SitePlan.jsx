import { Fragment, useState } from "react";
import { plotsOf } from "../data/data.js";
import { money, num, cap, statusChip } from "../utils/format.js";
import { useEnquiry } from "../context/EnquiryContext.jsx";

export default function SitePlan({ colony, animate = false }) {
  const { openEnquiry } = useEnquiry();
  const plots = plotsOf(colony.id);
  const [selectedId, setSelectedId] = useState(() => plots.find((p) => p.status === "available")?.id);
  const selected = plots.find((p) => p.id === selectedId);

  const template = [];
  for (let k = 0; k < colony.cols; k++) {
    if (k > 0 && k % 4 === 0) template.push("14px");
    template.push("1fr");
  }

  return (
    <>
      <div className="plan-grid" style={{ gridTemplateColumns: template.join(" ") }}>
        {plots.map((p, i) => (
          <Fragment key={p.id}>
            {p.col > 0 && p.col % 4 === 0 && <div className="road" aria-hidden="true" />}
            <button
              className={`lot lot--${p.status}${p.id === selectedId ? " is-selected" : ""}`}
              style={animate ? { "--i": i } : { animation: "none" }}
              aria-label={`Plot ${p.id}, ${num(p.size)} square feet, ${p.status}`}
              aria-pressed={p.id === selectedId}
              onClick={() => setSelectedId(p.id)}
            >
              {p.id}
            </button>
          </Fragment>
        ))}
      </div>

      <div className="legend">
        <span><i className="l-av" />Available</span>
        <span><i className="l-bk" />Booked</span>
        <span><i className="l-sd" />Sold</span>
      </div>

      <div className="plot-info" aria-live="polite">
        {selected ? (
          <>
            <div>
              <h4>Plot {selected.id} <span className={statusChip(selected.status)}>{cap(selected.status)}</span></h4>
              <p>
                {num(selected.size)} sq ft, {selected.facing} facing{selected.corner ? ", corner plot" : ""}.{" "}
                <strong>{money(selected.lakh)}</strong>
              </p>
            </div>
            <button className="btn btn--sm btn--solid" disabled={selected.status === "sold"}
              onClick={() => openEnquiry(`Plot ${selected.id}, ${colony.name}`, `${num(selected.size)} sq ft, ${selected.facing} facing, ${money(selected.lakh)}`)}>
              {selected.status === "sold" ? "Sold out" : "Enquire"}
            </button>
          </>
        ) : (
          <p>Select a plot on the map to see its details.</p>
        )}
      </div>
    </>
  );
}
