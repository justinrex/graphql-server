# GraphQL Breadcrumb Server

A small Apollo GraphQL API for recording UI interaction breadcrumbs in MongoDB. It exposes two operations: create a breadcrumb and list saved breadcrumbs.

## Run locally

Use Node.js 24 LTS (24.15 or newer), npm, and a running MongoDB instance.

```sh
nvm use
npm ci
cp .env.example .env
npm start
```

The endpoint is [localhost:4000](http://localhost:4000). Configure `PORT`, `MONGODB_URI`, and `MONGODB_DATABASE` in `.env`. A local MongoDB option:

```sh
docker run --rm --name breadcrumbs-mongo -p 127.0.0.1:27017:27017 -v breadcrumbs-data:/data/db mongo:8
```

## Try a query

```graphql
mutation {
  createBreadCrumb(element: "button", type: "click", value: "submit") {
    _id
    element
    type
    value
  }
}
```

```graphql
query {
  breadCrumbs {
    _id
    element
    type
    value
  }
}
```

More examples live in `exampleQueries`. Updates, deletes, and subscriptions are not implemented and are not advertised in the schema.

## Checks

```sh
npm run check
```

Tests exercise the actual GraphQL schema with an in-memory model and test MongoDB client cleanup with fakes. They cover creation, listing, required inputs, unsupported operations, persistence failures, and string ID serialization. A real MongoDB integration remains a manual check.

The app binds to localhost and has no authentication, pagination, or tenant isolation. It is a learning example for local use.
