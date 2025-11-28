// src/pages/CadastroProduto.js
import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/CadastroProduto.css";

export default function CadastroProduto() {
  const [form, setForm] = useState({ nome:"", preco:"", id_categoria:"" });
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    (async ()=> {
      try {
        const dados = await api.listarCategorias();
        setCategorias(dados || []);
      } catch (err) { console.error(err) }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const enviar = async (e) => {
    e.preventDefault();
    try {
      await api.criarProduto({
        nome: form.nome,
        preco: parseFloat(form.preco),
        id_categoria: parseInt(form.id_categoria)
      });
      setForm({ nome:"", preco:"", id_categoria:"" });
      alert("Produto criado");
    } catch(err){
      alert("Erro ao criar produto");
    }
  };

  return (
    <div className="produto-page">
      <h2>Cadastrar Produto</h2>
      <form onSubmit={enviar} className="produto-form">
        <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" required />
        <input name="preco" type="number" value={form.preco} onChange={handleChange} placeholder="Preço" required />
        <select name="id_categoria" value={form.id_categoria} onChange={handleChange} required>
          <option value="">Selecione categoria</option>
          {categorias.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
        </select>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  )
}
