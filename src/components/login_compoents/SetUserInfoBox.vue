<template>
    <div class="box_body">
        <ul class="user_info_list">
            <li class="user_info_username">用户名<input class="user_name_bar" type="text" v-model="set_user_name"/></li>
            <li class="user_info_password">密码<input class="user_password_bar" type="password" v-model="set_user_password"/></li>
            <li class="check_password">确认密码<input class="check_password_bar" type="password" v-model="check_password"/></li>
        </ul>
        <ul class="button_area">
            <li><input type="button" @click="set_user()" value="注册"/></li>
            <li> <input type="button" @click="cancle()" value="返回登录"/></li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "SetUserInfoBox",
    data:function() {
        return {
            set_user_name: "",
            set_user_password:"",
            check_password:""
        }
    },
    methods:{
        set_user:function() {
            if(this.$data.set_user_name == "" || this.$data.set_user_name == null) {
                alert("请完善用户名!")
            }else if(this.$data.set_user_password == "" || this.$data.set_user_password == null) {
                alert("请完善密码信息!")
            }else if(this.$data.check_password == "" || this.$data.check_password == null) {
                alert("请确认密码!")
            }else if(this.$data.set_user_password != this.$data.check_password) {
                alert("请保证确认的密码一致！")
            }else{
                let username = this.$data.set_user_name
                let password = this.$data.set_user_password
                let that = this
                axios.post("/user/register?username="+username+"&password="+password)
                .then((response)=>{
                    console.log(response.data.tag)
                    if(response.data.state == true) {
                        alert("注册成功")
                        that.$router.push("/login")
                    }
                })
                .catch((error)=>{
                    console.log(error)
                })
            }
        },
        cancle:function() {
            this.$router.push("/login");
        }
    }
}
</script>


<style scoped>
    ul li {
        margin-top: 5%;
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
        text-align: center;
        border: #15739c solid 1px ;
    }
    .user_info_list {
        padding-top: 10%;
        height: 45%;
        display: block;
        list-style: none;
        font-weight: 700;

    }

    .button_area {
        height: 45%;
       display: block;
       list-style: none;
       text-align: center;
    }
    .button_area input{
        color: #15739c;
        background-color: rgba(0, 0, 0, 0.8);
        height: 30px;
        width: 80%;
        margin-top: 5px;
        font-weight: 700;
        border: #15739c solid 1px;
    }
    .button_area input:hover{
        color: #007acc;
        background-color: rgba(0, 0, 0, 0.8);
    }
    .user_name_bar {
        margin-left: 2em;
    }
    .user_password_bar {
        margin-left: 3em;
    }

    .check_password_bar {
        margin-left: 0.5em;
    }

</style>