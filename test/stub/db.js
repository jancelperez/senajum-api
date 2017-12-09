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

  getImagenes () {
    return Promise.resolve(fixtures.getImagenes())
  }

  getImagenesPorTag (tag) {
    return Promise.resolve(fixtures.getImagenesPorTag())
  }

  guardarUsuario (user) {
    return Promise.resolve(fixtures.getUsuario())
  }

  getUsuario (username) {
    return Promise.resolve(fixtures.getUsuario())
  }
}
