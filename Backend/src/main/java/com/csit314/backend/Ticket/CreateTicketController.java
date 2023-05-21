package com.csit314.backend.Ticket;

import java.sql.SQLException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequestMapping(path = "/createticket")
public class CreateTicketController {
    @PostMapping(path = "/add")
    public ResponseEntity<?> addNewTicket(@RequestBody Ticket ticket) throws SQLException {
        try {
            Ticket t = new Ticket();
            t.save(ticket);
            return ResponseEntity.ok("Saved");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}