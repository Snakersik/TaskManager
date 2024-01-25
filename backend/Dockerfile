# Użyj obrazu Node.js jako podstawowego obrazu
FROM node:16

# Utwórz i ustaw katalog roboczy w kontenerze
WORKDIR /app

# Skopiuj pliki projektu do katalogu roboczego
COPY package*.json package-lock*.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj resztę plików do katalogu roboczego
COPY . .

# Wyeksponuj port, na którym działa aplikacja
EXPOSE 3000

# Uruchom aplikację po zbudowaniu obrazu
CMD ["npm", "start"]