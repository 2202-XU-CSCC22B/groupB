<template>
    <div class="left">
        <div>
            <h1>{{ currentDate }}</h1>
        </div>

        <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/form">FormInput</router-link>
        </nav>
    </div>
</template>

<script>
export default {
    name: "PanelLeft",
    data() {
        return {
            currentDate: ''
        };
    },

    mounted() {
        this.setCurrentDate();
    },

    methods: {
        setCurrentDate() {
        // Get the current date
        var currentDate = new Date();

        // Format the date
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        this.currentDate = currentDate.toLocaleDateString(undefined, options);
        }
    }
}
</script>

<style scoped>

.left{
  padding: 40px 20px;
  width: 250px;
}

nav {
  display: flex;
  flex-direction: column;
  font-family: var(--text);
  text-align: left;
  margin: 30px 0 0 0;
}

nav a {
  color: #404455;
  font-weight: bold;
  margin-bottom: 10px;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #c59c13;
}

</style>