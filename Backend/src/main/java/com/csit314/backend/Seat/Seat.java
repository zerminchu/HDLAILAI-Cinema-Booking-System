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
    private String rowId = "";
    private Integer columnId = -1;
    private Boolean status = false;
    // Foreign Key to Hall table
    private Hall hallId = null;

    public Seat() {
        id = -1;
        rowId = "";
        columnId = -1;
        status = false;
        hallId = null;
    }

    // To accept existing profile ids
    public Seat(Integer id) {
        this.id = id;
    }

    // For new seat names
    public Seat(String rowId, Integer columnId, Hall hallId) {
        this.rowId = rowId;
        this.columnId = columnId;
        this.status = false;
        this.hallId = hallId;
    }

        // For updating seat names
        public Seat(String rowId, Integer columnId, Boolean status, Hall hallId) {
            this.rowId = rowId;
            this.columnId = columnId;
            this.status = status;
            this.hallId = hallId;
        }
    

    // To map the results from the database
    public Seat(Integer id, String rowId, Integer columnId, Boolean status, Hall hallId) {
        this.id = id;
        this.rowId = rowId;
        this.columnId = columnId;
        this.status = status;
        this.hallId = hallId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRowId() {
        return rowId;
    }

    public void setRowId(String rowId) {
        this.rowId = rowId;
    }

    public Integer getColumnId() {
        return columnId;
    }

    public void setColumnId(Integer columnId) {
        this.columnId = columnId;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Hall getHallId() {
        return hallId;
    }

    public void setHallId(Hall hallId) {
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
            String query = "INSERT INTO Seat (rowId, columnId, status, hallId) VALUES (?, ?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, seat.rowId);
            statement.setInt(2, seat.columnId);
            statement.setBoolean(3, seat.status);
            statement.setInt(4, seat.hallId.getId());

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
            String query = "SELECT * FROM Seat s INNER JOIN Halls h ON s.hallId = h.id";
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<Seat> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer seatId = resultSet.getInt("id");
                String rowId = resultSet.getString("rowId");
                Integer columnId = resultSet.getInt("columnId");
                Boolean status = resultSet.getBoolean("status");
                Integer hallId = resultSet.getInt("hallId");

                Hall hall = new Hall (hallId);
                // Convert the data into an object that can be sent back to boundary
                Seat result = new Seat (seatId, rowId, columnId, status, hall);
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
            String query = "SELECT FROM Seat s INNER JOIN Halls h ON s.hallId = h.id WHERE s.id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, id);
            statement.setMaxRows(1);
            ResultSet resultSet = statement.executeQuery();
            if (!resultSet.next()) {
                return null;
            }
            Integer seatId = resultSet.getInt("id");
            String rowId = resultSet.getString("rowId");
            Integer columnId = resultSet.getInt("columnId");
            Boolean status = resultSet.getBoolean("status");
            Integer hallId = resultSet.getInt("hallId");

            Hall hall = new Hall (hallId);
            Seat result = new Seat (seatId, rowId, columnId, status, hall);
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
            statement.setString(1, seat.rowId);
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
            String query = "UPDATE Seat SET status = ? WHERE id = ?";
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
            String query = "UPDATE Seat SET status = ? WHERE id = ?";
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

    public static Seat findBySeat(Boolean status) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT FROM Seat s INNER JOIN Halls h ON s.hallId = h.id WHERE status = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setBoolean(1, status);
            statement.setMaxRows(1);
            ResultSet resultSet = statement.executeQuery();
            if (!resultSet.next()) {
                return null;
            }
            Integer seatId = resultSet.getInt("id");
            String rowId = resultSet.getString("rowId");
            Integer columnId = resultSet.getInt("columnId");
            Boolean stats = resultSet.getBoolean("status");
            Integer hallId = resultSet.getInt("hallId");

            Hall hall = new Hall (hallId);
            Seat result = new Seat (seatId, rowId, columnId, stats, hall);
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
