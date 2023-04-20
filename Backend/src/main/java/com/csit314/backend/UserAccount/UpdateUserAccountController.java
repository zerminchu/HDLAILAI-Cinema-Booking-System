package com.csit314.backend.UserAccount;

import java.util.ArrayList;
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

@Controller // This means that this class is a Controller
@RequestMapping(path = "/updateuseraccount") // This means URL's start with /useraccount (after Application path)
public class UpdateUserAccountController {
    @Autowired
    private UserAccountEntity UAEntity;

    @GetMapping(path = "/all")
    public ResponseEntity<ArrayList<UserAccount>> getAllUsers() {
        // This returns a JSON or XML with the users
        return UAEntity.listAll();
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<UserAccount> getUserById(@PathVariable Integer id) {
        return UAEntity.get(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@RequestBody UserAccount user, @PathVariable Integer id) {
        if (UAEntity.update(user, id)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
