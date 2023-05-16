package com.csit314.backend.Transaction;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.csit314.backend.Ticket.Ticket;
import com.csit314.backend.TransactionItem.TransactionItem;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequestMapping(path = "/createtransaction")
public class CreateTransactionController {
    @PostMapping(path = "/add")
    public ResponseEntity<?> addNewTransaction(@RequestBody Transaction transaction) throws SQLException {

        try {
            Transaction txn = new Transaction();
            Ticket t = new Ticket();
            txn.save(transaction);
            return ResponseEntity.ok("Saved");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping(path = "/fnb")
    public ResponseEntity<?> addFnbTransaction(@RequestBody Map<String, Object> json) throws SQLException {

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Transaction transaction = objectMapper.convertValue(json.get("transaction"), Transaction.class);
            ArrayList<TransactionItem> transactionItem = objectMapper.convertValue(json.get("transactionItem"),
                    new TypeReference<ArrayList<TransactionItem>>() {
                    });

            Transaction txn = new Transaction();
            TransactionItem t = new TransactionItem();

            Integer transactionId = txn.save(transaction);
            System.out.println(transactionId);

            t.saveAllFnb(transactionItem, transactionId);

            // txn.save(transaction);
            return ResponseEntity.ok("Saved");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping(path = "/ticket")
    public ResponseEntity<?> addTicketTransaction(@RequestBody Map<String, Object> json) throws SQLException {

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Transaction transaction = objectMapper.convertValue(json.get("transaction"), Transaction.class);
            ArrayList<Ticket> tickets = objectMapper.convertValue(json.get("tickets"),
                    new TypeReference<ArrayList<Ticket>>() {
                    });
            Transaction txn = new Transaction();
            Ticket t = new Ticket();
            // 1 controller talks to 2 entities
            Integer transactionId = txn.save(transaction);
            System.out.println(transactionId);
            t.saveAll(tickets, transactionId);
            return ResponseEntity.ok("Saved");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
