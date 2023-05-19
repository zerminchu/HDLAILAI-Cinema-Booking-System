package com.csit314.backend.UserProfile;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import com.csit314.backend.db.SQLConnection;

public class UserProfile {
    // Checks if table has been created
    private Integer id = -1;
    private String profileName = "";
    private String permission = "";
    private Boolean suspended = false;

    public UserProfile() {
        id = -1;
        profileName = "";
        permission = "";
        suspended = false;
    }

    // To accept existing profile ids
    public UserProfile(Integer id) {
        this.id = id;
    }

    // For updating userProfile names, only id and profileName are required
    public UserProfile(Integer id, String profileName) {
        this.id = id;
        this.profileName = profileName;
    }

    // For new profiles, suspended will always default to false
    public UserProfile(String profileName, String permission) {
        this.profileName = profileName;
        this.permission = permission;
        this.suspended = false;
    }

    // To map the results from the database
    public UserProfile(Integer id, String profileName, String permission, Boolean suspended) {
        this.id = id;
        this.profileName = profileName;
        this.permission = permission;
        this.suspended = suspended;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProfileName() {
        return profileName;
    }

    public void setProfileName(String profileName) {
        this.profileName = profileName;
    }

    public void setSuspended(Boolean suspended) {
        this.suspended = suspended;
    }

    public String getPermission() {
        return permission;
    }

    public Boolean getSuspended() {
        return suspended;
    }

    public String save(UserProfile userProfile) throws SQLException {
        System.out.println("Calling userprofile save method");
        // Return failure early incase of incomplete fields
        if (userProfile.profileName == "" || userProfile.permission == "") {
            return "Failure";
        }
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "INSERT INTO UserProfiles (profileName, permission, suspended) VALUES (?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, userProfile.profileName);
            statement.setString(2, userProfile.permission);
            // statement.setInt(3, userProfile.id);
            statement.setBoolean(3, userProfile.suspended);
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

    public ArrayList<UserProfile> listAll() throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM UserProfiles";
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<UserProfile> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer id = resultSet.getInt("id");
                String profileName = resultSet.getString("profileName");
                String permission = resultSet.getString("permission");
                Boolean suspended = resultSet.getBoolean("suspended");
                // Convert the data into an object that can be sent back to boundary
                UserProfile result = new UserProfile(id, profileName, permission, suspended);
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
    public UserProfile get(Integer id) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM UserProfiles WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, id);
            statement.setMaxRows(1);
            ResultSet resultSet = statement.executeQuery();
            if (!resultSet.next()) {
                return null;
            }
            String profileName = resultSet.getString("profileName");
            String permission = resultSet.getString("permission");
            Boolean suspended = resultSet.getBoolean("suspended");
            UserProfile result = new UserProfile(id, profileName, permission, suspended);
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

    public Boolean update(UserProfile userProfile)
            throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "UPDATE UserProfiles SET profileName= ? WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, userProfile.profileName);
            statement.setInt(2, userProfile.id);
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
            String query = "UPDATE UserProfiles SET suspended = ? WHERE id = ?";
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
            String query = "UPDATE UserProfiles SET suspended = ? WHERE id = ?";
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

    public UserProfile findByProfileName(String name) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM UserProfiles WHERE profileName = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, name);
            statement.setMaxRows(1);
            ResultSet resultSet = statement.executeQuery();
            if (!resultSet.next()) {
                return null;
            }
            Integer id = resultSet.getInt("id");
            String profileName = resultSet.getString("profileName");
            String permission = resultSet.getString("permission");
            Boolean suspended = resultSet.getBoolean("suspended");
            UserProfile result = new UserProfile(id, profileName, permission, suspended);
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

    public ArrayList<UserProfile> search(String q) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM UserProfiles WHERE profileName LIKE ?";
            PreparedStatement statement = connection.prepareStatement(query);
            System.out.println(q);
            statement.setString(1, "%" + q + "%");
            ResultSet resultSet = statement.executeQuery();
            ArrayList<UserProfile> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer id = resultSet.getInt("id");
                String profileName = resultSet.getString("profileName");
                String permission = resultSet.getString("permission");
                Boolean suspended = resultSet.getBoolean("suspended");
                // Convert the data into an object that can be sent back to boundary
                UserProfile result = new UserProfile(id, profileName, permission, suspended);
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