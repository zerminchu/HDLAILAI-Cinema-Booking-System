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
    // Foreign Key to UserAccount table
    private Integer accountId = -1;

    public UserProfile() {
        profileName = "";
        permission = "";
        suspended = false;
        accountId = -1;
    }

    // For new users, suspended will always default to false
    public UserProfile(String profileName, String permission, Integer accountId) {
        this.profileName = profileName;
        this.permission = permission;
        this.accountId = accountId;
        this.suspended = false;
    }

    // To map the results from the database
    public UserProfile(String profileName, String permission, Boolean suspended, Integer accountId) {
        this.profileName = profileName;
        this.suspended = suspended;
        this.accountId = accountId;
    }

/*     public UserProfile(String profileName, String permission, Integer useraccountId) throws SQLException {
        this.profileName = profileName;
        this.permission = permission;
        this.accountId = useraccountId;
    } */

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

    public Boolean getSuspended() {
        return suspended;
    }

    public Integer getUserAccount() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public static String createUserProfile(UserProfile userProfile) throws SQLException {
        // Return failure early incase of incomplete fields
        if (userProfile.profileName == "" || userProfile.permission == "" || userProfile.accountId == -1) {
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
            //statement.setInt(3, userProfile.id);
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

    public static ArrayList<UserProfile> listAll() throws SQLException {
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
                String email = resultSet.getString("email");
                String profileName = resultSet.getString("profileName");
                String password = resultSet.getString("password");
                Boolean suspended = resultSet.getBoolean("suspended");
                Integer id = resultSet.getInt("id");
                // Convert the data into an object that can be sent back to boundary
               // UserProfile result = new UserProfile(email, profileName, password, suspended, id);
                //results.add(result);
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
    public static UserProfile get(Integer id) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT FROM users WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(4, id);
            statement.setMaxRows(1);
            ResultSet resultSet = statement.executeQuery();
            if (!resultSet.next()) {
                return null;
            }
            String email = resultSet.getString("email");
            String profileName = resultSet.getString("profileName");
            String password = resultSet.getString("password");
            Boolean suspended = resultSet.getBoolean("suspended");
            Integer accountId = resultSet.getInt("useraccountId");
            UserProfile result = new UserProfile(email, profileName, password, suspended, accountId);
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

    public static Boolean update(UserProfile user)
            throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "UPDATE users SET profileName= ?, email= ?, password= ?, accountId= ? WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, user.profileName);
            statement.setString(2, user.email);
            statement.setString(3, user.password);
            statement.setInt(4, user.accountId);
            statement.setInt(4, user.id);
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
            String query = "UPDATE users SET suspended = ? WHERE id = ?";
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

    public static Boolean unsuspend(Integer id) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "UPDATE users SET suspended = ? WHERE id = ?";
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