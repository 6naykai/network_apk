<template>
    <div class="window_body" v-show="close">
        <h3>数据上传</h3>
        <input class="upload_button" id="upload_file" name="upload_file"  type="text" v-model="username"/>
        <input class="upload_button" id="upload_file" name="upload_file"  type="text" v-model="old_password"/>
        <input class="upload_button" id="upload_file" name="upload_file"  type="text" v-model="new_password"/>
        <input class="sumbit" type="button" value="提交" @click="subbmit"/>
        <input class="cannel" type="button" value="取消" @click="closerWindow"/>
    </div>
</template>

<script>
import axios from 'axios'
    export default{
        props:['close'],
        name:"AlterWindowInsertHardwareInfo",
        data:function() {
            return {
                username:"请输入拥有人",
                old_password:"请输入工程",
                new_password:"请输入论文",
            }
        },
        methods:{
            closerWindow(){
                this.$emit('cannel',true)
            },
            subbmit(){
                let that = this
                let data = this.$data
                if(data.username == "" || data.old_password == "" || data.new_password == "" ) alert("请完善信息")
                axios.post("/ccr/insert/"+data.username+"/"+data.old_password+"/"+data.new_password)
                .then((response)=>{
                    alert(response.data.tag)
                    that.closerWindow()
                })
                .catch((e)=>{
                    console.log(e)
                })

            }
        }
    }
</script>

<style scoped>
    .window_body {
        position: relative;
        overflow: hidden;
        width: 360px;
        height: 200px;
        color: #ffffff;
        background-color: rgba(0, 0, 0,0.8);
        box-shadow: 2px 4px 6px #000, 1px 2px 6px #C0C0C0, 0 0px 5px #000, 0 6px 18px #C0C0C0;
    }
    .upload_button{
        margin-top: 3%;
        margin-left: 25%;
        color: #15739c;
        background-color: rgba(0, 0, 0,0.8);
    }
    pre{
        /* color: #FF0033; */
        color: #ffffff;
        font-size: 10px;
        margin-top: 3%;
    }
    h3{
        height: 30%;
        line-height: 60px;
        background-color: #263b4a;
    }
    .sumbit{
        margin-top: 1%;
        margin-left: 40%;
        color: #15739c;
        background-color: rgba(0, 0, 0,0.8);
       
    }
    .sumbit:hover{
        color: #ffffff;
    }
    .cannel{
        margin-top: 1%;
        margin-left: 5px;
        color: #15739c;
        background-color: rgba(0, 0, 0,0.8);
    }
    .cannel:hover{
        color: #ffffff;
    }
</style>