package com.csit314.backend.UserAccount;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping(path = "/searchuseraccount")
public class SearchUserAccountController {
    @GetMapping
    public ResponseEntity<ArrayList<UserAccount>> getAllUserAccounts(@RequestParam("q") String query)
            throws SQLException {
        // This returns a JSON or XML with the users
        UserAccount ua = new UserAccount();
        ArrayList<UserAccount> searchResults = ua.search(query);
        return new ResponseEntity<ArrayList<UserAccount>>(searchResults, HttpStatus.OK);
    }
}
