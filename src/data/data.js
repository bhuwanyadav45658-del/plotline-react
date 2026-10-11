/* Demo data: colonies, plots and houses.
   Plots are generated from each colony's layout so the site plan,
   the plot listings and the sold counts always agree. */

export const COLONIES = [
  {
    id: "aarav-greens", name: "Aarav Greens", area: "North Ring Road",
    rows: 5, cols: 8, rate: 3200, hue: 152, seed: 11, soldShare: 0.5, bookedShare: 0.12,
    blurb: "A gated, tree-lined layout with 30 ft internal roads and a central park. Registry-ready plots with all approvals in place.",
    amenities: ["Gated entry", "Central park", "Underground cabling", "Rainwater harvesting", "Kids' play area"],
    possession: "Registry ready",
  },
  {
    id: "lakeview-enclave", name: "Lakeview Enclave", area: "Lake Road",
    rows: 4, cols: 10, rate: 4100, hue: 200, seed: 27, soldShare: 0.35, bookedShare: 0.15,
    blurb: "Plots a short walk from the lake promenade, with a jogging track, a clubhouse and 24-hour water supply.",
    amenities: ["Clubhouse", "Jogging track", "24-hour water", "CCTV", "EV charging point"],
    possession: "Possession in 6 months",
  },
  {
    id: "sunrise-heights", name: "Sunrise Heights", area: "Airport Bypass",
    rows: 6, cols: 6, rate: 2500, hue: 38, seed: 53, soldShare: 0.2, bookedShare: 0.1,
    blurb: "An affordable, fast-growing colony near the bypass. Wide plots, a temple garden and a market block planned at the gate.",
    amenities: ["Temple garden", "Market block", "Street lights", "Sewer line", "Bus stop at gate"],
    possession: "Phase 1 launching",
  },
];

export const HOUSES = [
  { id: "h1", name: "The Banyan Villa", type: "Villa", beds: 4, baths: 4, sqft: 3100, plotSqft: 2400, floors: 2, lakh: 168, colony: "aarav-greens", hue: 152, status: "Ready to move", features: ["Private garden", "Car porch for 2", "Modular kitchen"] },
  { id: "h2", name: "Neem Court Bungalow", type: "Bungalow", beds: 3, baths: 3, sqft: 1950, plotSqft: 1800, floors: 1, lakh: 112, colony: "aarav-greens", hue: 140, status: "Ready to move", features: ["Open terrace", "Vastu compliant", "Solar water heater"] },
  { id: "h3", name: "Lakeside Duplex", type: "Duplex", beds: 3, baths: 3, sqft: 2200, plotSqft: 1500, floors: 2, lakh: 139, colony: "lakeview-enclave", hue: 200, status: "Under construction", features: ["Lake-facing balcony", "Double-height living", "Home office nook"] },
  { id: "h4", name: "Cedar Row House", type: "Row house", beds: 2, baths: 2, sqft: 1250, plotSqft: 1200, floors: 2, lakh: 78, colony: "lakeview-enclave", hue: 215, status: "Ready to move", features: ["Shared green lane", "Terrace garden", "Reserved parking"] },
  { id: "h5", name: "Sunrise Family Home", type: "Bungalow", beds: 3, baths: 2, sqft: 1600, plotSqft: 1800, floors: 1, lakh: 74, colony: "sunrise-heights", hue: 38, status: "Under construction", features: ["East-facing entry", "Wide front lawn", "Store room"] },
  { id: "h6", name: "Orchid Twin Villa", type: "Villa", beds: 4, baths: 3, sqft: 2800, plotSqft: 2400, floors: 2, lakh: 121, colony: "sunrise-heights", hue: 28, status: "Ready to move", features: ["Servant quarter", "Terrace lounge", "Rooftop solar"] },
];

function seededRandom(seed) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export const PLOT_SIZES = [1200, 1500, 1800, 2400];
export const FACINGS = ["East", "North", "West", "South"];

export const PLOTS = [];
COLONIES.forEach((c) => {
  const rand = seededRandom(c.seed);
  for (let r = 0; r < c.rows; r++) {
    for (let k = 0; k < c.cols; k++) {
      const size = PLOT_SIZES[Math.floor(rand() * PLOT_SIZES.length)];
      const facing = FACINGS[(r + k) % 4];
      const corner = (r === 0 || r === c.rows - 1) && (k === 0 || k === c.cols - 1);
      const premium = 1 + (corner ? 0.06 : 0) + (facing === "East" || facing === "North" ? 0.03 : 0);
      const roll = rand();
      const status = roll < c.soldShare ? "sold" : roll < c.soldShare + c.bookedShare ? "booked" : "available";
      PLOTS.push({
        id: `${String.fromCharCode(65 + r)}-${String(k + 1).padStart(2, "0")}`,
        colony: c.id, row: r, col: k, size, facing, corner, status,
        lakh: Math.round((size * c.rate * premium) / 1e5),
      });
    }
  }
});

export const colonyById = (id) => COLONIES.find((c) => c.id === id);
export const plotsOf = (colonyId) => PLOTS.filter((p) => p.colony === colonyId);
