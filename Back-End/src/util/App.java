package util;


import com.sun.net.httpserver.HttpServer;
import api.ApiCategoria;
import api.ApiProduto;

import java.net.InetSocketAddress;

public class App {

    public static void start() throws Exception {

        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        // ==== ROTAS CATEGORIA =====
        server.createContext("/categoria/list", ApiCategoria.listar());
        server.createContext("/categoria/get", ApiCategoria.buscar());
        server.createContext("/categoria/add", ApiCategoria.inserir());
        server.createContext("/categoria/update", ApiCategoria.atualizar());
        server.createContext("/categoria/delete", ApiCategoria.deletar());

        // ==== ROTAS PRODUTO =====
        server.createContext("/produto/list", ApiProduto.listar());
        server.createContext("/produto/get", ApiProduto.buscar());
        server.createContext("/produto/add", ApiProduto.inserir());
        server.createContext("/produto/update", ApiProduto.atualizar());
        server.createContext("/produto/delete", ApiProduto.deletar());

        server.start();
        System.out.println("Servidor rodando na porta 8080...");
    }
}
