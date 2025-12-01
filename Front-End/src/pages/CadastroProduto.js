import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/CadastroProduto.css";

export default function CadastroProduto() {
  const { id } = useParams();            // <- pega id da edição
  const navigate = useNavigate();        // <- para voltar após editar

  const [form, setForm] = useState({ nome: "", preco: "", id_categoria: "" });
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    carregarCategorias();

    if (id) {
      carregarProdutoParaEdicao(id);
    }
  }, [id]);

  const carregarCategorias = async () => {
    try {
      const dados = await api.listarCategorias();
      setCategorias(dados || []);
    } catch (err) {
      console.error("Erro ao carregar categorias:", err);
    }
  };

  const carregarProdutoParaEdicao = async (idProduto) => {
    try {
      const p = await api.buscarProduto(idProduto);

      setForm({
        nome: p.nome,
        preco: p.preco,
        id_categoria: p.categoria?.id || ""
      });
    } catch (err) {
      console.error("Erro ao carregar produto para edição:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const enviar = async (e) => {
    e.preventDefault();

    const payload = {
      nome: form.nome,
      preco: parseFloat(form.preco),
      categoria: { id: parseInt(form.id_categoria, 10) }
    };

    try {
      if (id) {
        await api.atualizarProduto(id, payload);
        alert("Produto atualizado!");
      } else {
        await api.criarProduto(payload);
        alert("Produto criado!");
      }

      navigate("/lista"); // voltar para lista após salvar
    } catch (err) {
      console.error("Erro ao salvar:", err);
      alert("Erro ao salvar produto");
    }
  };

  return (
    <div className="produto-page">
      <h2>{id ? "Editar Produto" : "Cadastrar Produto"}</h2>

      <form onSubmit={enviar} className="produto-form">
        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome"
          required
        />

        <input
          name="preco"
          type="number"
          value={form.preco}
          onChange={handleChange}
          placeholder="Preço"
          step="0.01"
          required
        />

        <select
          name="id_categoria"
          value={form.id_categoria}
          onChange={handleChange}
          required
        >
          <option value="">Selecione categoria</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>

        <button type="submit">{id ? "Salvar Alterações" : "Cadastrar"}</button>
      </form>
    </div>
  );
}
