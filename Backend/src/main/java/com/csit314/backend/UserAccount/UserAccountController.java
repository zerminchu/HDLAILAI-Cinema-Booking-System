package com.csit314.backend.UserAccount;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
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

import com.csit314.backend.UserAccount.UserAccount;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/useraccount") // This means URL's start with /useraccount (after Application path)
public class UserAccountController {
    @PostMapping(path = "/add") // Map ONLY POST Requests
    public @ResponseBody String addNewUser(@RequestBody Map<String, String> json) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestBody means it is the message sent in the GET or POST request
        System.out.println(json);
        try {
            UserAccount ua = new UserAccount(json.get("email"), json.get("name"), json.get("password"));
            ua.createUser();
            return "Saved";
        } catch (SQLException e) {
            return "Failed";
        }
    }

    @GetMapping(path = "/all")
    public @ResponseBody List<Map<String, String>> getAllUsers() {
        // This returns a JSON or XML with the users
        try {
            UserAccount ua = new UserAccount();
            return ua.readAll();
        } catch (SQLException e) {
            return null;
        }
    }

    /*
     * @GetMapping(path = "/{id}")
     * public @ResponseBody UserAccount getUserById(@PathVariable Integer id) {
     * return UAEntity.get(id);
     * }
     * 
     * @PutMapping("/update/{id}")
     * public ResponseEntity<?> update(@RequestBody UserAccount user, @PathVariable
     * Integer id) {
     * if (UAEntity.update(user, id)) {
     * return new ResponseEntity<>(HttpStatus.OK);
     * }
     * return new ResponseEntity<>(HttpStatus.NOT_FOUND);
     * }
     * 
     * @DeleteMapping("/{id}")
     * public ResponseEntity<?> suspend(@PathVariable Integer id) {
     * if (UAEntity.suspend(id)) {
     * return new ResponseEntity<>(HttpStatus.OK);
     * }
     * return new ResponseEntity<>(HttpStatus.NOT_FOUND);
     * }
     * 
     * @PutMapping("/unsuspend/{id}")
     * public ResponseEntity<?> update(@PathVariable Integer id) {
     * if (UAEntity.unsuspend(id)) {
     * return new ResponseEntity<>(HttpStatus.OK);
     * }
     * return new ResponseEntity<>(HttpStatus.NOT_FOUND);
     * }
     */

}
