package com.csit314.backend.TransactionItem;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import com.csit314.backend.db.SQLConnection;
import com.csit314.backend.Ticket.Ticket;
import com.csit314.backend.Fnb.Fnb;
import com.csit314.backend.Transaction.Transaction;

public class TransactionItem {
    // Checks if table has been created
    private Integer id = -1;
    private Integer paidPrice = -1;

    // Foreign Key to Ticket table
    private Ticket ticketId = null;

    // Foreign Key to fnb table
    private Fnb fnbId = null;

    // Foreign Key to transaction table
    private Transaction transactionId = null;

    public TransactionItem() {
        id = -1;
        paidPrice = -1;
        transactionId = null;
        ticketId = null;
        fnbId = null;
    }

    // To accept existing TransactionItem ids
    public TransactionItem(Integer id) {
        this.id = id;
    }

    // For updating TransactionItem names with Ticket only
    public TransactionItem(Integer paidPrice, Transaction transactionId, Ticket ticketId) {
        this.paidPrice = paidPrice;
        this.transactionId = transactionId;
        this.ticketId = ticketId;
    }

    // For updating TransactionItem names with fnb only
    public TransactionItem(Integer paidPrice, Transaction transactionId, Fnb fnbId) {
        this.paidPrice = paidPrice;
        this.transactionId = transactionId;
        this.fnbId = fnbId;
    }

    // To map the results from the database for Ticket
    public TransactionItem(Integer id, Integer paidPrice, Transaction transactionId, Ticket ticketId) {
        this.id = id;
        this.paidPrice = paidPrice;
        this.transactionId = transactionId;
        this.ticketId = ticketId;
    }

    // To map the results from the database for FnB
    public TransactionItem(Integer id, Integer paidPrice, Transaction transactionId, Fnb fnbId) {
        this.id = id;
        this.paidPrice = paidPrice;
        this.transactionId = transactionId;
        this.fnbId = fnbId;
    }

    // To map the results from the database
    public TransactionItem(Integer id, Integer paidPrice, Transaction transactionId, Ticket ticketId, Fnb fnbId) {
        this.id = id;
        this.paidPrice = paidPrice;
        this.transactionId = transactionId;
        this.ticketId = ticketId;
        this.fnbId = fnbId;
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

    public Transaction getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Transaction transactionId) {
        this.transactionId = transactionId;
    }

    public Ticket getTicketId() {
        return ticketId;
    }

    public void setTicketId(Ticket ticketId) {
        this.ticketId = ticketId;
    }

    public Fnb getFnbId() {
        return fnbId;
    }

    public void setFnbId(Fnb fnbId) {
        this.fnbId = fnbId;
    }

    // Save TransactionItem with ticket
    public String save(TransactionItem transactionItem) throws SQLException {
        // Return failure early incase of incomplete fields
        if (transactionItem.paidPrice == null) {
            return "Failure";
        }
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "INSERT INTO TransactionItem (paidPrice, transactionId, ticketId) VALUES (?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, transactionItem.paidPrice);
            statement.setInt(2, transactionItem.transactionId.getId());
            statement.setInt(3, transactionItem.ticketId.getId());

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

    // Save TransactionItem with fnb
    public String savefnb(TransactionItem transactionItem) throws SQLException {
        // Return failure early incase of incomplete fields
        if (transactionItem.paidPrice == null) {
            return "Failure";
        }
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "INSERT INTO TransactionItem (paidPrice, transactionId, fnbId) VALUES (?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, transactionItem.paidPrice);
            statement.setInt(2, transactionItem.transactionId.getId());
            statement.setInt(3, transactionItem.fnbId.getId());

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

    // List all ticket TransactionItem
    public ArrayList<TransactionItem> listAllTicket() throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM TransactionItem ti INNER JOIN Transaction t ON ti.transactionId = t.id WHERE ti.ticketId is not NULL";
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<TransactionItem> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer transactionItemId = resultSet.getInt("id");
                Integer paidPrice = resultSet.getInt("paidPrice");
                Integer transactionId = resultSet.getInt("transactionId");
                Integer ticketId = resultSet.getInt("ticketId");

                Transaction transaction = new Transaction(transactionId);
                Ticket ticket = new Ticket(ticketId);

                // Convert the data into an object that can be sent back to boundary
                TransactionItem result = new TransactionItem(transactionItemId, paidPrice, transaction, ticket);
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

    // List all fnb TransactionItem
    public ArrayList<TransactionItem> listAllFnb() throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM TransactionItem ti INNER JOIN Transaction t ON ti.transactionId = t.id WHERE ti.fnbId is not NULL";
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<TransactionItem> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer transactionItemId = resultSet.getInt("id");
                Integer paidPrice = resultSet.getInt("paidPrice");
                Integer transactionId = resultSet.getInt("transactionId");
                Integer fnbId = resultSet.getInt("fnbId");

                Transaction transaction = new Transaction(transactionId);
                Fnb fnb = new Fnb(fnbId);

                // Convert the data into an object that can be sent back to boundary
                TransactionItem result = new TransactionItem(transactionItemId, paidPrice, transaction, fnb);
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

    // list all with ticket n fnb
    public ArrayList<TransactionItem> listAll() throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM TransactionItem ti INNER JOIN Transaction t ON ti.transactionId = t.id";
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<TransactionItem> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer transactionItemId = resultSet.getInt("id");
                Integer paidPrice = resultSet.getInt("paidPrice");
                Integer transactionId = resultSet.getInt("transactionId");
                Integer ticketId = resultSet.getInt("ticketId");
                Integer fnbId = resultSet.getInt("fnbId");

                Transaction transaction = new Transaction(transactionId);
                Ticket ticket = new Ticket(ticketId);
                Fnb fnb = new Fnb(fnbId);

                // Convert the data into an object that can be sent back to boundary
                TransactionItem result = new TransactionItem(transactionItemId, paidPrice, transaction, ticket, fnb);
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
            String query = "SELECT * FROM TransactionItem ti INNER JOIN Transaction t ON ti.transactionId = t.id WHERE ti.id = ?";
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
            Integer ticketId = resultSet.getInt("ticketId");
            Integer fnbId = resultSet.getInt("fnbId");

            Transaction transaction = new Transaction(transactionId);
            Ticket ticket = new Ticket(ticketId);
            Fnb fnb = new Fnb(fnbId);

            // Convert the data into an object that can be sent back to boundary
            TransactionItem result = new TransactionItem(transactionItemId, paidPrice, transaction, ticket, fnb);
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
