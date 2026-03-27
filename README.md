# Maven-Project-for-INEW-2332
Project for use with JAVA with following file sourcing.
postgres-inventory-alerts/
├─ .github/
│  └─ workflows/
│     └─ ci.yml
├─ src/
│  ├─ main/
│  │  ├─ java/
│  │  │  └─ com/
│  │  │     └─ company/
│  │  │        └─ inventory/
│  │  │           ├─ App.java
│  │  │           ├─ DatabaseInitializer.java
│  │  │           ├─ EmailService.java
│  │  │           └─ LowStockWorker.java
│  │  └─ resources/
│  │     ├─ application.properties
│  │     └─ sql/
│  │        ├─ 001_schema.sql
│  │        └─ 002_seed_demo.sql
│  └─ test/
│     └─ java/
│        └─ com/
│           └─ company/
│              └─ inventory/
│                 └─ AppTest.java
├─ .env.example
├─ .gitignore
├─ Dockerfile
├─ docker-compose.yml
├─ pom.xml
└─ README.md
