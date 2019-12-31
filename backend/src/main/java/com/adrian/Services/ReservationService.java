package com.adrian.Services;

import com.adrian.mapper.ReservationViewWrapper;
import com.adrian.model.ApartmentEntity;
import com.adrian.model.HotelEntity;
import com.adrian.model.ReservationEntity;
import com.adrian.repo.ApartmentRepository;
import com.adrian.repo.HotelRepository;
import com.adrian.repo.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Configurable
public class ReservationService {

    @Autowired
    ReservationRepository reservationRepository;
    @Autowired
    ApartmentRepository apartmentRepository;
    @Autowired
    HotelRepository hotelRepository;
    @Autowired
    UserService userService;
    @Autowired
    CityService cityService;

    public List<ReservationViewWrapper> constructReservationViewWrapper(String userEmail, boolean isHistoric) {
        List<ReservationViewWrapper> result = new ArrayList<>();

        LocalDate now = LocalDate.now();
        int userId = userService.getEmailToIdUser().get(userEmail);
        List<ReservationEntity> reservations = isHistoric
                ? reservationRepository.findAllReservationByUserAndStartDateLessThan(userId, now)
                : reservationRepository.findAllReservationByUserAndStartDateMoreThan(userId, now);
        List <Integer> idApartments = new ArrayList<>();
        if(reservations.size() == 0){
            return result;
        }
        reservations.forEach(reservation -> idApartments.add(reservation.getIdApartment()));

        List<ApartmentEntity> apartments = apartmentRepository.findApartmentsByIdApartments(idApartments);

        List <Integer> idHotels = new ArrayList<>();
        apartments.forEach(apartment -> idHotels.add(apartment.getIdHotel()));
        List<HotelEntity> hotels = hotelRepository.findHotelByHotelIds(idHotels);

        for(ReservationEntity reservation : reservations){
            for(ApartmentEntity apartment : apartments){
                for(HotelEntity hotel : hotels){
                    if(reservation.getIdApartment() == apartment.getIdApartment() && apartment.getIdHotel() == hotel.getIdHotel()){
                        String cityName = cityService.getIdToNameCity().get(hotel.getIdCity());
                        result.add(new ReservationViewWrapper(reservation.getPrice(), reservation.getStatus(), reservation.getEndDate(),
                                reservation.getStartDate(), hotel.getName(), cityName, hotel.getStreet(), apartment.getName()));
                    }
                }
            }
        }

        return result;
    }
}
