<template>
    <div class="list_body">
        <div>
            <input class="search_bar" type="text" v-model="seach_content"/><input class="delete" type="button" value="搜索" @click="search()">
        </div>
        <h2>商品列表</h2>
        <AlterWindow class="alter_window" :close="!alter_close" @cannel="cannel_load"></AlterWindow>
        <AlterWindowsUpdateInfoProject class="alter_window" :close="!alter_close_project" @cannel="cannel_load"></AlterWindowsUpdateInfoProject>
        <AlterWindowsUpdateInfoEssayVue class="alter_window" :close="!alter_close_essay" @cannel="cannel_load"></AlterWindowsUpdateInfoEssayVue>
        <AlterWindowSocreVue class="alter_window" :close="!alter_close_score" @cannel="cannel_load"></AlterWindowSocreVue>

        <ul class="info_list" v-if="is_search">
            <li v-for=" item in info_list" :key="item">
                供货商：{{item.owner}} &nbsp;商品：{{item.myEssay}}&nbsp; 备注：{{item.myProject}}&nbsp;进度：{{item.score==-1?'无进度':item.score}}
                <input class="delete" type="button" v-if="login_now" value="删除" @click="delete_file(item)"/>
                <input class="update" type="button" v-if="login_now" value="修改商品" @click="update_essay(item)"/>
                <input class="update" type="button" v-if="login_now" value="修改备注" @click="update_project(item)"/>
                <input class="update" type="button" v-if="login_now" value="进度更新"  @click="update_score(item)"/>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
import AlterWindow from '@/components/AlterWindowInsertHardwareInfo.vue'
import AlterWindowsUpdateInfoProject from '@/components/AlterWindowsUpdateInfoProject.vue';
import AlterWindowsUpdateInfoEssayVue from '@/components/AlterWindowsUpdateInfoEssay.vue';
import AlterWindowSocreVue from '@/components/AlterWindowSocre.vue';

export default{
    name: "SearchList",
    data: function () {
        return {
            now_page: 0,
            info_list: ["没有任何资源"],
            login_now: false,
            alter_close: true,
            alter_close_project: true,
            alter_close_essay: true,
            alter_close_score: true,
            seach_content: "",
            is_search: false
        };
    },
    beforeMount() {
        if (sessionStorage.getItem("level") == '1') {
            this.$data.login_now = true;
        }
    },
    methods: {
        //搜索
        search(){
                let that = this
                axios.post('/ccr/search/'+this.$data.seach_content)
                .then((res)=>{
                    console.log(res.data.data)
                    
                    if(res.data.data.length == 0) {
                        alert('没有找到是该名字的论文')
                    }else{
                        that.$data.is_search = true
                        that.$data.info_list = res.data.data
                    }
                    

                })
                .catch((e)=>{
                    console.log(e)
                })
        },
        cannel_load(msg){
            this.$data.alter_close = msg
            this.$data.alter_close = msg
            this.$router.go('/manger_hardware')
        },
        upload_file() {
            this.$data.alter_close = false
        },
        update_project(item){
            sessionStorage.setItem('temp_username',item.owner)
            this.$data.alter_close_project = false
        },
        update_essay(item){
            sessionStorage.setItem('temp_username',item.owner)
            this.$data.alter_close_essay= false
        },
        update_score(item){
            sessionStorage.setItem('temp_username',item.owner)
            this.$data.alter_close_score = false
        },
        delete_file(item) {
            console.log(item)
            let that = this;
            axios.post("/ccr/delete/" + item.owner)
                .then((response) => {
                alert("ok")
                console.log(response.data.data);
                that.$router.go("/manger_hardware");
            })
                .catch((error) => {
                console.log("硬件列表获取失败");
                console.log(error);
            });
        },
        next_page() {
            let that = this;
            if (that.$data.info_list.length < 10) {
                return;
            }
            that.$data.now_page = that.$data.now_page + 1;
            axios.post("/hardware/query/" + that.$data.now_page)
                .then((response) => {
                let file_list = [];
                for (let i = 0; i < response.data.data.length; i++) {
                    file_list[i] = response.data.data[i]
                }
                if (file_list.length != 0) {
                    that.$data.info_list = file_list;
                }
            })
                .catch((error) => {
                console.warn("硬件列表获取失败" + error);
            });
        },
        bef_page() {
            let that = this;
            if (that.$data.now_page - 1 < 0) {
                return;
            }
            that.$data.now_page = that.$data.now_page - 1;
            axios.post("/hardware/query/" + that.$data.now_page)
                .then((response) => {
                let file_list = [];
                for (let i = 0; i < response.data.data.length; i++) {
                    file_list[i] = response.data.data[i]
                }
                if (file_list.length != 0) {
                    that.$data.info_list = file_list;
                }
            })
                .catch((error) => {
                console.warn("硬件列表获取失败" + error);
            });
        },
    },
    components: { AlterWindow,AlterWindowsUpdateInfoProject,AlterWindowsUpdateInfoEssayVue,AlterWindowSocreVue }
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
        width: 80px;
    }
    .upload:hover{
        float: right;
        color: #cccccc;
        background-color: rgba(0, 0, 0, 0.8);
        width: 80px;
    }
    .alter_window{
        position:absolute;
        z-index: 100;
        top: 0;
        bottom: 0;
        /* margin-top: 10%;
        margin-left: 20%; */
    }
    .update{
        float: right;
        color: #15739c;
        background-color: rgba(0, 0, 0, 0.8);
        width: 80px;  
    }
    .update:hover{
        float: right;
        color: #cccccc;
        background-color: rgba(0, 0, 0, 0.8);
        width: 80px;
    }
    .search_bar{
        float: right;
        color: #15739c;
        background-color: rgba(0, 0, 0, 0.8);
        width: 200px;  
    }
</style>