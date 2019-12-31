package com.adrian.mapper;

public class ApartmentsSearchResultViewWrapper {
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public ApartmentsSearchResultViewWrapper(String hotelName, String apartmentName, String street, String city, String status) {
        this.hotelName = hotelName;
        this.apartmentName = apartmentName;
        this.street = street;
        this.city = city;
        this.status = status;
    }

    private String hotelName;
    private String apartmentName;
    private String street;
    private String city;
    private String status;
}
