# 🏡 Users service
Este servicio se encarga de la gestión de usuarios 

## Setup
### Quick start
Install dependencies
```bash
npm install
```

Run in dev mode
```bash
npm run dev
```
### Run in docker
Build the image
```bash
docker build -t family-planner .
```

Run container
```bash
docker run -rm -d family-planner
```

### Run with docker compose
```bash
docker compose up -d
```

## Scripts
Run project in development mode. It runs without compiling.
```bash
npm run dev
```

Compile project in javascript in dist/
```bash
npm run build
```

Run compiled project from dist/
```bash
npm run start
```

Check linter
```bash
npm run lint
```

Fix styles with linter
```bash
npm run lint:fix
```

Run all tests
```bash
npm run test
```

Run all tests in watch mode
```bash
npm run test:watch
```

Run a coverage tests and generate a report in html-report/report.html
```bash
npm run test:cov
```

## Environment variables
- `PORT`: port that server will be listening.
- `NODE_ENV`: environment (dev | prod)
- `DB_URI`: uri to your database. I.E: mongodb://localhost:27017/database

## URLs
Health check -> [http://localhost:3000/monit/health](http://localhost:3000/monit/health)\
Swagger -> [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Changelog

### 0.1 - Base setup
A basic setup with framework