package com.adrian.mapper;

public class ApartmentDetailsViewMapper {
    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    private String description;
    private String hotelName;
    private int rating;
    private String status;
    private String apartmentName;
    private String street;
    private String city;
    private int size;
    private float price;

    public ApartmentDetailsViewMapper(String description, String hotelName, int rating, String status, String apartmentName, String street, String city, int size, float price) {
        this.description = description;
        this.hotelName = hotelName;
        this.rating = rating;
        this.status = status;
        this.apartmentName = apartmentName;
        this.street = street;
        this.city = city;
        this.size = size;
        this.price = price;
    }
}
