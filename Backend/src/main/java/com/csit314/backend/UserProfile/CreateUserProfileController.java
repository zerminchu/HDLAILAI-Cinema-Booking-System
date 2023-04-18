package com.csit314.backend.UserProfile;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/createuserprofile") // This means URL's start with /useraccount (after Application path)
public class CreateUserProfileController {
    @Autowired
    private CreateUserProfileEntity UPEntity;

    @PostMapping(path = "/add") // Map ONLY POST Requests
    public ResponseEntity<?> addNewUser(@RequestBody UserProfile user) {
        if (user.getProfileName() == null || user.getProfileName().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Profile name cannot be empty");
        }
        if (user.getPermission() == null || user.getPermission().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Role cannot be empty");
        }

        try {
            UPEntity.save(user);
            return ResponseEntity.ok("Saved");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<UserProfile> getAllUserProfiles() {
        // This returns a JSON or XML with the users
        return UPEntity.listAll();
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody UserProfile getUserById(@PathVariable Integer id) {
        return UPEntity.get(id);
    }

    @PutMapping(path = "/update/{id}")
    public ResponseEntity<?> update(@RequestBody UserProfile user, @PathVariable Integer id) {
        if (UPEntity.update(user, id)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> suspend(@PathVariable Integer id) {
        if (UPEntity.suspend(id)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/unsuspend/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id) {
        if (UPEntity.unsuspend(id)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
