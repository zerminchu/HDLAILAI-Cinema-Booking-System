package com.csit314.backend.UserAccount;

import java.sql.SQLException;
import java.util.ArrayList;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/viewuseraccount") // This means URL's start with /useraccount (after Application path)
public class ViewUserAccountController {
    @GetMapping(path = "/all")
    public ResponseEntity<ArrayList<UserAccount>> getAllUsers() throws SQLException {
        // This returns a JSON or XML with the users
        UserAccount ua = new UserAccount();
        ArrayList<UserAccount> userAccounts;
        userAccounts = ua.listAll();
        return new ResponseEntity<ArrayList<UserAccount>>(userAccounts, HttpStatus.OK);

    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<UserAccount> getUserById(@PathVariable Integer id) throws SQLException {
        UserAccount ua = new UserAccount();
        UserAccount user = ua.get(id);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<UserAccount>(user, HttpStatus.OK);

    }
}
