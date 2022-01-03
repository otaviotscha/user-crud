# User CRUD

## Requirements

To run this project you will need:

1. [NodeJS](https://nodejs.org/en/download/)
2. [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)
3. [PostgreSQL](https://www.postgresql.org/download/)
4. [Redis](https://redis.io/download)

## Environment

- `.env` file is read when in production.
- `.env.dev` file is read when calling `yarn dev`.
- `.env.test` file is read when calling `yarn test`.

You can use `.env.sample` to know how to configure the `.env` to your needs.

Defaults:

- PORT = `4000`
- TOKEN_SECRET = `usercrud`
- TOKEN_EXPIRATION = `3600`
- DATABASE_URL = `postgresql://postgres:postgres@localhost:5432/userdb?schema=public`
- REDIS_URL = `redis://redis@localhost:6379`

## Scripts

- `yarn prisma migrate dev` to generate database.
- `yarn dev` to run app in development environment.
- `yarn test` to run tests.
- `yarn build` to build TypeScript to JavaScript.
- `yarn prod` to run app in production mode.

## API Documentation

- `http://{host}:{port}/docs` default: <http://localhost:4000/docs>

## Main packages

- [TypeScript](https://github.com/microsoft/TypeScript)
- HTTP Server: [routing-controllers](https://github.com/typestack/routing-controllers) and [express](https://github.com/expressjs/express)
- Database: [PostgreSQL](https://www.postgresql.org/) and [prisma](https://github.com/prisma/prisma)
- Auth: [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- Requests validations: [class-validator](https://github.com/typestack/class-validator)
- API documentation: [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- Tests: [jest](https://github.com/facebook/jest)
- Logs: [winston](https://github.com/winstonjs/winston)
