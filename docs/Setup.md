# Setup

## Requirements
- Docker Desktop
- Git
- GitHub account

## Local startup
```bash
cd deployment
docker compose up --build

## `docs/SECRETS.md`

```md
# Secrets

## Backend environment variables
- SPRING_DATASOURCE_URL
- SPRING_DATASOURCE_USERNAME
- SPRING_DATASOURCE_PASSWORD
- SPRING_MAIL_HOST
- SPRING_MAIL_PORT
- SPRING_MAIL_USERNAME
- SPRING_MAIL_PASSWORD
- SPRING_MAIL_PROPERTIES_MAIL_SMTP_AUTH
- SPRING_MAIL_PROPERTIES_MAIL_SMTP_STARTTLS_ENABLE
- ALERT_EMAIL_TO
- FRONTEND_URL

## Frontend environment variables
- REACT_APP_API_URL

## GitHub Actions secret
- RENDER_DEPLOY_HOOK_URL
