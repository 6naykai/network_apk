<template>
    <div class="window_body" v-show="close">
        <h3>选择上传的文件</h3>
            <input id="upload_file" name="upload_file" class="upload_button" type="file" @change="fileChoose($event)"/>
        <pre>
限制文件大小为800MB,
限制类型'.txt','.pdf','.png','.jpeg','.doc','.docx'
        </pre>
        <input class="sumbit" type="button" value="提交" @click="upload"/>
        <input class="cannel" type="button" value="取消" @click="closerWindow"/>
    </div>
</template>

<script>
import axios from 'axios'
    export default{
        props:['close'],
        name:"AlterWindow",
        data:function() {
            return {
                file:"",
            }
        },
        methods:{
            closerWindow(){
                this.$emit('cannel',true)
            },
            fileChoose(event){
                  this.$data.file = event.target.files[0];        //获取文件
            },
            upload(){
                let file = new FormData()
                file.append("upload_file",this.$data.file)
                axios.post('/file/upload',
                file,
                {headers: {'Content-Type': 'multipart/form-data'}})
                .then((response)=>{
                    console.log(response.data)
                    if(response.data.state) {
                        alert("文件上传成功")
                    }else{
                        alert("文件上传失败")
                    }
                        
                })
                .catch((error)=>{
                    console.log("文件上传失败")
                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped>
    .window_body {
        overflow: hidden;
        width: 360px;
        height: 200px;
        color: #ffffff;
        background-color: rgba(0, 0, 0,0.8);
        box-shadow: 2px 4px 6px #000, 1px 2px 6px #C0C0C0, 0 0px 5px #000, 0 6px 18px #C0C0C0;
    }
    .upload_button{
        margin-top: 5%;
        margin-left: 15%;
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
        margin-left: 40%;
    }
    .cannel{
        margin-left: 5px;
    }
</style>