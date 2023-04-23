package com.csit314.backend.Seat;


import java.sql.SQLException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller 
@RequestMapping(path = "/updateseat") 
public class UpdateSeatController {

    @PutMapping(path = "/update/{id}")
    public ResponseEntity<?> update(@RequestBody Seat user, @PathVariable Integer id) throws SQLException {
        if (Seat.update(user)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
}
