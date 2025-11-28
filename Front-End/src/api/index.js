// src/api/index.js
const BASE = "http://localhost:4567";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  // Se 204 No Content -> retornar null
  if (res.status === 204) return null;

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }

  return res.json();
}

// CATEGORIAS
export const listarCategorias = () => request("/categorias");
export const buscarCategoria = (id) => request(`/categorias/${id}`);
export const criarCategoria = (payload) =>
  request("/categorias", { method: "POST", body: JSON.stringify(payload) });
export const atualizarCategoria = (id, payload) =>
  request(`/categorias/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
export const deletarCategoria = (id) =>
  request(`/categorias/${id}`, { method: "DELETE" });

// PRODUTOS
export const listarProdutos = () => request("/produtos");
export const buscarProduto = (id) => request(`/produtos/${id}`);
export const criarProduto = (payload) =>
  request("/produtos", { method: "POST", body: JSON.stringify(payload) });
export const atualizarProduto = (id, payload) =>
  request(`/produtos/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
export const deletarProduto = (id) =>
  request(`/produtos/${id}`, { method: "DELETE" });

const api = {
  // categorias
  listarCategorias,
  buscarCategoria,
  criarCategoria,
  atualizarCategoria,
  deletarCategoria,
  // produtos
  listarProdutos,
  buscarProduto,
  criarProduto,
  atualizarProduto,
  deletarProduto,
};

export default api;
