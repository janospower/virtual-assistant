<template>
  <div id="app" @mouseleave="mouseInFrame = 0" @mouseenter="mouseInFrame = 1" >
    <header>
      <div class="status-bar status-bar-left">
        <span>{{ timenow }}</span>
      </div>
      <div class="status-bar status-bar-right">
        <img src="~@/assets/status-bar-right-side.svg" alt="Status indicators">
      </div>
    </header>
    <router-view/>
    <cursor-fx :style="{ opacity: mouseInFrame }" />
  </div>
</template>

<script>
  export default{
    data() {
      return {
        mouseInFrame: 1,
        timenow: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
      }
    },
    methods: {
      time() {
        this.timenow = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
      },
    },
    mounted() {
      this.interval = setInterval(this.time, 10000);
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
    },
    beforeDestroy() {
      clearInterval(this.interval)
    }
  };
</script>

<style>
:root {
  /* color-scheme: light dark; */

    --color-primary: hsla(0, 0%, 0%, 1);
    --color-background: hsla(0, 0%, 100%, 1);
    --color-background-blurred: hsla(222, 100%, 11%, 0.5);
    --color-cursor: hsla(0, 0%, 0%, 0.6);

    --cubic-ease: cubic-bezier(0.165, 0.840, 0.440, 1.000);

    --img-background: url('~@/assets/ios14-background-day.jpg');
    --img-background--blurred: url('~@/assets/ios14-background-day--blurred.png');
    --img-background--text: url('~@/assets/ios14-background-day--text.png');

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

    --font-weight--regular: 400;



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
  --color-background-blurred: hsla(222, 100%, 11%, 0.5);
  --color-cursor: hsla(0, 0%, 100%, 0.6);

  --img-background: url('~@/assets/ios14-background-night.jpg');
  --img-background--blurred: url('~@/assets/ios14-background-night--blurred.png');
  --img-background--text: url('~@/assets/ios14-background-night--text.png');

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
  user-select: none;
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

#app {
  height: 100vh;
}

#app,
* {
  cursor: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='3' cy='3' r='3' fill='black' fill-opacity='0.6'/%3E%3C/svg%3E%0A"), pointer !important;
}

.iphone--home-indicator {
  height: 40px;
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
}

.iphone--home-indicator div {
  margin: 0 auto;
  width: 134px;
  height: 5px;
  margin-top: calc( 40px - 8px - 5px );
  border-radius: 3px;
  background-color: var(--color-primary);
}

.blur {
  background-color: var(--color-background-blurred);
  backdrop-filter: saturate(180%) blur(20px);
}

.modal {
  border-radius: 13px;
}

.info {
  text-transform: none;
  letter-spacing: 0;
  margin-top: 6px;
  margin-bottom: 13px;
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

.cursor-fx__inner__outside {
  background-color: hsla(0, 0%, 0%, 0.3) !important;
  color: hsla(0, 0%, 100%, 0.3) !important;
}

.cursor-fx--hover .cursor-fx__inner__outside {
  background-color: hsla(0, 0%, 40%, 0.2) !important;
  color: hsla(0, 0%, 100%, 0.2) !important;
}

.cursor-fx__inner__inside {
  display: none !important;
}

.cursor-fx, .cursor-fx > div {
  z-index: 9999;
}

.v-squircle, .v-squircle--background {
  z-index: 0;
}

.v-squircle {
  padding: 0px 8px;
}

.v-squircle--segment, .v-squircle--filler {
  background-color: var(--color-background-blurred) !important;
  /* backdrop-filter: saturate(180%) blur(20px); */
}
.v-squircle--slot {
  z-index: 100;
  font-weight: 600;
  background-image: var(--img-background--text);
  background-size: 750px;
  background-position-x: center;
  background-clip: text;
  min-height: 42px;
  /* color: hsla(0,0%,100%,0.2); */
  color: transparent;
}

caption {
  font-size: 12px;
  text-transform: uppercase;
  font-weight: var(--font-weight--regular);
  letter-spacing: 0.08em;
  display: inline-block;
  text-align: left;
  margin-bottom: 6px;
}

hr {
  height: 1px;
  border-width: 0;
  background-color: hsla(222, 100%, 90%, 0.13);
}


.list-item {
  font-weight: var(--font-weight--regular);
  line-height: 41px;
  background-color: hsla(222, 100%, 90%, 0.05);
  margin-left: -13px;
  margin-right: -13px;
  padding-left: 13px;
  padding-right: 13px;
  color: hsla(0, 0%, 100%, 0.3);
}

.list-item-content {
  display: flex;
  justify-content: space-between;
}
</style>
