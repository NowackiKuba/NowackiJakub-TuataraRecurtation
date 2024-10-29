# Użyj oficjalnego obrazu Node.js
FROM node:18

# Ustaw katalog roboczy
WORKDIR /app

# Skopiuj package.json oraz package-lock.json
COPY package*.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj resztę kodu do katalogu roboczego
COPY . .

# Expose port
EXPOSE 3000

# Uruchom serwis
CMD ["npm", "start"]
