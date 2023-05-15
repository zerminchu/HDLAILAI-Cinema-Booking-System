package com.csit314.backend.CinemaOwner;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.sql.Timestamp;
import com.csit314.backend.Transaction.Transaction;

import com.csit314.backend.db.SQLConnection;

public class CinemaOwner {
    private Integer id = -1;
    private Timestamp date = null; 
    private String reportType = "";
    private Timestamp time = null; 

    //Foreign key to transaction
    private Integer transactionId = -1;

    public CinemaOwner(){
        id = -1;
        date = null;
        reportType = "";
        time = null;
        transactionId = -1;
    }

    public CinemaOwner(Integer id) {
        this.id = id;
    }

    public CinemaOwner(Integer id, Timestamp date, 
                            String reportType, Timestamp time, Integer transactionId) {
        this.id = id;
        this.date = date;
        this.reportType = reportType;
        this.time = time;
        this.transactionId = transactionId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public String getReportType() {
        return reportType;
    }

    public void setReportType(String reportType) {
        this.reportType = reportType;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    public Integer getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Integer transactionId) {
        this.transactionId = transactionId;
    }
}