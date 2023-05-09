package com.csit314.backend.Transaction;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.sql.Timestamp;
import com.csit314.backend.db.SQLConnection;

public class Transaction {
    // Checks if table has been created
    private Integer id = -1;
    private Integer totalGrossPrice = 0;
    private Integer gst = 0;
    private Integer totalNetPrice = 0;
    private Timestamp dateTime = null;
    private String type = "";
    private Boolean cancelled = false;
    private Integer userAccountId = -1;

    public Transaction() {
        id = -1;
        totalGrossPrice = 0;
        gst = 0;
        totalNetPrice = 0;
        dateTime = null;
        type = "";
        cancelled = false;
        // Foreign Key to UserAccounts table
        userAccountId = -1;
    }

    // To accept existing Transaction ids
    public Transaction(Integer id) {
        this.id = id;
    }

    public Transaction(Integer totalGrossPrice, Integer gst, Integer totalNetPrice, Timestamp dateTime,
            String type, Integer userAccountId) {
        this.totalGrossPrice = totalGrossPrice;
        this.gst = gst;
        this.totalNetPrice = totalNetPrice;
        this.dateTime = dateTime;
        this.type = type;
        this.cancelled = false;
        this.userAccountId = userAccountId;
    }

    // To map the results from the database
    public Transaction(Integer id, Integer totalGrossPrice, Integer gst, Integer totalNetPrice, Timestamp dateTime,
            String type, Integer userAccountId) {
        this.id = id;
        this.totalGrossPrice = totalGrossPrice;
        this.gst = gst;
        this.totalNetPrice = totalNetPrice;
        this.dateTime = dateTime;
        this.type = type;
        this.cancelled = false;
        this.userAccountId = userAccountId;
    }

    public Transaction(Integer id, Integer totalGrossPrice, Integer gst, Integer totalNetPrice, Timestamp dateTime,
            String type, Boolean cancelled, Integer userAccountId) {
        this.id = id;
        this.totalGrossPrice = totalGrossPrice;
        this.gst = gst;
        this.totalNetPrice = totalNetPrice;
        this.dateTime = dateTime;
        this.type = type;
        this.cancelled = cancelled;
        this.userAccountId = userAccountId;
    }

