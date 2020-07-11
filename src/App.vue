<template>
  <div id="app">
    <div id="nav" class="blur">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
:root {
  color-scheme: light dark;

    --red-50: #fff3f2;
    --red-100: #ffe6e5;
    --red-200: #ffc4c2;
    --color-primary: hsla(0, 0%, 0%, 1);
    --color-background: hsla(0, 0%, 100%, 1);
    --color-background-blurred: rgba(245, 245, 245, 0.6);

    --img-background: url('./assets/ios14-background-night.jpg');

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
  font-family: 'system', '-apple-system','HelveticaNeue', sans-serif;
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

a, a:visited, a:active {
  color: inherit;
  text-decoration:none;
  font-style: normal;
}

@media (prefers-color-scheme: dark) {
    :root {
        --color-primary: hsla(0, 0%, 100%, 1);
        --color-background: hsla(0, 0%, 0%, 1);
        --color-background-blurred: rgba(37, 37, 37, 0.6);

        --img-background: url('./assets/ios14-background-day.jpg');

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
}

.blur {
  background-color: var(--color-background-blurred);
  backdrop-filter: saturate(180%) blur(20px);
}

.modal {
  border-radius: 13px;
}

#app {

}

#nav {

}

#nav a {

}

#nav a.router-link-exact-active {

}
</style>
