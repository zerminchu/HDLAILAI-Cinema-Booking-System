package com.csit314.backend.Report;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.sql.Date;
import com.csit314.backend.db.SQLConnection;

/* public class Report {
    private Integer id = -1;
    private Integer totalNetPrice = -1;
    private Timestamp hourly = null;
    private Date daily = null;
    private String weekly = "";
    private String type = "";

    public Report() {
        id = -1;
        totalNetPrice = -1;
        hourly = null;
        daily = null;
        weekly = null;
        type = "";
    }

    // To accept existing profile ids
    public Report(Integer id) {
        this.id = id;
    }

    public Report(Integer id, Integer totalNetPrice, Timestamp hourly, String type) {
        this.id = id;
        this.totalNetPrice = totalNetPrice;
        this.hourly = hourly;
        this.type = type;
    }

    public Report(Integer totalNetPrice, Timestamp hourly, String type) {
        this.totalNetPrice = totalNetPrice;
        this.hourly = hourly;
        this.type = type;
    }

    public Report(Integer totalNetPrice, Timestamp hourly) {
        this.totalNetPrice = totalNetPrice;
        this.hourly = hourly;
    }

    public Report(Integer id, Integer totalNetPrice, Date daily, String type) {
        this.id = id;
        this.totalNetPrice = totalNetPrice;
        this.daily = daily;
        this.type = type;
    }

    public Report(Integer totalNetPrice, Date daily, String type) {
        this.totalNetPrice = totalNetPrice;
        this.daily = daily;
        this.type = type;
    }

    public Report(Integer totalNetPrice, Date daily) {
        this.totalNetPrice = totalNetPrice;
        this.daily = daily;
    }

    public Report(Integer id, Integer totalNetPrice, String weekly, String type) {
        this.id = id;
        this.totalNetPrice = totalNetPrice;
        this.weekly = weekly;
        this.type = type;
    }

    public Report(Integer totalNetPrice, String weekly, String type) {
        this.totalNetPrice = totalNetPrice;
        this.weekly = weekly;
        this.type = type;
    }

    public Report(Integer totalNetPrice, String weekly) {
        this.totalNetPrice = totalNetPrice;
        this.weekly = weekly;
    }

    public Integer getid() {
        return id;
    }

    public void setid(Integer id) {
        this.id = id;
    }

    public Timestamp getHourly() {
        return hourly;
    }

    public void setHourly(Timestamp hourly) {
        this.hourly = hourly;
    }

    public Date getDaily() {
        return daily;
    }

    public void Date(Date daily) {
        this.daily = daily;
    }

    public String getWeekly() {
        return weekly;
    }

    public void setWeekly(String weekly) {
        this.weekly = weekly;
    }

    public Integer getTotalNetPrice() {
        return totalNetPrice;
    }

    public void setTotalNetPrice(Integer totalNetPrice) {
        this.totalNetPrice = totalNetPrice;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    // Save net price of all transaction per week save in format 2023-05-17 00:00:00
    public String saveHourlyReport() throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "INSERT INTO Report (totalNetPrice, hourly, type) SELECT totalNetPrice, DATE_FORMAT(dateTime, '%Y-%m-%d %H:00:00'), type FROM Transaction";
            PreparedStatement statement = connection.prepareStatement(query);

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

    // Save net price of all transaction per week save in format 2023-05-16
    // YYYY-mm-dd
    public String saveDailyReport() throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "INSERT INTO Report (totalNetPrice, daily, type) SELECT totalNetPrice, DATE(dateTime), type FROM Transaction";
            PreparedStatement statement = connection.prepareStatement(query);

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

    // Save net price of all transaction per week save in format 2023-20-01
    // YYYY-weeknumber-first day of month
    public String saveWeeklyReport() throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "INSERT INTO Report (totalNetPrice, weekly, type) " +
                    "SELECT totalNetPrice, DATE_FORMAT(dateTime, '%Y-%u-01'), type " +
                    "FROM Transaction";
            PreparedStatement statement = connection.prepareStatement(query);

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

    public ArrayList<Report> listAllByHour(Timestamp startTime, Timestamp endTime, String type) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT totalNetPrice, hourly FROM Report WHERE hourly >= DATE_FORMAT(?, '%Y-%m-%d %H:00:00') AND hourly <= DATE_FORMAT(?, '%Y-%m-%d %H:59:59') AND type = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setTimestamp(1, startTime);
            statement.setTimestamp(2, endTime);
            statement.setString(3, type);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<Report> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer totalNetPrice = resultSet.getInt("totalNetPrice");
                Timestamp hourly = resultSet.getTimestamp("hourly");
                // Convert the data into an object that can be sent back to boundary
                Report result = new Report(totalNetPrice, hourly);
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

    public ArrayList<Report> listAllByDay(Date day, String type) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT totalNetPrice, daily FROM Report WHERE daily = ? AND type = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setDate(1, day);
            statement.setString(2, type);
            System.out.println(daily);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<Report> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer totalNetPrice = resultSet.getInt("totalNetPrice");
                Date daily = resultSet.getDate("daily");
                System.out.println(daily);
                // Convert the data into an object that can be sent back to boundary
                Report result = new Report(totalNetPrice, daily);
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

    public ArrayList<Report> listAllByWeek(String weekly, String type) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT totalNetPrice, weekly FROM Report WHERE weekly = ? and type = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, weekly);
            statement.setString(2, type);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<Report> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer totalNetPrice = resultSet.getInt("totalNetPrice");
                String week = resultSet.getString("weekly");
                // Convert the data into an object that can be sent back to boundary
                Report result = new Report(totalNetPrice, week);
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
} */

