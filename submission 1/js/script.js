document.addEventListener('DOMContentLoaded', function() {
const elems = document.querySelector('.sidenav');
M.Sidenav.init(elems);
loadPage('home');


document.querySelectorAll('.link a').forEach(elements => {
elements.addEventListener('click', () => {
	const page = elements.getAttribute('href').split('#')[1]
	loadPage(page)
	M.Sidenav.getInstance(elems).close();
    })
  })
});

function loadPage(page) {
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState === 4 && xhttp.status === 200){
			document.querySelector(".body-content").innerHTML = xhttp.responseText;
		} else if(xhttp.status == 404) {
				content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
		} else {
			content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
		}
	};
	xhttp.open("GET", `pages/${page}.html`, true);
	xhttp.send();
};