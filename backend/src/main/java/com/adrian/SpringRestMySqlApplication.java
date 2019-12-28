package com.adrian;

import com.adrian.repo.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class SpringRestMySqlApplication {
	@Autowired
	CityRepository repositoryCity;
	public static void main(String[] args) {
		SpringApplication.run(SpringRestMySqlApplication.class, args);

	}
}
