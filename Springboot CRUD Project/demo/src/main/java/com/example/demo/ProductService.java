package com.example.demo;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

// Handles the database operations

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> getAll() {
        return productRepository.findAll();
    }

    public Product getById(Long id) {
        Optional<Product> productToReturn = productRepository.findById(id);
        if (productToReturn.isPresent()) {
            return productToReturn.get();
        }
        return null;
    }

    public void addProduct(Product product) {
        productRepository.save(product);
    }

    // For now just updating the whole object, although individual fields can be updated as well
    public Product updateProduct(Long id, Product requestBody) {
        Optional<Product> existingProductOpt = productRepository.findById(id);

        if (existingProductOpt.isPresent()) {
            Product updatedProduct = existingProductOpt.get();

            if (requestBody.getProductName() != null) {
                updatedProduct.setProductName(requestBody.getProductName());
            }
            
            if (requestBody.getProductType() != null) {
                updatedProduct.setProductType(requestBody.getProductType());
            }

            if (requestBody.getProductDescription() != null) {
                updatedProduct.setProductDescription(requestBody.getProductDescription());
            }

            if (requestBody.getProductPrice() != null) {
                updatedProduct.setProductPrice(requestBody.getProductPrice());
            }

            if (requestBody.getProductCount() != null) {
                updatedProduct.setProductCount(requestBody.getProductCount());
            }

            if (requestBody.getThreshold() != null) {
                updatedProduct.setThreshold(requestBody.getThreshold());
            }

            return productRepository.save(updatedProduct);
        }
        return null;
    }

    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }
}