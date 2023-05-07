package com.csit314.backend.TransactionItem;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "/viewtransactionitem")
public class ViewTransactionItemController {

    @GetMapping(path = "/all")
    public ResponseEntity<ArrayList<TransactionItem>> getAllTransactionItem() throws SQLException {
        // This returns a JSON or XML with the users
        ArrayList<TransactionItem> transactionItem = TransactionItem.listAll();
        return new ResponseEntity<ArrayList<TransactionItem>>(transactionItem, HttpStatus.OK);
    }

    @GetMapping(path = "/allfnb")
    public ResponseEntity<ArrayList<TransactionItem>> getAllFnbTransactionItem() throws SQLException {
        // This returns a JSON or XML with the users
        ArrayList<TransactionItem> transactionItem = TransactionItem.listAllFnb();
        return new ResponseEntity<ArrayList<TransactionItem>>(transactionItem, HttpStatus.OK);
    }

    @GetMapping(path = "/allticket")
    public ResponseEntity<ArrayList<TransactionItem>> getAllTicketTransactionItem() throws SQLException {
        // This returns a JSON or XML with the users
        ArrayList<TransactionItem> transactionItem = TransactionItem.listAllTicket();
        return new ResponseEntity<ArrayList<TransactionItem>>(transactionItem, HttpStatus.OK);
    }
}