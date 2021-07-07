<template>
  <div>
    <nuxt-link
        to="/auth"
        name="auth"
        :aria-current="ariaCurrent"
      >Login</nuxt-link>
    <nuxt/>
  </div>
</template>
<script>
  export default {
    titleShort: 'is Listening',
    authorName: 'Edgar',
    computed: {
      ariaCurrent() {
        return 'auth' === this.$route.name ? 'page' : false
      }
    },
    head() {
      return {
        title: `${this.$options.authorName} ${
          this.$options.titleShort
        } ·X· A Musical App`,
        link: [
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css?family=Bungee+Hairline|Oswald'
          }
        ]
      }
    }
  }
</script>
<style>
:root {
  --colorGray: #333642;
  --colorBlue: rgba(118, 120, 224, 0.5);
  --colorBrightBlue: rgb(0, 112, 255);
}

html {
  background: #000;
}

body {
  padding: 0;
  margin: 0;
  color: white;
  font-family: 'Bungee Hairline', monospace;
}

a {
  color: white;
  text-decoration: none;
  display: inline-block;
  position: relative;
}

a::after,
a::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 1em;
  z-index: -1;
  mix-blend-mode: color-burn;
}

a::after {
  bottom: 2px;
  background: var(--colorBlue);
  z-index: -1;
  transform: rotate(-3deg);
}

a::before {
  background: rgba(118, 120, 224, 0.4);
  transform: rotate(2deg);
}

.nuxt-progress {
  opacity: 0.3;
  height: 2px;
  bottom: 0;
  top: auto;
}
</style>
