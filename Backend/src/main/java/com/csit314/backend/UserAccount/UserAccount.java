package com.csit314.backend.UserAccount;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.apache.catalina.authenticator.SpnegoAuthenticator.AcceptAction;
import org.springframework.stereotype.Service;
import com.csit314.backend.UserProfile.UserProfile;
import com.csit314.backend.db.SQLConnection;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class UserAccount {
    // Checks if table has been created
    private Integer id = -1;
    private String name = "";
    private String email = "";
    private String password = "";
    private Boolean suspended = false;
    // Foreign Key to UserProfile table
    private UserProfile profile = null;

    public UserAccount() {
        name = "";
        email = "";
        password = "";
        suspended = false;
        profile = null;
    }

    // For new users, suspended will always default to false
    public UserAccount(String name, String email, String password, UserProfile profile) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.profile = profile;
        this.suspended = false;
    }

    // To map the results from the database
    public UserAccount(Integer id, String name, String email, String password, Boolean suspended, UserProfile profile) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.suspended = suspended;
        this.profile = profile;
    }

    // To hold login details
    public UserAccount(String email, String password, UserProfile profile) throws SQLException {
        this.email = email;
        this.password = password;
        this.profile = profile;
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

    public UserProfile getUserProfile() {
        return profile;
    }

    public void setUserProfile(UserProfile profile) {
        this.profile = profile;
    }

    public String save(UserAccount user) throws SQLException {
        // Return failure early incase of incomplete fields
        if (user.email == "" || user.password == "" || user.name == "" || user.profile == null) {
            return "Failure";
        }
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "INSERT INTO UserAccounts (email, password, name, profileId, suspended) VALUES (?, ?, ?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, user.email);
            statement.setString(2, user.password);
            statement.setString(3, user.name);
            statement.setInt(4, user.profile.getId());
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

    public String saveCust(UserAccount user) throws SQLException {

        // Return failure early incase of incomplete fields
        if (user.email == "" || user.password == "" || user.name == "") {
            return "Failure";
        }
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String firstQuery = "SELECT id FROM UserProfiles WHERE permission = 'Customer'";
            PreparedStatement firstPreparedStatement = connection.prepareStatement(firstQuery);
            ResultSet rs = firstPreparedStatement.executeQuery();
            Integer customerProfileId = -1;
            System.out.println("a");
            while (rs.next()) {
                customerProfileId = rs.getInt("id");
            }
            String query = "INSERT INTO UserAccounts (email, password, name, profileId, suspended) VALUES (?, ?, ?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, user.email);
            statement.setString(2, user.password);
            statement.setString(3, user.name);
            statement.setInt(4, customerProfileId);
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

    public ArrayList<UserAccount> listAll() throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT *,"
                    + " ua.id AS ua_id, up.id AS up_id,"
                    + " ua.name AS name, ua.email as email,"
                    + " ua.password AS password,"
                    + " up.permission AS permission, up.profileName AS profileName,"
                    + " ua.suspended AS ua_suspended, up.suspended AS up_suspended"
                    + " FROM UserAccounts ua"
                    + " INNER JOIN UserProfiles up"
                    + " ON ua.profileId = up.id";
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<UserAccount> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer accountId = resultSet.getInt("ua_id");
                String email = resultSet.getString("email");
                String name = resultSet.getString("name");
                String password = resultSet.getString("password");
                Boolean accountSuspended = resultSet.getBoolean("ua_suspended");
                Integer profileId = resultSet.getInt("up_id");
                String profileName = resultSet.getString("profileName");
                String permission = resultSet.getString("permission");
                Boolean profileSuspended = resultSet.getBoolean("up_suspended");
                UserProfile userProfile = new UserProfile(profileId, profileName, permission, profileSuspended);
                // Convert the data into an object that can be sent back to boundary
                UserAccount result = new UserAccount(accountId, email, name, password, accountSuspended, userProfile);
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
    public UserAccount get(Integer id) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT *,"
                    + " ua.id AS ua_id, up.id AS up_id,"
                    + " ua.name AS name, ua.email as email,"
                    + " ua.password AS password,"
                    + " up.permission AS permission, up.profileName AS profileName,"
                    + " ua.suspended AS ua_suspended, up.suspended AS up_suspended"
                    + " FROM UserAccounts ua"
                    + " INNER JOIN UserProfiles up"
                    + " ON ua.profileId = up.id"
                    + " WHERE ua.id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, id);
            statement.setMaxRows(1);
            ResultSet resultSet = statement.executeQuery();
            if (!resultSet.next()) {
                return null;
            }
            String email = resultSet.getString("email");
            String name = resultSet.getString("name");
            String password = resultSet.getString("password");
            Boolean ua_suspended = resultSet.getBoolean("ua_suspended");
            Integer profileId = resultSet.getInt("profileId");
            String permission = resultSet.getString("permission");
            String profileName = resultSet.getString("profileName");
            Boolean up_suspended = resultSet.getBoolean("up_suspended");
            UserProfile userProfile = new UserProfile(profileId, profileName, permission, up_suspended);
            UserAccount result = new UserAccount(id, email, name, password, ua_suspended, userProfile);
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

    // Read One
    public String login(UserAccount user) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT *,"
                    + " ua.id AS ua_id, up.id AS up_id,"
                    + " ua.name AS name, ua.email as email,"
                    + " ua.password AS password,"
                    + " up.permission AS permission, up.profileName AS profileName,"
                    + " ua.suspended AS ua_suspended, up.suspended AS up_suspended"
                    + " FROM UserAccounts ua"
                    + " INNER JOIN UserProfiles up"
                    + " ON ua.profileId = up.id"
                    + " WHERE ua.email = ? AND up.id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, user.email);
            statement.setInt(2, user.profile.getId());
            statement.setMaxRows(1);
            ResultSet resultSet = statement.executeQuery();
            if (!resultSet.next()) {
                return "User/Profile is invalid";
            }
            Integer accountId = resultSet.getInt("ua_id");
            String email = resultSet.getString("email");
            String name = resultSet.getString("name");
            String password = resultSet.getString("password");
            Boolean ua_suspended = resultSet.getBoolean("ua_suspended");
            Integer profileId = resultSet.getInt("profileId");
            String permission = resultSet.getString("permission");
            String profileName = resultSet.getString("profileName");
            Boolean up_suspended = resultSet.getBoolean("up_suspended");
            if (!user.password.equals(password)) {
                return "Incorrect Password";
            }
            if (ua_suspended) {
                return "User has been suspended.";
            }
            JwtBuilder builder = Jwts.builder();
            builder.claim("name", name)
                    .claim("role", permission)
                    .claim("profileName", profileName)
                    .claim("id", accountId);
            builder.setIssuer("csit314-project")
                    .setSubject(email);
            String secretKey = "csit314-software-development-methodologies";
            builder.signWith(Keys.hmacShaKeyFor(secretKey.getBytes()));
            String jwt = builder.compact();
            return jwt;
        } catch (SQLException e) {
            System.out.println(e);
            return "Error";
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }

    public Boolean update(UserAccount user)
            throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "UPDATE UserAccounts SET name= ?, email= ?, password= ?, profileId= ? WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, user.name);
            statement.setString(2, user.email);
            statement.setString(3, user.password);
            statement.setInt(4, user.profile.getId());
            statement.setInt(5, user.id);
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

    public Boolean updateCustomer(UserAccount user)
            throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "UPDATE UserAccounts SET name= ?, email= ?, password= ? WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, user.name);
            statement.setString(2, user.email);
            statement.setString(3, user.password);
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

    public Boolean suspend(Integer id) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "UPDATE UserAccounts SET suspended = ? WHERE id = ?";
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
            String query = "UPDATE UserAccounts SET suspended = ? WHERE id = ?";
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

    public UserAccount findByEmail(String email) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM UserAccounts WHERE email = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, email);
            statement.setMaxRows(1);
            ResultSet resultSet = statement.executeQuery();
            if (!resultSet.next()) {
                return null;
            }
            Integer id = resultSet.getInt("id");
            String password = resultSet.getString("password");
            String name = resultSet.getString("name");
            Boolean suspended = resultSet.getBoolean("suspended");

            UserAccount result = new UserAccount(id, password, name, name, suspended, profile);
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

}