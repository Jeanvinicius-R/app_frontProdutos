import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoriaAPI from "../api/CategoriaAPI";

export default function CategoriaUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nome, setNome] = useState("");

  useEffect(() => {
    async function carregar() {
      const cat = await CategoriaAPI.buscar(id);
      setNome(cat.nome);
    }
    carregar();
  }, [id]);

  async function salvar(e) {
    e.preventDefault();
    await CategoriaAPI.atualizar(id, { nome });
    navigate("/categorias");
  }

  return (
    <form onSubmit={salvar} className="bg-white p-6 shadow rounded max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Categoria</h1>

      <label className="block mb-2 font-medium">Nome:</label>
      <input
        className="w-full p-2 border rounded mb-4"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Atualizar
      </button>
    </form>
  );
}
