package com.csit314.backend.MovieSession;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import java.util.ArrayList;
import com.csit314.backend.db.SQLConnection;

public class MovieSession {
    // TODO
    // Attributes
    private Integer id = -1;
    private Integer movieId = -1;
    private Integer hallId = -1;
    private Date date = null;
    private Time startTime = null;
    private Time endTime = null;

    // Constructors
    // Default Constructor
    public MovieSession() {
    }

    // Map Database results
    public MovieSession(Integer id, Integer movieId, Integer hallId, Date date, Time startTime, Time endTime) {
        this.id = id;
        this.movieId = movieId;
        this.hallId = hallId;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
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

    // SQL methods
    public String save(MovieSession movieSession) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "INSERT INTO Movie (movieId, hallId, date, startTime, endTime) VALUES (?, ?, ?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, movieId);
            statement.setInt(2, hallId);
            statement.setDate(3, date);
            statement.setTime(4, startTime);
            statement.setTime(5, endTime);
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

    public ArrayList<MovieSession> listAllByHall(Integer hallId) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM MovieSession WHERE hallId = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<MovieSession> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer id = resultSet.getInt("id");
                Integer movieId = resultSet.getInt("movieId");
                /* String hallId = resultSet.getString("hallId"); */
                Date date = resultSet.getDate("date");
                Time startTime = resultSet.getTime("runtime");
                Time endTime = resultSet.getTime("endTime");
                // Convert the data into an object that can be sent back to boundary
                MovieSession result = new MovieSession(id, movieId, hallId, date, startTime, endTime);
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
