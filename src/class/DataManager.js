import Converter from './Converter';
import Printer from './Printer';

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
      const string = await this.printer.read();
      return Converter.jsonToObjects(string);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default DataManager;
