<template>
  <div class="container">
    <div class="top">
      <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/form">FormInput</router-link>
      </nav>
    </div>
  <router-view/>
</div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
:root{
  --header: Georgia, Times New Roman, serif;
  --text: Avenir, Helvetica, Arial, sans-serif;
  --tColor: #404455;
}

html, body{
  margin: 0;
  height: 100%;
  font-size: 16px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #404455;
}

nav {
  padding: 10px 0px;
}

nav a {
  font-weight: bold;
  margin: 0 5px;
  color: #404455;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.container{
  position: relative;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.top{
  border-bottom: 2px solid #ccccd3;
  width: 100%;
}

</style>