public class Report {
    private Integer grossRevenueEarned = -1;
    private Integer numberSold = -1;
    private String itemName = "";

    public Report() {
        grossRevenueEarned = -1;
        numberSold = -1;
        itemName = "";
    }

    public Report(Integer grossRevenueEarned,
            Integer numberSold, String itemName) {
        this.grossRevenueEarned = grossRevenueEarned;
        this.numberSold = numberSold;
        this.itemName = itemName;
    }

    public void setGrossRevenueEarned(Integer grossRevenueEarned) {
        this.grossRevenueEarned = grossRevenueEarned;
    }

    public void setNumberSold(Integer numberSold) {
        this.numberSold = numberSold;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public Integer getGrossRevenueEarned() {
        return grossRevenueEarned;
    }

    public Integer getNumberSold() {
        return numberSold;
    }

    public String getItemName() {
        return itemName;
    }

    public ArrayList<Report> listAllTicketByHour(Timestamp startDateTime, Timestamp endDateTime) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT SUM(paidPrice) AS grossRevenueEarned, COUNT(typeName) AS numberSold, itemName"
                    + " FROM transaction txn "
                    + " INNER JOIN ticket tkt"
                    + " ON tkt.transactionId = txn.id"
                    + " INNER JOIN tickettype tt"
                    + " ON tkt.ticketTypeId = tt.id"
                    + " WHERE txn.dateTime <= ? AND txn.dateTime >= ?"
                    + " GROUP BY typeName";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setTimestamp(1, endDateTime);
            statement.setTimestamp(2, startDateTime);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<Report> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer grossRevenueEarned = resultSet.getInt("grossRevenueEarned");
                Integer numberSold = resultSet.getInt("numberSold");
                String itemName = resultSet.getString("itemName");
                // Convert the data into an object that can be sent back to boundary
                Report result = new Report(grossRevenueEarned, numberSold, itemName);
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

    public ArrayList<Report> listAllTicketByDay(Timestamp startDateTime, Timestamp endDateTime) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT SUM(paidPrice) AS grossRevenueEarned, COUNT(typeName) AS numberSold, itemName"
                    + " FROM transaction txn "
                    + " INNER JOIN ticket tkt"
                    + " ON tkt.transactionId = txn.id"
                    + " INNER JOIN tickettype tt"
                    + " ON tkt.ticketTypeId = tt.id"
                    + " WHERE txn.dateTime <= ? AND txn.dateTime >= ?"
                    + " GROUP BY typeName";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setTimestamp(1, endDateTime);
            statement.setTimestamp(2, startDateTime);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<Report> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer grossRevenueEarned = resultSet.getInt("grossRevenueEarned");
                Integer numberSold = resultSet.getInt("numberSold");
                String itemName = resultSet.getString("itemName");
                // Convert the data into an object that can be sent back to boundary
                Report result = new Report(grossRevenueEarned, numberSold, itemName);
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

    public ArrayList<Report> listAllTicketByWeek(Timestamp startDateTime, Timestamp endDateTime) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT SUM(paidPrice) AS grossRevenueEarned, COUNT(typeName) AS numberSold, typeName AS itemName"
                    + " FROM transaction txn "
                    + " INNER JOIN ticket tkt"
                    + " ON tkt.transactionId = txn.id"
                    + " INNER JOIN tickettype tt"
                    + " ON tkt.ticketTypeId = tt.id"
                    + " WHERE txn.dateTime <= ? AND txn.dateTime >= ?"
                    + " GROUP BY typeName";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setTimestamp(1, endDateTime);
            statement.setTimestamp(2, startDateTime);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<Report> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer grossRevenueEarned = resultSet.getInt("grossRevenueEarned");
                Integer numberSold = resultSet.getInt("numberSold");
                String itemName = resultSet.getString("itemName");
                // Convert the data into an object that can be sent back to boundary
                Report result = new Report(grossRevenueEarned, numberSold, itemName);
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

    public ArrayList<Report> listAllFnbByHour(Timestamp startDateTime, Timestamp endDateTime) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT SUM(paidPrice) AS grossRevenueEarned, COUNT(fnbName) AS numberSold, fnbName AS itemName"
                    + " FROM transaction txn"
                    + " INNER JOIN csit314.transactionitem ti"
                    + " ON ti.transactionId = txn.id"
                    + " WHERE txn.dateTime <= ? AND txn.dateTime >= ?"
                    + "GROUP BY itemName";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setTimestamp(1, endDateTime);
            statement.setTimestamp(2, startDateTime);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<Report> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer grossRevenueEarned = resultSet.getInt("grossRevenueEarned");
                Integer numberSold = resultSet.getInt("numberSold");
                String itemName = resultSet.getString("itemName");
                // Convert the data into an object that can be sent back to boundary
                Report result = new Report(grossRevenueEarned, numberSold, itemName);
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

    public ArrayList<Report> listAllFnbByDay(Timestamp startDateTime, Timestamp endDateTime) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT SUM(paidPrice) AS grossRevenueEarned, COUNT(fnbName) AS numberSold, fnbName AS itemName"
                    + " FROM transaction txn"
                    + " INNER JOIN csit314.transactionitem ti"
                    + " ON ti.transactionId = txn.id"
                    + " WHERE txn.dateTime <= ? AND txn.dateTime >= ?"
                    + "GROUP BY itemName";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setTimestamp(1, endDateTime);
            statement.setTimestamp(2, startDateTime);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<Report> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer grossRevenueEarned = resultSet.getInt("grossRevenueEarned");
                Integer numberSold = resultSet.getInt("numberSold");
                String itemName = resultSet.getString("itemName");
                // Convert the data into an object that can be sent back to boundary
                Report result = new Report(grossRevenueEarned, numberSold, itemName);
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

    public ArrayList<Report> listAllFnbByWeek(Timestamp startDateTime, Timestamp endDateTime) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT SUM(paidPrice) AS grossRevenueEarned, COUNT(fnbName) AS numberSold, fnbName AS itemName"
                    + " FROM transaction txn"
                    + " INNER JOIN csit314.transactionitem ti"
                    + " ON ti.transactionId = txn.id"
                    + " WHERE txn.dateTime <= ? AND txn.dateTime >= ?"
                    + " GROUP BY itemName";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setTimestamp(1, endDateTime);
            statement.setTimestamp(2, startDateTime);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<Report> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer grossRevenueEarned = resultSet.getInt("grossRevenueEarned");
                Integer numberSold = resultSet.getInt("numberSold");
                String itemName = resultSet.getString("itemName");
                // Convert the data into an object that can be sent back to boundary
                Report result = new Report(grossRevenueEarned, numberSold, itemName);
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