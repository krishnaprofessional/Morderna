//------------------------------------------------------------------------------
// Copyright 2016 NCR Corporation
//------------------------------------------------------------------------------

let express = require('express');
let httpProxy = require('http-proxy');
let http = require('http');
//let bodyParser = require('body-parser');
let Url = 'http://modernacodechallenge.azurewebsites.net/api/insurances';
let imageUrl = 'https://www.modernaforsakringar.se';

let server = express();
let proxyOptions  = {
  changeOrigin: true,
  target: {
    https: true
  }
};

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'user-time-zone,location,nep-enterprise-unit,X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Content-Length, Authorization, X-Mindflash-SessionID, nep-application-key, nep-organization, Accept-Language');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
};

server.use(allowCrossDomain);

server.set('port', process.env.PORT || 3002);

server.use(express.static(__dirname));

httpProxy.prototype.onError = function (err,req,res) {
  console.log('error occured : ' ,err);
  res.status(500).send('Oops, something went wrong...');
};

let apiProxy = httpProxy.createProxyServer(proxyOptions);

server.get('/siteassets*', function(req, res) {
  apiProxy.web(req, res, {target: imageUrl});
});

server.get('/contentassets*', function(req, res) {

  apiProxy.web(req, res, {target: imageUrl});
});

server.all('/', function(req, res) {
  apiProxy.web(req, res, {target: Url});
});


http.createServer(server).listen(server.get('port'), function () {
  console.log('Express server listening on port ' + server.get('port'));
});
