package com.csit314.backend.Transaction;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.sql.Timestamp;
import com.csit314.backend.db.SQLConnection;

public class Transaction {
    // Checks if table has been created
    private Integer id = -1;
    private Double totalGrossPrice = 0.0;
    private Double gst = 0.0;
    private Double totalNetPrice = 0.0;
    private Timestamp dateTime = null;
    private String type = "";
    private Boolean cancelled = false;
    private Integer userAccountId = -1;

    public Transaction() {
        id = -1;
        totalGrossPrice = 0.0;
        gst = 0.0;
        totalNetPrice = 0.0;
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

    // To map the results from the database
    public Transaction(Integer id, Double totalGrossPrice, Double gst, Double totalNetPrice, Timestamp dateTime,
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

    public Transaction(Integer id, Double totalGrossPrice, Double gst, Double totalNetPrice, Timestamp dateTime,
            String type, Boolean cancellled, Integer userAccountId) {
        this.id = id;
        this.totalGrossPrice = totalGrossPrice;
        this.gst = gst;
        this.totalNetPrice = totalNetPrice;
        this.dateTime = dateTime;
        this.type = type;
        this.cancelled = cancellled;
        this.userAccountId = userAccountId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getTotalGrossPrice() {
        return totalGrossPrice;
    }

    public void setTotalGrossPrice(Double totalGrossPrice) {
        this.totalGrossPrice = totalGrossPrice;
    }

    public Double getGst() {
        return gst;
    }

    public void setGst(Double gst) {
        this.gst = gst;
    }

    public Double getTotalNetPrice() {
        return totalNetPrice;
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

    public static String save(Transaction createTransaction) throws SQLException {
        // Return failure early in case of incomplete fields
        if (createTransaction.userAccountId == null) {
            return "Failure";
        }
    
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "INSERT IGNORE INTO Transaction (totalGrossPrice, gst, totalNetPrice, dateTime, type, cancelled, userAccountId) VALUES (?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setDouble(1, createTransaction.totalGrossPrice);
            statement.setDouble(2, createTransaction.gst);
            statement.setDouble(3, createTransaction.totalNetPrice);
            statement.setTimestamp(4, createTransaction.dateTime);
            statement.setString(5, createTransaction.type);
            statement.setBoolean(6, createTransaction.cancelled);
            statement.setInt(7, createTransaction.userAccountId);
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
    

    public static ArrayList<Transaction> listAll() throws SQLException {
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
                Double totalGrossPrice = resultSet.getDouble("totalGrossPrice");
                Double gst = resultSet.getDouble("gst");
                Double totalNetPrice = resultSet.getDouble("totalNetPrice");
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
    public static ArrayList<Transaction> listAllByUserAccountId(Integer userAccountId) throws SQLException {
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
                Double totalGrossPrice = resultSet.getDouble("totalGrossPrice");
                Double gst = resultSet.getDouble("gst");
                Double totalNetPrice = resultSet.getDouble("totalNetPrice");
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
    public static Transaction get(Integer id) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM Transaction t INNER JOIN UserAccounts u ON t.userAccountId = u.id WHERE t.id = ? ";
            System.out.println(query);
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, id);
            statement.setMaxRows(1);
            ResultSet resultSet = statement.executeQuery();
            if (!resultSet.next()) {
                System.out.println("No Transactions found");
                return null;
            }
            Integer transactionId = resultSet.getInt("id");
            Double totalGrossPrice = resultSet.getDouble("totalGrossPrice");
            Double gst = resultSet.getDouble("gst");
            Double totalNetPrice = resultSet.getDouble("totalNetPrice");
            Timestamp dateTime = resultSet.getTimestamp("dateTime");
            String type = resultSet.getString("type");
            Boolean cancelled = resultSet.getBoolean("cancelled");
            Integer userAccountId = resultSet.getInt("userAccountId");

            // Convert the data into an object that can be sent back to boundary
            Transaction result = new Transaction(transactionId, totalGrossPrice, gst, totalNetPrice, dateTime, type,
                    cancelled, userAccountId);
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

    public static Boolean update(Transaction updateTransaction)
            throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "UPDATE Transaction SET totalGrossPrice = ?, totalNetPrice = ?,  dateTime = ?, type = ? WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setDouble(1, updateTransaction.totalGrossPrice);
            statement.setDouble(2, updateTransaction.totalNetPrice);
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

    public static Boolean cancel(Integer id) throws SQLException {
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

    public static Boolean uncancel(Integer id) throws SQLException {
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
