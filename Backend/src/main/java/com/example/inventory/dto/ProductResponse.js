package com.example.inventory.dto;

import java.math.BigDecimal;

public class ProductResponse {

    private Long productId;
    private String productType;
    private BigDecimal productAmount;
    private Integer productCount;
    private Integer threshold;

    public ProductResponse() {}

    public ProductResponse(Long productId, String productType, BigDecimal productAmount, Integer productCount, Integer threshold) {
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
