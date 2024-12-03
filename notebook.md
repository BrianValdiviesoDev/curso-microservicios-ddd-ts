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

### Servidor Mock
Hemos desarrollado un servidor para poder mockear nuestros propios servicios.\
La ideal inicial de esto era para poder hacer tests de integración y poder hacer llamadas entre microservicios en los tests sin que afectase a las bases de datos y sin necesidad de levantar todos los servicios.

Planteamos la problemática que este servidor no es escalable porque tendríamos que hacerlo crecer muchísimo para poder cubrir todos los endpoints de todos los servicios por lo que descartamos su uso con esta finalidad.

A pesar de esto observamos que es una buena herramienta para desarrollar. Para hacer los tests vamos a utilizar las funciones de mock que trae Jest, pero para hacer unos tests manuales es muy práctico tener un servidor con rutas mock para poder debugear.


## 3. Observabilidad
El stack que vamos a utilizar para la observabilidad es:
- `Loki`: se encarga de recopilar los logs generados.  
- `Prometheus`: recolecta y almacena métricas.
- `Grafana`: visualiza tanto las métricas de Prometheus como los logs de Loki en dashboards centralizados.

Primero debemos instalar la librería que nos servirá para enviar los logs desde nuestro servicio a Loki utilizando Winston
```bash
npm i winston-loki
```
Y actualizaremos nuestro logger para que winston también envie los logs a Loki.

Necesitaremos también en la raíz de nuestro proyecto estos ficheros:
- `./loki-config.yml`: configuraciones de Loki.
- `./prometheus.yml`: configuraciones de Prometheus.
- `./provisioning/datasources/datasources.yml`: este fichero contiene la configuración de Grafana para establecer como fuente de datos Loki y Prometheus. Esta estructura de carpetas es necesaria para montar el volumen en el docker compose. 


Y por último añadiremos este stack a nuestro docker compose.


(OPCIONAL) En caso de no tener las fuentes de datos precargadas en nuestro fichero de configuración de Grafana como se indica más arriba:
Vamos a acceder a Grafana y haremos la siguiente configuración.
- Accedemos a Grafana en [http://localhost:3000](http://localhost:3000) con user `admin` y pass `admin`.
- Añadir Prometheus: añadimos Prometheus como fuente de datos apuntando al host `http://host.docker.internal:9090/`
- Añadir Loki: añadimos Loki como fuente de datos apuntando al host `http://host.docker.internal:3100/`

Esta infraestructura ya tiene cierto nivel de complejidad por lo que vamos a separar los ficheros docker compose en 2:
- `docker-compose.yml`: Contiene solamente nuestros microservicios.
- `docker-compose.infra.yml`: Contienen nuestras piezas de infraestructura ajenas a nuestros servicios.

## 4. Clean Architecture
Migramos el micro de usuarios de una arquitectura MVC a Clean Architecture.\
Para ello hacemos la siguiente estructura de carpetas:\
src/\
├── application/\
├── domain/\
├── infrastructure/\
├── framework/\
├── routes/

De una forma extremadamente resumida:
- `application`: Contiene los casos de uso y si son necesarios mappers y dtos.
- `domain`: Contiene toda la lógica de negocio. Las entidades y las interfaces de salida.
- `infraestructure`: Contiene los controllers y si son necesarios algun dto o mapper.
- `framework`: Aquí colocamos todo lo necesario para que express funcione.
- `routes`: Las rutas de express.   

## 5. Comunicación por eventos
Para comunicar servicios de forma asíncrona vamos a utilizar un sistema de colas de mensajería (eventos).\
En este ejemplo tenemos un microservicio que se encarga de gestionar las notificaciones y por lo tanto necesitamos recibir eventos de diferentes servicios.\
Para no acoplar los servicios entre sí, vamos a utilizar `routingKey` que nos permite enviar eventos sin conocer quien los va a recibir.

Para este caso vamos a utilizar RabbitMQ y la librería `amqplib`
```bash
npm i amqplib
npm i -D @types/amqplib
```

En el docker compose de infra, añadimos el Rabbit.