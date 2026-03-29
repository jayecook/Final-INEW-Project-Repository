package com.example.inventory.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class Product {

    @Id
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

    public Product() {}

    public Product(Long productId, String productType, BigDecimal productAmount, Integer productCount, Integer threshold) {
        this.productId = productId;
        this.productType = productType;
        this.productAmount = productAmount;
        this.productCount = productCount;
        this.threshold = threshold;
    }

    public Long getProductId() { return productId; }
    public String getProductType() { return productType; }
    public BigDecimal getProductAmount() { return productAmount; }
    public Integer getProductCount() { return productCount; }
    public Integer getThreshold() { return threshold; }

    public void setProductId(Long productId) { this.productId = productId; }
    public void setProductType(String productType) { this.productType = productType; }
    public void setProductAmount(BigDecimal productAmount) { this.productAmount = productAmount; }
    public void setProductCount(Integer productCount) { this.productCount = productCount; }
    public void setThreshold(Integer threshold) { this.threshold = threshold; }}
