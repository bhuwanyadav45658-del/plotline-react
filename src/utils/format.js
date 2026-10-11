export const money = (lakh) => (lakh >= 100 ? `₹${(lakh / 100).toFixed(2)} Cr` : `₹${lakh} L`);
export const num = (n) => n.toLocaleString("en-IN");
export const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
export const statusChip = (status) => (status === "available" ? "chip" : `chip chip--${status}`);
