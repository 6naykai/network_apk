<template>
    <div class="list_body">
        <h2>报表资源列表</h2>
        <AlterWindow class="alter_window" :close="!alter_close" @cannel="cannel_load"></AlterWindow>
        <ul class="info_list">
            <li v-for=" item in info_list" :key="item">
                {{item}}
                <input class="delete" type="button" v-if="login_now" value="删除" @click="delete_file(item)"/>
                <input class="download" type="button" value="下载" @click="download_file(item)"/>
            </li>
        </ul>
        <input class="bef_page" type="button" value="上一页" @click="bef_page"/>
        <input class="next_page" type="button" value="下一页" @click="next_page"/>
        <input class="upload" type="button" v-if="login_now" value="上传" @click="upload_file"/>
        <input class="prot_user_info" type="button" v-if="login_now" value="导出报表信息" @click="port_user_info()"/>
    </div>
</template>

<script>
import axios from 'axios'
import AlterWindow from './AlterWindow.vue';
export default{
    name: "InfoList",
    data: function () {
        return {
            now_page: 0,
            info_list: ["没有任何资源"],
            login_now: false,
            alter_close: true
        };
    },
    beforeMount() {
        let that = this;
        axios.post("/file/search/" + that.$data.now_page)
            .then((response) => {
            let file_list = [];
            for (let i = 0; i < response.data.data.length; i++) {
                file_list[i] = response.data.data[i].file_name + response.data.data[i].file_type;
            }
            if (file_list.length != 0) {
                that.$data.info_list = file_list;
            }
        })
            .catch((error) => {
            console.warn("文件列表获取失败" + error);
        });
        if (sessionStorage.getItem("auth")) {
            this.$data.login_now = true;
        }
    },
    methods: {
        cannel_load(msg){
            this.$data.alter_close = msg
            this.$router.go('/reports')
        },
        upload_file() {
            this.$data.alter_close = false
        },
        download_file(file_completable_name) {
            axios({
                method:'post',
                url: axios.defaults.baseURL+"/file/download/"+file_completable_name,
                responseType: 'blob'
                // params: {"completableFilename":file_completable_name,"fileId":null}
            })
            .then((response) => {
                console.log(response.data);
                const blob = new Blob([response.data],{type: ""});
                const elink = document.createElement('a');
                elink.download = file_completable_name;
                elink.style.display = 'none';
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href);// 释放URL 对象
                document.body.removeChild(elink);
            })
            .catch((error) => {
                console.log("文件下载失败");
                console.log(error);
            });
        },
        delete_file(file_completable_name) {
            let that = this;
            axios.post("/file/delete/" + file_completable_name)
                .then((response) => {
                alert("ok")
                console.log(response.data.data);
                that.$router.go("/reports");
            })
                .catch((error) => {
                console.log("文件删除失败");
                console.log(error);
            });
        },
        next_page() {
            let that = this;
            if (that.$data.info_list.length < 10) {
                return;
            }
            that.$data.now_page = that.$data.now_page + 1;
            axios.post("/file/search/" + that.$data.now_page)
                .then((response) => {
                let file_list = [];
                for (let i = 0; i < response.data.data.length; i++) {
                    file_list[i] = response.data.data[i].file_name + response.data.data[i].file_type;
                }
                if (file_list.length != 0) {
                    that.$data.info_list = file_list;
                }
            })
                .catch((error) => {
                console.warn("文件列表获取失败" + error);
            });
        },
        bef_page() {
            let that = this;
            if (that.$data.now_page - 1 < 0) {
                return;
            }
            that.$data.now_page = that.$data.now_page - 1;
            axios.post("/file/search/" + that.$data.now_page)
                .then((response) => {
                let file_list = [];
                for (let i = 0; i < response.data.data.length; i++) {
                    file_list[i] = response.data.data[i].file_name + response.data.data[i].file_type;
                }
                if (file_list.length != 0) {
                    that.$data.info_list = file_list;
                }
            })
                .catch((error) => {
                console.warn("文件列表获取失败" + error);
            });
        },
        port_user_info() {
            let param = "user_info"
            axios.post("/excel/print/"+param)
            .then((response)=>{
                console.log(response.data);
                const blob = new Blob([response.data],{type: ""});
                const elink = document.createElement('a');
                elink.download = 'user_info.xls';
                elink.style.display = 'none';
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href);// 释放URL 对象
                document.body.removeChild(elink);
            })
            .catch((error)=>{
                console.log(error)
                alert("导出失败，请联系管理员")
            })
        }
    },
    components: { AlterWindow }
}

</script>


<style scoped>
    h2 {
        color: #f8faf7;
    }
    .list_body {
        margin: 0 auto;
        width: 60%;
        height: 100%;
    }

    .info_list li{
        list-style: none;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid;
        color: #00a8e5;
    }
    .info_list li:hover{
        color: #f8faf7;
    }
    .bef_page {
        margin-top: 3px;
        margin-left: 45%;
        color: #15739c;
        background-color: rgba(0, 0, 0, 0.8);
    }
    
    .bef_page:hover{
        margin-top: 3px;
        margin-left: 45%;
        color: #cccccc;
        background-color: rgba(0, 0, 0, 0.8);
    }
    .next_page {
        margin-top: 3px;
        margin-left: 5px;
        color: #15739c;
        background-color: rgba(0, 0, 0, 0.8);
    }
    .next_page:hover{
        margin-top: 3px;
        margin-left: 5px;
        color: #cccccc;
        background-color: rgba(0, 0, 0, 0.8);
    }

    .download{
        float: right;
        color: #15739c;
        margin-right: 1%;
        background-color: rgba(0, 0, 0, 0.8);
        width: 40px;
    }
    .download:hover{
        float: right;
        color: #cccccc;
        background-color: rgba(0, 0, 0, 0.8);
        width: 40px;
    }
    .delete{
        float: right;
        color: #15739c;
        background-color: rgba(0, 0, 0, 0.8);
        width: 40px;       
    }
    .delete:hover{
        float: right;
        color: #cccccc;
        background-color: rgba(0, 0, 0, 0.8);
        width: 40px;
    }
    .prot_user_info{
        float: right;
        color: #15739c;
        margin-right: 1%;
        background-color: rgba(0, 0, 0, 0.8);
        width: 140px;      
    }
    .prot_user_info:hover{
        float: right;
        color: #cccccc;
        margin-right: 1%;
        background-color: rgba(0, 0, 0, 0.8);
        width: 140px;      
    }
    .upload{
        float: right;
        color: #15739c;
        background-color: rgba(0, 0, 0, 0.8);
        width: 40px;
    }
    .upload:hover{
        float: right;
        color: #cccccc;
        background-color: rgba(0, 0, 0, 0.8);
        width: 40px;
    }
    .alter_window{
        position:absolute;
        
        top: 0;
        bottom: 0;
        /* margin-top: 10%;
        margin-left: 20%; */
    }
</style>