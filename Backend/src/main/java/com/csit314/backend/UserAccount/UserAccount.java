package com.csit314.backend.UserAccount;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserAccount {
    // Checks if table has been created
    private static Boolean tableCreated = false;
    private Connection connection;
    private String name;
    private String email;
    private String password;
    private Boolean suspended;
    // Foreign Key to UserProfile table
    private Integer userProfileId;

    public UserAccount() throws SQLException {
        name = "";
        email = "";
        password = "";
        suspended = false;
        connectToDatabase("jdbc:mysql://localhost:3306/csit314", "test",
                "password");
    }

    public UserAccount(String email, String name, String password) throws SQLException {
        this.email = email;
        this.name = name;
        this.password = password;
        this.suspended = false;
        connectToDatabase("jdbc:mysql://localhost:3306/csit314", "test",
                "password");
        System.out.println("ok");
    }

    public void connectToDatabase(String url, String dbUsername, String dbPassword) throws SQLException {
        connection = DriverManager.getConnection(url, dbUsername, dbPassword);
        if (!tableCreated) {
            createUsersTable();
            tableCreated = true;
        }
    }

    public void createUsersTable() throws SQLException {
        String query = "CREATE TABLE IF NOT EXISTS users ("
                + "id INT AUTO_INCREMENT PRIMARY KEY,"
                + "email VARCHAR(255),"
                + "password VARCHAR(255),"
                + "name VARCHAR(255),"
                + "suspended BOOLEAN"
                + ")";
        PreparedStatement statement = connection.prepareStatement(query);
        statement.executeUpdate();
    }

    public String createUser() throws SQLException {
        // Return failure early incase of incomplete fields
        if (email == "" || password == "" || name == "") {
            // Close SQL connection when not in use
            closeConnection();
            return "Failure";
        }
        try {
            String query = "INSERT INTO users (email, password, name, suspended) VALUES (?, ?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, email);
            statement.setString(2, password);
            statement.setString(3, name);
            statement.setBoolean(4, suspended);
            statement.executeUpdate();
            return "Success";
        } catch (SQLException e) {
            System.out.println(e);
            return "Failure";
        } finally {
            // Close SQL connection when not in use
            closeConnection();
        }
    }

    public List<Map<String, String>> readAll() throws SQLException {
        try {
            String query = "SELECT * FROM users";
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<Map<String, String>> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                String email = resultSet.getString("email");
                String name = resultSet.getString("name");
                String password = resultSet.getString("password");
                Boolean suspended = resultSet.getBoolean("suspended");
                // Convert the data into a format that can be sent back to boundary
                HashMap<String, String> result = new HashMap<String, String>();
                result.put("email", email);
                result.put("name", name);
                result.put("password", password);
                result.put("suspended", suspended.toString());
                results.add(result);
            }
            return results;
        } catch (SQLException e) {
            System.out.println(e);
            return null;
        } finally {
            closeConnection();
        }
    }

    public String updateUser(String newEmail, String newPassword, String profile, Boolean suspended)
            throws SQLException {
        try {
            String query = "UPDATE users SET email = ?, password = ? WHERE email = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, newEmail);
            statement.setString(2, newPassword);
            statement.setString(3, email);
            statement.executeUpdate();
            email = newEmail;
            password = newPassword;
            return "Success";
        } catch (SQLException e) {
            System.out.println(e);
            return "Failure";
        } finally {
            closeConnection();
        }
    }

    public String deleteUser() throws SQLException {
        try {
            String query = "DELETE FROM users WHERE email = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, email);
            statement.executeUpdate();
            return "Success";
        } catch (SQLException e) {
            System.out.println(e);
            return "Failure";
        } finally {
            this.closeConnection();
        }
    }

    public void closeConnection() throws SQLException {
        if (connection != null) {
            connection.close();
        }
    }
}