# Usa la imagen oficial de Node.js, versión 23.9.0
FROM node:23.9.0-alpine AS build

# Configura el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto que usará la aplicación (por defecto, en React suele ser el 3000)
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "build"]
