// package com.csit314.backend.Ticket;

// import java.sql.SQLException;
// import java.util.ArrayList;

// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.stereotype.Controller;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.RequestMapping;

// //GET /viewticket/all: Returns all tickets in the database.
// //GET /viewticket/{id}: Returns the ticket with the specified id.
// //GET /viewticket/all/movieSession/{movieSessionId}: Returns all tickets for a specific movie session.
// //GET /viewticket/all/seat/{seatId}: Returns all tickets for a specific seat.
// //GET /viewticket/all/userAccount/{userAccountId}: Returns all tickets for a specific user account.


// //Controller
// @RequestMapping(path = "/viewticket")
// public class ViewTicketController {

//     @GetMapping(path = "/all")
//     public ResponseEntity<ArrayList<Ticket>> getAllTickets() throws SQLException {
//         ArrayList<Ticket> tickets = Ticket.listAll();
//         return new ResponseEntity<ArrayList<Ticket>>(tickets, HttpStatus.OK);
//     }

//     @GetMapping(path = "/{id}")
//     public Ticket getTicketById(@PathVariable Integer id) throws SQLException {
//         return Ticket.get(id);
//     }

//     @GetMapping(path = "/all/movieSession/{movieSessionId}")
//     public ResponseEntity<ArrayList<Ticket>> getAllTicketsByMovieSessionId(@PathVariable Integer movieSessionId) throws SQLException {
//         ArrayList<Ticket> tickets = Ticket.listAllByMovieSessionId(movieSessionId);
//         return new ResponseEntity<ArrayList<Ticket>>(tickets, HttpStatus.OK);
//     }

//     @GetMapping(path = "/all/seat/{seatId}")
//     public ResponseEntity<ArrayList<Ticket>> getAllTicketsBySeatId(@PathVariable Integer seatId) throws SQLException {
//         ArrayList<Ticket> tickets = Ticket.listAllBySeatId(seatId);
//         return new ResponseEntity<ArrayList<Ticket>>(tickets, HttpStatus.OK);
//     }

//     @GetMapping(path = "/all/userAccount/{userAccountId}")
//     public ResponseEntity<ArrayList<Ticket>> getAllTicketsByUserAccountId(@PathVariable Integer userAccountId) throws SQLException {
//         ArrayList<Ticket> tickets = Ticket.listAllByUserAccountId(userAccountId);
//         return new ResponseEntity<ArrayList<Ticket>>(tickets, HttpStatus.OK);
//     }

// }