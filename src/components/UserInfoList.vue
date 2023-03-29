<template>
    <div class="list_body">
        <h2>用户信息</h2>
        <ul class="info_list">
            <li v-for=" item in info_list" :key="item">
                姓名：{{item.username}}&nbsp; 编号:{{item.id}}
                <input class="delete" type="button" v-if="login_now" value="解封" @click="release_user(item)"/>
                <input class="download" type="button" value="封号" @click="ban_user(item)"/>
            </li>
        </ul>
        <input class="bef_page" type="button" value="上一页" @click="bef_page"/>
        <input class="next_page" type="button" value="下一页" @click="next_page"/>
    </div>
</template>

<script>
import axios from 'axios'

export default{
    name: "UserInfoList",
    data: function () {
        return {
            now_page: 0,
            info_list: ["没有任何信息"],
            login_now: false,
            alter_close: true
        };
    },
    beforeMount() {
        let that = this;
        axios.post("/user/user_list/" + that.$data.now_page)
            .then((response) => {
            let file_list = [];
            for (let i = 0; i < response.data.data.length; i++) {
                file_list[i] = response.data.data[i];
            }
            if (file_list.length != 0) {
                that.$data.info_list = file_list;
            }
        })
            .catch((error) => {
            console.warn("用户列表获取失败" + error);
        });
        if (sessionStorage.getItem("auth")) {
            this.$data.login_now = true;
        }
    },
    methods: {
        ban_user(item){
            axios.post("/user/ban/"+item.username+"/"+sessionStorage.getItem("level"))
            .then((response)=>{
                alert(response.data.tag)
            }).catch((error)=>{
                console.log(error)
            })
        },
        release_user(item){
            axios.post("/user/release/"+item.username+"/"+sessionStorage.getItem("level"))
            .then((response)=>{
                alert(response.data.tag)
            }).catch((error)=>{
                console.log(error)
            })
        },
        next_page() {
            let that = this;
            if (that.$data.info_list.length < 10) {
                return;
            }
            that.$data.now_page = that.$data.now_page + 1;
            axios.post("/user//user_list/" + that.$data.now_page)
                .then((response) => {
                let file_list = [];
                for (let i = 0; i < response.data.data.length; i++) {
                    file_list[i] = response.data.data[i];
                }
                if (file_list.length != 0) {
                    that.$data.info_list = file_list;
                }
            })
                .catch((error) => {
                console.warn("用户列表获取失败" + error);
            });
        },
        bef_page() {
            let that = this;
            if (that.$data.now_page - 1 < 0) {
                return;
            }
            that.$data.now_page = that.$data.now_page - 1;
            axios.post("/user//user_list/" + that.$data.now_page)
                .then((response) => {
                let file_list = [];
                for (let i = 0; i < response.data.data.length; i++) {
                    file_list[i] = response.data.data[i];
                }
                if (file_list.length != 0) {
                    that.$data.info_list = file_list;
                }
            })
                .catch((error) => {
                console.warn("用户列表获取失败" + error);
            });
        }
    }
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
</style>