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

                String TicketTypeQuery = "CREATE TABLE IF NOT EXISTS TicketType ("
                                + "id INT AUTO_INCREMENT PRIMARY KEY,"
                                + "typeName VARCHAR(255),"
                                + "price INT"
                                + ")";

                String movieQuery = "CREATE TABLE IF NOT EXISTS Movie ("
                                + "id INT AUTO_INCREMENT PRIMARY KEY,"
                                + "title VARCHAR(255),"
                                + "synopsis VARCHAR(255),"
                                + "genre VARCHAR(255),"
                                + "runTime INT,"
                                + "imageURL VARCHAR(255),"
                                + "suspended BOOLEAN"
                                + ")";

                String movieSessionQuery = "CREATE TABLE IF NOT EXISTS MovieSession ("
                                + "id INT AUTO_INCREMENT PRIMARY KEY,"
                                + "hallId INT,"
                                + "movieId INT,"
                                + "startDateTime DATETIME,"
                                + "endDateTime DATETIME,"
                                + "suspended BOOLEAN,"
                                + "CONSTRAINT FK_hall_moviesession FOREIGN KEY (hallId)"
                                + "REFERENCES Hall(id),"
                                + "CONSTRAINT FK_movie_moviesession FOREIGN KEY (movieId)"
                                + "REFERENCES Movie(id)"
                                + ")";

                String fnbQuery = "CREATE TABLE IF NOT EXISTS Fnb ("
                                + "id INT AUTO_INCREMENT PRIMARY KEY,"
                                + "currentPrice INT,"
                                + "imageURL VARCHAR(255),"
                                + "name VARCHAR(255),"
                                + "type VARCHAR(255),"
                                + "suspended BOOLEAN"
                                + ")";

                String transactionQuery = "CREATE TABLE IF NOT EXISTS Transaction  ("
                                + "id INT AUTO_INCREMENT PRIMARY KEY,"
                                + "totalGrossPrice INT,"
                                + "gst INT,"
                                + "totalNetPrice INT,"
                                + "dateTime DATETIME,"
                                + "type VARCHAR(255),"
                                + "cancelled BOOLEAN,"
                                + "userAccountId INT,"
                                /* + "UNIQUE KEY unique_id_useraccount (userAccountId)," */
                                + "CONSTRAINT FK_useraccounts_transaction FOREIGN KEY (userAccountId)"
                                + "REFERENCES UserAccounts(id)"
                                + ")";

                String ticketQuery = "CREATE TABLE IF NOT EXISTS Ticket ("
                                + "id INT AUTO_INCREMENT PRIMARY KEY,"
                                + "movieSessionId INT,"
                                + "seatId INT,"
                                + "transactionId INT,"
                                + "ticketTypeId INT,"
                                + "paidPrice INT,"
                                + "CONSTRAINT FK_movieSession_ticket FOREIGN KEY (movieSessionId) REFERENCES MovieSession(id),"
                                + "CONSTRAINT FK_seat_ticket FOREIGN KEY (seatId) REFERENCES Seat(id),"
                                + "CONSTRAINT FK_transaction_ticket FOREIGN KEY (transactionId) REFERENCES Transaction(id),"
                                + "CONSTRAINT FK_ticketType_ticket FOREIGN KEY (ticketTypeId) REFERENCES TicketType(id)"
                                + ")";

                String customerInfoQuery = "CREATE TABLE IF NOT EXISTS CustomerInfo ("
                                + "id INT AUTO_INCREMENT PRIMARY KEY,"
                                + "dob VARCHAR(255),"
                                + "address VARCHAR(255),"
                                + "gender VARCHAR(255),"
                                + "accountId INT,"
                                + "CONSTRAINT FK_customerinfo_accountid FOREIGN KEY (accountId)"
                                + "REFERENCES UserAccounts(id)"
                                + ")";
                String transactionItemQuery = "CREATE TABLE IF NOT EXISTS TransactionItem ("
                                + "id INT AUTO_INCREMENT PRIMARY KEY,"
                                + "paidPrice INT,"
                                + "transactionId INT,"
                                + "quantity INT,"
                                + "fnbId INT,"
                                + "fnbName VARCHAR(255),"
                                + "CONSTRAINT FK_transactionitem_fnb FOREIGN KEY (fnbId)"
                                + "REFERENCES Fnb(id),"
                                + "CONSTRAINT FK_transactionitem_transaction FOREIGN KEY (transactionId)"
                                + "REFERENCES Transaction(id)"
                                + ")";

                PreparedStatement profileStatement = con.prepareStatement(profileQuery);
                profileStatement.executeUpdate();

                PreparedStatement accountStatement = con.prepareStatement(accountQuery);
                accountStatement.executeUpdate();

                PreparedStatement hallStatement = con.prepareStatement(hallQuery);
                hallStatement.executeUpdate();

                PreparedStatement seatStatement = con.prepareStatement(seatQuery);
                seatStatement.executeUpdate();

                PreparedStatement TicketTypeStatement = con.prepareStatement(TicketTypeQuery);
                TicketTypeStatement.executeUpdate();

                PreparedStatement movieStatement = con.prepareStatement(movieQuery);
                movieStatement.executeUpdate();

                PreparedStatement movieSessionStatement = con.prepareStatement(movieSessionQuery);
                movieSessionStatement.executeUpdate();

                PreparedStatement transactionStatement = con.prepareStatement(transactionQuery);
                transactionStatement.executeUpdate();

                PreparedStatement ticketStatement = con.prepareStatement(ticketQuery);
                ticketStatement.executeUpdate();

                PreparedStatement fnbStatement = con.prepareStatement(fnbQuery);
                fnbStatement.executeUpdate();

                // PreparedStatement ticketStatement = con.prepareStatement(ticketQuery);
                // ticketStatement.executeUpdate();

                PreparedStatement customerInfoStatement = con.prepareStatement(customerInfoQuery);
                customerInfoStatement.executeUpdate();

                PreparedStatement transactionItemStatement = con.prepareStatement(transactionItemQuery);
                transactionItemStatement.executeUpdate();

                tablesCreated = true;
                System.out.println("tables created");
        };

        public void addTestData() {
                // TODO - Add 100 test data for each table

        }

        public Connection getConnection() {
                return con;
        }
}
