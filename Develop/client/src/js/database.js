import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// UPDATEs data in the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  const contactDb = await openDB('contact', 1);

  const tx  = contactDb.transaction('contact', 'readwrite');

  const store = tx.objectStore('contact');

  const request = store.upgrade({ content });

  const result = await request;
  
  console.log('Data updated in the database', result);
};

// GETs data from the database
export const getDb = async () => {
  console.log('GET from teh database');

  const contactDb = await openDB('contact', 1);

  const tx = contactDb.transaction('contact', 'readonly');

  const store = tx.objectStore('contact');

  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result;
};

// Starts the database
initdb();
