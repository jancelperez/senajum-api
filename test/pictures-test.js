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
import pictures from '../pictures'

import fixtures from './fixtures'

test.beforeEach(async t => {
  let servidor = micro(pictures)
  t.context.url = await listen(servidor)
})

// GET /id es la primera ruta la cual es un test asincrono
test('GET /:id', async t => {
  // generar un id como si fuera el id de la imagen
  let imagen = fixtures.getImagen()

  // listen retorna una url con url y puerto con el cual el servidor esta corriendo el puerto lo crea listen
  // listenn retorna una promesa
  let url = t.context.url

  // hacer la peticion http diciendo que nos devuelva los datos en json
  let body = await request({uri: `${url}/${imagen.publicId}`, json: true})

  // con deepEquual validar que la imagen que tubo de esa ruta (body) es igual al objeto que obtiene de getImagen()
  t.deepEqual(body, imagen)

  console.log(`${url}/${imagen.publicId} esto es una prueba`)
})
// una de las caracteristicas de ava es definir el test sin implementar el test esto lo puedo hacer con todo
test('POST /', async t => {
  let imagen = fixtures.getImagen()
  let url = t.context.url

  let options = {
    method: 'POST',
    url: url,
    json: true,
    body: {
      description: imagen.description,
      src: imagen.src,
      UserId: imagen.userId
    },
    resolveWithFullResponse: true
  }

  let response = await request(options)

  t.is(response.statusCode, 201)
  t.deepEqual(response.body, imagen)
})

test.todo('POST/:/like')
