package com.adrian.Services;

import com.adrian.model.CityEntity;
import com.adrian.repo.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Configurable
public class CityService {

    @Autowired
     CityRepository repositoryCity;

    public Map<Integer, String> getIdToNameCity(){
        Map<Integer, String> cityMap = new HashMap<>();

        List<CityEntity> cities = new ArrayList<>();
        repositoryCity.findAll().forEach(cities::add);
        for(CityEntity city : cities){
            cityMap.put(city.getIdCity(), city.getCityName());
        }
        return cityMap;
    }
    public Map<String, Integer> getNameToIdCity(){
        Map<String, Integer> cityMap = new HashMap<>();

        List<CityEntity> cities = new ArrayList<>();
        repositoryCity.findAll().forEach(cities::add);
        for(CityEntity city : cities){
            cityMap.put(city.getCityName(), city.getIdCity());
        }
        return cityMap;
    }
}
