package com.csit314.backend.UserProfile;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "/viewuserprofile")
public class ViewUserProfileController {

    @GetMapping(path = "/all")
    public ResponseEntity<ArrayList<UserProfile>> getAllUserProfiles() throws SQLException {
        // This returns a JSON or XML with the users
        UserProfile up = new UserProfile();

        ArrayList<UserProfile> userProfiles = up.listAll();
        return new ResponseEntity<ArrayList<UserProfile>>(userProfiles, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public UserProfile getUserById(@PathVariable Integer id) throws SQLException {
        UserProfile up = new UserProfile();

        return up.get(id);
    }

}
