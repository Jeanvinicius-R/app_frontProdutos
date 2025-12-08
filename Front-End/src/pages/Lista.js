import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api";
import "../styles/Lista.css";

export default function Lista() {
  const [view, setView] = useState("produtos");
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 Formatar preço para R$ 0.00
  function formatarReais(valor) {
    if (!valor) return "R$ 0.00";

    let numero = Number(valor);
    let formatado = numero.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return "R$ " + formatado;
  }

  // Carregar dados conforme a view
  const carregar = async () => {
    try {
      if (view === "produtos") {
        const d = await api.listarProdutos();
        setProdutos(d || []);
      } else {
        const d = await api.listarCategorias();
        setCategorias(d || []);
      }
    } catch (err) {
      console.error("Erro ao carregar:", err);
    }
  };

  useEffect(() => {
    carregar();
  }, [view, location.pathname]);

  // Produtos
  const editarProduto = (id) => navigate(`/produto/editar/${id}`);
  const excluirProduto = async (id) => {
    if (!window.confirm("Excluir produto?")) return;
    try {
      await api.deletarProduto(id);
      carregar();
    } catch {
      alert("Erro ao excluir produto");
    }
  };

  // Categorias
  const editarCategoria = (id) => navigate(`/categoria/editar/${id}`);
  const excluirCategoria = async (id) => {
    if (!window.confirm("Excluir categoria?")) return;
    try {
      await api.deletarCategoria(id);
      carregar();
    } catch {
      alert("Erro: pode haver produtos usando essa categoria");
    }
  };

  return (
    <div className="lista-page">
      <h2>Listagem</h2>

      {/* Toggle */}
      <div className="toggle">
        <button
          className={view === "produtos" ? "active" : ""}
          onClick={() => setView("produtos")}
        >
          Produtos
        </button>

        <button
          className={view === "categorias" ? "active" : ""}
          onClick={() => setView("categorias")}
        >
          Categorias
        </button>
      </div>

      {/* =============================
          LISTAGEM DE PRODUTOS
         ============================= */}
      {view === "produtos" ? (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {produtos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nome}</td>
                <td>{formatarReais(p.preco)}</td>
                <td>{p.categoria?.nome || "Sem categoria"}</td>

                <td className="col-acoes">
                  <div className="acoes-container">
                    <button
                      className="btn-editar"
                      onClick={() => editarProduto(p.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-excluir"
                      onClick={() => excluirProduto(p.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        /* =============================
            LISTAGEM DE CATEGORIAS
           ============================= */
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {categorias.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.nome}</td>

                <td className="col-acoes">
                  <div className="acoes-container">
                    <button
                      className="btn-editar"
                      onClick={() => editarCategoria(c.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-excluir"
                      onClick={() => excluirCategoria(c.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
