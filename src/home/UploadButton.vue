<template>
    <div class="plus">
        <img src="../assets/plus.svg" @click="openOverlay">
        <UploadOverlay v-show="showOverlay" @close-overlay="closeOverlay" />
    </div>
</template>


<script>
import UploadOverlay from '../views/FormInput.vue';
    export default {
        name: 'UploadButton',
        
        data() {
            return {
            showOverlay: false
            };
        },
        methods: {
            openOverlay() {
            this.showOverlay = true;
            },
            closeOverlay() {
            this.showOverlay = false;
            }
        },
        components: {
            UploadOverlay
        }
    }
</script>


<style scoped>
    .wrapper{
        height: inherit;
        margin-top: 30px;
        padding: 0 14px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .plus{
        width: 40px;
        height: 40px;
        border: 1px solid #404455;
        background-color: #dbdce2;
        border-radius: 15px;
        transition: 0.2s;
    }

    .plus:hover{
        background-color: #b9bac9;
        cursor: pointer;
    }
    
    img{
        width: 40px;
        height: 40px;
        filter: invert(27%) sepia(9%) saturate(1005%) hue-rotate(191deg) brightness(93%) contrast(96%);
    }

</style>