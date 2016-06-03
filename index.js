var Promise = require('bluebird');
var httpClient = require('superagent');
var pjson = require('./package.json');
var crypto = require('crypto');
var xml2js = require('xml2js');

function LoadCentral(opts) {
  if (!opts.uid) {
    throw new Error('MissingUID');
  }

  if (!opts.password) {
    throw new Error('MissingPassword');
  }
  this.uid = opts.uid;
  this.password = opts.password;
  this.apiEndpoint = !opts.apiEndpoint ? 'https://loadcentral.net/' : opts.apiEndpoint;
  //this.userAgent = !opts.userAgent ? pjson.name + "-" + pjson.version : opts.userAgent;
}

LoadCentral.prototype.sell = function(pCode, to, rrn) {
  var _this = this;
  var auth = crypto.createHash('md5').update(crypto.createHash('md5').update(rrn).digest("hex") + crypto.createHash('md5').update(_this.uid + _this.password).digest("hex")).digest("hex");
  return new Promise(function(resolve, reject) {
    httpClient.get(_this.apiEndpoint + 'sellapi.do')
    .query({
      uid: _this.uid,
      auth: auth,
      pcode: pCode,
      to: to,
      rrn: rrn
    })
    .end(function(err, res) {
      if (err) {
        return reject(err);
      }
      var text = "<result>" + res.text.trim().replace("\r\n",'') + "</result>";
      parser = new xml2js.Parser({trim: true, explicitArray: false});
      parser.parseString(text, function (parseErr, parseRes) {
        if (parseErr) {
          return reject(parseErr);
        }
        resolve(parseRes.result);
      });
    });
  });
}

LoadCentral.prototype.inquire = function(rrn) {
  var _this = this;
  var auth = crypto.createHash('md5').update(crypto.createHash('md5').update(rrn).digest("hex") + crypto.createHash('md5').update(_this.uid + _this.password).digest("hex")).digest("hex");
  return new Promise(function(resolve, reject) {
    httpClient.get(_this.apiEndpoint + 'sellapi.do')
    .accept('xml')
    .query({
      uid: _this.uid,
      auth: auth,
      rrn: rrn
    })
    .end(function(err, res) {
      if (err) {
        return reject(err);
      }
      var text = "<result>" + res.text.trim().replace("\r\n",'') + "</result>";
      parser = new xml2js.Parser({trim: true, explicitArray: false});
      parser.parseString(text, function (parseErr, parseRes) {
        if (parseErr) {
          return reject(parseErr);
        }
        resolve(parseRes.result);
      });
    });
  });
}

module.exports = LoadCentral;
