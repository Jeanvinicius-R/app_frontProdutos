import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProdutoAPI from "../api/ProdutoAPI";

export default function ProdutoList() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function carregar() {
      const dados = await ProdutoAPI.listar();
      setProdutos(dados);
    }
    carregar();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Produtos</h1>

        <Link
          to="/produtos/create"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Novo Produto
        </Link>
      </div>

      <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Nome</th>
            <th className="p-3 text-left">Preço</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>

        <tbody>
          {produtos.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-3">{p.id}</td>
              <td className="p-3">{p.nome}</td>
              <td className="p-3">R$ {p.preco}</td>
              <td className="p-3 flex gap-3 justify-center">
                <Link
                  to={`/produtos/update/${p.id}`}
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
