package com.csit314.backend.UA;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class UserAdmin_Create{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String profile_name;

    private String permission;

    private Boolean suspended = false;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProfileName() {
        return profile_name;
    }

    public void setProfileName(String profile_name) {
        this.profile_name = profile_name;
    }

    public String getPermission() {
        return permission;
    }

    public void setPermission(String permission) {
        this.permission = permission;
    }

    public void setSuspended(boolean suspended) {
        this.suspended = suspended;
    }

    public Boolean getSuspended() {
        return suspended;
    }
}