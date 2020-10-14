if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("iServiceworker.js")
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

if ("Notification" in window) {
    requestPermission();
} else {
    console.error("Browser tidak mendukung notifikasi.");
}

function requestPermission() {
  Notification.requestPermission().then(function (result) {
    if (result === "denied") {
      console.log("Fitur notifikasi tidak diijinkan.");
      return;
    } else if (result === "default") {
      console.error("Pengguna menutup kotak dialog permintaan ijin.");
      return;
    }
    
    console.log("Fitur notifikasi diijinkan.");
    // navigator.serviceWorker.ready.then(function(reg) {
    //    reg.showNotification('notif', {body:'test'});
    //    console.log('sended?')
    // });
  });
}

const title = 'Notifikasi Sederhana';
    const options = {
        body : 'Ini adalah konten notifikasi. \nBisa menggunakan baris baru.',
    }





// onclick function
// function showNotifikasiSederhana() {
//     const title = 'Notifikasi Sederhana';
//     const options = {
//         'body': 'Ini adalah konten notifikasi. \nBisa menggunakan baris baru.',
//     }
//     if (Notification.permission === 'granted') {
//         navigator.serviceWorker.ready.then(function(registration) {
//             registration.showNotification(title, options);
//         });
//     } else {
//         console.error('FItur notifikasi tidak diijinkan.');
//     }
// }


// option {
// requireInteraction : (boolean) // function
// body = message 

// icon nope
// badge yup
// image nope 2:1

// actions = array of object [{'action':'yes-action', 'title':'Yes'}, {'action':'yes-action', 'title':'Nope'}]

// tag = notif grouping
// renotify = (boolean) if tag included

// silent = (boolean)
// vibrate
// sound

// dir
// data
// timestamp

function showNotifikasiSederhana() {
    const title = 'Notifikasi Sederhana';
    const options = {
        'body': 'Ini adalah konten notifikasi. \nBisa menggunakan baris baru.',
    }
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('FItur notifikasi tidak diijinkan.');
    }
    console.log('tes')
}

// function askPermission() {
//     return new Promise(function(resolve, reject) {
//       const permissionResult = Notification.requestPermission(function(result) {
//         resolve(result);
//       });
  
//       if (permissionResult) {
//         permissionResult.then(resolve, reject);
//       }
//     })
//     .then(function(permissionResult) {
//       if (permissionResult !== 'granted') {
//         throw new Error('We weren\'t granted permission.');
//       }
//     });
//   }

//   askPermission().then(d => {
//     navigator.serviceWorker.ready
//     .then(function(swreg) {
//         console.log("blaxblux");
//       swreg.showNotification('Successfully subscribed!', {body:'giorgi'});
//     });
//   })
var optionsss = { tag : 'user_alerts' };
navigator.serviceWorker.ready.then(function(registration) {
    registration.getNotifications(options).then(function(notifications) {
      console.log('getnotif?')
    }) 
  });