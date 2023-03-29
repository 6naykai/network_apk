<template>
    <div class="page_body">
        <NavigationBar class="navigation"></NavigationBar>
        <UserInfoList></UserInfoList>
    </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
import UserInfoList from '@/components/UserInfoList.vue';
export default {
    name: 'MangerUserPage',
    components:{
        NavigationBar,
        UserInfoList
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
    .navigation{
        position: relative;
        z-index: 10;
    }

    .page_body{
        
        height: 100vh;
        background-color: black;
    }
</style>