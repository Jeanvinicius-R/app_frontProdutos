import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoriaAPI from "../api/CategoriaAPI";

export default function CategoriaList() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function carregar() {
      const dados = await CategoriaAPI.listar();
      setCategorias(dados);
    }
    carregar();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Categorias</h1>
        <Link
          to="/categorias/create"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Nova Categoria
        </Link>
      </div>

      <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Nome</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-3">{c.id}</td>
              <td className="p-3">{c.nome}</td>
              <td className="p-3 flex gap-3 justify-center">
                <Link
                  to={`/categorias/update/${c.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
