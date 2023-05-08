package com.csit314.backend.TransactionItem;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import com.csit314.backend.db.SQLConnection;
import com.csit314.backend.Fnb.Fnb;
import com.csit314.backend.Transaction.Transaction;

public class TransactionItem {
    // Checks if table has been created
    private Integer id = -1;
    private Integer paidPrice = -1;
    private Integer quantity = -1;

    // Foreign Key to fnb table
    private Integer fnbId = -1;
    private String fnbName = "";

    // Foreign Key to transaction table
    private Integer transactionId = -1;

    public TransactionItem() {
        id = -1;
        paidPrice = -1;
        quantity = -1;
        fnbId = -1;
        fnbName = "";
        transactionId = -1;
    }

    // To accept existing TransactionItem ids
    public TransactionItem(Integer id) {
        this.id = id;
    }

    // For updating TransactionItem names with fnb only
    public TransactionItem(Integer paidPrice, Integer transactionId, Integer quantity, Integer fnbId) {
        this.paidPrice = paidPrice;
        this.transactionId = transactionId;
        this.quantity = quantity;
        this.fnbId = fnbId;
    }

    // To map the results from the database for FnB
    public TransactionItem(Integer id, Integer paidPrice, Integer transactionId, Integer quantity, Integer fnbId) {
        this.id = id;
        this.paidPrice = paidPrice;
        this.transactionId = transactionId;
        this.quantity = quantity;
        this.fnbId = fnbId;
    }

    // To map the results from the database for FnB
    public TransactionItem(Integer id, Integer paidPrice, Integer transactionId, Integer quantity, Integer fnbId,
            String fnbName) {
        this.id = id;
        this.paidPrice = paidPrice;
        this.transactionId = transactionId;
        this.quantity = quantity;
        this.fnbId = fnbId;
        this.fnbName = fnbName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPaidPrice() {
        return paidPrice;
    }

    public void setPaidPrice(Integer paidPrice) {
        this.paidPrice = paidPrice;
    }

    public Integer getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Integer transactionId) {
        this.transactionId = transactionId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getFnbId() {
        return fnbId;
    }

    public void setFnbId(Integer fnbId) {
        this.fnbId = fnbId;
    }

    public String getFnbName() {
        return fnbName;
    }

    public void setFnbName(String fnbName) {
        this.fnbName = fnbName;
    }

    // Save TransactionItem with fnb
    public String save(TransactionItem transactionItem) throws SQLException {
        // Return failure early incase of incomplete fields
        if (transactionItem.paidPrice == -1 || transactionItem.quantity == -1) {
            return "Transaction Item is incomplete";
        }
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "INSERT INTO TransactionItem (paidPrice, transactionId, quantity, fnbId) VALUES (?, ?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, transactionItem.paidPrice);
            statement.setInt(2, transactionItem.transactionId);
            statement.setInt(3, transactionItem.quantity);
            statement.setInt(4, transactionItem.fnbId);

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

    // List all fnb TransactionItem
    public ArrayList<TransactionItem> listAll() throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM TransactionItem ti INNER JOIN Transaction t ON ti.transactionId = t.id INNER JOIN Fnb f ON ti.fnbId = f.id";
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<TransactionItem> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer transactionItemId = resultSet.getInt("id");
                Integer paidPrice = resultSet.getInt("paidPrice");
                Integer transactionId = resultSet.getInt("transactionId");
                Integer quantity = resultSet.getInt("quantity");
                Integer fnbId = resultSet.getInt("fnbId");
                String fnbName = resultSet.getString("fnbName");

                // Convert the data into an object that can be sent back to boundary
                TransactionItem result = new TransactionItem(transactionItemId, paidPrice,
                        transactionId, quantity, fnbId, fnbName);
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
    public TransactionItem get(Integer id) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM TransactionItem ti INNER JOIN Transaction t ON ti.transactionId = t.id INNER JOIN Fnb f ON ti.fnbId = f.id WHERE ti.id = ?";
            System.out.println(query);
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, id);
            statement.setMaxRows(1);
            ResultSet resultSet = statement.executeQuery();
            if (!resultSet.next()) {
                return null;
            }
            Integer transactionItemId = resultSet.getInt("id");
            Integer paidPrice = resultSet.getInt("paidPrice");
            Integer transactionId = resultSet.getInt("transactionId");
            Integer quantity = resultSet.getInt("quantity");
            Integer fnbId = resultSet.getInt("fnbId");
            String fnbName = resultSet.getString("fnbName");

            // Convert the data into an object that can be sent back to boundary
            TransactionItem result = new TransactionItem(transactionItemId, paidPrice,
                    transactionId, quantity, fnbId, fnbName);
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

    // List all fnb TransactionItem
    public ArrayList<TransactionItem> listAllByTransactionId(Integer transactionId) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM TransactionItem ti INNER JOIN Transaction t ON ti.transactionId = t.id INNER JOIN Fnb f ON ti.fnbId = f.id WHERE ti.transactionId = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, transactionId);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<TransactionItem> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer transactionItemId = resultSet.getInt("id");
                Integer paidPrice = resultSet.getInt("paidPrice");
                Integer tId = resultSet.getInt("transactionId");
                Integer quantity = resultSet.getInt("quantity");
                Integer fnbId = resultSet.getInt("fnbId");
                String fnbName = resultSet.getString("fnbName");

                // Convert the data into an object that can be sent back to boundary
                TransactionItem result = new TransactionItem(transactionItemId, paidPrice,
                        tId, quantity, fnbId, fnbName);
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
