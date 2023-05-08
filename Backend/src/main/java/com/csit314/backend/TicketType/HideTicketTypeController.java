package com.csit314.backend.TicketType;

import java.sql.SQLException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "hidetickettype")
public class HideTicketTypeController {

    @DeleteMapping("/{id}")
    public ResponseEntity<?> hide(@PathVariable Integer id) throws SQLException {
        TicketType tt = new TicketType();
        if (tt.hide(id)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/unhide/{id}")
    public ResponseEntity<?> unhide(@PathVariable Integer id) throws SQLException {
        TicketType tt = new TicketType();
        if (tt.unhide(id)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
