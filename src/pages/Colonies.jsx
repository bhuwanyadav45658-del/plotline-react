import { Link, useNavigate, useParams } from "react-router-dom";
import { COLONIES, HOUSES, colonyById, plotsOf } from "../data/data.js";
import { num } from "../utils/format.js";
import SitePlan from "../components/SitePlan.jsx";
import ColonyCardBody from "../components/ColonyCard.jsx";

export default function Colonies() {
  const { id } = useParams();
  const navigate = useNavigate();
  const colony = colonyById(id) || COLONIES[0];
  const mine = plotsOf(colony.id);
  const count = (s) => mine.filter((p) => p.status === s).length;
  const houses = HOUSES.filter((h) => h.colony === colony.id);

  return (
    <>
      <div className="wrap page-head">
        <h1>Colonies</h1>
        <p>Choose a colony to open its site plan. Tap any plot to see its size and price.</p>
      </div>
      <div className="wrap">
        <div className="colony-list">
          {COLONIES.map((c) => (
            <button key={c.id} className={`colony-card${c.id === colony.id ? " is-active" : ""}`}
              aria-pressed={c.id === colony.id} onClick={() => navigate(`/colonies/${c.id}`, { replace: true })}>
              <ColonyCardBody colony={c} />
            </button>
          ))}
        </div>

        {/* key forces the plan to reset its selected plot when the colony changes */}
        <div className="colony-detail" key={colony.id}>
          <div className="plan">
            <div className="plan-title">
              <h3>{colony.name} site plan</h3>
              <small>Select a plot to see its size and price</small>
            </div>
            <SitePlan colony={colony} />
          </div>

          <div>
            <h2>{colony.name}</h2>
            <p className="muted">{colony.area}. {colony.possession}.</p>
            <p>{colony.blurb}</p>
            <div className="stat-row">
              <div className="stat"><strong>{count("available")}</strong><span>Available</span></div>
              <div className="stat"><strong>{count("booked")}</strong><span>Booked</span></div>
              <div className="stat"><strong>{count("sold")}</strong><span>Sold</span></div>
            </div>
            <p style={{ marginBottom: ".2rem" }}><strong>Starting at ₹{num(colony.rate)} per sq ft</strong></p>
            <ul className="amenities">{colony.amenities.map((a) => <li key={a}>{a}</li>)}</ul>
            <div className="hero-actions">
              <Link className="btn btn--solid" to="/plots">Browse all plots</Link>
              {houses.length > 0 && <Link className="btn" to="/houses">{houses.length} houses here</Link>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
