<template>
    <div class="page_body">
        <NavigationBar class="navigation"></NavigationBar>
        <HardwareInfoList></HardwareInfoList>
    </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
import HardwareInfoList from '@/components/HardwareInfoList.vue';
export default {
    name: 'MangerHardwarePage',
    components:{
        NavigationBar,
        HardwareInfoList
    },
    data:function(){
        return{
            user_list:[]
        }
    },
    methods:{

    },
}
</script>


<style scoped>
    .page_body{
        
        height: 100vh;
        background-color: black;
    }
</style>