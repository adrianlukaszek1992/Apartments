package com.adrian.mapper;

public class HotelApartmentsViewMapper {
    public HotelApartmentsViewMapper(String hotelName, String apartmentName, int size, float price, String status) {
        this.hotelName = hotelName;
        this.apartmentName = apartmentName;
        this.size = size;
        this.price = price;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    private String hotelName;
    private String apartmentName;
    private int size;
    private float price;
    private String status;
}
