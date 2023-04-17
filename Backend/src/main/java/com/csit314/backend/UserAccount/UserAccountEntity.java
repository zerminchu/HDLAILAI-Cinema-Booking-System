package com.csit314.backend.UserAccount;

import org.springframework.transaction.annotation.Transactional;

import com.csit314.backend.UserAccount.UserAccount;

import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserAccountEntity {

    @Autowired
    private UserAccountRepository repo;

    // Create
    public void save(UserAccount product) {
        repo.save(product);
    }

    // Read all
    public Iterable<UserAccount> listAll() {
        return repo.findAll();
    }

    // Read One
    public UserAccount get(Integer id) throws NoSuchElementException {
        return repo.findById(id).get();
    }

    // Update
    public Boolean update(UserAccount userAccount, Integer id) {
        try {
            UserAccount existUser = this.get(id);
            repo.save(userAccount);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    // Suspend
    public Boolean suspend(Integer id) {
        try {
            UserAccount existUser = this.get(id);
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
            UserAccount existUser = this.get(id);
            existUser.setSuspended(false);
            repo.save(existUser);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    public String login(UserAccount user) {
        try {
            // Find user with email
            UserAccount dbUser = repo.findByEmailAndUserProfile(user.getEmail(), user.getUserProfile());
            if (dbUser == null) {
                return "User does not exist";
            }
            // User is suspended
            if (dbUser.getSuspended()) {
                return "Suspended";
            }
            // Password does not match
            if (!dbUser.getPassword().equals(user.getPassword())) {
                return "Password incorrect";
            }
            return "success";
        } catch (NoSuchElementException e) {
            return "User does not exist";
        }
    }
}
