package com.adrian.controller;

import com.adrian.Services.CityService;
import com.adrian.Services.UserService;
import com.adrian.mapper.ApartmentDetailsViewWrapper;
import com.adrian.mapper.ApartmentsSearchResultViewWrapper;
import com.adrian.model.ApartmentEntity;
import com.adrian.model.HotelEntity;
import com.adrian.repo.*;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.adrian.mapper.OwnerHotelViewWrapper;


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
    @Autowired
    UserService userService;

    @GetMapping(value = "/search")
    public List<ApartmentsSearchResultViewWrapper> getHotels(@RequestParam String place, String hotelName, String startDate, String endDate) {
        List<ApartmentsSearchResultViewWrapper> result = new ArrayList<>();

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
                    result.add(new ApartmentsSearchResultViewWrapper(hotelEntity.getName(), apartment.getName(), hotelEntity.getStreet(),
                            cityService.getIdToNameCity().get(hotelEntity.getIdCity()), apartment.getStatus()));
                }
            }
        }
        return result;
    }

    @GetMapping(value = "/details")
    public ApartmentDetailsViewWrapper getApartmentDetails(@RequestParam String apartmentName) {
        ApartmentDetailsViewWrapper result;
        List<ApartmentEntity> apartments = apartmentRepository.findApartmentEntityByName(apartmentName);
        ApartmentEntity apartment = apartments.get(0);
        List<HotelEntity> hotels = hotelRepository.findHotelById(apartment.getIdHotel());
        HotelEntity hotel = hotels.get(0);
        String cityName = cityService.getIdToNameCity().get((hotel.getIdCity()));
        result = new ApartmentDetailsViewWrapper(hotel.getDescription(), hotel.getName(), hotel.getRating(),
                apartment.getStatus(), apartmentName, hotel.getStreet(), cityName, apartment.getSize(), apartment.getPrice());
        return result;
    }

    @GetMapping(value = "/getList")
    public List<OwnerHotelViewWrapper> getOwnerHotels(@RequestParam String userEmail) {
        List<OwnerHotelViewWrapper> result = new ArrayList<>();
        int userid = userService.getEmailToIdUser().get(userEmail);
        List<HotelEntity> hotels = hotelRepository.findListOfHotelsByOwnerId(userid);
        hotels.forEach(hotel -> {
            String cityName = cityService.getIdToNameCity().get(hotel.getIdCity());
            result.add(new OwnerHotelViewWrapper(hotel.getName(), hotel.getRating(), hotel.getStreet(), hotel.getDescription(), cityName));
        });
        return result;
    }

    @GetMapping(value = "/delete")
    public String deleteHotel(@RequestParam String hotelName) {

        List<HotelEntity> hotels = hotelRepository.findHotelByHotelName(hotelName);
        HotelEntity hotel = hotels.get(0);
        hotelRepository.delete(hotel);

        return new JSONObject()
                .put("message", "Hotel deleted successfully")
                .toString();
    }

    @GetMapping(value = "/upsert")
    public String upsertHotel(@RequestParam boolean isModify, String userEmail, String hotelName, int ratting, String street,
                              String city, String description) {
        int userId = userService.getEmailToIdUser().get(userEmail);
        int cityId = cityService.getNameToIdCity().get(city);
        if (isModify) {
            List<HotelEntity> hotels = hotelRepository.findHotelByHotelName(hotelName);
            HotelEntity hotel = hotels.get(0);
            hotel.setIdCity(cityId);
            hotel.setRating(ratting);
            hotel.setStreet(street);
            hotel.setDescription(description);
            hotelRepository.save(hotel);

            return new JSONObject()
                    .put("message", "Hotel updated successfully")
                    .toString();
        }

        hotelRepository.save(new HotelEntity(hotelName, ratting, description, userId, cityId, street));
        return new JSONObject()
                .put("message", "Hotel added successfully")
                .toString();
    }
}
