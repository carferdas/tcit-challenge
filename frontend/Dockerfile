FROM node:19.2-alpine3.15 AS deps

# Create app directory
WORKDIR /usr/src/frontend

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
# RUN npm run build

# Start the server using the production build
# CMD [ "node", "dist/main" ] 
CMD [ "npm", "run", "dev" ]