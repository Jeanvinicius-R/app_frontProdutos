package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import model.Produto;
import util.ConnectionFactory;

public class ProdutoDAO {

    // ------------------------------------------------------------------------------
    // READ - Buscar todos os produtos
    // ------------------------------------------------------------------------------
    public List<Produto> buscarTodos() {

        List<Produto> produtos = new ArrayList<>();

        String sql = "SELECT * FROM produtos";

        try (Connection conn = ConnectionFactory.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql);
                ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Produto produto = new Produto();
                rs.getLong("id");
                rs.getString("nome");
                rs.getDouble("preco");
                rs.getInt("estoque");
                produtos.add(produto);
            }

        } catch (SQLException e) {
            System.out.println("Erro ao buscar produto: " + e.getMessage());
            e.printStackTrace();
        }

        return produtos;
    }

    public Produto buscarPorId(long id) {
        Produto produto = null;
        String sql = "SELECT id, nome, preco, estoque FROM produtos WHERE id = ?";

        try (Connection conn = ConnectionFactory.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, id);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    produto = new Produto(
                            rs.getLong("id"),
                            rs.getString("nome"),
                            rs.getDouble("preco"),
                            rs.getInt("estoque"));
                }
            }

        } catch (SQLException e) {
            System.out.println("Erro ao buscar produto. ID: " + id);
            e.printStackTrace();
        }

        return produto;
    }

    // ------------------------------------------------------------------------------
    // CREATE
    // ------------------------------------------------------------------------------
    public void inserir(Produto produto) {

        String sql = "INSERT INTO produtos (nome, preco, estoque) VALUES (?, ?, ?)";

        try (Connection conn = ConnectionFactory.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS)) {

            stmt.setString(1, produto.getNome());
            stmt.setDouble(2, produto.getPreco());
            stmt.setInt(3, produto.getEstoque());

            stmt.executeUpdate();

            try (ResultSet rs = stmt.getGeneratedKeys()) {
                if (rs.next()) {
                    produto.setId(rs.getLong(1));
                }
            }

            System.out.println("Produto inserido com sucesso: " + produto.getNome());

        } catch (SQLException e) {
            System.out.println("Erro ao inserir produto: " + produto.getNome());
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
    }

    // ------------------------------------------------------------------------------
    // Update
    // ------------------------------------------------------------------------------
    public void atualizar(Produto produto) {
        String sql = "UPDATE produtos SET nome = ?, preco = ?, estoque = ? WHERE id = ?";

        try (Connection conn = ConnectionFactory.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, produto.getNome());
            stmt.setDouble(2, produto.getPreco());
            stmt.setInt(3, produto.getEstoque());
            stmt.setLong(4, produto.getId());

            int linhasAfetadas = stmt.executeUpdate();
            System.out.println("Produto ID " + produto.getId() + " atualizado.");
            System.out.println("Linhas afetadas: " + linhasAfetadas);

        } catch (SQLException e) {
            System.out.println("Erro ao atualizar produto: " + produto.getNome());
            e.printStackTrace();
        }
    }

    // ------------------------------------------------------------------------------
    // Delete
    // ------------------------------------------------------------------------------
    public void deletar(Long id) {
        String sql = "DELETE FROM produtos WHERE id = ?";

        try (Connection conn = ConnectionFactory.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, id);

            int linhasAfetadas = stmt.executeUpdate();
            System.out.println("Produto ID " + id + " excluído.");
            System.out.println("Linhas afetadas: " + linhasAfetadas);

        } catch (SQLException e) {
            System.out.println("Erro ao excluir produto ID: " + id);
            e.printStackTrace();
        }
    }
}