// src/pages/Lista.js
import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/Lista.css";

export default function Lista() {
  const [view, setView] = useState("produtos");
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(()=> {
    carregar();
  }, [view]);

  const carregar = async () => {
    try {
      if (view === "produtos") {
        const d = await api.listarProdutos();
        setProdutos(d || []);
      } else {
        const d = await api.listarCategorias();
        setCategorias(d || []);
      }
    } catch(err) { console.error(err) }
  };

  const excluirProduto = async (id) => {
    if(!window.confirm("Excluir produto?")) return;
    try { await api.deletarProduto(id); carregar(); } catch { alert("Erro ao excluir"); }
  };

  const excluirCategoria = async (id) => {
    if(!window.confirm("Excluir categoria?")) return;
    try { await api.deletarCategoria(id); carregar(); } catch { alert("Erro: pode ter produtos"); }
  };

  return (
    <div className="lista-page">
      <h2>Listagem</h2>
      <div className="toggle">
        <button className={view==="produtos"?"active":""} onClick={()=>setView("produtos")}>Produtos</button>
        <button className={view==="categorias"?"active":""} onClick={()=>setView("categorias")}>Categorias</button>
      </div>

      {view==="produtos" ? (
        <table className="table">
          <thead><tr><th>ID</th><th>Nome</th><th>Preço</th><th>Ações</th></tr></thead>
          <tbody>
            {produtos.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nome}</td>
                <td>R$ {Number(p.preco).toFixed(2)}</td>
                <td>
                  <button>Editar</button>
                  <button onClick={()=>excluirProduto(p.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="table">
          <thead><tr><th>ID</th><th>Nome</th><th>Ações</th></tr></thead>
          <tbody>
            {categorias.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.nome}</td>
                <td>
                  <button>Editar</button>
                  <button onClick={()=>excluirCategoria(c.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
