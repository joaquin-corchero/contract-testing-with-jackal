# Cotract testing with Jackal

## The tools

### Jackal

- https://www.npmjs.com/package/jackal
- Install Jackal: `npm i jackal -g`
- Start local jackal instance and take note of the port: `jackal start`
- Jackal should be available on http://localhost:25863, you can check by hitting http://localhost:25863/api/health

### Joi

Jackal uses Joi for the assertions, you can have a look on https://github.com/Bartvds/joi-assert.

## Structure

There are two consumers, consumer-a and consumer-b, to stay focused on the subject, I cleaned both directories so the only thing that they contain are the package.json and the contracts.

Each of the consumers have different tests (contracts directory) against the same services: mammals, birds and tfl (external).

There are two services, mammals and birds with a few methods each.

## To see what it  does:
- start jackal (`jackal start`)
- install dependencies and start birds-service (`npm start`)
- install dependencies and start mammals-service (`npm start`)

### Running tets as a consumer:

- go to the consumer directory and execute `npm run jackal-tests`, this will insert/update on db.json and execute the tests.

### Running tests as a provider:

- go to the service directory and execute `npm run jackal-tests`, this will read all the tests registered against this service (from both providers) and execute all of them.