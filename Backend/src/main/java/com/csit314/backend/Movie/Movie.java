package com.csit314.backend.Movie;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import com.csit314.backend.db.SQLConnection;

public class Movie {
    // Checks if table has been created
    private Integer id = -1;
    private String title = "";
    private String sypnosis = "";
    private String genre = "";
    private Integer runtime = -1;

    public Movie() {
        id = -1;
        title = "";
        sypnosis = "";
        genre = "";
        runtime = -1;

    }

    // To accept existing Movie ids
    public Movie(Integer id) {
        this.id = id;
    }

    // For updating movie names, only id and name are required
    public Movie (Integer id, String title, String sypnosis, String genre, Integer runtime) {
        this.id = id;
        this.title = title;
        this.sypnosis = sypnosis;
        this.genre = genre;
        this.runtime = runtime;
    }

    // For new profiles, suspended will always default to false
    public Movie (String title) {
        this.title = title;
    }

    // To map the results from the database
    public Movie (Integer id, String title, Integer runtime) {
        this.id = id;
        this.title = title;
        this.runtime = runtime;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSypnosis() {
        return sypnosis;
    }

    public void setSypnosis(String sypnosis) {
        this.sypnosis = sypnosis;
    }

    public String getGenre(String genre) {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Integer getRunTime(Integer runtime) {
        return runtime;
    }

    public void setRunTime(Integer runtime) {
        this.runtime = runtime;
    }

    public static String save(Movie createMovie) throws SQLException {
        // Return failure early incase of incomplete fields
        if (createMovie.title == "" || createMovie.runtime == null) {
            return "Failure";
        }
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "INSERT INTO Movie (title, sypnosis, genre, runtime) VALUES (?, ?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, createMovie.title);
            statement.setString(2, createMovie.sypnosis);
            statement.setString(3, createMovie.genre);
            statement.setInt(4, createMovie.runtime);
            statement.executeUpdate();
            return "Success";
        } catch (SQLException e) {
            System.out.println(e);
            return "Failure";
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }
    

    public static ArrayList<Movie> listAll() throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM Movie";
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<Movie> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer id = resultSet.getInt("id");
                String title = resultSet.getString("title");
                String sypnosis = resultSet.getString("sypnosis");
                String genre = resultSet.getString("genre");
                Integer runtime = resultSet.getInt("runtime");
                // Convert the data into an object that can be sent back to boundary
                Movie result = new Movie(id, title, sypnosis, genre, runtime);
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
    public static Movie get(Integer id) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM Movie WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, id);
            statement.setMaxRows(1);
            ResultSet resultSet = statement.executeQuery();
            if (!resultSet.next()) {
                return null;
            }
            String title = resultSet.getString("title");
            String sypnosis = resultSet.getString("sypnosis");
            String genre = resultSet.getString("genre");
            Integer runtime = resultSet.getInt("runtime");
            Movie result = new Movie(id, title, sypnosis, genre, runtime);
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

    public static Boolean update(Movie Movie)
            throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "UPDATE Movie SET title = ?, sypnosis = ?, genre = ?, runtime = ? WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, Movie.title);
            statement.setString(2, Movie.sypnosis);
            statement.setString(3, Movie.genre);
            statement.setInt(4, Movie.runtime);
            statement.setInt(5, Movie.id);
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

    public static Movie findByMovie(String movieName) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM Movie WHERE title = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, movieName);
            statement.setMaxRows(1);
            ResultSet resultSet = statement.executeQuery();
            if (!resultSet.next()) {
                return null;
            }
                Integer id = resultSet.getInt("id");
                String title = resultSet.getString("title");
                String sypnosis = resultSet.getString("sypnosis");
                String genre = resultSet.getString("genre");
                Integer runtime = resultSet.getInt("runtime");
                Movie result = new Movie(id, title, sypnosis, genre, runtime);
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
