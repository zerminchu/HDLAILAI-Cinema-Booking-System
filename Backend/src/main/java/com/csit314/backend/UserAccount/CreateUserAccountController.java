package com.csit314.backend.UserAccount;

import java.sql.SQLException;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.HttpStatus;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/createuseraccount") // This means URL's start with /useraccount (after Application path)
public class CreateUserAccountController {

    @PostMapping(path = "/add") // Map ONLY POST Requests
    public @ResponseBody ResponseEntity<?> addNewUser(@RequestBody UserAccount user)
            throws SQLException {

        UserAccount ua = new UserAccount();
        ua.save(user);
        return ResponseEntity.ok("Account has been created successfully");
    }

    @PostMapping(path = "/addcustomer") // Map ONLY POST Requests
    public @ResponseBody ResponseEntity<?> addNewCustomer(@RequestBody UserAccount user)
            throws SQLException {
        UserAccount ua = new UserAccount();

        if (ua.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
        }
        ua.saveCust(user);
        return ResponseEntity.ok("Customer Account has been created successfully");
    }
}