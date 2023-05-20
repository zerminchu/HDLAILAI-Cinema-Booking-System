package com.csit314.backend.UserAccount;

import java.sql.SQLException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/updateuseraccount") // This means URL's start with /useraccount (after Application path)
public class UpdateUserAccountController {

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@RequestBody UserAccount user, @PathVariable Integer id) throws SQLException {
        UserAccount ua = new UserAccount();
        if (ua.update(user)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/updatecustomer/{id}")
    public ResponseEntity<?> updateCustomer(@RequestBody UserAccount user, @PathVariable Integer id)
            throws SQLException {
        UserAccount ua = new UserAccount();
        if (ua.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
        }
        if (ua.updateCustomer(user)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
