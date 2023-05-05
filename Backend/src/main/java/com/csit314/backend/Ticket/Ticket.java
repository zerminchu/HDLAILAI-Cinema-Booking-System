package com.csit314.backend.Ticket;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import com.csit314.backend.db.SQLConnection;
import com.csit314.backend.Hall.Hall;
import com.csit314.backend.Movie.Movie;
import com.csit314.backend.Seat.Seat;
import com.csit314.backend.UserAccount.UserAccount;


public class Ticket {

    private Integer id = -1; //PK
    private Integer movieSessionId = -1; //FK
    private Integer seatId = -1;         //FK
    private Integer userAccountId = -1;  //FK

    private Integer bookingId = -1;
    private String ticketType = "";
    private Integer price = -1;
    
    public Ticket() {
        id = -1;
        movieSessionId = -1;
        seatId = -1;
        userAccountId = -1;
        bookingId = -1;
        ticketType = "";
        price = -1;
    }

    public Ticket(Integer id) {
        this.id = id;
    }

    public Ticket(Integer id, Integer movieSessionId, Integer seatId, 
                    Integer userAccountId, Integer bookingId, 
                    String ticketType, Integer price) {
        this.id = id;
        this.movieSessionId = movieSessionId;
        this.seatId = seatId;
        this.userAccountId = userAccountId;
        this.bookingId = bookingId;
        this.ticketType = ticketType;
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

    public Integer getUserAccountId() {
        return userAccountId;
    }

    public void setUserAccountId(Integer userAccountId) {
        this.userAccountId = userAccountId;
    }

    public Integer getBookingId() {
        return bookingId;
    }

    public void setBookingId(Integer bookingId) {
        this.bookingId = bookingId;
    }

    public String getTicketType() {
        return ticketType;
    }

    public void setTicketType(String ticketType) {
        this.ticketType = ticketType;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

//    public static String save(Ticket ticket) throws SQLException {
//         Connection connection = null;
//         try {
//             SQLConnection sqlConnection = new SQLConnection();
//             connection = sqlConnection.getConnection();
//             String query = "INSERT INTO Ticket (typeName, price) VALUES (?, ?)";
//             PreparedStatement statement = connection.prepareStatement(query);
//             statement.setString(1, ticketType.typeName);
//             statement.setInt(2, ticketType.price);

//             statement.executeUpdate();
//             return "Success";
//         } catch (SQLException e) {
//             System.out.println(e);
//             return "Failure";
//         } finally {
//             // Close SQL connection when not in use
//             if (connection != null) {
//                 connection.close();
//             }
//         }
//     } 
}
