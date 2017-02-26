const tape = require('tape')
const compose = require('./index.js')

tape('compose()', function (t) {
  t.test('should verify that there is at least one middleware specified', function (t) {
    t.plan(1)
    t.throws(compose, 'compose() throws')
  })

  t.test('should call the middleware function', function (t) {
    t.plan(2)

    compose((context, event, callback) => callback(null, 'foo'))(null, null, (err, res) => {
      t.equal(err, null, 'err is null')
      t.equal(res, 'foo', 'middleware gets called')
    })
  })

  t.test('should call the next middleware function', function (t) {
    t.plan(1)

    compose(
      (context, event, callback, next) => next(),
      (context, event, callback) => callback()
    )(null, null, () => t.pass('next middleware gets called'))
  })

  t.test('should call the callback if middleware returns a promise', function (t) {
    t.plan(1)

    compose(
      (context, event, callback) => Promise.resolve('foo')
    )(null, null, (err, res) => {
      t.equal(err, null, 'err is null')
      t.equal(res, 'foo', 'promise resolves')
    })
  })

  t.test('should call the callback with an error middleware returns a rejected promise', function (t) {
    t.plan(1)

    compose(
      (context, event, callback) => Promise.reject('foo')
    )(null, null, (err) => t.equal(err, 'foo', 'promise rejects'))
  })

  t.test('should throw if no middleware the callback never gets called', function (t) {
    t.plan(1)
    t.throws(compose((context, event, callback, next) => next()), 'compose() throws')
  })

})
