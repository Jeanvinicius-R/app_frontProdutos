import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProdutoAPI from "../api/ProdutoAPI";

export default function ProdutoUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  useEffect(() => {
    async function carregar() {
      const produto = await ProdutoAPI.buscar(id);
      setNome(produto.nome);
      setPreco(produto.preco);
    }
    carregar();
  }, [id]);

  async function salvar(e) {
    e.preventDefault();
    await ProdutoAPI.atualizar(id, { nome, preco });
    navigate("/produtos");
  }

  return (
    <form onSubmit={salvar} className="bg-white p-6 shadow rounded max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Produto</h1>

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
        Atualizar
      </button>
    </form>
  );
}
