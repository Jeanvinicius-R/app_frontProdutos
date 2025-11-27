import { BrowserRouter, Routes, Route } from "react-router-dom";

import CategoriaList from "../pages/CategoriaList";
import CategoriaCreate from "../pages/CategoriaCreate";
import CategoriaUpdate from "../pages/CategoriaUpdate";

import ProdutoList from "../pages/ProdutoList";
import ProdutoCreate from "../pages/ProdutoCreate";
import ProdutoUpdate from "../pages/ProdutoUpdate";

import Layout from "../components/Layout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<h1 className="text-3xl font-bold">Sistema de Produtos</h1>} />

          <Route path="/categorias" element={<CategoriaList />} />
          <Route path="/categorias/create" element={<CategoriaCreate />} />
          <Route path="/categorias/update/:id" element={<CategoriaUpdate />} />

          <Route path="/produtos" element={<ProdutoList />} />
          <Route path="/produtos/create" element={<ProdutoCreate />} />
          <Route path="/produtos/update/:id" element={<ProdutoUpdate />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
