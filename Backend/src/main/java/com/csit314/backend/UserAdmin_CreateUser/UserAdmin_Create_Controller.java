package com.csit314.backend.UserAdmin_CreateUser;

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
@RequestMapping(path = "/admin_createAcc") // This means URL's start with /useraccount (after Application path)
public class UserAdmin_Create_Controller {
    @Autowired
    private UserAdmin_Create_Entity UAEntity;

    @PostMapping(path = "/add") // Map ONLY POST Requests
    public ResponseEntity<?> addNewUser(@RequestBody UserAdmin_Create user) {
        if (user.getProfileName() == null || user.getProfileName().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Profile name cannot be empty");
        }
        if (user.getPermission() == null || user.getPermission().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Role cannot be empty");
        }
        UAEntity.save(user);
        return ResponseEntity.ok("Saved");
    }
    

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<UserAdmin_Create> getAllUsers() {
        // This returns a JSON or XML with the users
        return UAEntity.listAll();
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody UserAdmin_Create getUserById(@PathVariable Integer id) {
        return UAEntity.get(id);
    }

    @PutMapping(path = "/update/{id}")
    public ResponseEntity<?> update(@RequestBody UserAdmin_Create user, @PathVariable Integer id) {
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
