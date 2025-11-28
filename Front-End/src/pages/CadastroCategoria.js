// src/pages/CadastroCategoria.js
import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/CadastroCategoria.css";

export default function CadastroCategoria() {
  const [categorias, setCategorias] = useState([]);
  const [novoNome, setNovoNome] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [nomeEmEdicao, setNomeEmEdicao] = useState("");

  useEffect(() => {
    carregar();
  }, []);

  const carregar = async () => {
    try {
      const dados = await api.listarCategorias();
      setCategorias(dados || []);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar categorias");
    }
  };

  const adicionar = async (e) => {
    e.preventDefault();
    if (!novoNome.trim()) return;
    try {
      await api.criarCategoria({ nome: novoNome });
      setNovoNome("");
      carregar();
    } catch {
      alert("Erro ao criar");
    }
  };

  const salvar = async (id) => {
    if (!nomeEmEdicao.trim()) return;
    try {
      await api.atualizarCategoria(id, { id, nome: nomeEmEdicao });
      setEditandoId(null);
      setNomeEmEdicao("");
      carregar();
    } catch {
      alert("Erro ao atualizar");
    }
  };

  const excluir = async (id) => {
    if (!window.confirm("Confirma exclusão?")) return;
    try {
      await api.deletarCategoria(id);
      carregar();
    } catch (err) {
      alert("Erro ao excluir, pode haver produtos vinculados.");
    }
  };

  return (
    <div className="categoria-page">
      <h2>Gerenciar Categorias</h2>

      <form onSubmit={adicionar} className="categoria-form">
        <input value={novoNome} onChange={(e)=>setNovoNome(e.target.value)} placeholder="Nome da categoria" />
        <button type="submit">Adicionar</button>
      </form>

      <ul className="categoria-list">
        {categorias.map(c => (
          <li key={c.id}>
            {editandoId === c.id ? (
              <>
                <input value={nomeEmEdicao} onChange={(e)=>setNomeEmEdicao(e.target.value)} />
                <button onClick={()=>salvar(c.id)}>Salvar</button>
                <button onClick={()=>setEditandoId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <span>{c.nome}</span>
                <div className="acoes">
                  <button onClick={()=> { setEditandoId(c.id); setNomeEmEdicao(c.nome); }}>Editar</button>
                  <button onClick={()=>excluir(c.id)}>Excluir</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
