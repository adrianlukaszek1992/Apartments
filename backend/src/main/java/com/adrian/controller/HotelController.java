package com.adrian.controller;

import com.adrian.Services.CityService;
import com.adrian.mapper.ApartmentDetailsViewMapper;
import com.adrian.mapper.ApartmentsSearchResultViewMapper;
import com.adrian.model.ApartmentEntity;
import com.adrian.model.HotelEntity;
import com.adrian.repo.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/hotel")
@RestController
public class HotelController {

    @Autowired
    ReservationRepository repositoryReservation;

    @Autowired
    UserRepository userRepository;
    @Autowired
    ApartmentRepository apartmentRepository;
    @Autowired
    HotelRepository hotelRepository;
    @Autowired
    CityService cityService;

    @GetMapping(value = "/search")
    public List<ApartmentsSearchResultViewMapper> getHotels(@RequestParam String place, String hotelName, String startDate, String endDate) {
        List<ApartmentsSearchResultViewMapper> result = new ArrayList<>();

        if (!place.equals("undefined") && hotelRepository.findListOfHotelsByCityId(cityService.getNameToIdCity().get(place)).size() == 0) {
            return result;
        }
        List<HotelEntity> hotelEntities = new ArrayList<>();
        List<ApartmentEntity> apartments;
        if (place.equals("undefined") && hotelName.equals("undefined") && startDate.equals("undefined") && endDate.equals("undefined")) {
            apartments = apartmentRepository.findAllApartments();
            hotelRepository.findAll().forEach(hotelEntities::add);

        } else {
            LocalDate startDateLD = LocalDate.parse(startDate);
            LocalDate endDateLD = LocalDate.parse(endDate);
            apartments = apartmentRepository.getApartmentsByHotelName(hotelName);
            List<Integer> resrvationIds = repositoryReservation.findAllIdApartmentFromAGivenDateRange(startDateLD, endDateLD);
            hotelEntities = hotelRepository.findHotelByHotelName(hotelName);
            List<ApartmentEntity> clonedApartments = new ArrayList(apartments);
            for (ApartmentEntity apartment : clonedApartments) {
                for (Integer reservationId : resrvationIds) {
                    if (apartment.getIdApartment() == reservationId) {
                        System.out.println(apartment);
                        apartments.remove(apartment);
                    }
                }
            }

        }
        for (ApartmentEntity apartment : apartments) {
            for (HotelEntity hotelEntity : hotelEntities) {
                if (apartment.getIdHotel() == hotelEntity.getIdHotel()) {
                    result.add(new ApartmentsSearchResultViewMapper(hotelEntity.getName(), apartment.getName(), hotelEntity.getStreet(), cityService.getIdToNameCity().get(hotelEntity.getIdCity()), apartment.getStatus()));
                }
            }
        }
        return result;
    }

    @GetMapping(value = "/details")
    public ApartmentDetailsViewMapper getApartmentDetails(@RequestParam String apartmentName) {
        ApartmentDetailsViewMapper result;
        List<ApartmentEntity> apartments = apartmentRepository.findApartmentEntityByName(apartmentName);
        ApartmentEntity apartment = apartments.get(0);
        List<HotelEntity> hotels = hotelRepository.findHotelById(apartment.getIdHotel());
        HotelEntity hotel = hotels.get(0);
        String cityName = cityService.getIdToNameCity().get((hotel.getIdCity()));
        result = new ApartmentDetailsViewMapper(hotel.getDescription(), hotel.getName(), hotel.getRating(), apartment.getStatus(), apartmentName, hotel.getStreet(), cityName, apartment.getSize(), apartment.getPrice());
        return result;
    }

}
