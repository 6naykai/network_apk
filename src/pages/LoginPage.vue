<template>
    <div class="page_body">
        <video class="video_background" ref='video' src="@/assets/video/blue_code.mp4" v-show="true" width="" autoplay loop muted></video>
        <LoginBox class="login_box"></LoginBox>
    </div>
    
</template>

<script>
import LoginBox from '@/components/login_compoents/LoginBox.vue';

export default {
    name: 'LoginPage',
    components: {
        LoginBox
    },
    data:function(){
        return {

        }
    }
}
</script>

<style scoped>
    .video_background {
        object-fit: fill;
        overflow: hidden;
        position: absolute;
        height: 100vh;
        width: 100vw;
        top: 0;
        bottom: 0;
        z-index:  5;
    }
    .login_box {
        position: relative;
        z-index: 10;
    }
</style>

