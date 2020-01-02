package com.adrian.mapper;

public class OwnerHotelViewWrapper {

    private String hotelName;
    private int ratting;
    private String street;
    private String description;
    private String city;

    public OwnerHotelViewWrapper(String hotelName, int ratting, String street, String description, String city) {
        this.hotelName = hotelName;
        this.ratting = ratting;
        this.street = street;
        this.description = description;
        this.city = city;
    }

    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public int getRatting() {
        return ratting;
    }

    public void setRatting(int ratting) {
        this.ratting = ratting;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
