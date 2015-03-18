describe('Truth', function () {
  it('should be true', function () {
    true.should.be.true
  })

  it('should not be false', function () {
    true.should.not.be.false
  })
})

var foo = 'bar'

describe('foo variable', function () {
  it('should equal bar', function () {
    foo.should.equal('bar')
  })
})

var request = require('supertest')
  , server = require(__dirname + '/../server');

describe('Pages', function () {
  describe('GET /ss', function () {
    it('should redirect to "home"', function (done) {
      request(server)
        .get('/ss')
        .expect('location', '/tests-1')
        .expect(302, done)
    })
  })
})

describe('GET /home', function () {
  it('should return status code 200', function (done) {
    request(server)
      .get('/home')
      .expect(200, done)
  })
  it('should contain text "Home page"', function (done) {
    request(server)
      .get('/home')
      .expect(/Home page/, done)
  })
})
describe('GET /hello', function () {
  it('should contain text "Hello, world!"', function (done) {
    request(server)
      .get('/hello')
      .expect(/Hello World!/, done)
  })
})
describe('GET /tests/test-rus.html', function () {
  it('should contain text "Привет, Мир!"', function (done) {
     request(server)
       .get('/tests/test.html')
       .expect(/Привет, Мир!/, done)
  })
})
