class Printer {
  constructor(path) {
    this.path = path;
    this.fileName = path.split('/').reverse()[0];
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
        `Se añadio el texto correctamente al archivo: ${this.fileName} String: ${string}`,
      );
    } catch (error) {
      console.error(
        `No se ha podido añadir el texto al archivo: ${this.fileName} String: ${string}`,
      );
    }
  }

  async write(string) {
    try {
      await fs.writeFile(this.path, string, 'utf-8');
      console.log(
        `Se escribio el texto correctamente al archivo: ${this.fileName} String: ${string}`,
      );
    } catch (error) {
      console.error(
        `No se ha podido añadir el texto al archivo: ${this.fileName} String: ${string}`,
      );
    }
  }

  async read() {
    try {
      let datos = '';
      await fs.readFile(this.path, 'utf-8').then((data) => (datos = data));
      console.log(
        `se leyo correctamente el archivo: ${this.fileName}. String: ${datos}`,
      );
      return datos;
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default Printer;
