<template>
    <div style="padding: 0; margin: 0;">
    <div class="square_btn">
        <img src="../assets/file.png" @click="openOverlay">
        <UploadOverlay v-show="showOverlay" :passId="passId" @close-overlay="closeOverlay" />
    </div>
</div>
</template>


<script>
import UploadOverlay from '../views/FormInput.vue';
    export default {
        name: 'UploadButton',
        props: {
            passId: {
            type: String,
            required: true
            }
        },
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


<style>
    img{
        width: 20px; 
        height: 20px;
        filter: invert(100%) sepia(0%) saturate(7499%) hue-rotate(173deg) brightness(102%) contrast(101%);
    }
</style>