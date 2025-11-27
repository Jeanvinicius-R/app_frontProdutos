const ProdutoAPI = {
  async listar() {
    const res = await fetch("http://localhost:8080/produto/list");
    return res.json();
  },

  async buscar(id) {
    const res = await fetch("http://localhost:8080/produto/get?id=" + id);
    return res.json();
  },

  async criar(data) {
    await fetch("http://localhost:8080/produto/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },

  async atualizar(id, data) {
    await fetch("http://localhost:8080/produto/update?id=" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },

  async deletar(id) {
    await fetch("http://localhost:8080/produto/delete?id=" + id, {
      method: "DELETE",
    });
  },
};

export default ProdutoAPI;
