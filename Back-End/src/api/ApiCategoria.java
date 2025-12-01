package api;

import static spark.Spark.*;

import com.google.gson.Gson;
import dao.CategoriaDAO;
import model.Categoria;

public class ApiCategoria {

    private static Gson gson = new Gson();
    private static CategoriaDAO dao = new CategoriaDAO();

    public static void registrarRotas() {

        // ================================
        // LISTAR TODAS
        // ================================
        get("/categorias", (req, res) -> {
            res.type("application/json");
            return gson.toJson(dao.buscarTodos());
        });

        // ================================
        // BUSCAR POR ID
        // ================================
        get("/categorias/:id", (req, res) -> {
            res.type("application/json");

            Long id = Long.parseLong(req.params("id"));
            Categoria c = dao.buscarPorId(id);

            if (c == null) {
                res.status(404);
                return gson.toJson("Categoria não encontrada");
            }

            return gson.toJson(c);
        });

        // ================================
        // INSERIR
        // ================================
        post("/categorias", (req, res) -> {
            res.type("application/json");

            Categoria categoria = gson.fromJson(req.body(), Categoria.class);
            dao.inserir(categoria);

            res.status(201);
            return gson.toJson(categoria);
        });

        // ================================
        // ATUALIZAR (CORRIGIDO!)
        // ================================
        put("/categorias/:id", (req, res) -> {
            res.type("application/json");

            Long id = Long.parseLong(req.params("id"));
            Categoria categoria = gson.fromJson(req.body(), Categoria.class);
            categoria.setId(id); // garante que o ID é o da URL

            boolean atualizado = dao.atualizar(categoria);

            if (!atualizado) {
                res.status(404);
                return gson.toJson("Categoria não encontrada");
            }

            return gson.toJson(categoria);
        });

        // ================================
        // DELETAR
        // ================================
        delete("/categorias/:id", (req, res) -> {
            res.type("application/json");

            Long id = Long.parseLong(req.params("id"));
            boolean removido = dao.deletar(id);

            if (!removido) {
                res.status(400);
                return gson.toJson("Erro ao deletar categoria (existem produtos usando ela?)");
            }

            res.status(204);
            return "";
        });
    }
}
