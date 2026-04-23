package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

//This creates the repository

public interface ProductRepository extends JpaRepository<Product, Long>{
    
}