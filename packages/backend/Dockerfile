FROM node:15

# Create app directory
WORKDIR /app

COPY . .

# Run yarn without generating a yarn.lock file
RUN yarn --pure-lockfile

# Build frontend
RUN yarn --cwd ./frontend/ install

RUN yarn --cwd ./frontend/ run build

# Build backend
RUN yarn run build

# Use the port used by our server.js configuration
EXPOSE ${SERVER_PORT}
CMD [ "yarn", "start" ]