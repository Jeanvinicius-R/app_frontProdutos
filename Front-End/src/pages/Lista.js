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

  // 🔥 FORMATA PREÇO EM R$ 450.000.00
  function formatarReais(valor) {
    if (!valor) return "R$ 0.00";

    let numero = Number(valor);

    let formatado = numero.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // trocar vírgula por ponto
    formatado = formatado.replace(",", ".");

    return "R$ " + formatado;
  }

  // Carregar dados
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

  // Sempre que muda view ou rota
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

      {/* Toggle Produtos / Categorias */}
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

                {/* 🔥 AQUI A FORMATAÇÃO FINAL */}
                <td>{formatarReais(p.preco)}</td>

                <td>{p.categoria?.nome || "Sem categoria"}</td>
                <td>
                  <button onClick={() => editarProduto(p.id)}>Editar</button>
                  <button onClick={() => excluirProduto(p.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
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
                <td>
                  <button onClick={() => editarCategoria(c.id)}>Editar</button>
                  <button onClick={() => excluirCategoria(c.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
