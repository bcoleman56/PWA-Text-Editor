import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Creates a new object store for the data and gives it a key name of 'id' which 
      //     will increment automatically
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Exports an UPDATE function for the database
export const putDb = async (content, id) => {
  console.log('PUT to the database');

  const contactDb = await openDB('jate', 1);

  const tx  = contactDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  const request = store.put({ content: content }, id);

  const result = await request;
  
  console.log('Data updated in the database', result);
};

// Exports a GET function for the database
export const getDb = async () => {
  console.log('GET from the database');

  const contactDb = await openDB('jate', 1);

  const tx = contactDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result.value;
};

// Starts the database
initdb();
