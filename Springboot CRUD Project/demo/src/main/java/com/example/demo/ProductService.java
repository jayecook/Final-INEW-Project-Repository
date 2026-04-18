package com.example.demo;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

//Handles the database operations

@Service
@RequiredArgsConstructor
public class ProductService {
    
    private final ProductRepository productRepository;

    public List<Product> getAll() {
        return productRepository.findAll();
    }

    public Product getById(int id) {
        Optional<Product> productToReturn = productRepository.findById(id);
        if(productToReturn.isPresent()){
            return productToReturn.get();
        }
            return null;
    }

    public void addProduct(Product product) {
        productRepository.save(product);
    }

    // For now just updating the whole object, although individual fields can be updated as well 
    public Product updateProduct(int id, Product requestBody) { 
    Optional<Product> existingProductOpt = productRepository.findById(id);

    if(existingProductOpt.isPresent()) {
        Product updatedProduct = existingProductOpt.get();

        if(requestBody.getName() != null) {
            updatedProduct.setName(requestBody.getName());
        }

        if(requestBody.getDescription() != null) {
            updatedProduct.setDescription(requestBody.getDescription());
        }

        if(requestBody.getPrice() != null) {
            updatedProduct.setPrice(requestBody.getPrice());
        }

        if(requestBody.getDescription() != null) {
            updatedProduct.setDescription(requestBody.getDescription());
        }

        if(requestBody.getCount() != null) {
            updatedProduct.setCount(requestBody.getCount());
        }

        return productRepository.save(updatedProduct);
    } 
        return null;
}
    
    public void deleteById(int id){
        productRepository.deleteById(id);
    }
}
