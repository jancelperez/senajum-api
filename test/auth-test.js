'use strict'
// ava es para poder realizar los test
import test from 'ava'

// send es el metodo para enviar respuestas
import micro from 'micro'

// test-liste es una herramienta que me permite hacer test con microservicios
import listen from 'test-listen'

// request-promise permite hacer http utilizando promesas
import request from 'request-promise'

// importamos el modulu pictures el cual creamos para el sistema de enrutamiento
import auth from '../auth'

import fixtures from './fixtures'

import utils from '../lib/utils'

import config from '../config'

test.beforeEach(async t => {
  let servidor = micro(auth)
  t.context.url = await listen(servidor)
})

// test para autenticacion
test('autenticacion POST /', async t => {
  let user = fixtures.getUsuario()
  let url = t.context.url

  let options = {
    method: 'POST',
    uri: url,
    body: {
      username: user.username,
      password: user.password
    },
    // le eston diciendo que esto es formato json
    json: true
  }

  // esto nos va a retonrnar un token
  let token = await request(options)
  let decoded = await utils.verificarToken(token, config.secret)

  t.is(decoded.username, user.username)
})
