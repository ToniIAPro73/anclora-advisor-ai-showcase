import { DOCUMENTS } from "../data/documents";

interface SidebarProps {
  activeDocId: string;
  onSelect: (id: string) => void;
  open: boolean;
  onClose: () => void;
}

const KIND_ICON: Record<string, string> = {
  contrato: "§",
  factura: "◧",
  nomina: "€",
  normativa: "⚖",
};

export default function Sidebar({ activeDocId, onSelect, open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Cerrar menú lateral"
          onClick={onClose}
        />
      )}
      <aside className={`sidebar${open ? " is-open" : ""}`} aria-label="Navegación y documentos">
        <div className="sidebar-brand">
          <span className="sidebar-logo" aria-hidden="true">
            A
          </span>
          <span className="sidebar-brand-text">
            Anclora <strong>Advisor AI</strong>
            <small>Demo de portfolio</small>
          </span>
          <button
            type="button"
            className="sidebar-close"
            aria-label="Cerrar menú lateral"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <nav className="sidebar-section" aria-label="Documentos sintéticos">
          <h2 className="sidebar-heading">Documentos sintéticos</h2>
          <ul className="doc-list">
            {DOCUMENTS.map((doc) => (
              <li key={doc.id}>
                <button
                  type="button"
                  className="doc-item"
                  aria-pressed={doc.id === activeDocId}
                  data-active={doc.id === activeDocId}
                  onClick={() => {
                    onSelect(doc.id);
                    onClose();
                  }}
                >
                  <span className="doc-item-icon" aria-hidden="true">
                    {KIND_ICON[doc.kind]}
                  </span>
                  <span className="doc-item-text">
                    <span className="doc-item-title">{doc.title}</span>
                    <span className="doc-item-meta">
                      {doc.kindLabel} · {doc.updated}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <p className="sidebar-simulated">
            Datos 100 % sintéticos · Sin llamadas a IA real
          </p>
          <p className="sidebar-version">v1.0 · entorno de demostración</p>
        </div>
      </aside>
    </>
  );
}
