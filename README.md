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
## Changelog

### 0.1 - Testing TS project