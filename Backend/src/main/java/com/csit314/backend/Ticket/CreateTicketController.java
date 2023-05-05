// package com.csit314.backend.Ticket;

// import java.sql.SQLException;
// import java.util.ArrayList;
// import java.util.List;
// import java.util.Map;

// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.stereotype.Controller;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestMapping;

// import java.sql.SQLException;
// import com.fasterxml.jackson.databind.ObjectMapper;
// import com.fasterxml.jackson.core.type.TypeReference;
// import org.springframework.web.bind.annotation.RequestBody;

// @Controller
// @RequestMapping(path = "/createticket")
// public class CreateTicketController {
//     @PostMapping(path = "/add")
//     public ResponseEntity<?> addNewTicket(@RequestBody Ticket user) throws SQLException {
//         try {
//             Ticket.save(ticket);
//             return ResponseEntity.ok("Saved");
//         } catch (IllegalArgumentException e) {
//             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//         }
//     }
// }