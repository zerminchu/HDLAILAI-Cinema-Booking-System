package com.csit314.backend.UserAccount;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import com.csit314.backend.db.SQLConnection;

public class UserAccount {
    // Checks if table has been created
    private Integer accountId = -1;
    private String name = "";
    private String email = "";
    private String password = "";
    private Boolean suspended = false;
    // Foreign Key to UserProfile table
    private Integer profileId = -1;

    public UserAccount() {
        name = "";
        email = "";
        password = "";
        suspended = false;
        profileId = -1;
    }

    // For new users, suspended will always default to false
    public UserAccount(String name, String email, String password, Integer profileId) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.profileId = profileId;
        this.suspended = false;
    }

    // To map the results from the database
    public UserAccount(String name, String email, String password, Boolean suspended, Integer profileId) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.suspended = suspended;
        this.profileId = profileId;
    }

    // To hold login details
    public UserAccount(String email, String password, Integer userProfileId) throws SQLException {
        this.email = email;
        this.password = password;
        this.profileId = userProfileId;
    }

    public Integer getAccountidId() {
        return accountId;
    }

    public void setAccountId(Integer id) {
        this.accountId = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSuspended(Boolean suspended) {
        this.suspended = suspended;
    }

    public Boolean getSuspended() {
        return suspended;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getUserProfile() {
        return profileId;
    }

    public void setUserProfile(Integer profileId) {
        this.profileId = profileId;
    }

    public static String createUser(UserAccount user) throws SQLException {
        // Return failure early incase of incomplete fields
        if (user.email == "" || user.password == "" || user.name == "" || user.profileId == -1) {
            return "Failure";
        }
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "INSERT INTO users (email, password, name, profileId, suspended) VALUES (?, ?, ?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, user.email);
            statement.setString(2, user.password);
            statement.setString(3, user.name);
            statement.setInt(4, user.profileId);
            statement.setBoolean(5, user.suspended);
            statement.executeUpdate();
            return "Success";
        } catch (SQLException e) {
            System.out.println(e);
            return "Failure";
        } finally {
            // Close SQL connection when not in use
            if (connection != null) {
                connection.close();
            }
        }
    }

    public static ArrayList<UserAccount> listAll() throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM users";
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<UserAccount> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                String email = resultSet.getString("email");
                String name = resultSet.getString("name");
                String password = resultSet.getString("password");
                Boolean suspended = resultSet.getBoolean("suspended");
                Integer profileId = resultSet.getInt("userProfileId");
                // Convert the data into an object that can be sent back to boundary
                UserAccount result = new UserAccount(email, name, password, suspended, profileId);
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
    public static UserAccount get(Integer accountId) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT FROM users WHERE accountId = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, accountId);
            statement.setMaxRows(1);
            ResultSet resultSet = statement.executeQuery();
            if (!resultSet.next()) {
                return null;
            }
            String email = resultSet.getString("email");
            String name = resultSet.getString("name");
            String password = resultSet.getString("password");
            Boolean suspended = resultSet.getBoolean("suspended");
            Integer profileId = resultSet.getInt("userProfileId");
            UserAccount result = new UserAccount(email, name, password, suspended, profileId);
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

    public static Boolean update(UserAccount user)
            throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "UPDATE users SET name= ?, email= ?, password= ?, profileId= ? WHERE accountId = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, user.name);
            statement.setString(2, user.email);
            statement.setString(3, user.password);
            statement.setInt(4, user.profileId);
            statement.setInt(4, user.accountId);
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

    public static Boolean suspend(Integer accountId) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "UPDATE users SET suspended = ? WHERE accountId = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setBoolean(1, true);
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

    public static Boolean unsuspend(Integer accountId) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "UPDATE users SET suspended = ? WHERE accountId = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setBoolean(1, false);
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
}