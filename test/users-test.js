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
import users from '../users'

import fixtures from './fixtures'

// const Db = require('senagram-db')

// let db = new Db(config.db)

test.beforeEach(async t => {
  let servidor = micro(users)
  t.context.url = await listen(servidor)
})

test('POST /', async t => {
  let user = fixtures.getUsuario()
  let url = t.context.url

  let options = {
    method: 'POST',
    uri: url,
    json: true,
    body: {
      name: user.name,
      username: user.username,
      password: user.password,
      email: user.email
    },
    // para verificar si respondio correctamen con el codigo
    // resuelva la promesa con toda la respuesta
    // reseolveWithFullResponse es una propiedad de reques promise
    resolveWithFullResponse: true
  }

  let response = await request(options)

  // yo no quiero que el usuario autenticarse mi api devuelva estos dos campos
  // delete user.email
  // delete user.password

  // verificar que el statusCode sea igual a 201 osea que halla sido creado
  t.is(response.statusCode, 201)
  // garantizar que el objeto que e creado ose el body sea igual al usuario
  t.deepEqual(response.body, user)
})

test('GET /:username', async t => {
  let user = fixtures.getUsuario()
  let url = t.context.url

  let options = {
    method: 'GET',
    uri: `${url}/${user.username}`,
    json: true
  }

  let body = await request(options)

  delete user.email
  delete user.password

  t.deepEqual(body, user)
})
