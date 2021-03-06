# lambda-compose

lambda-compose adds middleware and promise support to your lambda functions.

### installation

`npm install lambda-compose`

### example

```JavaScript
  const compose = require('lambda-compose')

  // example using callback
  export.myLambdaFunction = compose(
    (event, context, callback, next) => {
      // jump to next middleware:
      next()
    },
    (event, context, callback) => {
      // run the callback of the lambda function
      callback(null, { statusCode: 200, body: 'ok' })
    })

  // example using promises
  export.mySecondLambdaFunction = compose(
    (event, context, callback, next) => {
      // jump to next middleware:
      next()
    },
    (event, context) => Promise.resolve({ statusCode: 200, body: 'ok' })
  )
```

## License
Copyright (c) 2017 Simon Kusterer
Licensed under the MIT license.