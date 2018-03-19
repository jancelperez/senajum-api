module.exports = {
  getImagen () {
    return {
      id: '123456789',
      publicId: '62jafsl8e59205',
      userId: 'senagram',
      liked: false,
      likes: 0,
      src: `http://senagram.test/123456789.jpg`,
      description: '#awesome',
      tags: ['awesome'],
      createdAt: new Date().toString(),
      json: true
    }
  },

  getImagenes () {
    return [
      this.getImagen(),
      this.getImagen(),
      this.getImagen()
    ]
  },

  getImagenesPorTag () {
    return [
      this.getImagen(),
      this.getImagen()
    ]
  },

  getUsuario () {
    return {
      id: '2b0e8385-0592-4af7-b139-11d0a56ea979',
      name: 'Jancel Hernan',
      username: 'jancel',
      email: 'jhperez5@hotmail.com',
      password: 'senajum',
      createdAt: '2018-03-19T17:45:30.722Z'
    }
  }
}
