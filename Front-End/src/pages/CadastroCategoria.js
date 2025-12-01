import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/CadastroCategoria.css";

export default function CadastroCategoria() {
  const [nome, setNome] = useState("");
  const [editando, setEditando] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  // Carrega categoria ao editar
  useEffect(() => {
    if (id) {
      setEditando(true);
      const carregarCategoria = async () => {
        try {
          const c = await api.buscarCategoria(id);
          if (!c) throw new Error("Categoria não encontrada");
          setNome(c.nome);
        } catch (err) {
          console.error(err);
          alert("Erro ao carregar categoria");
          navigate("/lista");
        }
      };
      carregarCategoria();
    }
  }, [id, navigate]);

  // Enviar (criar ou atualizar)
  const enviar = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await api.atualizarCategoria(id, { nome });
        alert("Categoria atualizada!");
      } else {
        await api.criarCategoria({ nome });
        alert("Categoria criada!");
      }
      navigate("/lista");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar categoria");
    }
  };

  return (
    <div className="categoria-page">
      <h2>{editando ? "Editar Categoria" : "Cadastrar Categoria"}</h2>
      <form onSubmit={enviar}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome da categoria"
          required
        />
        <button type="submit">{editando ? "Salvar Alterações" : "Cadastrar"}</button>
      </form>
    </div>
  );
}
