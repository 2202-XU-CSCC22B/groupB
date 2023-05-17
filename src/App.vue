<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Playfair+Display:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <div class="container">
    <div class="wrapper">
      <PanelLeft/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import PanelLeft from "@/home/PanelLeft.vue"

export default {
  name: 'App',
  components:{
    PanelLeft
  }
}
</script>

<style>
:root{
  --header: Poppins, Arial, sans-serif;
  --tColor1: #e9ebf1;
  --tColor2: #404455;
  --text: Avenir, Helvetica, Arial, sans-serif;
  --borGrey: 1px solid #c2c8d3;
  --borBlue: 1px solid #6db0e0;
}

html, body{
  font-size: 16px;
  height: 100%;
  margin: 0;
  background-color: #ffffff;
}

#app {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: var(--tColor2);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}

.container{
  display: inline-block;
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
}

.wrapper{
  display: flex;
  flex-direction: row;
}

#top-text {
  font-family: var(--header);
  font-size: 26px;
  font-weight: 900;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 0;
}
</style>
