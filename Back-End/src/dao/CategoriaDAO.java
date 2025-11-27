package dao;

import java.sql.*;
import java.util.*;

import com.google.gson.JsonElement;

import model.Categoria;
import util.ConnectionFactory;

public class CategoriaDAO {

    public List<Categoria> listar() {
        List<Categoria> lista = new ArrayList<>();
        String sql = "SELECT * FROM categoria";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                lista.add(new Categoria(rs.getInt("id"), rs.getString("nome")));
            }

            return lista;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Categoria buscar(int id) {
        String sql = "SELECT * FROM categoria WHERE id=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                return new Categoria(rs.getInt("id"), rs.getString("nome"));
            }

            return null;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void inserir(Categoria c) {
        String sql = "INSERT INTO categoria (nome) VALUES (?)";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, c.getNome());
            stmt.executeUpdate();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void atualizar(Categoria c) {
        String sql = "UPDATE categoria SET nome=? WHERE id=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, c.getNome());
            stmt.setInt(2, c.getId());
            stmt.executeUpdate();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void deletar(int id) {
        String sql = "DELETE FROM categoria WHERE id=?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            stmt.executeUpdate();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public JsonElement buscarPorId(int id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'buscarPorId'");
    }
}
