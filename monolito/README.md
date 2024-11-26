# 🏡 Family Organizer Backend
Bienvenido al backend del **Family Organizer**, una solución integral para gestionar y organizar las actividades y necesidades de tu familia en un solo lugar. Este sistema permite registrar eventos, tareas, el control de vehículos, pagos, facturas y más.

## 🚀 Funcionalidades

- **Gestión de eventos**: Crea, actualiza y elimina eventos familiares en un calendario compartido.
- **Tareas**: Asigna tareas a miembros de la familia, define prioridades y plazos.
- **Control de vehículos**: Registra los vehículos de la familia, historial de mantenimiento y uso.
- **Pagos y facturas**: Lleva un control de pagos recurrentes, facturas y gastos familiares.
- **Notificaciones**: Recibe recordatorios automáticos para eventos, tareas pendientes y vencimientos.

## 🛠️ Tecnologías utilizadas

- **Node.js** con **TypeScript**: Para un backend robusto, tipado y escalable.
- **Express.js**: Framework para la creación de APIs RESTful.
- **MongoDB**: Base de datos NoSQL para un almacenamiento flexible y ágil.
- **JWT**: Autenticación segura basada en tokens.
- **Docker**: Contenerización del proyecto para un despliegue más eficiente.


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

### 1.0 - First version
Add first features for the project.

### 0.2 - Express framework
Add a complete framework setup.

### 0.1 - Testing TS project
A simple project that runs a TS file with a console log.