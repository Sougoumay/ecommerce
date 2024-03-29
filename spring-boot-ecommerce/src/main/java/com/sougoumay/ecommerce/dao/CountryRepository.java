package com.sougoumay.ecommerce.dao;

import com.sougoumay.ecommerce.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource
public interface CountryRepository extends JpaRepository<Country, Integer> {
}
