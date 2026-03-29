# Maven-Project-for-INEW-2332
Project for use with JAVA with following file sourcing.

Link to frontend file: https://drive.google.com/drive/folders/1LpPQTvy-qyCR0Po614dKPc-QwLcslk3H?usp=sharing

inventory-management-system/
├── .github/
│   └── workflows/
│       ├── backend-ci.yml
│       ├── frontend-ci.yml
│       └── deploy-render.yml
│
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env.example
│   ├── pom.xml
│   └── src/
│       ├── main/
│       │   ├── java/
│       │   │   └── com/example/inventory/
│       │   │       ├── InventoryApplication.java
│       │   │       ├── config/
│       │   │       │   ├── CorsConfig.java
│       │   │       │   ├── PasswordConfig.java
│       │   │       │   └── SecurityConfig.java
│       │   │       ├── controller/
│       │   │       │   ├── AlertController.java
│       │   │       │   ├── AuthController.java
│       │   │       │   └── ProductController.java
│       │   │       ├── dto/
│       │   │       │   ├── LoginRequest.java
│       │   │       │   ├── LoginResponse.java
│       │   │       │   ├── ProductRequest.java
│       │   │       │   └── ProductResponse.java
│       │   │       ├── exception/
│       │   │       │   ├── GlobalExceptionHandler.java
│       │   │       │   └── ResourceNotFoundException.java
│       │   │       ├── model/
│       │   │       │   ├── Product.java
│       │   │       │   └── User.java
│       │   │       ├── repository/
│       │   │       │   ├── ProductRepository.java
│       │   │       │   └── UserRepository.java
│       │   │       └── service/
│       │   │           ├── AlertService.java
│       │   │           ├── AuthService.java
│       │   │           ├── CustomUserDetailsService.java
│       │   │           ├── EmailService.java
│       │   │           └── ProductService.java
│       │   └── resources/
│       │       ├── application.properties
│       │       ├── data.sql
│       │       └── schema.sql
│       └── test/
│           └── java/
│               └── com/example/inventory/
│                   └── InventoryApplicationTests.java
│
├── frontend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env.example
│   ├── nginx.conf
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js
│       ├── index.js
│       ├── api/
│       │   ├── authApi.js
│       │   └── productApi.js
│       ├── components/
│       │   ├── AdminDashboard.jsx
│       │   ├── LandingPage.jsx
│       │   ├── LoginPage.jsx
│       │   ├── ProductForm.jsx
│       │   ├── ProductList.jsx
│       │   ├── ProductRow.jsx
│       │   ├── PublicInventoryPage.jsx
│       │   └── SearchFilters.jsx
│       └── styles/
│           └── app.css
│
├── deployment/
│   ├── docker-compose.yml
│   ├── railway.md
│   └── render.yaml
│
├── docs/
│   ├── DEPLOYMENT.md
│   ├── EMAIL_ALERTS.md
│   ├── SECRETS.md
│   └── SETUP.md
│
├── .gitignore
└── README.md
