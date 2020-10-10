import {api_key, api_url, crest_url, loading} from './config.js';

const 	elems = document.querySelector('.sidenav'),
		emsg = ['Data fetch failed', 'Data not found', 'Page not found'],
		content = document.querySelector(".body-content")
let 	links = document.querySelectorAll('.link a')
	

document.addEventListener('DOMContentLoaded', () => {        
    M.Sidenav.init(elems);
    //loadPage('home');
    link(links)
});
   
function link(data) {
    data.forEach(elements => {
        elements.addEventListener('click', () => {
            const page = elements.getAttribute('href').split('#')[1]
            if(page == 'home') {
                loadPage(page)
            } else if(page == 'teams') {
				loadData(api_url, page)
            } else if(page == 'matches') {
				const data = elements.getAttribute('data-id')
				loadmatch(`${api_url}${data}/${page}?status=SCHEDULED`, page)
            } else {
				loadPage('error', emsg[2])
			}
            M.Sidenav.getInstance(elems).close();
        })    
    })
}

function loadPage(data, msg) {
	const url = `pages/${data}.html`
	fetch(url)
	  .then(response => response.text())
	  .then(response => {
		content.innerHTML = response

		if(content.querySelector('.emsg')) {
			content.querySelector('.emsg').innerHTML = msg
		}
	  })
	.catch(response => {
		console.log(response)
	})
};

function loadData(data, page) {
	loading()
	fetch(data, {
		headers : {
			'X-Auth-Token' : api_key
		}
	})
	  .then(response => response.json())
	  .then(response => {
		  //console.log(response)
		  response.teams.forEach(e => {
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
	  })
	  .catch(response => {
		console.log(response)
		loadPage('error', emsg[0])
		loading()
	  })
	  loadPage(page)
};

function loadmatch(data, page) {
	loading()
	fetch(data, {
		headers : {
			'X-Auth-Token' : api_key
		}
	})
	.then(response => response.json())
	.then(response => {
		if(response.matches.length > 0) {
		response.matches.forEach(e => {
			const date = (new Date(Date.parse(e.utcDate))).toString().split('+')[0]
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
					<a class="waves-effect waves-light btn-small">Bookmark</a>
				</div>
				</div>
			  </div>
			</div>`;
			})
		} else {
			loadPage('error', emsg[1])
		}
		loading()
	})
	.catch(response => {
	    console.log(response)
	    loadPage('error', emsg[0])
	    loading()
	})
	loadPage(page)
};