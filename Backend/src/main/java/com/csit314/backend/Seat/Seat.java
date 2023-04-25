package com.csit314.backend.Seat;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import com.csit314.backend.db.SQLConnection;
import com.csit314.backend.Hall.Hall;

public class Seat {
    // Checks if table has been created
    private Integer id = -1;
    private Integer rowId = -1;
    private Integer columnId = -1;
    private Boolean blocked = false;
    // Foreign Key to Hall table
    private Integer hallId = -1;

    public Seat() {
        id = -1;
        rowId = -1;
        columnId = -1;
        blocked = false;
        hallId = -1;
    }

    // To accept existing profile ids
    public Seat(Integer id) {
        this.id = id;
    }

    // For new seat names
    public Seat(Integer rowId, Integer columnId, Integer hallId) {
        this.rowId = rowId;
        this.columnId = columnId;
        this.blocked = false;
        this.hallId = hallId;
    }

        // For updating seat names
        public Seat(Integer rowId, Integer columnId, Boolean blocked, Integer hallId) {
            this.rowId = rowId;
            this.columnId = columnId;
            this.blocked = blocked;
            this.hallId = hallId;
        }
    

    // To map the results from the database
    public Seat(Integer id, Integer rowId, Integer columnId, Boolean blocked, Integer hallId) {
        this.id = id;
        this.rowId = rowId;
        this.columnId = columnId;
        this.blocked = blocked;
        this.hallId = hallId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getRowId() {
        return rowId;
    }

    public void setRowId(Integer rowId) {
        this.rowId = rowId;
    }

    public Integer getColumnId() {
        return columnId;
    }

    public void setColumnId(Integer columnId) {
        this.columnId = columnId;
    }

    public Boolean getblocked() {
        return blocked;
    }

    public void setblocked(Boolean blocked) {
        this.blocked = blocked;
    }

    public Integer getHallId() {
        return hallId;
    }

    public void setHallId(Integer hallId) {
        this.hallId = hallId;
    }

    public static String save(Seat seat) throws SQLException {
        // Return failure early incase of incomplete fields
        if (seat.hallId == null) {
            return "Failure";
        }
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "INSERT INTO Seat (rowId, columnId, blocked, id) VALUES (?, ?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, seat.rowId);
            statement.setInt(2, seat.columnId);
            statement.setBoolean(3, seat.blocked);
            statement.setInt(4, seat.hallId);

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

    public static String saveAll(Seat[] seats) throws SQLException {
        // Return failure early incase of incomplete fields
        if (seats.length == 0) {
            return "Failure";
        }
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "INSERT INTO Seat (rowId, columnId, blocked, hallId) VALUES"; 
            for (int i = 1; i <= seats.length; i++) {
                query += " (?, ?, ?, ?),";
            }
            // Remove the trailing comma from the query string
            query = query.substring(0, query.length() - 1);
            PreparedStatement statement = connection.prepareStatement(query);
            int parameterIndex = 1;
            for (Seat seat : seats) {
                statement.setInt(parameterIndex++, seat.rowId);
                statement.setInt(parameterIndex++, seat.columnId);
                statement.setBoolean(parameterIndex++, seat.blocked);
                statement.setInt(parameterIndex++, seat.hallId);
                System.out.println(seat.rowId);
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

    public static ArrayList<Seat> listAll() throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM Seat s INNER JOIN Hall h ON s.hallId = h.id";
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<Seat> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer seatId = resultSet.getInt("id");
                Integer rowId = resultSet.getInt("rowId");
                Integer columnId = resultSet.getInt("columnId");
                Boolean blocked = resultSet.getBoolean("blocked");
                Integer hallId = resultSet.getInt("hallId");

                // Convert the data into an object that can be sent back to boundary
                Seat result = new Seat (seatId, rowId, columnId, blocked, hallId);
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

        public static ArrayList<Seat> listAllByHallId(Integer hallId) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM"
                + " Seat s INNER JOIN Hall h"
                + " ON s.hallId = h.id"
                + " WHERE s.hallId = ?"
                + " ORDER BY s.rowId, s.columnId ASC";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, hallId);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<Seat> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer seatId = resultSet.getInt("id");
                Integer rowId = resultSet.getInt("rowId");
                Integer columnId = resultSet.getInt("columnId");
                Boolean blocked = resultSet.getBoolean("blocked");

                // Convert the data into an object that can be sent back to boundary
                Seat result = new Seat (seatId, rowId, columnId, blocked, hallId);
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
    public static Seat get(Integer id) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM Seat s INNER JOIN Hall h ON s.hallId = h.id WHERE s.id = ?";
            System.out.println(query);
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, id);
            statement.setMaxRows(1);
            ResultSet resultSet = statement.executeQuery();
            if (!resultSet.next()) {
                System.out.println("No seats found");
                return null;
            }
            Integer seatId = resultSet.getInt("id");
            Integer rowId = resultSet.getInt("rowId");
            Integer columnId = resultSet.getInt("columnId");
            Boolean blocked = resultSet.getBoolean("blocked");
            Integer hallId = resultSet.getInt("hallId");

            Seat result = new Seat (seatId, rowId, columnId, blocked, hallId);
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

    public static Boolean update(Seat seat)
            throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "UPDATE Seat SET rowId= ?, columnId = ? WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, seat.rowId);
            statement.setInt(2, seat.columnId);
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
            String query = "UPDATE Seat SET blocked = ? WHERE id = ?";
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

    public static Boolean unsuspend(Integer id) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "UPDATE Seat SET blocked = ? WHERE id = ?";
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

    public static Seat findBySeat(Boolean blocked) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM Seat s INNER JOIN Halls h ON s.hallId = h.id WHERE blocked = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setBoolean(1, blocked);
            statement.setMaxRows(1);
            ResultSet resultSet = statement.executeQuery();
            if (!resultSet.next()) {
                return null;
            }
            Integer seatId = resultSet.getInt("id");
            Integer rowId = resultSet.getInt("rowId");
            Integer columnId = resultSet.getInt("columnId");
            Boolean stats = resultSet.getBoolean("blocked");
            Integer hallId = resultSet.getInt("hallId");
            Seat result = new Seat (seatId, rowId, columnId, stats, hallId);
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
