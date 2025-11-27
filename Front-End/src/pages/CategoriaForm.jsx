import React, { useState, useEffect } from "react";

export default function CategoriaForm({ atualizar, modoEdicao, setModoEdicao }) {
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (modoEdicao) {
      setNome(modoEdicao.nome);
    }
  }, [modoEdicao]);

  const salvar = () => {
    const metodo = modoEdicao ? "PUT" : "POST";
    const rota = modoEdicao
      ? `http://localhost:8080/categoria/update?id=${modoEdicao.id}`
      : "http://localhost:8080/categoria/add";

    fetch(rota, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome }),
    }).then(() => {
      atualizar();
      setModoEdicao(null);
      setNome("");
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow mb-4">

      <h2 className="text-xl font-bold mb-3">
        {modoEdicao ? "Editar Categoria" : "Cadastrar Categoria"}
      </h2>

      <input
        className="border p-2 rounded w-full"
        placeholder="Nome da categoria"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

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
