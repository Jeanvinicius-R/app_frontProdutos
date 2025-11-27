import React, { useEffect, useState } from "react";

export default function ProdutoForm({ atualizar, modoEdicao, setModoEdicao }) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/categoria/list")
      .then((r) => r.json())
      .then((dados) => setCategorias(dados));

    if (modoEdicao) {
      setNome(modoEdicao.nome);
      setPreco(modoEdicao.preco);
      setCategoria(modoEdicao.categoriaId);
    }
  }, [modoEdicao]);

  const salvar = () => {
    const metodo = modoEdicao ? "PUT" : "POST";
    const rota = modoEdicao
      ? `http://localhost:8080/produto/update?id=${modoEdicao.id}`
      : "http://localhost:8080/produto/add";

    fetch(rota, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, preco, categoriaId: categoria }),
    }).then(() => {
      atualizar();
      setModoEdicao(null);
      setNome("");
      setPreco("");
      setCategoria("");
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow mb-4">

      <h2 className="text-xl font-bold mb-3">
        {modoEdicao ? "Editar Produto" : "Cadastrar Produto"}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Selecione a categoria</option>

          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={salvar}
        className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Salvar
      </button>

      {modoEdicao && (
        <button
          onClick={() => setModoEdicao(null)}
          className="ml-2 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
        >
          Cancelar
        </button>
      )}
    </div>
  );
}
