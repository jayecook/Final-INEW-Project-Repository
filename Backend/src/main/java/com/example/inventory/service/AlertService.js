package com.example.inventory.service;

import com.example.inventory.model.Product;
import com.example.inventory.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AlertService {

    private final ProductRepository productRepository;
    private final EmailService emailService;

    public AlertService(ProductRepository productRepository, EmailService emailService) {
        this.productRepository = productRepository;
        this.emailService = emailService;
    }

    public List<Product> getLowStockProducts() {
        List<Product> allProducts = productRepository.findAll();
        List<Product> lowStock = new ArrayList<>();

        for (Product product : allProducts) {
            if (product.getProductCount() <= product.getThreshold()) {
                lowStock.add(product);
            }
        }
        return lowStock;
    }

    public String sendLowStockAlerts() {
        List<Product> lowStock = getLowStockProducts();

        if (lowStock.isEmpty()) {
            return "No low-stock products found.";
        }

        StringBuilder body = new StringBuilder("Low-stock products:\n\n");
        for (Product product : lowStock) {
            body.append("ID: ").append(product.getProductId())
                .append(" | Type: ").append(product.getProductType())
                .append(" | Count: ").append(product.getProductCount())
                .append(" | Threshold: ").append(product.getThreshold())
                .append("\n");
        }

        emailService.sendLowStockEmail("Inventory Alert: Low Stock Products", body.toString());
        return "Low-stock alert email sent successfully.";}}
