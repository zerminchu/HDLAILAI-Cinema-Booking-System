package com.csit314.backend.Fnb;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import com.csit314.backend.db.SQLConnection;

public class Fnb {
    // Checks if table has been created
    private Integer id = -1;
    private Integer currentPrice = -1;
    private String imageURL = "";
    private String name = "";
    private String type = "";
    private Boolean suspended = false;

    public Fnb() {
        id = -1;
        currentPrice = -1;
        imageURL = "";
        name = "";
        type = "";
        suspended = false;
    }

    // To accept existing profile ids
    public Fnb(Integer id) {
        this.id = id;
    }

    // To map the results from the database
    public Fnb(Integer id, Integer currentPrice, String imageURL, String name, String type, Boolean suspended) {
        this.id = id;
        this.currentPrice = currentPrice;
        this.imageURL = imageURL;
        this.name = name;
        this.type = type;
        this.suspended = suspended;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(Integer currentPrice) {
        this.currentPrice = currentPrice;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public String getName() {
        return name;
    }

    public void setname(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Boolean getSuspended() {
        return suspended;
    }

    public void setSuspended(Boolean suspended) {
        this.suspended = suspended;
    }

    public String save(Fnb fnb) throws SQLException {
        // Return failure early incase of incomplete fields
        if (fnb.currentPrice == 0 || fnb.imageURL == "") {
            return "Failure";
        }
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "INSERT INTO Fnb (currentPrice, imageURL, name, type, suspended) VALUES (?, ?, ?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, fnb.currentPrice);
            statement.setString(2, fnb.imageURL);
            statement.setString(3, fnb.name);
            statement.setString(4, fnb.type);
            statement.setBoolean(5, fnb.suspended);

            statement.executeUpdate();
            return "Success";
        } catch (SQLException e) {
            System.out.println(e);
            return "Failure";
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }

    public ArrayList<Fnb> listAll() throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM Fnb";
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<Fnb> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer id = resultSet.getInt("id");
                Integer currentPrice = resultSet.getInt("currentPrice");
                String imageURL = resultSet.getString("imageURL");
                String name = resultSet.getString("name");
                String type = resultSet.getString("type");
                Boolean suspended = resultSet.getBoolean("suspended");
                // Convert the data into an object that can be sent back to boundary
                Fnb result = new Fnb(id, currentPrice, imageURL, name, type, suspended);
                results.add(result);
            }
            return results;
        } catch (SQLException e) {
            System.out.println(e);
            return null;
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }

    // Read One
    public Fnb get(Integer id) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM Fnb WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, id);
            statement.setMaxRows(1);
            ResultSet resultSet = statement.executeQuery();
            if (!resultSet.next()) {
                return null;
            }
            Integer currentPrice = resultSet.getInt("currentPrice");
            String imageURL = resultSet.getString("imageURL");
            String name = resultSet.getString("name");
            String type = resultSet.getString("type");
            Boolean suspended = resultSet.getBoolean("suspended");
            Fnb result = new Fnb(id, currentPrice, imageURL, name, type, suspended);
            return result;
        } catch (SQLException e) {
            System.out.println(e);
            return null;
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }

    public Boolean update(Fnb fnb)
            throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "UPDATE Fnb SET currentPrice = ?, imageURL = ?, name = ?, type = ? WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, fnb.currentPrice);
            statement.setString(2, fnb.imageURL);
            statement.setString(3, fnb.name);
            statement.setString(4, fnb.type);
            statement.setInt(5, fnb.id);
            statement.executeUpdate();
            return true;
        } catch (SQLException e) {
            System.out.println(e);
            return false;
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }

    public Boolean suspend(Integer id) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "UPDATE Fnb SET suspended  = ? WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setBoolean(1, true);
            statement.setInt(2, id);
            statement.executeUpdate();
            return true;
        } catch (SQLException e) {
            System.out.println(e);
            return false;
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }

    public Boolean unsuspend(Integer id) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "UPDATE Fnb SET suspended = ? WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setBoolean(1, false);
            statement.setInt(2, id);
            statement.executeUpdate();
            return true;
        } catch (SQLException e) {
            System.out.println(e);
            return false;
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }

    public Fnb findByFnb(String fnbItem) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM Fnb WHERE name = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, fnbItem);
            statement.setMaxRows(1);
            ResultSet resultSet = statement.executeQuery();
            if (!resultSet.next()) {
                return null;
            }
            Integer id = resultSet.getInt("id");
            Integer currentPrice = resultSet.getInt("currentPrice");
            String imageURL = resultSet.getString("imageURL");
            String name = resultSet.getString("name");
            String type = resultSet.getString("type");
            Boolean suspended = resultSet.getBoolean("suspended");
            Fnb result = new Fnb(id, currentPrice, imageURL, name, type, suspended);
            return result;
        } catch (SQLException e) {
            System.out.println(e);
            return null;
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }

    public ArrayList<Fnb> search(String q) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM Fnb WHERE name LIKE ?";
            PreparedStatement statement = connection.prepareStatement(query);
            System.out.println(q);
            statement.setString(1, "%" + q + "%");
            ResultSet resultSet = statement.executeQuery();
            ArrayList<Fnb> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer id = resultSet.getInt("id");
                Integer currentPrice = resultSet.getInt("currentPrice");
                String imageURL = resultSet.getString("imageURL");
                String name = resultSet.getString("name");
                String type = resultSet.getString("type");
                Boolean suspended = resultSet.getBoolean("suspended");
                // Convert the data into an object that can be sent back to boundary
                Fnb result = new Fnb(id, currentPrice, imageURL, name, type, suspended);
                results.add(result);
            }
            return results;
        } catch (SQLException e) {
            System.out.println(e);
            return null;
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }

}
