package com.example.inventory.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.alert.email.to}")
    private String alertEmailTo;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendLowStockEmail(String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(alertEmailTo);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);}}
