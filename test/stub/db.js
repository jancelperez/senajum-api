'use strict'
import fixtures from '../fixtures'

export default class Db {
  connect () {
    return Promise.resolve(true)
  }

  disconnect () {
    return Promise.resolve(true)
  }

  getImagen (id) {
    return Promise.resolve(fixtures.getImagen())
  }

  guardarImagen (imagen) {
    return Promise.resolve(fixtures.getImagen())
  }

  likeImagen (id) {
    let imagen = fixtures.getImagen()
    imagen.liked = true
    imagen.likes = 1
    return Promise.resolve(imagen)
  }
}
