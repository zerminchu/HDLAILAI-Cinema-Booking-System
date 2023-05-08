package com.csit314.backend.Transaction;

import java.sql.SQLException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequestMapping(path = "/updatetransaction")
public class UpdateTransactionController {

    @PutMapping(path = "/update/{id}")
    public ResponseEntity<?> update(@RequestBody Transaction updateTransaction, @PathVariable Integer id)
            throws SQLException {

        try {
            Transaction txn = new Transaction();
            updateTransaction.setId(id);

            txn.update(updateTransaction);
            return new ResponseEntity<String>("Saved", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<String>("Not saved", HttpStatus.NOT_FOUND);
        }
    }

}
