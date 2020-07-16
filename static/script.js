const body = document.querySelector('body');
const btnDayNightMode = document.querySelector('.btn-day-night-mode');

btnDayNightMode.onclick = () => body.classList.toggle('night-mode');

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add('night-mode');
    body.classList.remove('day-mode');
}

window.matchMedia('(prefers-color-scheme: dark)').addListener(function (e) {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      body.classList.add('night-mode');
      body.classList.remove('day-mode');
  }
  else {
      body.classList.add('day-mode');
      body.classList.remove('night-mode');
  }
});
