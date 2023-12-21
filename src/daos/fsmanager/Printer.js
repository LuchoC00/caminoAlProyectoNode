import * as fsSync from 'fs';
const fs = fsSync.promises;

class Printer {
  constructor(path) {
    this.path = path;
    this.fileName = path.split('/').reverse()[0];
  }

  async create() {
    try {
      await fs.writeFile(this.path, '[]', 'utf-8');
      console.log(`Creacion exitosa del archivo: ${this.fileName} `);
    } catch (error) {
      console.log(error);
    }
  }

  async existFile() {
    try {
      await fs.access(this.path);
      return true;
    } catch (error) {
      return false;
    }
  }

  async add(string) {
    try {
      await fs.appendFile(this.path, string, 'utf-8');
      console.log(
        `Se añadio el texto correctamente al archivo: ${this.fileName}`,
      );
    } catch (error) {
      console.error(
        `No se ha podido añadir el texto al archivo: ${this.fileName}`,
      );
    }
  }

  async write(string) {
    try {
      await fs.writeFile(this.path, string, 'utf-8');
      console.log(
        `Se escribio el texto correctamente al archivo: ${this.fileName}`,
      );
    } catch (error) {
      console.error(
        `No se ha podido añadir el texto al archivo: ${this.fileName}`,
      );
    }
  }

  async read() {
    try {
      let datos = '';
      await fs.readFile(this.path, 'utf-8').then((data) => (datos = data));
      console.log(`se leyo correctamente el archivo: ${this.fileName}.`);
      return datos;
    } catch (error) {
      console.error(error);
    }
  }
}
export default Printer;
