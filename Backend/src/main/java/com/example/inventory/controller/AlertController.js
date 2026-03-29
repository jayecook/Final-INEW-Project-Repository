package com.example.inventory.controller;

import com.example.inventory.model.Product;
import com.example.inventory.service.AlertService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
public class AlertController {

    private final AlertService alertService;

    public AlertController(AlertService alertService) {
        this.alertService = alertService;
    }

    @GetMapping("/low-stock")
    public List<Product> lowStockProducts() {
        return alertService.getLowStockProducts();
    }

    @PostMapping("/send")
    public String sendAlerts() {
        return alertService.sendLowStockAlerts();}}
