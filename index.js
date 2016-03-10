'use strict';

var Hapi = require('hapi')
var Bell = require('bell')
var Chairo = require('chairo')
var Cookie = require('hapi-auth-cookie')
var Nes = require('nes')
var Good = require('good')
var GoodConsole = require('good-console')

var Services = require('./lib/services');

// Options for our hapi plugins.
var opts = {
  server: {
    port: Number(process.env.SERVICE_PORT || 3030),
    host: process.env.SERVICE_HOST
  },
  chairo: {
    timeout: 2000,
    secure: true,
    log: 'level:info'
  },
  good: {
    opsInterval: 1000,
    reporters: [{reporter: GoodConsole, events: {log: '*', response: '*'}}]
  }
}

// Create our server.
var server = new Hapi.Server({debug: {request: ['error']}})
server.connection(
  {
    host: opts.server.host,
    port: opts.server.port
  }
)

// Declare our Hapi plugin list.
var plugins = [
  {register: Bell},
  {register: Cookie},
  {register: Chairo, options: opts.chairo},
  {register: Nes},
  {register: Good, options: opts.good}
]

server.register(plugins,
  function (err) {
    if (err) {
      throw err;
    }

    server.seneca.use(Services)

    server.start(function () {
      console.log('listening on port: ' + process.env.SERVICE_PORT);
    });
  });
