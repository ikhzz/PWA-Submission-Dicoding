import {db_name, db_version, db_table} from './config.js'
import {loadMatch, loadBookmark} from './script.js'


if(window.indexedDB) {
    (()=> {
        const open = indexedDB.open(db_name, db_version)
        open.onupgradeneeded = e => {
            e.target.result.createObjectStore(db_table, {keyPath : 'id'})
        }
        open.onsuccess = e => {
            console.log('INDEXEDDB IS INVOKED!!!!!!')
        }
        open.onerror = e => {
            console.log(e)
        }
    })();
} else {
    console.log('indexedDB is not supported')
}

const readDb = () => {
    return new Promise(resolve => {
      const open = indexedDB.open(db_name, db_version)
      open.onsuccess = () => {
        const db = open.result,
              tx = db.transaction(db_table, 'readonly'),
              store = tx.objectStore(db_table),
              request = store.getAll()
              request.onsuccess = e => {
                resolve(e.target.result)
              }
      }
    })
}

const deleteDb = (id, page) => {
    const open = indexedDB.open(db_name, db_version)
    open.onsuccess = () => {
        const   db = open.result,
                tx = db.transaction(db_table, 'readwrite'),
                request = tx.objectStore(db_table)
        request.delete(id)
    }
    loadBookmark(page)
}

const matchDb = (id) => {
    return new Promise( (resolve, reject)=> {
        const open = indexedDB.open(db_name, db_version)
        open.onsuccess = () => {
            const db = open.result,
                  tx = db.transaction(db_table, 'readonly'),
                  store = tx.objectStore(db_table),
                  request = store.get(id)
            request.onsuccess = e => {
                resolve(e.target.result)
            }
        }
    })
}

const writeDb = (id, compName, homeTeamName, homeTeamId, awayTeamName, awayTeamid, date, url, page) => {
    const   open = indexedDB.open(db_name, db_version)
    open.onsuccess = () =>{
        const db = open.result,
              tx = db.transaction(db_table, 'readwrite'),
              request = tx.objectStore(db_table),
              data = { id : id, compName : compName,
              homeTeamName : homeTeamName, homeTeamId : homeTeamId,
              awayTeamName : awayTeamName, awayTeamId : awayTeamid,
              date : date
              }
        request.add(data)
    }
    loadMatch(url, page)
}

const cancelDb = (id, url, page) => {
    const open = indexedDB.open(db_name, db_version)
    open.onsuccess = () => {
        const db = open.result,
              tx = db.transaction(db_table, 'readwrite'),
              request = tx.objectStore(db_table)
        request.delete(id)
    }
    loadMatch(url, page)
}


export {writeDb, readDb, matchDb, cancelDb, deleteDb};