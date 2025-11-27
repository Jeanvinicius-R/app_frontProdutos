import { useState } from "react";
import ProdutoAPI from "../api/ProdutoAPI";
import { useNavigate } from "react-router-dom";

export default function ProdutoCreate() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const navigate = useNavigate();

  async function salvar(e) {
    e.preventDefault();
    await ProdutoAPI.criar({ nome, preco });
    navigate("/produtos");
  }

  return (
    <form onSubmit={salvar} className="bg-white p-6 shadow rounded max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Novo Produto</h1>

      <label className="block mb-2 font-medium">Nome:</label>
      <input
        className="w-full p-2 border rounded mb-4"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />

      <label className="block mb-2 font-medium">Preço:</label>
      <input
        className="w-full p-2 border rounded mb-4"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
        required
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Salvar
      </button>
    </form>
  );
}
