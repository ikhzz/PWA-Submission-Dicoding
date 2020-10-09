import {api_key, base_url, crest_url} from './config.js';

const elems = document.querySelector('.sidenav');
let links = document.querySelectorAll('.link a')

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
                loadPage(page)
                loadData(base_url)
            } else if(page == 'matches') {
				loadPage(page)
				const data = elements.getAttribute('data-id')
				loadmatch(`${base_url}${data}/${page}?status=SCHEDULED`)
            }
            M.Sidenav.getInstance(elems).close();
        })    
    })
}

function loadPage(data) {
	const url = `pages/${data}.html`
	fetch(url)
	  .then(response => response.text())
	  .then(response => {
		const content = document.querySelector(".body-content")
		 content.innerHTML = response
	  })
};

function loadData(data) {
	document.querySelector('.loading').classList.toggle('loadings')
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
		  document.querySelector('.loading').classList.toggle('loadings')
        links = document.querySelectorAll('.link a')
	    link(links)
	  })  
};
function loadmatch(data) {
	document.querySelector('.loading').classList.toggle('loadings')
	fetch(data, {
		headers : {
			'X-Auth-Token' : api_key
		}
	})
	  .then(response => response.json())
	  .then(response => {
		
		  console.log(response.matches)
		  console.log(response.matches[0].awayTeam.id)
		  response.matches.forEach(e => {
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
                      <p>${e.utcDate}</p>
                    </div>
                    <div>
                      <a class="waves-effect waves-light btn-small">Bookmark</a>
                    </div>
                  </div>
                </div>
              </div>`;
		  })
		  document.querySelector('.loading').classList.toggle('loadings')
	  })  
};
