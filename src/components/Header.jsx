import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo.jsx";

const LINKS = [
  ["/", "Home", true],
  ["/plots", "Plots"],
  ["/houses", "Houses"],
  ["/colonies", "Colonies"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link className="brand" to="/" onClick={() => setOpen(false)}><Logo />Plotline</Link>
        <button className="nav-toggle" aria-expanded={open} aria-controls="navlinks" onClick={() => setOpen((o) => !o)}>Menu</button>
        <ul className={`nav-links${open ? " is-open" : ""}`} id="navlinks">
          {LINKS.map(([to, label, end]) => (
            <li key={to}><NavLink to={to} end={end} onClick={() => setOpen(false)}>{label}</NavLink></li>
          ))}
          <li><Link className="btn btn--solid btn--sm" to="/#contact" onClick={() => setOpen(false)}>Book a visit</Link></li>
        </ul>
      </div>
    </header>
  );
}
