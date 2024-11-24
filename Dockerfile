# Usa una imagen base con Node.js
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios para instalar dependencias
COPY package.json ./

# Instala dependencias
RUN npm install

# Copia los archivos del proyecto
COPY src ./src

# Copia el fichero de OpenApi
COPY src/framework/swagger.json dist/framework/

# Copia el archivo de configuración
COPY tsconfig.json ./


# Transpila el código TypeScript a JavaScript
RUN npm run build

# Lanza el comando de arranque
CMD ["npm", "run", "start"]