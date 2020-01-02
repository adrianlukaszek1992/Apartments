package com.adrian.controller;

import com.adrian.Services.HotelService;
import com.adrian.mapper.HotelApartmentsViewMapper;
import com.adrian.model.ApartmentEntity;
import com.adrian.repo.ApartmentRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/apartment")
@RestController
public class ApartmentController {
    @Autowired
    ApartmentRepository apartmentRepository;

    @Autowired
    HotelService hotelService;

    @GetMapping(value = "/delete")
    public String deleteHotel(@RequestParam String apartmentName) {

        List<ApartmentEntity> apartments = apartmentRepository.findApartmentEntityByName(apartmentName);
        ApartmentEntity apartment = apartments.get(0);
        apartmentRepository.delete(apartment);

        return new JSONObject()
                .put("message", "Apartment deleted successfully")
                .toString();
    }

    @GetMapping(value = "/getList")
    public List<HotelApartmentsViewMapper> getHotelApartments(@RequestParam String hotelName) {
        List<HotelApartmentsViewMapper> result = new ArrayList<>();
        int hotelId= hotelService.getNameToIdHotel().get(hotelName);

        List<ApartmentEntity> apartments = apartmentRepository.findApartmentsByHotelId(hotelId);
        apartments.forEach(apartment ->{
            result.add(new HotelApartmentsViewMapper(hotelName, apartment.getName(), apartment.getSize(), apartment.getPrice(),
                    apartment.getStatus()));
        });

        return result;
    }

    @GetMapping(value = "/upsert")
    public String upsertApartment(@RequestParam boolean isModify, String hotelName, String apartmentName,
                                  int size, float price, String status) {
        int hoteldId= hotelService.getNameToIdHotel().get(hotelName);
        if(isModify){
            List<ApartmentEntity> apartments = apartmentRepository.findApartmentEntityByName(apartmentName);
            ApartmentEntity apartment = apartments.get(0);
            apartment.setSize(size);
            apartment.setPrice(price);
            apartment.setStatus(status);
            apartmentRepository.save(apartment);

            return new JSONObject()
                    .put("message", "Apartment updated successfully")
                    .toString();
        }
        apartmentRepository.save(new ApartmentEntity(hoteldId, apartmentName, size, price, status));

        return new JSONObject()
                .put("message", "Apartment saved successfully")
                .toString();
    }
}
