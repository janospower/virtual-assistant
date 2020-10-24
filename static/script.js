const body = document.querySelector('body');
const btnDayNightMode = document.querySelector('.btn--day-night-mode');
const btnAirPods = document.querySelector('.btn--airpods');
const btnSiri = document.querySelector('.btn--siri');
const mask = document.querySelector('.mask');
const main = document.querySelector('main');
const callout = document.querySelector('.callout');

let app = window.frames.app;
let isAwake = false;
let airPodsActive = false;

btnAirPods.onclick = function() {
  main.classList.toggle('hidden');
  btnAirPods.classList.toggle('active');
  callout.classList.toggle('active');
  airPodsActive = true;
}

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

window.onkeydown = function(event) {
    if (event.keyCode == 32) {
      if (!isAwake) {
        app.postMessage("wake", "*");
        isAwake = true;
      }
    };
};

window.onkeyup = function() {
    if (event.keyCode == 32) {
      if (isAwake === true) {
        app.postMessage("sleep", "*");
        isAwake = false;
      }
    };
}


btnSiri.addEventListener('mousedown', event => {
  app.postMessage("wake", "*");
  isAwake = true;
});

window.addEventListener('mouseup', e => {
  if (isAwake === true) {
    app.postMessage("sleep", "*");
    isAwake = false;
  }
});
