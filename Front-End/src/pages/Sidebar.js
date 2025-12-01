import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

export default function Sidebar({ minimized, setMinimized }) {
  return (
    <aside className={`sidebar ${minimized ? "minimized" : ""}`}>
      <button
        className="toggle-btn"
        onClick={() => setMinimized(!minimized)}
      >
        {minimized ? "➤" : "◀"}
      </button>

      <nav>
        <ul>

          <li>
            <Link to="/">
              <span className="icon">🏠</span>
              <span className="text">Home</span>
            </Link>
          </li>

          <li>
            <Link to="/categoria">
              <span className="icon">📁</span>
              <span className="text">Categorias</span>
            </Link>
          </li>

          <li>
            <Link to="/produto">
              <span className="icon">📦</span>
              <span className="text">Produtos</span>
            </Link>
          </li>

          <li>
            <Link to="/lista">
              <span className="icon">📋</span>
              <span className="text">Listas</span>
            </Link>
          </li>

        </ul>
      </nav>
    </aside>
  );
}
