package com.example.inventory.service;

import com.example.inventory.dto.ProductRequest;
import com.example.inventory.dto.ProductResponse;
import com.example.inventory.exception.ResourceNotFoundException;
import com.example.inventory.model.Product;
import com.example.inventory.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final AlertService alertService;

    public ProductService(ProductRepository productRepository, AlertService alertService) {
        this.productRepository = productRepository;
        this.alertService = alertService;
    }

    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<ProductResponse> getPublicProducts(Long productId, String productType, BigDecimal productAmount, Integer productCount) {
        return productRepository.findAll()
                .stream()
                .filter(p -> productId == null || p.getProductId().equals(productId))
                .filter(p -> productType == null || productType.isBlank() || p.getProductType().toLowerCase().contains(productType.toLowerCase()))
                .filter(p -> productAmount == null || p.getProductAmount().compareTo(productAmount) == 0)
                .filter(p -> productCount == null || p.getProductCount().equals(productCount))
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public ProductResponse createProduct(ProductRequest request) {
        Product product = new Product(
                request.getProductId(),
                request.getProductType(),
                request.getProductAmount(),
                request.getProductCount(),
                request.getThreshold()
        );

        Product saved = productRepository.save(product);

        if (saved.getProductCount() <= saved.getThreshold()) {
            alertService.sendLowStockAlerts();
        }

        return toResponse(saved);
    }

    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        product.setProductType(request.getProductType());
        product.setProductAmount(request.getProductAmount());
        product.setProductCount(request.getProductCount());
        product.setThreshold(request.getThreshold());

        Product updated = productRepository.save(product);

        if (updated.getProductCount() <= updated.getThreshold()) {
            alertService.sendLowStockAlerts();
        }

        return toResponse(updated);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }

    private ProductResponse toResponse(Product product) {
        return new ProductResponse(
                product.getProductId(),
                product.getProductType(),
                product.getProductAmount(),
                product.getProductCount(),
                product.getThreshold()
        );}}
