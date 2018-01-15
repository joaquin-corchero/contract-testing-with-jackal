# Jackal
- https://www.npmjs.com/package/jackal
- Install Jackal: `npm i jackal -g`
- Start local jackal instance and take note of the port: `jackal start`
- Jackal should be available on http://localhost:25863, you can check by hitting http://localhost:25863/api/health


## Jackal tests
- Use Joi for assertions and type definitions (https://github.com/hapijs/joi)
- Execute tests by running: `jackal send http://localhost:25863 contractsPath`

