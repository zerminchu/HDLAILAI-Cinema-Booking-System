package com.csit314.backend.Ticket;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import com.csit314.backend.TicketType.TicketType;
import com.csit314.backend.db.SQLConnection;

public class Ticket {

    private Integer id = -1; // PK
    private Integer movieSessionId = -1; // FK
    private Integer seatId = -1; // FK
    private Integer transactionId = -1; // FK
    private Integer ticketTypeId = -1;
    private Integer paidPrice = -1;
    private String ticketTypeName = "";

    public Ticket() {
        id = -1;
        movieSessionId = -1;
        seatId = -1;
        transactionId = -1;
        ticketTypeId = -1;
    }

    public Ticket(Integer id) {
        this.id = id;
    }

    public Ticket(Integer movieSessionId, Integer seatId,
            Integer ticketTypeId, Integer paidPrice) {
        this.movieSessionId = movieSessionId;
        this.seatId = seatId;
        this.ticketTypeId = ticketTypeId;
        this.paidPrice = paidPrice;
    }

    public Ticket(Integer movieSessionId, Integer seatId,
            Integer transactionId,
            Integer ticketTypeId, Integer paidPrice) {
        this.movieSessionId = movieSessionId;
        this.seatId = seatId;
        this.transactionId = transactionId;
        this.ticketTypeId = ticketTypeId;
        this.paidPrice = paidPrice;
    }

    public Ticket(Integer id, Integer movieSessionId, Integer seatId,
            Integer transactionId,
            Integer ticketTypeId, Integer paidPrice) {
        this.id = id;
        this.movieSessionId = movieSessionId;
        this.seatId = seatId;
        this.transactionId = transactionId;
        this.ticketTypeId = ticketTypeId;
        this.paidPrice = paidPrice;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getMovieSessionId() {
        return movieSessionId;
    }

    public void setMovieSessionId(Integer movieSessionId) {
        this.movieSessionId = movieSessionId;
    }

    public Integer getSeatId() {
        return seatId;
    }

    public void setSeatId(Integer seatId) {
        this.seatId = seatId;
    }

    public Integer getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Integer transactionId) {
        this.transactionId = transactionId;
    }

    public Integer getTicketTypeId() {
        return ticketTypeId;
    }

    public void setTicketTypeId(Integer ticketTypeId) {
        this.ticketTypeId = ticketTypeId;
    }

    public String getTicketTypeName() {
        return ticketTypeName;
    }

    public void setTicketTypeName(String ticketTypeName) {
        this.ticketTypeName = ticketTypeName;
    }

    public Integer getPaidPrice() {
        return paidPrice;
    }

    public void setPaidPrice(Integer paidPrice) {
        this.paidPrice = paidPrice;
    }

    public String save(Ticket ticket) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "INSERT INTO Ticket (movieSessionId, transactionId, seatId, ticketTypeId) VALUES (?, ?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, ticket.movieSessionId);
            statement.setInt(2, ticket.transactionId);
            statement.setInt(3, ticket.seatId);
            statement.setInt(4, ticket.ticketTypeId);
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

    public String saveAll(ArrayList<Ticket> tickets, Integer transactionId) throws SQLException {
        // Return failure early incase of incomplete fields
        if (tickets.size() == 0) {
            return "Failure";
        }
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "INSERT INTO Ticket (movieSessionId, transactionId, seatId, ticketTypeId, paidPrice) VALUES";
            for (int i = 0; i < tickets.size(); i++) {
                query += " (?, ?, ?, ?, ?),";
            }
            // Remove the trailing comma from the query string
            query = query.substring(0, query.length() - 1);
            PreparedStatement statement = connection.prepareStatement(query);
            int parameterIndex = 1;
            for (Ticket ticket : tickets) {
                statement.setInt(parameterIndex++, ticket.movieSessionId);
                statement.setInt(parameterIndex++, transactionId);
                statement.setInt(parameterIndex++, ticket.seatId);
                statement.setInt(parameterIndex++, ticket.ticketTypeId);
                statement.setInt(parameterIndex++, ticket.paidPrice);
            }
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

    public ArrayList<Ticket> listAll() throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM Ticket";
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<Ticket> results = new ArrayList<Ticket>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer id = resultSet.getInt("id");
                Integer movieSessionId = resultSet.getInt("movieSessionId");
                Integer transactionId = resultSet.getInt("transactionId");
                Integer seatId = resultSet.getInt("seatId");
                Integer ticketTypeId = resultSet.getInt("ticketTypeId");
                // Convert the data into an object that can be sent back to boundary
                Ticket result = new Ticket(id, movieSessionId, seatId, transactionId, ticketTypeId);
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
