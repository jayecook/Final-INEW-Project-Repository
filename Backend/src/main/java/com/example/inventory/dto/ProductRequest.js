package com.example.inventory.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public class ProductRequest {

    @NotNull
    private Long productId;

    @NotBlank
    private String productType;

    @NotNull
    @DecimalMin(value = "0.00")
    private BigDecimal productAmount;

    @NotNull
    @Min(0)
    private Integer productCount;

    @NotNull
    @Min(0)
    private Integer threshold;

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
