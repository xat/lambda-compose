function isPromise (val) {
  return val && typeof val.then === 'function'
}

module.exports = function lambdaCompose () {
  const middleware = [].slice.call(arguments)

  if (!middleware.length) {
    throw new Error('compose requires at least one middleware')
  }

  return function (context, event, callback) {
    const stack = middleware.slice()

    function next () {
      if (!stack.length) {
        throw new Error('compose terminated without the callback function beeing called')
      }

      const fn = stack.shift()
      const ret = fn(context, event, callback, next)

      if (isPromise(ret)) {
        ret
          .then(function (res) {
            callback(null, res)
          })
          .catch(callback)
      }
    }

    next()
  }
}
