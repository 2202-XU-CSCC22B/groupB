<template>
    <div class="square_btn">
        <img src="../assets/view.svg" style="height: 25px; width: 25px;" @click="openOverlay">
    </div>
</template>


<script>
export default {
    name: 'ViewButton',
    props: {
        passId: {
        type: String,
        required: true
        }
    },

    methods: {

    }
}
</script>


<style scoped>
    
</style>