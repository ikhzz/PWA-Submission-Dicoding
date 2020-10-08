import {api_key} from './config.js';

document.addEventListener('DOMContentLoaded', () => {
const elems = document.querySelector('.sidenav');
M.Sidenav.init(elems);
//loadPage('home');


document.querySelectorAll('.link a').forEach(elements => {
elements.addEventListener('click', () => {
	const page = elements.getAttribute('href').split('#')[1]
	const urls =  'http://api.football-data.org/v2/teams/18'
	const urls2 = 'https://api.football-data.org/v2/competitions/CL/matches'
	const urls3 = 'https://api.football-data.org/v2/competitions/'
	const urls4 = 'https://api.football-data.org/v2/teams/'
	// fetch(urls)
	//   .then(response => response.text())
	//   .then(response => {
	// 	const content = document.querySelector(".body-content")
	// 	content.innerHTML = response
	//   })
	  
	loadPage(page)
	loadData(urls4)
	M.Sidenav.getInstance(elems).close();
    })
  })
});

function loadPage(data) {
	const url = `pages/${data}.html`
	fetch(url)
	  .then(response => response.text())
	  .then(response => {
		  console.log(response)
		const content = document.querySelector(".body-content")
		 content.innerHTML = response
	  })
};

function loadData(data) {
	//const url = `pages/${page}.html`
	fetch(data, {
		headers : {
			'X-Auth-Token' : api_key
		}
	})
	  .then(response => response.json())
	  .then(response => {
		  console.log(response)
		//   response.matches.forEach(e => {
		// 	  document.querySelector('.row.content').innerHTML += `<p> helelel </p>`
		//   })
		// const content = document.querySelector(".body-content")
		// content.innerHTML = response
	  })
};
