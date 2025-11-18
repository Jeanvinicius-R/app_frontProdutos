import dao.ProdutoDAO;
import model.Produto;
import util.ConnectionFactory;

public class App {
    public static void main(String[] args) throws Exception {
        try {
            ConnectionFactory.getConnection();
            System.out.println("Conexão efetuada com sucesso!");
        } catch (Exception e) {
            System.out.println(e);
        }

        // ---------------------------------------
        // TESTE - BUSCAR TODOS OS PRODUTOS
        // ---------------------------------------
        // ProdutoDAO produtoDAO = new ProdutoDAO();

        // for (Produto p : produtoDAO.buscarTodos()) {
        // System.out.println(p.toString());
        // }

        // ---------------------------------------
        // TESTE - BUSCAR PRODUTO POR ID
        // ---------------------------------------
        // ProdutoDAO produtoDAO = new ProdutoDAO();
        // Produto produto = produtoDAO.buscarPorId(2L);

        // if(produto != null){
        // System.out.println(produto.toString());
        // }else{
        // System.out.println("Produto não encontrado!");
        // }

        // ---------------------------------------
        // TESTE - Criando novo produto
        // ---------------------------------------
        // ProdutoDAO dao = new ProdutoDAO();

        // Produto novo = new Produto();
        // novo.setNome("Notebook");
        // novo.setPreco(5432,54);
        // novo.setEstoque(3);

        // dao.inserir(novo);

        // ---------------------------------------
        // TESTE - INSERIR PRODUTO
        // ---------------------------------------
        // ProdutoDAO produtoDAO = new ProdutoDAO();
        // Produto produto = new Produto("Notebook", 3575.78, 30);
        // produtoDAO.inserir(produto);
        // System.out.println(produto.toString());


        // ---------------------------------------
        // TESTE - UPDATE NO PRODUTO
        // ---------------------------------------
        // ProdutoDAO produtoDAO = new ProdutoDAO();
        // Produto produto = new Produto(4L, "Notebook", 4000.00, 20);
        // produtoDAO.atualizar(produto);
        // System.out.println(produto.toString());


        // ---------------------------------------
        // TESTE - DELETAR
        // ---------------------------------------
        // ProdutoDAO produtoDAO = new ProdutoDAO();
        // produtoDAO.deletar(3L);

    }
}