package com.adrian.mapper;

import java.time.LocalDate;

public class OwnerReservationViewWrapper {
    private String hotelName;
    private String apartmentName;
    private String street;
    private String city;
    private String name;
    private String lastName;
    private LocalDate startDate;
    private LocalDate endDate;
    private float totalPrice;
    private String email;
    private String status;

    public OwnerReservationViewWrapper(String hotelName, String apartmentName, String street, String city, String name, String lastName,
                                       LocalDate startDate, LocalDate endDate, float totalPrice, String email, String status) {
        this.hotelName = hotelName;
        this.apartmentName = apartmentName;
        this.street = street;
        this.city = city;
        this.name = name;
        this.lastName = lastName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.totalPrice = totalPrice;
        this.email = email;
        this.status = status;
    }

    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public String getApartmentName() {
        return apartmentName;
    }

    public void setApartmentName(String apartmentName) {
        this.apartmentName = apartmentName;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
