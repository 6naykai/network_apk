<template>
    <div class="board">
        <h2 v-text="title"></h2>
        <ul>
            <li>用户名：&nbsp;<span v-text="username"></span></li>
            <li>用户权限级别:&nbsp;<span v-text="level"></span></li>
            <li>用户注册时间:&nbsp;<span v-text="create_time"></span></li>
        </ul>
       
    </div>
</template>
<script>
import { store } from '@/store/index.js';
export default {
    name : "NewUserInfoDisPlayBoard",
    data:function(){
        return{
            store,
            username : "",
            level: "" ,
            create_time: "",
            title:"",
        }
    },
    methods:{},
    mounted:function(){
        if(this.$data.store.username == null) {
            this.$data.username = 'null' 
        }else {
            this.$data.username = this.$data.store.username
        }
        this.$data.title = '你好,' +this.$data.username 
        if(sessionStorage.getItem("level") == '0') {
            this.$data.level = '普通用户'
        }else {
            this.$data.level = '系统管理员'
        }
        if(this.$data.store.user_create_time == null) {
            this.$data.store.user_create_time = '未知日期'
        }else{
            this.$data.create_time =  sessionStorage.getItem("user_create_time")
        }
    }
}
</script>
<style scoped>
    .board{
        color: #dfffff;
        
    }
    ul li {
        font-weight: 700;
        margin-top: 5vh;
    }
</style>