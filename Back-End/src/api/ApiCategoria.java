package api;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import dao.CategoriaDAO;
import model.Categoria;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

public class ApiCategoria {

    private static final Gson gson = new Gson();
    private static final CategoriaDAO dao = new CategoriaDAO();

    // LISTAR TODAS
    public static HttpHandler listar() {
        return exchange -> {
            String json = gson.toJson(dao.listar());
            sendResponse(exchange, json);
        };
    }

    // BUSCAR POR ID -> /categoria/get/{id}
    public static HttpHandler buscar() {
        return exchange -> {
            String[] parts = exchange.getRequestURI().getPath().split("/");
            int id = Integer.parseInt(parts[3]);  
            Categoria c = dao.buscar(id);
            sendResponse(exchange, gson.toJson(c));
        };
    }

    // INSERIR
    public static HttpHandler inserir() {
        return exchange -> {
            String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            Categoria c = gson.fromJson(body, Categoria.class);
            dao.inserir(c);
            sendResponse(exchange, "{\"status\":\"ok\"}");
        };
    }

    // ATUALIZAR
    public static HttpHandler atualizar() {
        return exchange -> {
            String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            Categoria c = gson.fromJson(body, Categoria.class);
            dao.atualizar(c);
            sendResponse(exchange, "{\"status\":\"ok\"}");
        };
    }

    // DELETAR -> /categoria/delete/{id}
    public static HttpHandler deletar() {
        return exchange -> {
            String[] parts = exchange.getRequestURI().getPath().split("/");
            int id = Integer.parseInt(parts[3]);
            dao.deletar(id);
            sendResponse(exchange, "{\"status\":\"ok\"}");
        };
    }

    // MÉTODO PADRÃO DE RESPOSTA
    private static void sendResponse(HttpExchange exchange, String response) throws IOException {
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
        byte[] bytes = response.getBytes(StandardCharsets.UTF_8);
        exchange.sendResponseHeaders(200, bytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
        }
    }
}
