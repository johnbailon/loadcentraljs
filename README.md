# Load Central Javascript Client

[LoadCentral](http://loadcentral.com.ph/)


```bash
$ npm install loadcentral
```

### app.js
```javascript
var LoadCentral = require("./index");
var uid = process.env.LOADCENTRAL_UID;
var password = process.env.LOADCENTRAL_PASSWORD;
var rrn = "BMP" +  parseInt(Math.random() * (1000000 - 1000) + 1000);

var loadCentral = new LoadCentral({uid: uid, password: password});
loadCentral.sell("ZTEST1","639171234567",rrn).then(function(r) {console.dir(r)});
loadCentral.inquire(rrn).then(function(r) {console.dir(r)});

```

```
$ node app.js
```

## TEST
```
$ npm install -g mocha
$ LOADCENTRAL_UID=<uid> LOADCENTRAL_PASSWORD=<password mocha   
```

### TO DO
* parse error codes
