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
}
