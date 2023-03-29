<template>
    <div class="navigation_body">
        <ul class="bar_list">
            <li class="index_page" @click="chose_index_page()">首页</li>&nbsp;|&nbsp;
            <li class="user_info" @click="chose_user_info()">用户信息</li> &nbsp;|&nbsp;
            <li class="data_info" @click="chose_data_info()">订单搜索&nbsp;|&nbsp;</li>
            <li class="user_manger" @click="chose_user_manger()" v-if="admin_power_page_navigation">用户资源管理&nbsp;|&nbsp;</li>
            <li class="data_info" @click="chose_hardward_manger()">订单资源管理&nbsp;|&nbsp;</li>
            <li class="user_info" @click="chose_file_info()">后台报表管理</li>
        </ul>
        <div class="msg_of_tip_unlogin" v-show="!store.login_status" @click="chose_login()">点击次处登录</div>
        <div class="msg_of_tip_login" v-show="store.login_status">你好，{{store.username}}{{time}}</div>
    </div>
</template>


<script>
import { store  } from '@/store/index.js';
export default {
    name:'NavigationBar',
    data:function(){
        return {
            store,
            tip_msg_on_not_login: '请登录',
            time: '',
            admin_power_page_navigation : false
        }
    },
    mounted:function(){
        store.login_status = sessionStorage.getItem("login_state")
        store.username = sessionStorage.getItem("username")
        if(sessionStorage.getItem("level") == '1') {
            this.$data.admin_power_page_navigation = true
        }
        let that = this
        setInterval(()=>{
            let data = new Date()
            that.$data.time =' '+ data.getFullYear() + '-' + data.getMonth() + '-' +data.getDate() + ' '
            that.$data.time += data.getHours() +':'+(data.getMinutes()<10?'0'+data.getMinutes():data.getMinutes())
            + ':'+ (data.getSeconds()<10?'0'+data.getSeconds():data.getSeconds())
        },1000)
    },
    methods:{
        chose_user_info:function() {
            this.$data.store.navigation_bar_select = 0
            this.$router.push('/user_info')
            console.log(this.$data.store.navigation_bar_select)
        },
        chose_data_info:function() {
            this.$data.store.navigation_bar_select = 1
            this.$router.push('/search')
            console.log(this.$data.store.navigation_bar_select)
        },
        chose_login:function() {
            this.$data.store.navigation_bar_select = -1
            console.log(this.$data.store.navigation_bar_select)
            this.$router.push('/login')
        },
        chose_index_page:function(){
            this.$data.store.navigation_bar_select = 2
            this.$router.push('/index')
        },
        chose_file_info:function(){
            this.$data.store.navigation_bar_select = 3
            this.$router.push('/file')
        },
        chose_user_manger:function(){
            this.$data.store.navigation_bar_select = 4
            this.$router.push('/manger_user')
        },
        chose_hardward_manger:function(){
            this.$data.store.navigation_bar_select = 5
            this.$router.push('/manger_hardware')
        }
    }
}
</script>


<style lang="less" scoped>
    .navigation_body {
        width: 100%;
        height: 35px;
        margin: 0px;
        padding: 0px;
        color: #00a8e5;
        font-size: 50%;
        background-color: rgba(0, 0, 0, 0.8);
        border: #15739c solid 1px;

    }

    .msg_of_tip_login {
        float: right;
        // width: 35px;
        height: 35px;
        font-weight: 700;
        font-size: 125%;
        line-height: 35px;
    }

    .msg_of_tip_unlogin {
        float: right;
        // width: 35px;
        height: 35px;
        margin-right: 20px;
        font-weight: 700;
        font-size: 125%;
        line-height: 35px;
    }
    .msg_of_tip_unlogin:hover {
        color: #CCCCCC;
    }

    .bar_list {
        display: inline-block;
        width: 500px;
        height: 35px;
        margin: 0;
        padding: 0;
        margin-left: 100px;
        line-height: 35px;
        font-weight:  700;
        font-size: 125%;
    }
    .index_page{
        display: inline-block;
        line-height: 35px;
    }
    .index_page:hover{
        color: #CCCCCC;
    }
    .user_info {
        display: inline-block;
        line-height: 35px;
        
    }
    .user_info:hover {
        color: #CCCCCC;
    }
    .data_info {
        display: inline-block;
        line-height: 35px;
    }
    .data_info:hover {
        color: #CCCCCC;
    }
    .user_manger {
        display: inline-block;
        line-height: 35px;
    }
    .user_manger:hover {
        color: #CCCCCC;
    }
</style>
