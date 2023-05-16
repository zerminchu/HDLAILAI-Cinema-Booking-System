package com.csit314.backend.CinemaOwner;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.sql.Timestamp;
import com.csit314.backend.Transaction.Transaction;

import com.csit314.backend.db.SQLConnection;

public class CinemaOwner {
    private Integer id = -1;
    private Timestamp date = null; 
    private String reportType = "";
    private Timestamp startTime = null;
    private Timestamp endTime = null; 

    //Foreign key to transaction
    private Integer transactionId = -1;

    public CinemaOwner(){
        id = -1;
        date = null;
        reportType = "";
        startTime = null;
        endTime = null;
        transactionId = -1;
    }

    public CinemaOwner(Integer id) {
        this.id = id;
    }

    public CinemaOwner(Integer id, Timestamp date, 
                            String reportType, Timestamp startTime, Timestamp endTime,Integer transactionId) {
        this.id = id;
        this.date = date;
        this.reportType = reportType;
        this.startTime = startTime;
        this.endTime = endTime;
        this.transactionId = transactionId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public String getReportType() {
        return reportType;
    }

    public void setReportType(String reportType) {
        this.reportType = reportType;
    }

    public Timestamp getStartTime() {
        return startTime;
    }

    public void setStartTime(Timestamp startTime) {
        this.startTime = startTime;
    }

    public Timestamp getEndTime() {
        return endTime;
    }

    public void setEndTime(Timestamp endTime) {
        this.endTime = endTime;
    }

    public Integer getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Integer transactionId) {
        this.transactionId = transactionId;
    }

    private ArrayList<Transaction> getSales(Timestamp startTime, Timestamp endTime) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM Transaction WHERE dateTime >= ? AND dateTime <= ?";

            /*String query = "SELECT ticketType, COUNT(*) AS count, SUM(price) AS totalAmount " +
                "FROM Transaction " +
                "WHERE dateTime >= ? AND dateTime <= ? " +
                "GROUP BY ticketType";
            */

            PreparedStatement statement = connection.prepareStatement(query);
            statement.setTimestamp(1, startTime);
            statement.setTimestamp(2, endTime);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<Transaction> results = new ArrayList<>();
            while (resultSet.next()) {
                Integer transactionId = resultSet.getInt("id");

                Transaction result = new Transaction(transactionId);
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