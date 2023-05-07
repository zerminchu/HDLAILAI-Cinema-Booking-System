package com.csit314.backend.Transaction;

import java.sql.SQLException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller 
@RequestMapping(path = "/createtransaction") 
public class CreateTransactionController {
    @PostMapping(path = "/add") 
    public ResponseEntity<?> addNewTransaction(@RequestBody Transaction transaction) throws SQLException {
     /*    if (transaction.getTitle() == null || transaction.getTitle().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Transaction cannot be empty");
        } */

        /* // Check for duplicated profile name
        if (Transaction.findByMovie(transaction.getTitle()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Transaction already exists");
        } */
        try {
            Transaction.save(transaction);
            return ResponseEntity.ok("Saved");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
