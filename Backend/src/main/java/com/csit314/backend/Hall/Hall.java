package com.csit314.backend.Hall;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import com.csit314.backend.db.SQLConnection;

public class Hall {
    // Checks if table has been created
    private Integer id = -1;
    private String name = "";
    private String status = "";
    private Integer totalRow = -1;
    private Integer totalColumn = -1;

    public Hall() {
        id = -1;
        name = "";
        status = "";
        totalRow = 1;
        totalColumn = 1;

    }

    // To accept existing profile ids
    public Hall(Integer id) {
        this.id = id;
    }

    // To map the results from the database
    public Hall(Integer id, String name, String status, Integer totalRow, Integer totalColumn) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.totalRow = totalRow;
        this.totalColumn = totalColumn;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getTotalRow() {
        return totalRow;
    }

    public void setTotalRow(Integer totalRow) {
        this.totalRow = totalRow;
    }

    public Integer getTotalColumn() {
        return totalColumn;
    }

    public void setTotalColumn(Integer totalColumn) {
        this.totalColumn = totalColumn;
    }

    public static String save(Hall createHall) throws SQLException {
        // Return failure early incase of incomplete fields
        if (createHall.name == "") {
            return "Failure";
        }
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "INSERT INTO Hall (name) VALUES (?)";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, createHall.name);
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

    public static ArrayList<Hall> listAll() throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM Hall";
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<Hall> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer id = resultSet.getInt("id");
                String name = resultSet.getString("name");
                String status = resultSet.getString("status");
                Integer totalRow = resultSet.getInt("totalRow");
                Integer totalColumn = resultSet.getInt("totalColumn");
                // Convert the data into an object that can be sent back to boundary
                Hall result = new Hall(id, name, status, totalRow, totalColumn);
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
    public static Hall get(Integer id) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM Hall WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, id);
            statement.setMaxRows(1);
            ResultSet resultSet = statement.executeQuery();
            if (!resultSet.next()) {
                return null;
            }
            String name = resultSet.getString("name");
            String status = resultSet.getString("status");
            Integer totalRow = resultSet.getInt("totalRow");
            Integer totalColumn = resultSet.getInt("totalColumn");
            Hall result = new Hall(id, name, status, totalRow, totalColumn);
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

    public static Boolean update(Hall hallUpdate)
            throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "UPDATE Hall SET name = ? WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, hallUpdate.name);
            statement.setInt(2, hallUpdate.id);
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

    public static Boolean updateNumberOfSeats(Hall hall)
            throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "UPDATE Hall SET totalRow = ?, totalColumn = ? WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);

            statement.setInt(1, hall.totalRow);
            statement.setInt(2, hall.totalColumn);
            statement.setInt(3, hall.id);
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

    public static Boolean suspend(Integer id) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "UPDATE Hall SET status = ? WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, "Not Available");
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

    public static Boolean unsuspend(Integer id) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "UPDATE Hall SET status = ? WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, "Available");
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

    public static Hall findByHall(String hallName) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM Hall WHERE name = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, hallName);
            statement.setMaxRows(1);
            ResultSet resultSet = statement.executeQuery();
            if (!resultSet.next()) {
                return null;
            }
            Integer id = resultSet.getInt("id");
            String name = resultSet.getString("name");
            String status = resultSet.getString("status");
            Integer totalRow = resultSet.getInt("totalRow");
            Integer totalColumn = resultSet.getInt("totalColumn");
            Hall result = new Hall(id, name, status, totalRow, totalColumn);
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

    public static ArrayList<Hall> search(String q) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM Hall WHERE name LIKE ?";
            PreparedStatement statement = connection.prepareStatement(query);
            System.out.println(q);
            statement.setString(1, "%" + q + "%");
            ResultSet resultSet = statement.executeQuery();
            ArrayList<Hall> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer id = resultSet.getInt("id");
                String name = resultSet.getString("name");
                String status = resultSet.getString("status");
                Integer totalRow = resultSet.getInt("totalRow");
                Integer totalColumn = resultSet.getInt("totalColumn");
                Hall result = new Hall(id, name, status, totalRow, totalColumn);
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
