# nodejs base image
FROM node:23-alpine

# set working directory
WORKDIR /usr/src/app

# transfer package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy the rest of the application code
COPY . .

# build the application
RUN npm run build

# Expose the application port
EXPOSE 3001

# Command to start the application
CMD ["npm", "run", "start:prod"]
