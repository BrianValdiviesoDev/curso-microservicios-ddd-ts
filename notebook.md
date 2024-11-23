# Curso Arquitectura de microservicios, hexagonal y DDD en Node  con TS
## 1. Contexto del proyecto y teoría de microservicios
### Proyecto: Organizador familiar
__Contexto__ \
Tenemos una aplicación web para ayudar con la organización familiar. Una app donde tener todo lo necesario con los trámites familiares como vehículos, vivienda, seguros, recibos, mascotas, tareas…

__Necesidades__ \
Ahora mismo hay un monolito con todo el backend.
Necesitamos que sea un servicio escalable y mantenible y además necesitamos añadir más funcionalidades.

## 2. Nuestro primer microservicio
### Setup inicial de un proyecto con Express y TS
Iniciamos el proyecto de node.
```bash
npm init -y # inicia un proyecto JS con node y genera el package.json
```
Añadimos typescript como dependencia de desarrollo y también añadimos los tipos de node.
```bash
npm i -D typescript @types/node # añade typescript y los tipos de node
```
Generamos el fichero de configuración para la transpilación.
```bash
npx tsc --init # generamos el fichero tsconfig
```
Actualizamos el fichero con:\
`rootDir`: la ruta al punto de entrada del proyecto.\
`outDir`: la ruta donde queremos los ficheros compilados.

Añadimos ts-node para la ejecución sin compilación
```bash
npm i -D ts-node
```

__Scripts npm__\
Añadimos estos scripts al package.json
```json
"scripts": {
    "dev": "ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
},
```
`dev`: Ejecuta nuestro punto de entrada del proyecto sin transpilación previa.\
`build`: Transpila nuestro proyecto siguiendo las especifcaciones del fichero tsconfig.json.\
`start`: Ejecuta nuestro proyecto transpilado a js.

__Dockerfile__\
Para el Dockerfile seguimos los mismos pasos. Copiamos los ficheros fuente y el de configuración de TS, compilamos y después ejecutamos el compilado.