package com.csit314.backend.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class SQLConnection {
        private static Boolean tablesCreated = false;
        private Connection con;

        public SQLConnection() throws SQLException {
                con = DriverManager.getConnection("jdbc:mysql://localhost:3306/csit314", "test",
                                "password");
                if (!tablesCreated) {
                        createTablesIfNotExists();
                }
        }

        public void createTablesIfNotExists() throws SQLException {
                String profileQuery = "CREATE TABLE IF NOT EXISTS UserProfiles ("
                                + "id INT AUTO_INCREMENT PRIMARY KEY,"
                                + "profileName VARCHAR(255),"
                                + "permission VARCHAR(255),"
                                + "suspended BOOLEAN"
                                + ")";

                String accountQuery = "CREATE TABLE IF NOT EXISTS UserAccounts ("
                                + "id INT AUTO_INCREMENT PRIMARY KEY,"
                                + "email VARCHAR(255),"
                                + "password VARCHAR(255),"
                                + "name VARCHAR(255),"
                                + "suspended BOOLEAN,"
                                + "profileId INT,"
                                + "CONSTRAINT FK_accountProfile FOREIGN KEY (profileId)"
                                + "REFERENCES UserProfiles(id)"
                                + ")";

                String hallQuery = "CREATE TABLE IF NOT EXISTS Hall ("
                                + "id INT AUTO_INCREMENT PRIMARY KEY,"
                                + "name VARCHAR(255),"
                                + "status VARCHAR(255),"
                                + "totalRow INT,"
                                + "totalColumn INT"
                                + ")";

                String seatQuery = "CREATE TABLE IF NOT EXISTS Seat ("
                                + "id INT AUTO_INCREMENT PRIMARY KEY,"
                                + "rowId INT,"
                                + "columnId INT,"
                                + "blocked BOOLEAN,"
                                + "hallId INT,"
                                + "UNIQUE KEY unique_row_col_hall (rowId, columnId, hallId),"
                                + "CONSTRAINT FK_hall FOREIGN KEY (hallId)"
                                + "REFERENCES Hall(id)"
                                + ")";

                String movieQuery = "CREATE TABLE IF NOT EXISTS Movie ("
                + "id INT AUTO_INCREMENT PRIMARY KEY,"
                + "title VARCHAR(255),"
                + "sypnosis VARCHAR(255),"
                + "genre VARCHAR(255),"
                + "runTime INT,"
                + "imageURL VARCHAR(255),"
                + "suspended BOOLEAN"
                + ")";

                String movieSessionQuery = "CREATE TABLE IF NOT EXISTS MovieSession ("
                                + "id INT AUTO_INCREMENT PRIMARY KEY,"
                                + "hallId INT,"
                                + "movieId INT,"
                                + "startTime TIME,"
                                + "endTime TIME,"
                                + "suspended BOOLEAN,"
                                + "date DATE,"
                                + "UNIQUE KEY unique_hall_date_startTime (hallId, date, startTime),"
                                + "CONSTRAINT FK_hall FOREIGN KEY (hallId)"
                                + "REFERENCES Hall(id),"
                                + "CONSTRAINT FK_movie FOREIGN KEY (movieId)"
                                + "REFERENCES Movie(id)"
                                + ")";
                /*
                 * String ticketQuery = "CREATE TABLE IF NOT EXISTS Tickets ("
                 * + "id INT AUTO_INCREMENT PRIMARY KEY,"
                 * + "bookingId VARCHAR(255),"
                 * + "ticketType VARCHAR(255),"
                 * + "price INT,"
                 * + "movieSessionId INT,"
                 * + "seatId INT,"
                 * +
                 * "CONSTRAINT FK_movieSession FOREIGN KEY (movieSessionId) REFERENCES MovieSession(id)"
                 * + "CONSTRAINT FK_seat FOREIGN KEY (seatId) REFERENCES Seat(id)"
                 * +
                 * "CONSTRAINT FK_userAccounts FOREIGN KEY (userAccountId) REFERENCES UserAccounts(id)"
                 * + ")";
                 */

                PreparedStatement profileStatement = con.prepareStatement(profileQuery);
                profileStatement.executeUpdate();

                PreparedStatement accountStatement = con.prepareStatement(accountQuery);
                accountStatement.executeUpdate();

                PreparedStatement hallStatement = con.prepareStatement(hallQuery);
                hallStatement.executeUpdate();

                PreparedStatement seatStatement = con.prepareStatement(seatQuery);
                seatStatement.executeUpdate();

                PreparedStatement movieStatement = con.prepareStatement(movieQuery);
                movieStatement.executeUpdate();

                PreparedStatement movieSessionStatement = con.prepareStatement(movieSessionQuery);
                movieSessionStatement.executeUpdate();
                /*
                 * PreparedStatement ticketStatement = con.prepareStatement(ticketQuery);
                 * ticketStatement.executeUpdate();
                 */

                tablesCreated = true;
                System.out.println("tables created");
        };

        public Connection getConnection() {
                return con;
        }
}
