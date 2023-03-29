<template>
    <div class="page_body">
       <NavigationBar class="navigation"></NavigationBar>
       <!-- <h1 class="title">JYC看你还说我界面丑！</h1> -->
       <h1 class="title">订单管理系统-206003694</h1>
       <video class="video_background" ref='video' src="@/assets/video/blue_code.mp4" v-show="true" width="" autoplay loop muted></video>
    </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';

export default{
    name: 'IndexPage',
    components:{
        NavigationBar
    },
    data:function(){
        return {
        
        }
    },
    mounted() {
        this.draw_index()
    },
    methods:{
        draw_index() {
            let video = this.$refs['video']
            video.play()            
        }

    }
}

</script>

<style scoped>
    .navigation {
        position: relative;
        z-index: 10;
    }
    .title {
        position: relative;
        color: #ffffff;
        width: 100%;
        text-align: center;
        margin-top: 20%;
        font-size: 40px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        z-index: 10;
    }
    .video_background {
        position: absolute;
        object-fit: fill;
        overflow: hidden;
        width: 100%;
        height: 100%;
        top: 0;
        bottom: 0;
        z-index: 5;
    }
</style>