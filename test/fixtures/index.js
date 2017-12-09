export default {
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
      createdAt: new Date().toString()
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
      id: '123456789',
      name: 'Jancel Perez',
      username: 'janper',
      email: 'jhperez@misena.edu.co',
      password: 'senajum',
      createdAt: new Date().toString()
    }
  }
}
