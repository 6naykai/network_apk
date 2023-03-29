<template>
    <div class="box_body">
        <!-- <img class="back_point" src="@/assets/button/point_0.png"/> -->
        <ul class="text_area">
            <li>用户名:<input :class="username_bar_style" type="text" v-model="username_bar_content"
                 @click="style_of_userbar_click()" @blur="style_of_userbar_blur()"/></li>
            <li>密码:<input :class="password_bar_style" :type="password_bar_state" v-model="password_bar_content"
                 @click="style_of_password_click()" @blur="style_of_password_blur()"/></li>
        </ul>
        <ul class="button_area">
            <li><input class="login_button" type="button" @click="login()" value="登录"/></li>
            <li><input class="set_button" type="button" @click="set_user()" value="注册"/></li>
        </ul>
    </div>
</template>

<script>
import { store } from '@/store';
import axios from 'axios';

export default {
    name: 'LoginBox',
    data: function() {
        return {
            store,
            username:'',
            password:'',
            password_bar_state: 'text',
            username_bar_content: '请输入用户名',
            password_bar_content: '请输入密码',
            username_bar_style: 'username_bar_null',  //username_bar_null 还没有输入用户名时的样式 username_bar 是正常样式
            password_bar_style: 'password_bar_null'  //password_bar_unll  还没有输入密码时的样式        password_bar 是正常样式
        }
    },
    methods:{
        login:function() {
            let that = this
            this.$data.username = this.$data.username_bar_content
            this.$data.password = this.$data.password_bar_content
            axios.post("/user/login?username="+this.$data.username+"&password="+this.$data.password)
            .then((response)=>{
                console.log(response.data.tag)
                if(response.data.state=== true){
                    store.user_create_time = response.data.data.create_date
                    store.level = response.data.level
                    // console.log(response.data.data)
                    // console.log( store.user_create_time )
                    sessionStorage.setItem("level",response.data.data.level)
                    sessionStorage.setItem("login_state",true)
                    sessionStorage.setItem("username",that.$data.username)
                    sessionStorage.setItem("user_create_time",store.user_create_time)
                    // if(response.data.data.level != 0) sessionStorage.setItem("auth",true)
                    sessionStorage.setItem("auth",true)
                    that.$router.push('/')
                }else {
                    alert("登录失败")
                }
            })
            .catch((error)=>{
                console.error(error)
            })
        },
        set_user:function() {
            this.$router.push('/set_user')
        },
        style_of_userbar_click:function() {
            if(this.$data.username_bar_content == '请输入用户名') {
                this.$data.username_bar_content = ''
                this.$data.username_bar_style = 'username_bar'
            }
        },
        style_of_userbar_blur:function() {
            if(this.$data.username_bar_content == '请输入用户名') {
                this.$data.username_bar_style = 'username_bar_null'
            }else if(this.$data.username_bar_content == '') {
                this.$data.username_bar_content = '请输入用户名'
                this.$data.username_bar_style = 'username_bar_null'
            }
        },
        style_of_password_click:function() {
            if(this.$data.password_bar_content == '请输入密码') {
                this.$data.password_bar_content = ''
                this.$data.password_bar_style = 'password_bar'
                this.$data.password_bar_state = 'password'
            }
        },
        style_of_password_blur: function() {
            if(this.$data.password_bar_content == '请输入密码') {
                this.$data.password_bar_style = 'password_bar_null',
                this.$data.password_bar_state = 'text'
            }else if(this.$data.password_bar_content == '') {
                this.$data.password_bar_content = '请输入密码'
                this.$data.password_bar_style = 'password_bar_null',
                this.$data.password_bar_state = 'text'
            }
        }

    }
}
</script>

<style scoped>
    .back_point{
        height: 25px;
        width: 25px;
    }
    .box_body {
        border-radius: 2%;
        color: #15739c;
        margin: auto;
        margin-top: 13%;
        height: 300px;
        width: 400px;
        box-shadow: 0px 10px 100px #000000;
        background-color: rgba(0, 0, 0,0.8);
        border: #15739c solid 1px ;
    }
    .text_area {
        text-align: center;
        list-style: none;
        padding: 15%;
        font-weight: 700;
    }
    .text_area input {
        width: 65%;
        border-radius: 1%;

    }
    .text_area .username_bar {
        margin-left: 1em;
        
    }

    .text_area .username_bar_null {
        margin-left: 1em;
        color: #CCCCCC;
    }
    .text_area .password_bar {
        margin-left: 2.2em;
    }

    .text_area .password_bar_null {
        margin-left: 2.2em;
        color: #CCCCCC;
    }

    .button_area {
        padding: 0;
        text-align: center;
        list-style: none;
    }
    .button_area input {
        color: #15739c;
        background-color: rgba(0, 0, 0, 0.8);
        height: 30px;
        width: 80%;
        margin-top: 5px;
        font-weight: 700;
        margin-left: 15px;
        border: #15739c solid 1px;
    }

    .button_area input:hover {
        color: #007acc;
        background-color: rgba(0, 0, 0, 0.8);
    }


</style>