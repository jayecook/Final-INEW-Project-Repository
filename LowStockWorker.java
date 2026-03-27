package com.company.inventory;

import org.postgresql.PGConnection;
import org.postgresql.PGNotification;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class LowStockWorker {

    private Connection getConnection() throws Exception {
        String dbUrl = System.getenv("DATABASE_URL");
        if (dbUrl == null || dbUrl.isBlank()) {
            throw new RuntimeException("Missing DATABASE_URL environment variable");
        }
        return DriverManager.getConnection(dbUrl);
    }

    public void listen() throws Exception {
        try (Connection conn = getConnection();
             Statement stmt = conn.createStatement()) {

            stmt.execute("LISTEN low_stock");
            PGConnection pgConn = conn.unwrap(PGConnection.class);
            EmailService emailService = new EmailService();

            System.out.println("Listening for low_stock notifications...");

            while (true) {
                Thread.sleep(5000);

                PGNotification[] notifications = pgConn.getNotifications();
                if (notifications == null) {
                    continue;
                }

                for (PGNotification notification : notifications) {
                    System.out.println("Received: " + notification.getParameter());

                    List<String> recipients = getRecipients(conn);
                    if (recipients.isEmpty()) {
                        System.out.println("No recipients found.");
                        continue;
                    }

                    String subject = "Low stock alert";
                    String body = "A product has dropped below its configured threshold.\n\nPayload:\n"
                            + notification.getParameter();

                    try {
                        emailService.sendEmail(recipients, subject, body);
                        System.out.println("Email sent.");
                    } catch (Exception e) {
                        System.out.println("Email failed: " + e.getMessage());
                    }
                }
            }
        }
    }

    private List<String> getRecipients(Connection conn) throws Exception {
        List<String> recipients = new ArrayList<>();
        String sql = "SELECT email FROM inventory.alert_recipients WHERE enabled = TRUE ORDER BY email";

        try (PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                recipients.add(rs.getString("email"));
            }
        }
        return recipients;
    }
}
