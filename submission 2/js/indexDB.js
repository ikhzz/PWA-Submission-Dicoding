// var dbPromise = idb.open("mydatabase", 1, function(upgradeDb) {
//     if (!upgradeDb.objectStoreNames.contains("events")) {
//       upgradeDb.createObjectStore("events");
//     }
//   });

// var dbPromise = idb.open("perpustakaan", 1, function(upgradeDb) {
//     if (!upgradeDb.objectStoreNames.contains("buku")) {
//       var peopleOS = upgradeDb.createObjectStore("buku", { keyPath: "isbn" });
//       peopleOS.createIndex("judul", "judul", { unique: false });
//       peopleOS.createIndex("nomorIndux", "nomorIndux", { unique: true });
//     }
//   });

// dbPromise.then(function(db) {
//     var tx = db.transaction('buku', 'readwrite');
//     var store = tx.objectStore('buku');
//     var item = {
//         judul: 'Menjadi Android Developer Expert (MADE)',
//         isbn: 123456789,
//         description: 'Belajar pemrograman Android di Dicoding dengan modul online dan buku.',
//         created: new Date().getTime()
//     };
//     store.add(item, 123456789); //menambahkan key "buku"
//     return tx.complete;
// }).then(function() {
//     console.log('Buku berhasil disimpan.');
// }).catch(function() {
//     console.log('Buku gagal disimpan.')
// })

// dbPromise.then(function(db) {
//     var tx = db.transaction('buku', 'readonly');
//     var store = tx.objectStore('buku');
//     // mengambil primary key berdasarkan isbn
//     return store.get(123456789); 
//   }).then(function(val) {
//     console.dir(val);
//   });

// dbPromise.then(function(db) {
//     var tx = db.transaction('buku', 'readonly');
//     var store = tx.objectStore('buku');
//     return store.getAll();
//   }).then(function(items) {
//     console.log('Data yang diambil: ');
//     console.log(items);
//   });

// dbPromise.then(function(db) {
//     var tx = db.transaction('buku', 'readonly');
//     var store = tx.objectStore('buku');
//     return store.openCursor();
//   }).then(function ambilBuku(cursor) {
//     if (!cursor) {
//       return;
//     }
//     console.log('Posisi cursos: ', cursor.key);
//     for (var field in cursor.value) {
//       console.log(cursor.value[field]);
//     }
//     return cursor.continue().then(ambilBuku);
//   }).then(function() {
//     console.log('Tidak ada data lain.');
//   });


// function test() {
//     const   request = indexedDB.open('test', '1');

//     request.onupgradeneeded = e => {
//         const db = e.target.result
//         db.createObjectStore('testdb', {keyPath : 'id'})
//         console.log(e)
//     }

//     request.onsuccess = e => {
//         const db = e.target.result
//         console.log(e)
//     }

//     request.onerror = e => {
//         console.log(e.target.error)
//     }
// }

// function add() {
//     const   note = {
//             id : Math.random(),
//             desc : 'desc'
//             },
//             tx = db.transaction('testdb', 'readwirte'),
//             testadd = tx.objectStore('testdb')
    
//     testadd.add(note)
// }
// function view() {
//     const   tx = db.transaction('testdb', 'readonly'),
//             testView = tx.objectStore('testdb'),
//             request = testView.openCursor()
//     request.onsuccess = e => {
//         const cursor = e.target.result
//         if(cursor) {
//             cursor.continue()
//         }
//     }
// }

let db = '';

(()=> {
    // indexedDB.open('test', 1, (e)=> {
    //     IDBVersionChangeEvent.IDBOpenDBRequest.IDBDatabase.createObjectStore('testDb', {keyPath : 'id'})
    // })


    const request = indexedDB.open('test', '1');

    request.onupgradeneeded = e => {
        db = e.target.result,
        db.createObjectStore('testdb', {keyPath : 'id'})

    }

    request.onsuccess = e => {
        db = e.target.result
        console.log(db)
    }

    request.onerror = e => {
        console.log(e.target.error)
    }

    // idb.open('test', 1, (db)=> {
    //     console.log(db)
    //     db.createObjectStore('testDb', {keyPath : 'id'})
    // })
})();

document.querySelector('.writedb').addEventListener('click', ()=> {
    const   note = {
                    id : Math.random(),
                    desc : 'desc'
                    },
            tx = db.transaction('testdb', 'readwrite'),
            testadd = tx.objectStore('testdb')
            
            testadd.add(note)
})