package com.csit314.backend.UserAccount;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.NoSuchElementException;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/useraccount") // This means URL's start with /useraccount (after Application path)
public class ViewUserAccountController {

    private UserAccount ua = new UserAccount();

    @PostMapping(path = "/add") // Map ONLY POST Requests
    public ResponseEntity<String> addNewUser(@RequestBody UserAccount user) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestBody means it is the message sent in the GET or POST request
        ua.save(user);
        return ResponseEntity.ok("Saved");
    }

    @GetMapping(path = "/all")
    public ResponseEntity<ArrayList<UserAccount>> getAllUsers() {
        // This returns a JSON or XML with the users
        ArrayList<UserAccount> userAccounts;
        try {
            userAccounts = UserAccount.listAll();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return new ResponseEntity<ArrayList<UserAccount>>(userAccounts, HttpStatus.OK);

    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<UserAccount> getUserById(@PathVariable Integer id) {
        UserAccount user = UAEntity.get(id);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<UserAccount>(user, HttpStatus.OK);

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@RequestBody UserAccount user, @PathVariable Integer id) {
        if (UAEntity.update(user, id)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> suspend(@PathVariable Integer id) {
        if (UAEntity.suspend(id)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/unsuspend/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id) {
        if (UAEntity.unsuspend(id)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
