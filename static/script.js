const body = document.querySelector('body');
const btnDayNightMode = document.querySelector('.btn-day-night-mode');

let app = window.frames.app;

btnDayNightMode.onclick = function() {
  body.classList.toggle('night-mode');
  app.postMessage(body.classList[0], "*");
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add('night-mode');
    app.postMessage(body.classList[0], "*");
}
else {
    body.classList.remove('night-mode');
    app.postMessage(body.classList[0], "*");
}

window.matchMedia('(prefers-color-scheme: dark)').addListener(function (e) {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      body.classList.add('night-mode');
      app.postMessage(body.classList[0], "*");
  }
  else {
      body.classList.remove('night-mode');
      app.postMessage(body.classList[0], "*");
  }
});
