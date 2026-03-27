package com.company.inventory;

public class App {
    public static void main(String[] args) throws Exception {
        if (args.length == 0) {
            System.out.println("Usage: mvn exec:java -Dexec.args=\"init-db|seed-demo|run-worker\"");
            return;
        }

        switch (args[0]) {
            case "init-db":
                DatabaseInitializer.runSqlFile("sql/001_schema.sql");
                System.out.println("Database initialized.");
                break;

            case "seed-demo":
                DatabaseInitializer.runSqlFile("sql/002_seed_demo.sql");
                System.out.println("Demo data seeded.");
                break;

            case "run-worker":
                LowStockWorker worker = new LowStockWorker();
                worker.listen();
                break;

            default:
                System.out.println("Unknown command: " + args[0]);
        }
    }
}
