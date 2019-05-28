# Kalasenja API

Kalasenja api is a simple api built with love when chillout

## Dependencies

- Node:10
- Postgres:11
- Npm:6.9.0
- Docker
- Docker-compose

### Prerequisites

- Using Postgres 11 because docker running stable in this version in this application.

- Install [Docker for Mac](https://docs.docker.com/docker-for-mac/install/) Docker provides a way to run applications securely isolated in a container, packaged with all its dependencies and libraries

- Install [Docker compose](https://docs.docker.com/compose/install/) Compose is a tool for defining and running multi-container Docker applications.

### Installation

Read the instruction in `dev.env.example`
and adjust to your configuration.

```code
$ cp dev.env.example dev.env

> env $(cat dev.env) node_modules/.bin/nodemon src/server.js

[nodemon] 1.18.6
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node src/server.js`
```

## Running the server on development

```code
$ npm run dev
$
```

## Running the tests

```code
$ npm run test

Error: no test specified
```

## Deployment

Simple using docker compose read [docker-compose.md](docker/docker-compose.md) for details.

```code
$ docker-compose up -d

Creating kalasenja_postgres-service_1 ... done
Creating kalasenja_api-service_1      ... done
```

Ensure all containers have created automatically,
to check all containers that success created

```code
$ docker container ps

CONTAINER ID        IMAGE                        COMMAND                  CREATED             STATUS              PORTS                    NAMES
507b034fc203        kalasenja_api-service        "sh -c 'npm start'"      4 seconds ago       Up 1 second         0.0.0.0:3000->3000/tcp   kalasenja_api-service_1
8d00e7b0e73b        kalasenja_postgres-service   "docker-entrypoint.s…"   5 seconds ago       Up 3 seconds        0.0.0.0:3001->5432/tcp   kalasenja_postgres-service_1
```

To knowing api log

```$ docker logs <your_api_container>```

Example

```code

$ docker logs kalasenja_api-service_1

===========================
Connection Postgres success
===========================
===========================
API_PORT: 3002
API_HOST: 0.0.0.0
===========================

```

If any error
`Cant connect to Postgres`
maybe, because the image sometime is not built as quickly as posibble,
wait a minute and just repeat the installation.
If it still an error, check your environment, check your configuration.

## Built With

- [Express Js](https://expressjs.com/) - Express is a minimal and flexible Node.js web application framework.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/yuliefas/kalasenja-api/tags).

## Authors

- **Yuli Efa Suryantoro** - *WL* - [Github](https://github.com/yuliefas)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Work in under pressure will increase your skill.
- Do not eat bitter but eat the benefits.
- Get used to read the documentation and start build your own application.
- Perfection belongs to Allah only, so just be confident.