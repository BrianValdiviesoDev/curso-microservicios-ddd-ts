# Curso Arquitectura de microservicios, hexagonal y DDD en Node  con TS
En este curso vamos a desarrollar un ejercicio completo en el que aprenderemos a:
- Crear un proyecto con Express desde 0.
- Fundamentos de TypeScript.
- Arquitectura de microservicios.
- Observabilidad.
- DDD y Clean Architecture.

## Objetivo
Como planteamiento inicial tenemos un backend en un monolito con una arquitectura MVC.\
El supuesto práctico de este proyecto consiste en un proyecto que se creó como un MVP con la premisa de salir al mercado cuanto antes.\
Tras validar la idea se requiere ampliar la funcionalidad.\
Para que sea mantenible y escalable decidimos romper el monolito en microservicios con una arquitectura hexagonal.


## Práctica real: 🏡 Family Organizer Backend
Bienvenido al backend del **Family Organizer**, una solución integral para gestionar y organizar las actividades y necesidades de tu familia en un solo lugar. Este sistema permite registrar eventos, tareas, el control de vehículos, pagos, facturas y más.

## 🚀 Funcionalidades

- **Gestión de eventos**: Crea, actualiza y elimina eventos familiares en un calendario compartido.
- **Tareas**: Asigna tareas a miembros de la familia, define prioridades y plazos.
- **Control de vehículos**: Registra los vehículos de la familia, historial de mantenimiento y uso.
- **Pagos y facturas**: Lleva un control de pagos recurrentes, facturas y gastos familiares.
- **Seguros**: Gestión de los seguros familiares, tanto de vehículos como de hogar, o seguros médicos
- **Notificaciones**: Recibe recordatorios automáticos para eventos, tareas pendientes y vencimientos.

## 🛠️ Tecnologías utilizadas

- **Node.js** con **TypeScript**: Para un backend robusto, tipado y escalable.
- **Express.js**: Framework para la creación de APIs RESTful.
- **MongoDB**: Base de datos NoSQL para un almacenamiento flexible y ágil.
- **Docker**: Contenerización del proyecto para un despliegue más eficiente.
- **Grafana**: Monitorización.
- **Loki**: Captura de logs.
- **Prometheus**: Captura de métricas.

## Changelog

### 1.4 - Migrate user endpoints
Migrate all user endpoints

### 1.3 - Migrate user endpoints
Migrate all user endpoints

### 1.2 - Add observability
Add Grafana loki and prometheus

### 1.1 - Migrate create user
Migrate create user endpoint

### 1.0 - First version
Add first features for the project.

### 0.2 - Express framework
Add a complete framework setup.

### 0.1 - Testing TS project
A simple project that runs a TS file with a console log.