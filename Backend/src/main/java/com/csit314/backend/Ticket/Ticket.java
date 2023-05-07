package com.csit314.backend.Ticket;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import com.csit314.backend.db.SQLConnection;

public class Ticket {

    private Integer id = -1; // PK
    private Integer movieSessionId = -1; // FK
    private Integer seatId = -1; // FK
    private Integer transactionItemId = -1; // FK
    private Integer ticketTypeId = -1;
    private Integer price = -1;

    public Ticket() {
        id = -1;
        movieSessionId = -1;
        seatId = -1;
        transactionItemId = -1;
        ticketTypeId = -1;
        price = -1;
    }

    public Ticket(Integer id) {
        this.id = id;
    }

    public Ticket(Integer id, Integer movieSessionId, Integer seatId,
            Integer transactionItemId,
            Integer ticketTypeId, Integer price) {
        this.id = id;
        this.movieSessionId = movieSessionId;
        this.seatId = seatId;
        this.transactionItemId = transactionItemId;
        this.ticketTypeId = ticketTypeId;
        this.price = price;
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

    public Integer getTransactionItemId() {
        return transactionItemId;
    }

    public void setTransactionItemId(Integer transactionItemId) {
        this.transactionItemId = transactionItemId;
    }

    public Integer getTicketTypeId() {
        return ticketTypeId;
    }

    public void setTicketTypeId(Integer ticketTypeId) {
        this.ticketTypeId = ticketTypeId;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String save(Ticket ticket) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "INSERT INTO Ticket (movieSessionId, transactionItemId, seatId, ticketTypeId, price) VALUES (?, ?, ?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, ticket.movieSessionId);
            statement.setInt(2, ticket.transactionItemId);
            statement.setInt(3, ticket.seatId);
            statement.setInt(4, ticket.ticketTypeId);
            statement.setInt(5, ticket.price);
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

}
