package com.csit314.backend.TicketType;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.ArrayList;
import com.csit314.backend.db.SQLConnection;
import com.csit314.backend.Hall.Hall;
import com.csit314.backend.Movie.Movie;
import com.csit314.backend.Seat.Seat;
import com.csit314.backend.UserAccount.UserAccount;


public class TicketType {
    private Integer id = -1;
    private String typeName = "";
    private Integer price = -1;

    public TicketType() {
        id = -1;
        typeName = "";
        price = -1;
    }

    // To accept existing profile ids
    public TicketType(Integer id) {
        this.id = id;
    }

    public TicketType(String typeName, Integer price) {
        this.typeName = typeName;
        this.price = price;
    }

    public TicketType(Integer id, String typeName, Integer price) {
        this.id = id;
        this.typeName = typeName;
        this.price = price;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public Integer price() {
        return price;
    }

    public void price(Integer price) {
        this.price = price;
    }


    public static String save(TicketType ticketType) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "INSERT INTO TicketType (typeName, price) VALUES (?, ?)";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, ticketType.typeName);
            statement.setInt(2, ticketType.price);

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

    public static ArrayList<TicketType> listAll() throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM TicketType";
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<TicketType> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer id = resultSet.getInt("id");
                String typeName = resultSet.getString("typeName");
                Integer price = resultSet.getInt("price");

                // Convert the data into an object that can be sent back to boundary
                TicketType result = new TicketType(id, typeName, price);
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



