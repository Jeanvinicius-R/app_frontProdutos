// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./pages/Sidebar";
import Home from "./pages/Home";
import CadastroCategoria from "./pages/CadastroCategoria";
import CadastroProduto from "./pages/CadastroProduto";
import Lista from "./pages/Lista";

import "./App.css";
import "./styles/layout.css";

function App() {
  const [minimized, setMinimized] = useState(false);

  return (
    <Router>
      <div className="app-layout">
        <Sidebar minimized={minimized} setMinimized={setMinimized} />

        <main className={`app-content ${minimized ? "expanded" : ""}`}>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* CATEGORIA */}
            <Route path="/categoria" element={<CadastroCategoria />} />
            <Route path="/categoria/editar/:id" element={<CadastroCategoria />} /> 
            {/*  ✅ ESTA ROTA FALTAVA  */}

            {/* PRODUTOS */}
            <Route path="/produto" element={<CadastroProduto />} />
            <Route path="/produto/editar/:id" element={<CadastroProduto />} />

            {/* LISTA */}
            <Route path="/lista" element={<Lista />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
