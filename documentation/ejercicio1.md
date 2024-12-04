# 🚗Ejercicio práctico 1: Contexto de vehículos
## Contexto
Dentro de nuestro proyecto de gestión familiar queremos incluir la gestión de vehículos.\
En este contexto queremos poder registrar los vehículos que tiene una familia, llevar el mantenimiento de cada vehículo, registrar los seguros y poder generar recordatorios de vencimiento del seguro y de la ITV.

## 🚀 Casos de uso
### Registrar un nuevo vehículo
Descripción: Permite registrar un vehículo en la plataforma.\
Inputs:
Marca, modelo, año, matrícula, kilometraje inicial, tipo (coche o moto).\
Reglas de negocio:
Validar que la matrícula no esté duplicada.

### Registrar un seguro
Descripción: Vincula un seguro a un vehículo específico.\
Inputs:
matricula, proveedor del seguro, fechas de inicio y vencimiento, coste.\
Reglas de negocio:
Validar que la fecha de vencimiento sea posterior a la fecha de inicio.\

### Actualizar el kilometraje de un vehículo
Descripción: Actualiza el kilometraje de un vehículo después de un viaje o mantenimiento.\
Inputs:
matricula y nuevo kilometraje.\
Reglas de negocio:
El nuevo kilometraje debe ser mayor al último registrado. Si existe algun mantenimiento que deba hacerse por kilometraje debe enviar una notificación.

### Generar recordatorios de vencimientos
Descripción: Identifica vehículos con seguros o itv que están por vencer.\
Reglas de negocio:
Enviar recordatorio con 7 días de anticipación.


### Registrar ITV
Descripción: Muestra todas las actividades de mantenimiento realizadas en un vehículo.\
Inputs:
matricula, favorable (true o false), proxima revision.