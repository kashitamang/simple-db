const fs = require('node:fs/promises');
const path = require('path');
const SimpleDb = require('../lib/simple-db.js');
const crypto = require('crypto');
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

  it('gets all files', async () => {
    //create two test objects
    const testObjects = [
      {
        name: 'Test1'
      },
      {
        name: 'Test2'
      },
      {
        name: 'Test3'
      },
    ];
    //create new db instance
    const db = new SimpleDb(TEST_DIR);
    //map through all objects and save
    testObjects.forEach(async testObject => {
      await db.save(testObject);
    });
    //call getAllFiles as result
    const result = await db.getAllFiles();
    //verify .toEqual
    expect(result).toEqual([
      {
        name: expect.any(String),
        id: expect.any(String)
      },
      {
        name: expect.any(String),
        id: expect.any(String)
      },
      {
        name: expect.any(String),
        id: expect.any(String)
      }
    ]);
  });

  it('gets file by id', async () => {
    const test = {
      name: 'Test'
    };
    const id = crypto.randomBytes(8).toString('hex');
    await fs.writeFile(`${TEST_DIR}/${id}.json`, JSON.stringify(test));
    const db = new SimpleDb(TEST_DIR);
    const result = await db.getFileById(id);
    expect(result).toEqual(test);
  });

  it('saves a file', async () => {
    //make test object
    const test = {
      name: 'Test'
    };
    const db = new SimpleDb(TEST_DIR);
    await db.save(test);
    const result = await db.getFileById(test.id);
    expect(result).toEqual(test);
  });
  
});
