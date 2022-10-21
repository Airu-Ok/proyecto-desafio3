const fs = require("fs");
//clase contenedor
class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
  }
  //leer el archivo
  async read() {
    try {
      const data = await fs.readFileSync(`./${this.nombreArchivo}`, "utf-8");
      return data;
    } catch (err) {
      console.error("Error: ", err);
    }
  }
  //sobre escribir
  async write(datos, msg) {
    try {
      await fs.writeFileSync(
        `./${this.nombreArchivo}`,
        JSON.stringify(datos, null, 2)
      );
      console.log(msg);
    } catch (err) {
      console.error("Error: ", err);
    }
  }
  //método - guardar
  async save(product) {
    try {
      //datos del archivo
      const data = await this.read();
      const datos = JSON.parse(data);

        product.id = datos.length + 1;

      datos.push(product);

      await this.write(datos, "Producto agregado con éxito!");
      return product.id;
    } catch (err) {
      console.error("Error: ", err);
    }
  }
  //método - mostrar por id
  async getById(id) {
    try {
      let data = await this.read();
      let datos = JSON.parse(data);

      let result = datos.filter((product) => product.id == id);
      return result;
    } catch (err) {
      console.error("Error: ", err);
    }
  }
  //método - mostrar todo
  async getAll() {
    try {
      let data = await this.read();
      let datos = JSON.parse(data);

      return datos;
    } catch (err) {
      console.error("Error: ", err);
    }
  }
  //método - eliminar por id
  async deleteById(id) {
    try {
      let data = await this.read();
      let datos = JSON.parse(data);

      let product = datos.find((product) => product.id == id);

      if (product) {
        let index = datos.indexOf(product);
        datos.splice(index, 1);

        await this.write(datos, `El producto con ID: ${id} fue eliminado`);
      } else {
        console.log(`El producto con ID: ${id} no existe`);
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  }
  //método - eliminar todo
  async deleteAll() {
    try {
        let data = [];
        await this.write(data, 'Todos los productos fueron eliminados');
    } catch (err) {
        console.error('Error: ', err);
    }
  }
}

module.exports = Contenedor;