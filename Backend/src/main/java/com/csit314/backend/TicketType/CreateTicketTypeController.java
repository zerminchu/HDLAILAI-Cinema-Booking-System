package com.csit314.backend.TicketType;

import java.sql.SQLException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequestMapping(path = "/createtickettype")
public class CreateTicketTypeController {
    @PostMapping(path = "/add")
    public ResponseEntity<?> addNewTicketType(@RequestBody TicketType ticketType) throws SQLException {
        try {
            TicketType tt = new TicketType();
            tt.save(ticketType);
            return ResponseEntity.ok("Saved");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
