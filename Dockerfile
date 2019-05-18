# docs:
# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
# creates a layer from the node:dubnium or node:10 Docker image
FROM node:dubnium

# copy all files to docker image, except the name listed on .dockerignore
COPY . /app

# open /app
WORKDIR /app

# docker automaticlt create dir tmp in absolute path
VOLUME [ "/tmp" ]

# install dependencies
RUN npm install --production

# default
# CMD [ "npm", "start" ]
CMD [ "sh", "-c", "npm start" ]