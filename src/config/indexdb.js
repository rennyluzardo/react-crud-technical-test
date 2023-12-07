import { openDB } from 'idb';
import data from "../data";

const dbName = "PruebaTecnicaRenny";
// var db = indexedDB.open(dbName, 3);

// function addMultiple(datas, callback) {
//   const tx = db.transaction(["people"], "readwrite");

//   datas.forEach(data => {
//     let request = tx.objectStore("people").add(data);
//   })

//   tx.oncomplete = function (event) {
//     callback();
//   }
// }

const db = await openDB('Images', 1, {
  upgrade(db) {
    const store = db.createObjectStore('images', {
      keyPath: 'id',
      autoIncrement: true,
    });
    store.createIndex('title', 'title');
  },
});

export const startIndexDB = async () => {
  // const db = await openDB('Images', 1, {
  //   upgrade(db) {
  //     const store = db.createObjectStore('images', {
  //       keyPath: 'id',
  //       autoIncrement: true,
  //     });
  //     store.createIndex('title', 'title');
  //   },
  // });
}

export const getAllMultimedia = async () => {
  let db = await openDB('Images', 1)

  let store = db.transaction('images').objectStore('images')
  // const value = await store.getAll()
  // let store = tx.objectStore('images')

  // // add, clear, count, delete, get, getAll, getAllKeys, getKey, put
  let allSavedItems = await store.getAll()

  db.close()

  return allSavedItems
}


export const storeFile = async file => {
  await db.add('images', {
    title: 'Image 1',
    propertyId: 1,
    date: new Date('2019-01-01'),
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    base64: file.base64,
  });
}