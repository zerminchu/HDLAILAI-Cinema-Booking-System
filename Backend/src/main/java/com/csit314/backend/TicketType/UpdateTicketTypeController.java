package com.csit314.backend.TicketType;

import java.sql.SQLException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequestMapping(path = "/updatetickettype")
public class UpdateTicketTypeController {

    @PutMapping(path = "/update/{id}")
    public ResponseEntity<?> update(@RequestBody TicketType ticketType, @PathVariable Integer id) throws SQLException {

        try {
            TicketType tt = new TicketType();
            tt.update(ticketType);
            return ResponseEntity.ok("Saved");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
