import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="brand brand--light"><Logo />Plotline</div>
            <p style={{ marginTop: "1rem", maxWidth: "36ch" }}>Plots, homes and planned colonies you can check on the site plan before you visit.</p>
          </div>
          <div>
            <h4>Browse</h4>
            <ul>
              <li><Link to="/plots">Plots for sale</Link></li>
              <li><Link to="/houses">Houses</Link></li>
              <li><Link to="/colonies">Colonies</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul><li>+91 98765 43210</li><li>hello@plotline.example</li><li>Mon–Sat, 9 am – 7 pm</li></ul>
          </div>
        </div>
        <p className="fine">Demo website. All colonies, prices and contact details are fictional.</p>
      </div>
    </footer>
  );
}
