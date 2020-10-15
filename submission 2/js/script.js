import {api_key, api_url, crest_url, loading} from './config.js';
import {writeDb, readDb, matchDb, cancelDb, deleteDb} from './indexDB.js'


const elems = document.querySelector('.sidenav'),
		  emsg = ['Data fetch failed', 'Data not found', 'Page not found'],
		  content = document.querySelector(".body-content")
let 	links = document.querySelectorAll('.link a')
		
document.addEventListener('DOMContentLoaded', () => {        
    M.Sidenav.init(elems);
    loadPage('home');
	  link(links)
});
   
const link = (data) => {
    data.forEach(elements => {
        elements.addEventListener('click', () => {
            const page = elements.getAttribute('href').split('#')[1]
            
            if(page == 'home') {
              loadPage(page)
            } else if(page == 'teams') {
              loadTeam(api_url, page)
            } else if(page == 'bookmark'){
              loadBookmark(page)
            } else if(page == 'matches') {
				      const data = elements.getAttribute('data-id')
				      loadMatch(`${api_url}${data}/${page}?status=SCHEDULED`, page)
			      } else {
                loadPage('error', emsg[2])
			      }
            M.Sidenav.getInstance(elems).close();
        })    
    })
}

const loadPage = (data, msg)=> {
	loading()
  return new Promise((resolve) => {
    const url = `pages/${data}.html`
	  fetch(url)
	    .then(response => response.text())
	    .then(response => {
        content.innerHTML = response
        if(content.querySelector('.emsg')) {
          content.querySelector('.emsg').innerHTML = msg
        }
        if(document.querySelector('.home')){
          loading()
        }
        resolve()
      })
    })
}
const fetchData = (url) =>{
    return new Promise((resolve,reject) => {
      fetch(url, {
          headers : {
              'X-Auth-Token' : api_key
          }
      })
        .then(response => response.json())
        .then(response => resolve(response))
        .catch(r => reject(r))
    })
}

const loadTeam = async(url, page) => {
    await loadPage(page).then()
    const result = await fetchData(url)
                          .then(r => r)
                          .catch(r => r)
    if(result.teams != undefined) {
        result.teams.forEach( async(e) => {
        document.querySelector('.row.teams').innerHTML += `
        <div class="col s12 m6 l3">
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" src="${e.crestUrl}">
            </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4">${e.shortName}<i class="material-icons right"></i></span>
              <p class="link" ><a id=match href="#matches" data-id="${e.id}">Matches</a></p>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">${e.shortName}<i class="material-icons right">X</i></span>
              <p>Fullname 	: ${e.name}</p>
              <p>TLA			: ${e.tla}</p>
              <p>Adress		: ${e.address}</p>
              <p>Email		: ${e.email}</p>
              <p>Phone		: ${e.phone}</p>
              <p>Website		: ${e.website}</p>
              <p>Venue		: ${e.venue}</p>  
            </div>
          </div>
        </div>
        `;
        })
      links = document.querySelectorAll('.link a')
      link(links)
      loading()
    } else {
      loadPage('error', emsg[0])  
    }
}

const loadMatch = async(url, page) => {
    await loadPage(page).then()
    const result = await fetchData(url, page)
                          .then(r => r)
                          .catch(r => r)
	if(result.matches != undefined && result.matches.length > 0) {
		result.matches.forEach( async(e) => {
			let button = '',
			    action = ''
			const matchs = await matchDb(e.id),
					  date = (new Date(Date.parse(e.utcDate))).toString().split('+')[0]
			if(matchs == undefined) {
				button = 'Bookmark'
				action = `writeDb(${e.id}, '${e.competition.name}', '${e.homeTeam.name}', '${e.homeTeam.id}', '${e.awayTeam.name}', '${e.awayTeam.id}', '${date}', '${url}', '${page}')`;
				window.writeDb = writeDb;
			} else {
				button = 'Cancel'
				action = `cancelDb(${e.id}, '${url}', '${page}')`
				window.cancelDb = cancelDb
			}
			document.querySelector('.row.matches').innerHTML += `
			  <div class="col s12 m6 l3">
			    <div class="icards">
				  <div class="title">
					<h5>${e.competition.name}</h5>
				  </div>
				  <div class="info">
					<div>
					  <p>${e.homeTeam.name}</p>
					  <img src="${crest_url}${e.homeTeam.id}.svg" alt="">
					</div>
					  <p>VERZUZ</p>
					  <!-- maybe a swordsfight scene or something -->
					<div>
					  <p>${e.awayTeam.name}</p>
					  <img src="${crest_url}${e.awayTeam.id}.svg" alt="">
					</div>
				  </div>
				  <div class="setting">
					<div>
					  <p>${date}</p>
					</div>
					<div>
					  <a id='action' class="waves-effect waves-light btn-small" onclick="${action}">${button}</a>
					</div>
				  </div>
				</div>
			  </div>`;
		})
		loading()
  } else {
    loadPage('error', emsg[0])
  }
}

const loadBookmark = async(page) => {
  await loadPage(page).then()
  const result = await readDb().then(r => r),
        selector = document.querySelector('.row.bookmark')
  selector.innerHTML = ''
  if(result.length > 0) {
    result.forEach( e => {
      window.deleteDb = deleteDb
      selector.innerHTML += `
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
              <a class="waves-effect waves-light btn-small" onclick="deleteDb(${e.id}, '${page}')">Delete</a>
            </div>
          </div>
        </div>
      </div>`;
    })
    loading()
  } else {
    loadPage('error', emsg[1])
  }
}

export {loadMatch, loadBookmark}