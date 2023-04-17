package com.csit314.backend.UserAccount;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity // This tells Hibernate to make a table out of this class
@Table (name = "useraccount")
public class UserAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;

    private String email;

    @OneToOne
    @MapsId
    @JoinColumn(name = "profileID")
    private UserProfile userProfileID;

    private Boolean suspended = false;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSuspended(boolean suspended) {
        this.suspended = suspended;
    }

    public Boolean getSuspended() {
        return suspended;
    }

    public UserProfile getUserProfileID() {
        return userProfileID;
    }

    public void setUserProfileID(UserProfile userProfileID) {
        this.userProfileID = userProfileID;
    }
}