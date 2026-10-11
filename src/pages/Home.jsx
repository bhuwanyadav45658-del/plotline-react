import { Link } from "react-router-dom";
import { COLONIES, HOUSES, PLOTS, plotsOf } from "../data/data.js";
import SitePlan from "../components/SitePlan.jsx";
import HouseCard from "../components/HouseCard.jsx";
import ColonyCardBody from "../components/ColonyCard.jsx";
import LeadForm from "../components/LeadForm.jsx";
import { useEnquiry } from "../context/EnquiryContext.jsx";

export default function Home() {
  const { showToast } = useEnquiry();
  const hero = COLONIES[0];
  const heroPlots = plotsOf(hero.id);
  const freeTotal = PLOTS.filter((p) => p.status === "available").length;

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1>Pick your plot on the site plan, not the brochure.</h1>
            <p className="lead">See which plots are free, how big they are and what they cost, then book a visit for the one you like.</p>
            <div className="hero-actions">
              <Link className="btn btn--solid" to="/plots">Browse plots</Link>
              <Link className="btn" to="/houses">See houses</Link>
            </div>
            <div className="hero-facts">
              <div><strong>{freeTotal}</strong><span>Plots available</span></div>
              <div><strong>{HOUSES.length}</strong><span>Houses listed</span></div>
              <div><strong>{COLONIES.length}</strong><span>Colonies</span></div>
            </div>
          </div>

          <div className="plan" aria-label="Live site plan">
            <div className="plan-title">
              <h3>{hero.name}</h3>
              <small>{heroPlots.filter((p) => p.status === "available").length} of {heroPlots.length} plots available</small>
            </div>
            <SitePlan colony={hero} animate />
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="wrap">
          <div className="section-head">
            <h2>Three ways to start</h2>
            <p>Buy land and build your own way, move into a finished home, or look at the whole colony first.</p>
          </div>
          <div className="tiles">
            <Link className="tile tile--green" to="/plots">
              <span className="count">{freeTotal}</span>
              <div><h3>Plots</h3><p>Filter by colony, size, facing and budget.</p></div>
            </Link>
            <Link className="tile" to="/houses">
              <span className="count">{HOUSES.length}</span>
              <div><h3>Houses</h3><p>Villas, bungalows, duplexes and row houses.</p></div>
            </Link>
            <Link className="tile tile--ink" to="/colonies">
              <span className="count">{COLONIES.length}</span>
              <div><h3>Colonies</h3><p>Site plans, amenities and sales progress.</p></div>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>Homes you can move into</h2>
            <Link className="btn btn--sm" to="/houses">All houses</Link>
          </div>
          <div className="grid">{HOUSES.slice(0, 3).map((h) => <HouseCard key={h.id} house={h} />)}</div>
        </div>
      </section>

      <section className="section section--white">
        <div className="wrap">
          <div className="section-head">
            <h2>Our colonies</h2>
            <p>Each colony has its own site plan, so you can see what is left before you travel.</p>
          </div>
          <div className="colony-list" style={{ marginBottom: 0 }}>
            {COLONIES.map((c) => (
              <Link key={c.id} className="colony-card" to={`/colonies/${c.id}`}><ColonyCardBody colony={c} /></Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="wrap contact">
          <div>
            <h2>Book a site visit</h2>
            <p className="lead">Tell us your name and number. We'll call to fix a time and have the plot marked out for you.</p>
            <ul>
              <li><strong>Call:</strong> +91 98765 43210</li>
              <li><strong>Email:</strong> hello@plotline.example</li>
              <li><strong>Open:</strong> Monday to Saturday, 9 am to 7 pm</li>
            </ul>
          </div>
          <LeadForm showInterest onDone={() => showToast("Thanks. We'll call you within a day.")} />
        </div>
      </section>
    </>
  );
}
