import {crest_url, db_name, db_version, db_table, loading} from './config.js'
import {loadMatch} from './script.js'


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
    console.log('indexeddb is not supported')
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

const readDb = () => {
    const open = indexedDB.open(db_name, db_version)
    open.onsuccess = () => {
        const db = open.result,
              tx = db.transaction(db_table, 'readonly'),
              store = tx.objectStore(db_table),
              request = store.getAll(),
              dbData = document.querySelector('.row.bookmark')
        dbData.innerHTML = ''
        request.onsuccess = element => {
        const result = element.target.result
        result.forEach(e => {
            window.deleteDb = deleteDb
            dbData.innerHTML += `
                <div class="col s12 m6 l3">
                <div class="icards">
                    <div class="title">
                    <h5>${e.compName}</h5>
                    </div>
                    <div class="info">
                    <div>
                        <p>${e.homeTeamName}</p>
                        <img src="${crest_url}${e.homeTeamId}.svg" alt="">
                    </div>
                    <p>VERZUZ</p>
                    <!-- maybe a swordsfight scene or something -->
                    <div>
                        <p>${e.awayTeamName}</p>
                        <img src="${crest_url}${e.awayTeamId}.svg" alt="">
                    </div>
                    </div>
                    <div class="setting">
                    <div>
                        <p>${e.date}</p>
                    </div>
                    <div>
                        <a class="waves-effect waves-light btn-small" onclick="deleteDb(${e.id})">Delete</a>
                    </div>
                    </div>
                </div>
                </div>`;
                
        });
    }
  }
}

const deleteDb = (id) => {
    const open = indexedDB.open(db_name, db_version)
    open.onsuccess = () => {
        const   db = open.result,
                tx = db.transaction(db_table, 'readwrite'),
                request = tx.objectStore(db_table)
        request.delete(id)
    }
    readDb()
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


export {writeDb, readDb, matchDb, cancelDb};