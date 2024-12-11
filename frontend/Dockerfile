# nodejs base image
FROM node:23-alpine

# set working directory
WORKDIR /app

# transfer package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
