import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import LeadForm from "../components/LeadForm.jsx";

const EnquiryContext = createContext(null);
export const useEnquiry = () => useContext(EnquiryContext);

export function EnquiryProvider({ children }) {
  const [modal, setModal] = useState(null); // { title, sub } or null
  const [toast, setToast] = useState("");
  const timer = useRef();

  const showToast = useCallback((msg) => {
    setToast(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 3200);
  }, []);

  const openEnquiry = useCallback((title, sub) => setModal({ title, sub }), []);
  const close = () => setModal(null);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e) => e.key === "Escape" && setModal(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modal]);

  return (
    <EnquiryContext.Provider value={{ openEnquiry, showToast }}>
      {children}

      {modal && (
        <div className="modal is-open" onMouseDown={(e) => e.target === e.currentTarget && close()}>
          <div className="modal-box" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal-head">
              <div>
                <h3 id="modal-title">{modal.title}</h3>
                <p className="muted" style={{ margin: 0 }}>{modal.sub}</p>
              </div>
              <button className="modal-close" aria-label="Close" onClick={close}>&times;</button>
            </div>
            <LeadForm plain autoFocus onDone={() => { close(); showToast("Callback requested. We'll call you within a day."); }} />
          </div>
        </div>
      )}

      <div className={`toast${toast ? " is-show" : ""}`} role="status">{toast}</div>
    </EnquiryContext.Provider>
  );
}
