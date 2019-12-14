package com.adrian.repo;

import com.adrian.model.CityEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CityRepository  extends CrudRepository<CityEntity,Long> {

    @Query("select c from CityEntity c where c.cityName = :name")
    List<CityEntity> findCityListByCityName(@Param("name") String name);

    @Query("select c from CityEntity c where c.idCity = :idCity")
    List<CityEntity> findCityNameById(@Param("idCity") int idCity);

    @Query("select c from CityEntity c where c.idCity = :idCity")
    CityEntity findCityById(@Param("idCity") int idCity);
}
