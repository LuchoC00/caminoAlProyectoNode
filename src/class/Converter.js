class Converter {
  static objectsToJson(objects) {
    return JSON.stringify(objects, null, 2);
  }

  static jsonToObjects(objects) {
    return JSON.parse(objects);
  }
}

export default Converter;
