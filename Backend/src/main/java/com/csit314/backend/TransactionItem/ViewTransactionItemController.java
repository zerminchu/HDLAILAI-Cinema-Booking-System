package com.csit314.backend.TransactionItem;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@RequestMapping(path = "/viewtransactionitem")
public class ViewTransactionItemController {
    @GetMapping(path = "/all")
    public ResponseEntity<ArrayList<TransactionItem>> getAllFnbTransactionItem() throws SQLException {
        // This returns a JSON or XML with the users
        TransactionItem ti = new TransactionItem();
        ArrayList<TransactionItem> transactionItem = ti.listAll();
        return new ResponseEntity<ArrayList<TransactionItem>>(transactionItem, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public TransactionItem getTransactionItemById(@PathVariable Integer id) throws SQLException {
        TransactionItem ti = new TransactionItem();
        return ti.get(id);
    }

    @GetMapping(path = "/transaction/{transactionId}")
    public ResponseEntity<ArrayList<TransactionItem>> getAllItemsByTransactionId(@PathVariable Integer transactionId)
            throws SQLException {
        TransactionItem ti = new TransactionItem();
        ArrayList<TransactionItem> transactionItem = ti.listAllByTransactionId(transactionId);
        return new ResponseEntity<ArrayList<TransactionItem>>(transactionItem, HttpStatus.OK);
    }
}