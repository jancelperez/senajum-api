'use strict'

import { send, json } from 'micro'
import HttpHash from 'http-hash'
import Db from 'senagram-db'
import DbStub from './test/stub/db'
import config from './config'
import utils from './lib/utils'

// const env = process.env.NODE_ENV || 'production'
const env = 'test'
let db = new Db(config.db)

if (env === 'test') {
  db = new DbStub()
}

const hash = HttpHash()

hash.set('POST /', async function autenticacion (req, res, param) {
  let credentials = await json(req)
  await db.connect()
  let auth = await db.autenticar(credentials.username, credentials.password)

  if (!auth) {
    return send(res, 401, { error: 'invalid credentials' })
  }

  let token = await utils.iniciarToken({
    username: credentials.username
  }, config.secret)

  send(res, 200, token)
})

// micro espera que le exporte una funcion asincrona para empezar a servir
// se exporta la funcion main que tiene los objetos de reques y response
export default async function main (req, res) {
  // object destructuring es lo mismo que hacer method = req.method y let url = req.url propiedad de enmascrip 6
  let { method, url } = req

  // con httphash yo hago el match con la funcion get, el cual hace un get del patron de la linea 10
  // method.UpperCase() es el metodo GET en mayuscular y url es la url
  let match = hash.get(`${method.toUpperCase()} ${url}`)

  // hhandler es la funcion que se va ejecutar en el proceso de ejecucion
  // si tenemos un handler ejecutamos ejecute el hadler de lo contrario ejecutamos un 404 de no found
  if (match.handler) {
    // si la promesa falla controlamos los errores con try catch

    try {
      // ejecutar el hadler
      await match.handler(req, res, match.params)
    } catch (e) {
      send(res, 500, { error: e.message })
    }
  } else {
    // send me permite enviar respuesta a las peticiones que me hacen en el servidor
    send(res, 404, { error: 'route not found' })
  }
}
