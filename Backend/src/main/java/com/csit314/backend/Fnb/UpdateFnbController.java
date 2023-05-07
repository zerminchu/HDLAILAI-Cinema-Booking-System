package com.csit314.backend.Fnb;

import java.sql.SQLException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequestMapping(path = "/updatefnb")
public class UpdateFnbController {

    @PutMapping(path = "/update/{id}")
    public ResponseEntity<?> update(@RequestBody Fnb user, @PathVariable Integer id) throws SQLException {
        Fnb f = new Fnb();
        Fnb existingHall = f.findByFnb(user.getName());
        if (existingHall != null && existingHall.getId() != user.getId()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Food and beverage already exists");
        }

        try {
            f.update(user);
            return ResponseEntity.ok("Saved");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
