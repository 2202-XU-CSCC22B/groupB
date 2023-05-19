<template>
    <div class="left">
        <div id="top-text">
        {{ currentDate }}
        </div>
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
  background-color: #fff;
  border-left: var(--borGrey);
}

nav {
  display: flex;
  flex-direction: column;
  font-family: var(--text);
  text-align: left;
  margin: 30px 0 0 0;
}

nav a {
  color: var(--tColor);
  font-weight: bold;
  margin-bottom: 10px;
  text-decoration: none;
  text-transform: uppercase;
}

nav a.router-link-exact-active {
  color: #c59c13;
}

</style>