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
  --tColor1: #957c33;
  --tColor2: #2d303a;
  --text: Avenir, Helvetica, Arial, sans-serif;
  --borGrey: 1px solid #d1d1d1;
  --borBlue: 1px solid #6db0e0;
}

html, body{
  font-size: 16px;
  height: 100%;
  margin: 0;
  background-color: #eff0f1;
  color: var(--tColor2);
}

#app {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: var(--tColor2);
  font-family: Helvetica, Arial, sans-serif;
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

.square_btn{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  background-color: #cebf80;
  border-radius: 8px;
  transition: 0.2s;
}

.square_btn:hover{
    background-color: #af9e5b;
    cursor: pointer;
}
</style>
