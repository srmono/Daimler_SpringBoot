package com.daimler.fms.entity;

import jakarta.persistence.Entity;

@Entity
public class Truck {
    private Long id;
    private String model;
    private Status status;
    private String details;

    public enum Status{
        ACTIVE,
        IN_MAINTENANCE,
        RETIRED
    }
}
