const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  test('Convert gal to L: GET request to /api/convert', function(done) {
    chai.request(server)
      .keepOpen()
      .get('/api/convert')
      .query({ input: '1gal' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
         assert.equal(res.body.initNum, 1);
         assert.equal(res.body.initUnit, 'gal');
         assert.closeTo(res.body.returnNum, 3.78541, 0.00001);
        assert.equal(res.body.returnUnit, 'L');
        done();
      });
  });
    
  test('Convert L to gal: GET request to /api/convert', function(done) {
    chai.request(server)
      .keepOpen()
      .get('/api/convert')
      .query({ input: '1L' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'L');
        assert.closeTo(res.body.returnNum, 0.26417, 0.00001);
        assert.equal(res.body.returnUnit, 'gal');
        done();
      });
  });

  test('Convert lbs to kg: GET request to /api/convert', function(done) {
    chai.request(server)
      .keepOpen()
      .get('/api/convert')
      .query({ input: '1lbs' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'lbs');
        assert.closeTo(res.body.returnNum, 0.45359, 0.00001);
        assert.equal(res.body.returnUnit, 'kg');
        done();
      });
  });

  test('Convert kg to lbs: GET request to /api/convert', function(done) {
    chai.request(server)
      .keepOpen()
      .get('/api/convert')
      .query({ input: '1kg' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        assert.closeTo(res.body.returnNum, 2.20462, 0.00001);
        assert.equal(res.body.returnUnit, 'lbs');
        done();
      });
  });

  test('Convert mi to km: GET request to /api/convert', function(done) {
    chai.request(server)
      .keepOpen()
      .get('/api/convert')
      .query({ input: '1mi' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'mi');
        assert.closeTo(res.body.returnNum, 1.60934, 0.00001);
        assert.equal(res.body.returnUnit, 'km');
        done();
      });
  });

  test('Convert km to mi: GET request to /api/convert', function(done) {
    chai.request(server)
      .keepOpen()
      .get('/api/convert')
      .query({ input: '1km' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'km');
        assert.closeTo(res.body.returnNum, 0.62137, 0.00001);
        assert.equal(res.body.returnUnit, 'mi');
        done();
      });
  });

  test('Convert invalid input with no number such as kg: GET request to /api/convert', function(done) {
    chai.request(server)
      .keepOpen()
      .get('/api/convert')
      .query({ input: 'kg' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        assert.closeTo(res.body.returnNum, 2.20462, 0.00001);
        assert.equal(res.body.returnUnit, 'lbs');
        done();
      });
  });

});
