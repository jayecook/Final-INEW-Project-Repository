# Railway Deployment Notes

## Services to create
- PostgreSQL service
- Backend service
- Frontend service

## Backend service variables
RAILWAY_DOCKERFILE_PATH=backend/Dockerfile
SPRING_DATASOURCE_URL=<railway postgres connection string>
SPRING_DATASOURCE_USERNAME=<railway postgres user>
SPRING_DATASOURCE_PASSWORD=<railway postgres password>
FRONTEND_URL=<frontend railway url>
SPRING_MAIL_HOST=smtp.gmail.com
SPRING_MAIL_PORT=587
SPRING_MAIL_USERNAME=<your smtp username>
SPRING_MAIL_PASSWORD=<your smtp password>
SPRING_MAIL_PROPERTIES_MAIL_SMTP_AUTH=true
SPRING_MAIL_PROPERTIES_MAIL_SMTP_STARTTLS_ENABLE=true
ALERT_EMAIL_TO=<your alert email>

## Frontend service variables
RAILWAY_DOCKERFILE_PATH=frontend/Dockerfile
REACT_APP_API_URL=<backend railway url>/api
