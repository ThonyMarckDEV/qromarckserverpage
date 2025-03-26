# Usa la imagen oficial de Node.js como base para la fase de construcción
FROM node:23.9.0-alpine AS build

# Configura el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de npm
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto del código fuente del proyecto
COPY . .

# Compila la aplicación React para producción
RUN npm run build

# Usa una imagen de Apache para servir la aplicación
FROM httpd:alpine

# Copia la aplicación compilada desde la imagen anterior al directorio de Apache
COPY --from=build /app/dist/ /usr/local/apache2/htdocs/

# Exponer el puerto 80 (para que sea accesible en el servidor)
EXPOSE 80

# Inicia Apache en primer plano
CMD ["httpd-foreground"]
