package com.company.inventory;

import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

import java.util.List;
import java.util.Properties;

public class EmailService {

    public void sendEmail(List<String> recipients, String subject, String body) throws Exception {
        String host = System.getenv("SMTP_HOST");
        String port = System.getenv().getOrDefault("SMTP_PORT", "587");
        String user = System.getenv("SMTP_USER");
        String pass = System.getenv("SMTP_PASS");
        String from = System.getenv("MAIL_FROM");

        if (host == null || user == null || pass == null || from == null) {
            throw new RuntimeException("Missing SMTP environment variables");
        }

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", port);

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(user, pass);
            }
        });

        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(from));

        for (String recipient : recipients) {
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(recipient));
        }

        message.setSubject(subject);
        message.setText(body);

        Transport.send(message);
    }
}
