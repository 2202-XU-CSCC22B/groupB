<template>
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
  --header: Georgia, Times New Roman, serif;
  --tColor: #404455;
  --text: Avenir, Helvetica, Arial, sans-serif;
}

html, body{
  font-size: 16px;
  height: 100%;
  margin: 0;
}

#app {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: #4a4e5f;
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

h1{
  font-family: var(--header);
  color: #313442;
  font-size: 26px;
  font-style: italic;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 2px;
  margin: 0;
}
</style>
