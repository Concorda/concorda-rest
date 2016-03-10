'use strict'

const Concorda = require('concorda')

module.exports = function (options) {
  // Set up our seneca plugins
  var seneca = this

  seneca.ready(function(){
    seneca
      .use(Concorda, options)
  })

  return {
    name: 'concorda-rest'
  }
}
