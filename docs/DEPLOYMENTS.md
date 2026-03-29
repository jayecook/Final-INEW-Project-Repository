**# Deployment

## Render
1. Push repo to GitHub
2. Create Blueprint using render.yaml
3. Set real SMTP secrets
4. Deploy database, backend, and frontend
5. Update repo URL and frontend/backend public URLs in render.yaml

## Railway
1. Create PostgreSQL service
2. Create backend service with RAILWAY_DOCKERFILE_PATH=backend/Dockerfile
3. Create frontend service with RAILWAY_DOCKERFILE_PATH=frontend/Dockerfile
4. Set REACT_APP_API_URL to backend URL + /api
5. Set backend database and mail environment variables**
