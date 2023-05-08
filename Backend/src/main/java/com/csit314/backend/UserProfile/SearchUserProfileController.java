package com.csit314.backend.UserProfile;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping(path = "/searchuserprofile")
public class SearchUserProfileController {
    @GetMapping
    public ResponseEntity<ArrayList<UserProfile>> getAllUserProfiles(@RequestParam("q") String query)
            throws SQLException {
        // This returns a JSON or XML with the users
        UserProfile up = new UserProfile();
        ArrayList<UserProfile> searchResults = up.search(query);
        return new ResponseEntity<ArrayList<UserProfile>>(searchResults, HttpStatus.OK);
    }
}
