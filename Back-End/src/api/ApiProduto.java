package api;

import static spark.Spark.*;

import com.google.gson.Gson;
import model.Produto;
import dao.ProdutoDAO;
import spark.Request;
import spark.Response;
import spark.Filter;
import spark.Route;

public class ApiProduto {

    private static final ProdutoDAO dao = new ProdutoDAO();
    private static final Gson gson = new Gson();
    private static final String APPLICATION_JSON = "application/json";

    public static void main(String[] args) {

        port(4567);

        // Configura o tipo de resposta como JSON
        after(new Filter() {
            @Override
            public void handle(Request request, Response response) {
                response.type(APPLICATION_JSON);
            }
        });

        // GET /produtos - Buscar todos os produtos
        get("/produtos", new Route() {
            @Override
            public Object handle(Request request, Response response) {
                return gson.toJson(dao.buscarTodos());
            }
        });

        // GET /produtos/:id - Buscar produto por ID
        get("/produtos/:id", new Route() {
            @Override
            public Object handle(Request request, Response response) {
                try {
                    Long id = Long.parseLong(request.params(":id"));
                    Produto produto = dao.buscarPorId(id);

                    if (produto != null) {
                        return gson.toJson(produto);
                    } else {
                        response.status(404);
                        return "{\"mensagem\": \"Produto com ID " + id + " não encontrado,\"}";
                    }
                } catch (NumberFormatException e) {
                    response.status(400);
               return "{\"mensagem\": \"Forma do ID inválido.\"}";

                }
            }
        });

        // POST /produtos - Criar novo produto
        post("/produtos", new Route(){
            @Override
            public Object handle(Resquest request, Response response){
                try{
                    Produto novoProduto = gson.fromJson(request.body(), Produto.class);
                    dao.inserir(novoProduto);
                
                    response.status();
                    return gson.toJson(novoProduto);

                }}
        });
}}