    public Transaction(Integer id, Integer totalGrossPrice, Integer gst, Integer totalNetPrice, Timestamp dateTime,
            String type, Boolean cancelled) {
        this.id = id;
        this.totalGrossPrice = totalGrossPrice;
        this.gst = gst;
        this.totalNetPrice = totalNetPrice;
        this.dateTime = dateTime;
        this.type = type;
        this.cancelled = cancelled;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getTotalGrossPrice() {
        return totalGrossPrice;
    }

    public void setTotalGrossPrice(Integer totalGrossPrice) {
        this.totalGrossPrice = totalGrossPrice;
    }

    public Integer getGst() {
        return gst;
    }

    public void setGst(Integer gst) {
        this.gst = gst;
    }

    public Integer getTotalNetPrice() {
        return totalNetPrice;
    }

    public void setTotalNetPrice(Integer totalNetPrice) {
        this.totalNetPrice = totalNetPrice;
    }

    public Timestamp getDateTime() {
        return dateTime;
    }

    public void setDateTime(Timestamp dateTime) {
        this.dateTime = dateTime;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Boolean getCancelled() {
        return cancelled;
    }

    public void setCancelled(Boolean cancelled) {
        this.cancelled = cancelled;
    }

    public Integer getuserAccountId() {
        return userAccountId;
    }

    public void setuserAccountId(Integer userAccountId) {
        this.userAccountId = userAccountId;
    }

    public Integer save(Transaction createTransaction) throws SQLException {
        // Return failure early in case of incomplete fields
        if (createTransaction.userAccountId == -1) {
            return -1;
        }

        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "INSERT IGNORE INTO Transaction (totalGrossPrice, gst, totalNetPrice, dateTime, type, cancelled, userAccountId) VALUES (?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
            statement.setInt(1, createTransaction.totalGrossPrice);
            statement.setInt(2, createTransaction.gst);
            statement.setInt(3, createTransaction.totalNetPrice);
            statement.setTimestamp(4, createTransaction.dateTime);
            statement.setString(5, createTransaction.type);
            statement.setBoolean(6, createTransaction.cancelled);
            statement.setInt(7, createTransaction.userAccountId);
            System.out.println(createTransaction.totalGrossPrice);
                 System.out.println(createTransaction.gst);
                  System.out.println(createTransaction.totalNetPrice);
                        System.out.println(createTransaction.dateTime);
                          System.out.println( createTransaction.type);
                                    System.out.println(createTransaction.cancelled);
                                     System.out.println(createTransaction.userAccountId);
            statement.executeUpdate();
            ResultSet generatedKeyResult = statement.getGeneratedKeys();
            Integer lastInsertId = -1;
            System.out.println("hi");
            if (generatedKeyResult.next()) {
                       System.out.println("hi2");
                lastInsertId = generatedKeyResult.getInt(1);
            }
            return lastInsertId;
        } catch (SQLException e) {
            System.out.println(e);
            return -1;
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }

    public ArrayList<Transaction> listAll() throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM Transaction s INNER JOIN UserAccounts u ON s.userAccountId = u.id";
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<Transaction> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer transactionId = resultSet.getInt("id");
                Integer totalGrossPrice = resultSet.getInt("totalGrossPrice");
                Integer gst = resultSet.getInt("gst");
                Integer totalNetPrice = resultSet.getInt("totalNetPrice");
                Timestamp dateTime = resultSet.getTimestamp("dateTime");
                String type = resultSet.getString("type");
                Boolean cancelled = resultSet.getBoolean("cancelled");
                Integer userAccountId = resultSet.getInt("userAccountId");

                // Convert the data into an object that can be sent back to boundary
                Transaction result = new Transaction(transactionId, totalGrossPrice, gst, totalNetPrice, dateTime, type,
                        cancelled, userAccountId);
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

    // Find by specific userAccountId
    public ArrayList<Transaction> listAllByUserAccountId(Integer userAccountId) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM Transaction "
                    + "t INNER JOIN UserAccounts u "
                    + "ON t.userAccountId = u.id "
                    + "WHERE t.userAccountId = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, userAccountId);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<Transaction> results = new ArrayList<>();
            while (resultSet.next()) {
                Integer transactionId = resultSet.getInt("id");
                Integer totalGrossPrice = resultSet.getInt("totalGrossPrice");
                Integer gst = resultSet.getInt("gst");
                Integer totalNetPrice = resultSet.getInt("totalNetPrice");
                Timestamp dateTime = resultSet.getTimestamp("dateTime");
                String type = resultSet.getString("type");
                Boolean cancelled = resultSet.getBoolean("cancelled");

                Transaction result = new Transaction(transactionId, totalGrossPrice, gst, totalNetPrice, dateTime, type,
                        cancelled, userAccountId);
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
    public Transaction get(Integer id) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM Transaction WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, id);
            statement.setMaxRows(1);
            ResultSet resultSet = statement.executeQuery();

            if (!resultSet.next()) {
                System.out.println("dog1");
                System.out.println("No Transactions found");
                return null;
            }
            Integer totalGrossPrice = resultSet.getInt("totalGrossPrice");
            Integer gst = resultSet.getInt("gst");
            Integer totalNetPrice = resultSet.getInt("totalNetPrice");
            Timestamp dateTime = resultSet.getTimestamp("dateTime");
            String type = resultSet.getString("type");
            Boolean cancelled = resultSet.getBoolean("cancelled");

            // Convert the data into an object that can be sent back to boundary
            Transaction result = new Transaction(id, totalGrossPrice, gst, totalNetPrice, dateTime, type, cancelled);

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

    public Boolean update(Transaction updateTransaction)
            throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "UPDATE Transaction SET totalGrossPrice = ?, totalNetPrice = ?,  dateTime = ?, type = ? WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, updateTransaction.totalGrossPrice);
            statement.setInt(2, updateTransaction.totalNetPrice);
            statement.setTimestamp(3, updateTransaction.dateTime);
            statement.setString(4, updateTransaction.type);
            statement.setInt(5, updateTransaction.id); // Add this line to set the transaction ID parameter
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

    public Boolean cancel(Integer id) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "UPDATE Transaction SET cancelled = ? WHERE id = ?";
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

    public Boolean uncancel(Integer id) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "UPDATE Transaction SET cancelled = ? WHERE id = ?";
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

}
