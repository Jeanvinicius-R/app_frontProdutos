package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import model.Categoria;
import util.ConnectionFactory;

public class CategoriaDAO {

    // ============================
    // LISTAR TODAS
    // ============================
    public List<Categoria> buscarTodos() {
        List<Categoria> lista = new ArrayList<>();

        String sql = "SELECT id, nome FROM categorias";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                lista.add(new Categoria(
                        rs.getLong("id"),
                        rs.getString("nome")
                ));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return lista;
    }

    // ============================
    // BUSCAR POR ID
    // ============================
    public Categoria buscarPorId(Long id) {
        Categoria categoria = null;

        String sql = "SELECT id, nome FROM categorias WHERE id = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, id);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                categoria = new Categoria(
                        rs.getLong("id"),
                        rs.getString("nome")
                );
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return categoria;
    }

    // ============================
    // INSERIR
    // ============================
    public void inserir(Categoria categoria) {

        String sql = "INSERT INTO categorias (nome) VALUES (?)";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setString(1, categoria.getNome());
            stmt.executeUpdate();

            ResultSet rs = stmt.getGeneratedKeys();
            if (rs.next()) {
                categoria.setId(rs.getLong(1));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // ============================
    // ATUALIZAR (CORRIGIDO!)
    // ============================
    public boolean atualizar(Categoria categoria) {

        String sql = "UPDATE categorias SET nome = ? WHERE id = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, categoria.getNome());
            stmt.setLong(2, categoria.getId());

            int linhas = stmt.executeUpdate();
            return linhas > 0;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // ============================
    // DELETAR
    // ============================
    public boolean deletar(Long id) {

        String sql = "DELETE FROM categorias WHERE id = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, id);

            int linhas = stmt.executeUpdate();
            return linhas > 0;

        } catch (SQLException e) {
            return false;
        }
    }
}
