package com.company.inventory;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.stream.Collectors;

public class DatabaseInitializer {

    public static Connection getConnection() throws Exception {
        String dbUrl = System.getenv("DATABASE_URL");
        if (dbUrl == null || dbUrl.isBlank()) {
            throw new RuntimeException("Missing DATABASE_URL environment variable");
        }
        return DriverManager.getConnection(dbUrl);
    }

    public static void runSqlFile(String resourcePath) throws Exception {
        try (Connection conn = getConnection();
             Statement stmt = conn.createStatement()) {

            InputStream inputStream = DatabaseInitializer.class.getClassLoader().getResourceAsStream(resourcePath);
            if (inputStream == null) {
                throw new RuntimeException("SQL resource not found: " + resourcePath);
            }

            String sql;
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
                sql = reader.lines().collect(Collectors.joining("\n"));
            }

            stmt.execute(sql);
        }
    }
}
