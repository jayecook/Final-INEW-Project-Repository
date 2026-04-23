package com.example.demo;
import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

//Class which represents a product

@Data
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "product_type", nullable = false, length = 150)
    private String productType;

    @Column(name = "product_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal productAmount;

    @Column(name = "product_count", nullable = false)
    private Integer productCount;

    @Column(name = "threshold", nullable = false)
    private Integer threshold;
}
    
