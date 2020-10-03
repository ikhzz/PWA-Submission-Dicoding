document.addEventListener('DOMContentLoaded', function() {
const elems = document.querySelector('.sidenav');
M.Sidenav.init(elems);
loadPage('home');
service();


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
		if (xhttp.readyState == 4){
			const content = document.querySelector(".body-content");
			if(xhttp.status == 200) {
				content.innerHTML = xhttp.responseText;
			} else if(xhttp.status == 404) {
				content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
			} else {
				content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
			}
		}
	};
	xhttp.open("GET", 'pages/'+page+'.html', true);
	xhttp.send();
};

function service() {
	if ("serviceWorker" in navigator) {
		window.addEventListener("load", function() {
		  navigator.serviceWorker
			.register("js/iServiceworker.js")
			.then(function() {
			  console.log("Pendaftaran ServiceWorker berhasil");
			})
			.catch(function() {
			  console.log("Pendaftaran ServiceWorker gagal");
			});
		});
	  } else {
		console.log("ServiceWorker belum didukung browser ini.");
	  }
}