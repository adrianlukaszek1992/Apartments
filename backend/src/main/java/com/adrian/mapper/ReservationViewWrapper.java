package com.adrian.mapper;

import java.time.LocalDate;

public class ReservationViewWrapper {
    public ReservationViewWrapper(float price, String status, LocalDate endDate, LocalDate startDate, String hotelName, String city, String street, String apartmentName) {
        this.price = price;
        this.status = status;
        this.endDate = endDate;
        this.startDate = startDate;
        this.hotelName = hotelName;
        this.city = city;
        this.street = street;
        this.apartmentName = apartmentName;
    }

    private float price;
    private String status;
    private LocalDate endDate;
    private LocalDate startDate;
    private String hotelName;
    private String city;
    private String street;
    private String apartmentName;

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getApartmentName() {
        return apartmentName;
    }

    public void setApartmentName(String apartmentName) {
        this.apartmentName = apartmentName;
    }

}
