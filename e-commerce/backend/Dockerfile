# Establecer la imagen base (vercion de nodejs)
FROM node:20.2.0

#Crear y establecer el directorio de mi contenedor
WORKDIR /backend

#Variable de entorno
# ENV DB_URI = mongodbatlas

# Agregar argumentos para el .env, por defecto en desarrollo
ARG ENV_FILE=.env

#Comando para ejecutar en prodiccion: docker build --build-arg ENV_FILE = .env.productio -t test:production
#Significa cualquier cosa (en este caso, -lock)
COPY package*.json ./
COPY src ./src
COPY $ENV_FILE ./

# Instalar Dependencias 

RUN npm install

# Puerto de la app

EXPOSE 8000

#Comando para iniciar mi app

CMD [ "node", "src/index.js"]

# Comando para compilar: docker build -t index.js .

# Comando para ejecutar: docker run -p 8000:8000 index.js