package com.csit314.backend.MovieSession;

import java.sql.Connection;
import java.sql.Timestamp;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import com.csit314.backend.db.SQLConnection;

public class MovieSession {
    // Attributes
    private Integer id = -1;
    private Integer movieId = -1;
    private Integer hallId = -1;
    private Boolean suspended = false;
    private Timestamp startDateTime = null;
    private Timestamp endDateTime = null;

    // Constructors
    // Default Constructor
    public MovieSession() {
    }

    public MovieSession(Integer movieId, Integer hallId, Timestamp startDateTime,
            Timestamp endDateTime) {
        this.movieId = movieId;
        this.hallId = hallId;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
    }

    // Map Database results
    public MovieSession(Integer id, Integer movieId, Integer hallId, Boolean suspended,
            Timestamp startDateTime,
            Timestamp endDateTime) {
        this.id = id;
        this.movieId = movieId;
        this.hallId = hallId;
        this.suspended = suspended;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
    }

    public MovieSession(Integer id) {
        this.id = id;
    }

    // Getters/Setters
    public Integer getId() {
        return id;
    }

    public Integer getMovieId() {
        return movieId;
    }

    public Integer getHallId() {
        return hallId;
    }

    public Boolean getSuspended() {
        return suspended;
    }

    public Timestamp getStartDateTime() {
        return startDateTime;
    }

    public Timestamp getEndDateTime() {
        return endDateTime;
    }

    // SQL methods
    public static String save(MovieSession movieSession) throws SQLException {
        if (movieSession.hallId == -1 || movieSession.movieId == -1
                || movieSession.startDateTime == null || movieSession.endDateTime == null) {
            System.out.println(movieSession.hallId);
            System.out.println(movieSession.movieId);
            System.out.println(movieSession.startDateTime);
            System.out.println(movieSession.endDateTime);
            return "Movie Session is incomplete";
        }
        if (movieSession.startDateTime.getTime() > movieSession.endDateTime.getTime()) {
            return "Start Time is after End Time";
        }
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            PreparedStatement stmt = connection.prepareStatement(
                    "SELECT * FROM MovieSession WHERE hallId = ? AND startDateTime < ? AND endDateTime > ?");
            stmt.setInt(1, movieSession.hallId);
            stmt.setTimestamp(2, movieSession.endDateTime);
            stmt.setTimestamp(3, movieSession.startDateTime);
            stmt.setMaxRows(1);
            ResultSet rs = stmt.executeQuery();

            if (rs.next() && rs.getInt(1) > 0) {
                // There is an existing movie session
                // in the same hall with an overlapping Timestamp range
                return "Movie Session is overlapping";
            }
            String query = "INSERT INTO MovieSession (movieId, hallId, suspended, startDateTime, endDateTime) VALUES (?, ?, ?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, movieSession.movieId);
            statement.setInt(2, movieSession.hallId);
            statement.setBoolean(3, movieSession.suspended);
            statement.setTimestamp(4, movieSession.startDateTime);
            statement.setTimestamp(5, movieSession.endDateTime);
            statement.executeUpdate();
            return "Success";
        } catch (SQLException e) {
            System.out.println(e);
            return null;
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }

    public static MovieSession get(Integer id) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM MovieSession WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, id);
            statement.setMaxRows(1);
            ResultSet resultSet = statement.executeQuery();
            if (!resultSet.next()) {
                return null;
            }
            Integer hallId = resultSet.getInt("hallId");
            Integer movieId = resultSet.getInt("movieId");
            Boolean suspended = resultSet.getBoolean("suspended");
            Timestamp startDateTime = resultSet.getTimestamp("startDateTime");
            Timestamp endDateTime = resultSet.getTimestamp("endDateTime");
            // Convert the data into an object that can be sent back to boundary
            MovieSession result = new MovieSession(id, movieId, hallId, suspended, startDateTime, endDateTime);
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

    public static ArrayList<MovieSession> listAll() throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM MovieSession";
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<MovieSession> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer id = resultSet.getInt("id");
                Integer hallId = resultSet.getInt("hallId");
                Integer movieId = resultSet.getInt("movieId");
                Boolean suspended = resultSet.getBoolean("suspended");
                Timestamp startDateTime = resultSet.getTimestamp("startDateTime");
                Timestamp endDateTime = resultSet.getTimestamp("endDateTime");
                // Convert the data into an object that can be sent back to boundary
                MovieSession result = new MovieSession(id, movieId, hallId, suspended, startDateTime,
                        endDateTime);
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

    public static ArrayList<MovieSession> listAllByHall(Integer hallId) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM MovieSession WHERE hallId = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, hallId);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<MovieSession> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer id = resultSet.getInt("id");
                Integer movieId = resultSet.getInt("movieId");
                Boolean suspended = resultSet.getBoolean("suspended");
                Timestamp startDateTime = resultSet.getTimestamp("startDateTime");
                Timestamp endDateTime = resultSet.getTimestamp("endDateTime");
                // Convert the data into an object that can be sent back to boundary
                MovieSession result = new MovieSession(id, movieId, hallId, suspended, startDateTime,
                        endDateTime);
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

    public static Boolean update(MovieSession movieSession)
            throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            PreparedStatement stmt = connection.prepareStatement(
                    "SELECT * FROM MovieSession WHERE hallId = ? AND id != ? AND startDateTime < ? AND endDateTime > ?");
            stmt.setInt(1, movieSession.hallId);
            stmt.setInt(2, movieSession.id);
            stmt.setTimestamp(3, movieSession.endDateTime);
            stmt.setTimestamp(4, movieSession.startDateTime);
            stmt.setMaxRows(1);
            ResultSet rs = stmt.executeQuery();
            if (rs.next() && rs.getInt(1) > 0) {
                // There is an existing movie session
                // in the same hall with an overlapping Timestamp range
                return false;
            }
            String query = "UPDATE MovieSession SET hallId = ?, movieId = ?, suspended = ?, startDateTime = ?, endDateTime = ? WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, movieSession.hallId);
            statement.setInt(2, movieSession.movieId);
            statement.setBoolean(3, movieSession.suspended);
            statement.setTimestamp(4, movieSession.startDateTime);
            statement.setTimestamp(5, movieSession.endDateTime);
            statement.setInt(6, movieSession.id);
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
            String query = "UPDATE MovieSession SET suspended = ? WHERE id = ?";
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
            String query = "UPDATE MovieSession SET suspended = ? WHERE id = ?";
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
