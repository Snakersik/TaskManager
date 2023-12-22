# node js image
FROM node:14

# working directory
WORKDIR /app

# copy files to image
COPY package*.json ./
COPY public/ ./public
COPY src/ ./src

# install dependecies
RUN npm install

# compile app
RUN npm run build

# seting production enviroment
ENV NODE_ENV=production

# seting port :3000
EXPOSE 3000

# start app
CMD ["npm", "start"]
