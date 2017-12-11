'use strict'

/* para garantizar que solo los usuarios que esten autenticados en la plataforma puedan llamar cierta ruta
hay un standar llamado jsonwebtoken que me permite tener un token que verifica que estoy enviando informacion correcta y brinda seguridad
por los ataques maliciosos
Token: es un string o cadena de texto muy larga que representa un codigo que tiene informacion encriptada
 */

import jwt from 'jsonwebtoken'
import bearer from 'token-extractor'

export default {
  // payload: datos a codificar secret: palabra clave
  async iniciarToken (payload, secret, options) {
    return new Promise((resolve, reject) => {
        // sign es para firmar
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) return reject(err)

        resolve(token)
      })
    })
  },

  // payload: datos a codificar secret: palabra clave
  async verificarToken (token, secret, options) {
    return new Promise((resolve, reject) => {
      // verifica si por alguna razon el token falla ocurre un erro o nos devuelve el decode
      jwt.verify(token, secret, options, (err, decoded) => {
        if (err) return reject(err)

        resolve(decoded)
      })
    })
  },

  async extraerToken (req) {
    return new Promise((resolve, reject) => {
      bearer(req, (err, token) => {
        if (err) return reject(err)

        resolve(token)
      })
    })
  }
}
