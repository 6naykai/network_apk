<template>
    <NavigationBar class="navigation"></NavigationBar>
    <InfoList class="file_list"></InfoList>
    <video class="video_background" ref='video' src="@/assets/video/blue_num.mp4" v-show="true" width="" autoplay loop muted></video>
</template>

<script>
import InfoList from '@/components/InfoList.vue';
import NavigationBar from '@/components/NavigationBar.vue';
export default {
    name:"FileResourcePage",
    data:function() {
            return {
                
            }
        },
    components:{
            InfoList,
            NavigationBar
        },
    methods:{
        


    },
            
}

</script>
<style scoped>
    .navigation {
        position: relative;
        z-index: 10;
    }
    .file_list{
        position: relative;
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