package com.adrian.Services;

import com.adrian.model.HotelEntity;
import com.adrian.repo.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Configurable
public class HotelService {

    @Autowired
    HotelRepository hotelRepository;

    public Map<Integer, String> getIdToNameHotel(){
        Map<Integer, String> hotelMap = new HashMap<>();

        List<HotelEntity> hotels = new ArrayList<>();
        hotelRepository.findAll().forEach(hotels::add);
        for(HotelEntity hotel : hotels){
            hotelMap.put(hotel.getIdHotel(), hotel.getName());
        }
        return hotelMap;
    }
    public Map<String, Integer> getNameToIdHotel(){
        Map<String, Integer> hotelMap = new HashMap<>();

        List<HotelEntity> hotels = new ArrayList<>();
        hotelRepository.findAll().forEach(hotels::add);
        for(HotelEntity hotel : hotels){
            hotelMap.put(hotel.getName(), hotel.getIdHotel());
        }
        return hotelMap;
    }

}
