import Converter from './Converter.js';
import Printer from './Printer.js';

class DataManager {
  constructor(path) {
    this.printer = new Printer(path);
  }

  async writeObjectList(array) {
    try {
      const string = Converter.objectsToJson(array);
      await this.printer.write(string);
    } catch (error) {
      console.error(error);
    }
  }

  async getObjectList() {
    try {
      if (!(await this.printer.existFile())) {
        await this.printer.create();
        return [];
      }
      const string = await this.printer.read();
      const s = Converter.jsonToObjects(string);
      return s;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default DataManager;
