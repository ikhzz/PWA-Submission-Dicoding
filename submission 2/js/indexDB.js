import {crest_url} from './config.js'

let db = '';


function startDb() {
    const request = indexedDB.open('test', '1');

    request.onupgradeneeded = e => {
        db = e.target.result
        db.createObjectStore('testdb', {keyPath : 'id'})
    }

    request.onsuccess = e => {
        db = e.target.result
        console.log('INDEXEDDB INVOKED!!!!!!!')
    }

    request.onerror = e => {
        console.log(e.target.error)
    }
}

function writeDb(
    id, 
    compName, 
    homeTeamName, 
    homeTeamId, 
    awayTeamName, 
    awayTeamid,
    date
    ) {
    const   data = {
            id : id,
            compName : compName,
            homeTeamName : homeTeamName,
            homeTeamId : homeTeamId,
            awayTeamName : awayTeamName,
            awayTeamId : awayTeamid,
            date : date
            },
            tx = db.transaction('testdb', 'readwrite'),
            testadd = tx.objectStore('testdb') 
    testadd.add(data)
}


function readDb() {
    const   tx = db.transaction('testdb', 'readonly'),
            testView = tx.objectStore('testdb'),
            request = testView.getAll(),
            dbData = document.querySelector('.row.bookmark')
    dbData.innerHTML = ''
    request.onsuccess = element => {
        const result = element.target.result
        result.forEach(e => {
            if(e.title == undefined) {
                e.title = 'no data'
            }
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

function deleteDb(id){
    const   tx = db.transaction('testdb', 'readwrite'),
            testView = tx.objectStore('testdb')
    testView.delete(id)
    readDb() 
}
function matchDb(id){
    const   tx = db.transaction('testdb', 'readonly'),
            testView = tx.objectStore('testdb'),
            request = testView.get(id)
    console.log(request)
}
export {startDb, writeDb, readDb};