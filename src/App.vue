<template>
  <div id="app">
    <header>
      <div class="status-bar status-bar-left">
        <span>{{ timenow }}</span>
      </div>
      <div class="status-bar status-bar-right">
        <img src="./assets/status-bar-right-side.svg" alt="Status indicators">
      </div>
    </header>
    <router-view/>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        timenow: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
      }
    },
    methods: {
      time() {
        this.timenow = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
      },
    },
    mounted() {
      this.interval = setInterval(this.time, 10000)
    },
    beforeDestroy() {
      clearInterval(this.interval)
    }
  };
  window.addEventListener('message', function(event) {
    if (event.data) { // night
      if (event.data == "night-mode") {
        document.documentElement.setAttribute("data-theme", "night");
      }
    }
    else { // day
      document.documentElement.setAttribute("data-theme", "day");
    }
  });
</script>

<style>
:root {
  /* color-scheme: light dark; */

    --color-primary: hsla(0, 0%, 0%, 1);
    --color-background: hsla(0, 0%, 100%, 1);
    --color-background-blurred: rgba(245, 245, 245, 0.6);

    --cubic-ease: cubic-bezier(0.165, 0.840, 0.440, 1.000);

    --img-background: url('./assets/ios14-background-day.jpg');

    --gutter: 16px;

    --spacing-01: 4px;
    --spacing-02: 8px;
    --spacing-03: 16px;
    --spacing-04: 24px;
    --spacing-05: 32px;
    --spacing-06: 48px;
    --spacing-07: 64px;
    --spacing-08: 80px;
    --spacing-09: 96px;
    --spacing-10: 128px;
    --spacing-11: 192px;
    --spacing-12: 256px;



    --color-gray-1: rgb(142, 142, 147);
    --color-gray-2: rgb(174, 174, 178);
    --color-gray-3: rgb(199, 199, 204);
    --color-gray-4: rgb(209, 209, 214);
    --color-gray-5: rgb(229, 229, 234);
    --color-gray-6: rgb(242, 242, 247);
    --color-blue: rgb(0, 122, 255);
    --color-green: rgb(52, 199, 89);
    --color-indigo: rgb(88, 86, 214);
    --color-orange: rgb(255, 149, 0);
    --color-pink: rgb(255, 45, 85);
    --color-purple: rgb(175, 82, 222);
    --color-red: rgb(255, 59, 48);
    --color-teal: rgb(90, 200, 250);
    --color-yellow: rgb(255, 204, 0);
}

/* @media (prefers-color-scheme: dark) {
    :root { */
[data-theme="night"] {
  --color-primary: hsla(0, 0%, 100%, 1);
  --color-background: hsla(0, 0%, 0%, 1);
  --color-background-blurred: rgba(37, 37, 37, 0.6);

  --img-background: url('./assets/ios14-background-night.jpg');

  --color-gray-1: rgb(142, 142, 147);
  --color-gray-2: rgb(99, 99, 102);
  --color-gray-3: rgb(72, 72, 74);
  --color-gray-4: rgb(58, 58, 60);
  --color-gray-5: rgb(44, 44, 46);
  --color-gray-6: rgb(28, 28, 30);
  --color-blue: rgb(10, 132, 255);
  --color-green: rgb(48, 209, 88);
  --color-indigo: rgb(94, 92, 230);
  --color-orange: rgb(255, 159, 10);
  --color-pink: rgb(255, 55, 95);
  --color-purple: rgb(191, 90, 242);
  --color-red: rgb(255, 69, 58);
  --color-teal: rgb(100, 210, 255);
  --color-yellow: rgb(255, 214, 10);
}

*{
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  margin: 0px;
  padding: 0px;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  -webkit-text-size-adjust:100%;
  /* quotes: "“" "”"; */
  background-image: var(--img-background);
  background-size: cover;
  min-height: 100%;
  min-width: 100%;
  overflow: hidden;
}

body {
  -webkit-font-smoothing: antialiased;
  font-family: system-ui, 'system', '-apple-system','HelveticaNeue', sans-serif;
  color: var(--color-primary);
  /* background-color: var(--color-background); */

  font: -apple-system-body
  /*
  font: -apple-system-caption1
  font: -apple-system-caption2
  font: -apple-system-footnote
  font: -apple-system-short-body
  font: -apple-system-short-headline
  font: -apple-system-short-subheadline
  font: -apple-system-short-caption1
  font: -apple-system-short-footnote
  font: -apple-system-tall-body
  */
}

h1 {
  font: -apple-system-headline
}

h2 {
  font: -apple-system-subheadline
}

a,
a:visited,
a:active {
  color: inherit;
  text-decoration:none;
  font-style: normal;
}

.blur {
  background-color: var(--color-background-blurred);
  backdrop-filter: saturate(180%) blur(20px);
}

.modal {
  border-radius: 13px;
}

.status-bar {
  color: white;
  padding: 17px;
  position: fixed;
  top: 0px;
  font-weight: 600;
  font-size: 15px;
}

.status-bar-left {
  left: 0px;
}

.status-bar-right {
  right: 0px;
}

.v-squircle--segment, .v-squircle--filler {
  background-color: var(--color-background-blurred);
  backdrop-filter: saturate(180%) blur(20px);
}
.v-squircle--background {
  z-index: 50;
}
.v-squircle--slot {
  z-index: 100;
  color: hsla(0, 0%, 100%, 1);
}

</style>
