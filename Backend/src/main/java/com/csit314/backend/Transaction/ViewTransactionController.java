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
        ArrayList<Transaction> Transactions = Transaction.listAll();
        return new ResponseEntity<ArrayList<Transaction>>(Transactions, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public Transaction getTransactionById(@PathVariable Integer id) throws SQLException {
        return Transaction.get(id);
    }

    @GetMapping(path = "/all/{userAccountId}")
    public ResponseEntity<ArrayList<Transaction>> getAllTransactionByUserAccountId (@PathVariable Integer userAccountId) throws SQLException {
        // This returns a JSON with the users
        ArrayList<Transaction> Transactions = Transaction.listAllByUserAccountId(userAccountId);
        return new ResponseEntity<ArrayList<Transaction>>(Transactions, HttpStatus.OK);
    }
    
}
