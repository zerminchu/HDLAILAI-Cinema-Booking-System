package com.csit314.backend.UserProfile;

import org.springframework.transaction.annotation.Transactional;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class CreateUserProfileEntity {

    @Autowired
    private UserProfileRepository repo;

    // Create
    public void save(UserProfile product) {
        repo.save(product);
    }

    // Read all
    public Iterable<UserProfile> listAll() {
        return repo.findAll();
    }

    // Read One
    public UserProfile get(Integer id) throws NoSuchElementException {
        return repo.findById(id).get();
    }

    // Update
    public Boolean update(UserProfile userProfile, Integer id) {
        try {
            UserProfile existUser = this.get(id);
            existUser.setProfileName(userProfile.getProfileName());
            repo.save(existUser);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    // Suspend
    public Boolean suspend(Integer id) {
        try {
            UserProfile existUser = this.get(id);
            existUser.setSuspended(true);
            repo.save(existUser);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    // Unsuspend
    public Boolean unsuspend(Integer id) {
        try {
            UserProfile existUser = this.get(id);
            existUser.setSuspended(false);
            repo.save(existUser);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }
}
