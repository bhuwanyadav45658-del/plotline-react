import { colonyById } from "../data/data.js";
import { money, num } from "../utils/format.js";
import { useEnquiry } from "../context/EnquiryContext.jsx";
import { HouseSVG } from "./Illustrations.jsx";

export default function HouseCard({ house }) {
  const { openEnquiry } = useEnquiry();
  const colony = colonyById(house.colony);
  return (
    <article className="card">
      <div className="card-media"><HouseSVG house={house} /></div>
      <div className="card-body">
        <div className="card-top"><h3>{house.name}</h3><span className="price">{money(house.lakh)}</span></div>
        <div><span className={house.status === "Ready to move" ? "chip" : "chip chip--booked"}>{house.status}</span></div>
        <ul className="specs"><li>{house.beds} beds</li><li>{house.baths} baths</li><li>{num(house.sqft)} sq ft built-up</li></ul>
        <p className="muted" style={{ margin: 0, fontSize: ".92rem" }}>
          {house.type} in {colony.name}. {house.features.join(", ")}.
        </p>
        <div className="card-actions">
          <button className="btn btn--sm btn--solid" onClick={() => openEnquiry(house.name, `${colony.name}, ${colony.area}`)}>Book a visit</button>
        </div>
      </div>
    </article>
  );
}
