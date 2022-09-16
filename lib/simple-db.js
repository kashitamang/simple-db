const fs = require('node:fs/promises');
const path = require('path');
const crypto = require('crypto');

class SimpleDb {
  constructor(dirPath) {
    this.dirPath = dirPath;
  }

  //DONT FORGET TO RETURN YOUR FREAKING PROMISES

  getFileById(id) {
    //making a file path and joining directory path with id.json
    this.filePath = path.join(this.dirPath, `${id}.json`);
    //reading file using file path created above
    return fs.readFile(this.filePath)
      //take the file and parsing it back into a regular object
      .then((file) => JSON.parse(file))
      //or
      // .then(JSON.parse)
      .catch((e) => {
        //if the file being searched for doesn't exists return message
        if (e.code === 'ENOENT') {
          throw new Error(`no such file:${this.filePath}`);
        }
        throw e;
      });
  }

  save(obj) {
    //assigns a random id(sets an id property) and serializes
    obj.id = crypto.randomBytes(4).toString('hex');
    const data = JSON.stringify(obj);
    return fs.writeFile(`${this.dirPath}/${obj.id}.json`, data);
    //and serializes the object into [id].json
  }
}

module.exports = SimpleDb;
