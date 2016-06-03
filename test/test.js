var assert = require('assert');
var LoadCentral = require("../index");
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var uid = process.env.LOADCENTRAL_UID;
var password = process.env.LOADCENTRAL_PASSWORD;
var rrn = "BMP" +  parseInt(Math.random() * (1000000 - 1000) + 1000);
chai.use(chaiAsPromised);
chai.should();

describe('loadcentral', function() {
  it('should have a username and password set. i.e. $ LOADCENTRAL_UID=<uid> LOADCENTRAL_PASSWORD=<password> mocha', function(done) {
    if (!uid) {
      done(new Error("NoValidUID"));

    } else if (!password) {
      done(new Error("NoValidPassword"));

    } else {
      done();
      var loadCentral = new LoadCentral({uid: uid, password: password});
      describe('loadcentral', function() {
        describe('#sell', function() {
          it('should return an object of product', function() {
            loadCentral.sell("ZTEST1","639177920696",rrn).then(function(r) {console.dir(r)});
            return loadCentral.sell("ZTEST1","to",rrn).should.be.an('object');
          });

        });

        describe('#inquire', function() {
          it('should return an object of product sale status', function() {
            loadCentral.inquire(rrn).then(function(r) {console.dir(r)});
            return loadCentral.inquire(rrn).should.be.an('object');
          });
        });

      });
    }//if
  });
});
