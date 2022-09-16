const fs = require('node:fs/promises');
const path = require('path');
const SimpleDb = require('../lib/simple-db.js');

const { CI, HOME } = process.env;
const BASE_DIR = CI ? HOME : __dirname;
const TEST_DIR = path.join(BASE_DIR, 'test-dir');

describe('simple database', () => {

  beforeEach(async () => {
    //deleting directory
    await fs.rm(TEST_DIR, { force: true, recursive: true });
    //making directory
    await fs.mkdir(TEST_DIR, { recursive: true });
  });

  it('gets file by id', async () => {
    // //define a source path
    // const srcPath = path.join(TEST_DIR, 'test.txt');
    // const db = new SimpleDb(TEST_DIR);
    // //make a new test file in the TEST_DIR
    // await fs.writeFile(srcPath, 'read me');
    // //test our getById function using our test file sourcepath
    // db.getFileById(srcPath);
    // //expect result
    // const file = await fs.readFile(srcPath);
    // expect(file).toEqual('read me');
  });

  it('saves a file', async () => {
    
    const test = {
      name: 'Test'
    };
    const db = new SimpleDb(TEST_DIR);
    await db.save(test);
    const result = await db.get(test.id);
    expect(result).toEqual(test);
  });

});
