<template>
    <div class="page_body">
        <NavigationBar class="navigation"></NavigationBar>
        <SearchListVue></SearchListVue>
    </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
import SearchListVue from '@/components/SearchList.vue';
export default {
    name: 'SearchPage',
    components:{
        NavigationBar,
        SearchListVue 
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