package com.csit314.backend.Transaction;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "/viewtransaction")
public class ViewTransactionController {

    @GetMapping(path = "/all")
    public ResponseEntity<ArrayList<Transaction>> getAllTransaction() throws SQLException {
        // This returns a JSON or XML with the users
        Transaction txn = new Transaction();
        ArrayList<Transaction> Transactions = txn.listAll();
        return new ResponseEntity<ArrayList<Transaction>>(Transactions, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable Integer id) throws SQLException {
        Transaction txn = new Transaction();
        Transaction result = txn.get(id);
        return new ResponseEntity<Transaction>(result, HttpStatus.OK);

    }

    @GetMapping(path = "/useraccount/{userAccountId}")
    public ResponseEntity<ArrayList<Transaction>> getAllTransactionByUserAccountId(@PathVariable Integer userAccountId)
            throws SQLException {
        Transaction txn = new Transaction();
        // This returns a JSON with the users
        ArrayList<Transaction> Transactions = txn.listAllByUserAccountId(userAccountId);
        return new ResponseEntity<ArrayList<Transaction>>(Transactions, HttpStatus.OK);
    }

}
