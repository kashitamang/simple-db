const fs = require('node:fs/promises');
const path = require('path');
// import { nanoid } from 'nanoid';

module.exports = class SimpleDb {
  constructor(dirPath) {
    this.dirPath = dirPath;
  }
  get(id) {
    //making a file path and joining directory path with id.json
    this.filePath = path.join(this.dirPath, `${id}.json`);
    //reading file using file path created above 
    fs.readFile(this.filePath)
    //take the file and parsing it back into a regular object
      .then((file) => JSON.parse(file))
      .catch((e) => {
      //if the file being searched for doesn't exists return message
        if (e.code === 'ENOENT'){
          throw new Error(`no such file:${this.filePath}`);
        } throw e;
      });
  }
};

