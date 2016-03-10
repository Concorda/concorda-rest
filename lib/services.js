'use strict'

const Concorda = require('concorda')

const Config = require('../config/config.js')()

module.exports = function (options) {
  // Set up our seneca plugins
  var seneca = server.seneca

  seneca.use('options', Config)

  seneca.ready(function(){
    seneca
      .use(Concorda, seneca.options)
  })

  return {
    name: 'concorda-rest'
  }
}
