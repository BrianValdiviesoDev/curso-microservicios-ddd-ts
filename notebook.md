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
__Dependencias__
- `express`: framework de trabajo.
- `cors`: middleware de express para gestión de CORS.
- `morgan`: middleware para monitorizar las peticiones http.
- `winston`: paquete para gestionar los logs.
- `nodemon`: paquete para poner express en watch mode.
- `dotenv`: paquete para cargar variables de entorno desde ficheros.

```bash
npm i express cors morgan winston dotenv
npm i -D nodemon @types/express @types/cors @types/morgan @types/winston
``` 

### Docker
__Dockerfile__\
Para el Dockerfile seguimos los mismos pasos. Copiamos los ficheros fuente y el de configuración de TS, compilamos y después ejecutamos el compilado.

__Docker compose__\
Para simplificar la dockerización montamos un compose para tener configuradas las variables de entorno, el mapeo de puertos y los volumenes.



### Linter
Como linter vamos a utilizar ESlint con los complementos de TS.
```bash
npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```
Tras instalar las dependencias vamos a iniciar el linter.
```bash
npx eslint --init
```
Ahora nos saldrá un asistente por consola con algunas preguntas sobre nuestro proyecto. Cuando finalice nos generará el fichero `eslint.config.mjs` donde se configuran las reglas del linter. En nuestro caso añadiremos este json:
```json
{
    rules: {
        indent: [
            'error',
            'tab'
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        quotes: [
            'error',
            'single'
        ],
        semi: [
            'error',
            'always'
        ],
        eqeqeq: 'off',
        'no-unused-vars': 'error',
        'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
    }
},
```
### Documentación
Para documentar el proyecto vamos a utilizar el standard OpenApi y como visualizador Swagger.
```bash
npm i swagger-ui-express swagger-jsdoc
npm install -D @types/swagger-ui-express
```
Todas las especificaciones irán en el fichero `/src/framework/swagger.json`


### Testing
Para hacer testing vamos a utilizar Jest. Los paquetes necesarios son:
- `jest`: Framework para testing.
- `ts-jest`: Paquetería para testear TS con Jest.
- `supertest`: Librería para abstraer llamadas http.
- `jest-html-reporters`: Libería para generar reportes HTML de los tests.
- `mongodb-memory-server`: Librería para montar un servidor mongo en memoria para los tests.

```bash
npm i -D jest ts-jest jest-html-reporters supertest mongodb-memory-server
```
```bash
npm i -D @types/jest @types/supertest @types/mongodb-memory-server
```
Además es necesario añadir el fichero `jest.config.json` para configurar Jest.


### Scripts npm
Añadimos estos scripts al package.json
```json
"scripts": {
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "test": "jest --runInBand --testTimeout=10000",
    "test:watch": "jest --watch --runInBand --detectOpenHandles",
    "test:cov": "jest --coverage --runInBand --detectOpenHandles"
},
```
`dev`: Ejecuta nuestro punto de entrada del proyecto sin transpilación previa.\
`build`: Transpila nuestro proyecto siguiendo las especifcaciones del fichero tsconfig.json.\
`start`: Ejecuta nuestro proyecto transpilado a js.
`lint`: Ejecuta la comprobación del linter.
`lint:fix`: Ejecuta el fix del linter para formatear el código.
`test`: Lanza todos los tests.
`test:watch`: Lanza todos los tests en watch mode.
`test:cov`: Lanza un coverage y genera un reporte en `html-report/report.html` 