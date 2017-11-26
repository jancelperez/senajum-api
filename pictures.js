'use strict'

import { send, json } from 'micro'
import HttpHash from 'http-hash'
import Db from 'senagram-db'
import DbStub from './test/stub/db'
import config from './config'

// const env = process.env.NODE_ENV || 'production'
const env = 'test'
let db = new Db(config.db)

if (env === 'test') {
  db = new DbStub()
}

const hash = HttpHash()

hash.set('GET /list', async function lista (req, res, params) {
  await db.connect()
  let imagenes = await db.getImagenes()
  await db.disconnect()
  send(res, 200, imagenes)
})
// Definir la primera ruta, se puede poner como url o metodo y url como express get/ o pos/
hash.set('GET /:id', async function getPictures (req, res, params) {
  // send es para enviar la respuesta, los parametros son res la respuestas, 200 es el statuscode de http que voy a enviar y params   lo que le voy a enviar
  // send(res, 200, params)
  let id = params.id
  await db.connect
  let imagen = await db.getImagen(id)
  await db.disconnect()
  send(res, 200, imagen)
})

hash.set('POST /', async function postPicture (req, res, params) {
  let imagen = await json(req)
  await db.connect()
  let created = await db.guardarImagen(imagen)
  await db.disconnect()
  send(res, 201, created)
})

hash.set('POST /:id/like', async function likePicture (req, res, params) {
  let id = params.id
  await db.connect()
  let imagen = await db.likeImagen(id)
  await db.disconnect()
  send(res, 200, imagen)
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
