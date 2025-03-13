# Products Fetcher

Here is the backend for the products fetcher project. It is a NestJS application that fetches products from a given URL and stores them in a database.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Relevant Notes

- The `DB_SYNC` environment variable activates the syncronization of the database schema with the entities. Only use it for the first time you run the project, in order to set up the database, then you have to set it as `false` in order to don't clear the tables on each run.
- The syncronization of the products is done by the Delta Syncronization method. This method is used to fetch only the new products from the given URL.
- The auth system uses hardcoded values for the sake of simplicity. The username is `vadok` and the password is `123456`.
- The reports are just one object that contains the asked info, in this format: `{ totalProducts: number, newProducts: number, updatedProducts: number }`.
- The `/reports` endpoint is protected by the auth system. The user must provide the `Authorization` header with a valid Bearer token. You can get one by do a `POST` request to `/auth/login` with the credentials mentioned above.
- The report of my choice is a detail about how much products each brand has, and it's made by an aggregation query due to performance reasons.
- I rely on the `@nextjsx/crud` package to create the filter operations for the products. It's a very powerful package that helps a lot in the development process.
- I didn't have too much time to do a better documentation for the endpoints, sorry for that :c
- The samy applies for testing, I did barely the minimum to show that I know how to do it, but I focus on the syncronization usecase, probably the core of this system.
