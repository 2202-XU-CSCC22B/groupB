<template>
  <div class="container">
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/form">FormInput</router-link>
  </nav>
  <router-view/>
</div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
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
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
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

</style>
