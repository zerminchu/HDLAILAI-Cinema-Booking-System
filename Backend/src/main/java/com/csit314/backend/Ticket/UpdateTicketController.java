// package com.csit314.backend.Ticket;

// import java.sql.SQLException;
// import java.util.ArrayList;

// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.stereotype.Controller;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;

// @Controller
// @RequestMapping(path = "/updateticket")
// public class UpdateTicketController {

//     @PutMapping(path = "/update/{id}")
//     public ResponseEntity<?> update(@RequestBody Ticket ticket, @PathVariable Integer id) throws SQLException {
//         ticket.setId(id);
//         if (Ticket.update(ticket)) {
//             return new ResponseEntity<>(HttpStatus.OK);
//         }
//         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//     }

// }
// //UNSURE