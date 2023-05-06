// package com.csit314.backend.Ticket;

// import java.sql.SQLException;
// import java.util.ArrayList;

// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.stereotype.Controller;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.RequestMapping;

// @Controller
// @RequestMapping(path = "/searchticket")
// public class SearchTicketController {

//     @GetMapping(path = "/type/{ticketType}")
//     public ResponseEntity<ArrayList<Ticket>> getTicketsByType(@PathVariable String ticketType) throws SQLException {
//         ArrayList<Ticket> tickets = Ticket.listAllByTicketType(ticketType);
//         if (tickets.isEmpty()) {
//             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//         }
//         return new ResponseEntity<>(tickets, HttpStatus.OK);
//     }
// }
