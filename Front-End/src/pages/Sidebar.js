// src/pages/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

export default function Sidebar({ minimized, setMinimized }) {
  return (
    <aside className={`sidebar ${minimized ? "minimized" : ""}`}>
      <button className="toggle" onClick={() => setMinimized(!minimized)}>
        ≡
      </button>

      <nav>
        <ul>
          <li><Link to="/">🏠 Home</Link></li>
          <li><Link to="/categoria">📂 Categorias</Link></li>
          <li><Link to="/produto">📦 Produtos</Link></li>
          <li><Link to="/lista">📋 Listas</Link></li>
        </ul>
      </nav>
    </aside>
  );
}
