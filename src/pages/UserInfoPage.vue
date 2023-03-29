<template>
    <NavigationBar class="navigation_bar"></NavigationBar>
    <NewUserInfoDisPlayBoard class="user_info_board"></NewUserInfoDisPlayBoard>
    <video class="background" src="@/assets/video/show_board.mp4" muted loop autoplay></video>
    <div class="operator">
        <input type="button" value="修改用户名" @click="alter_change_username_windos()"/>
        <input type="button" value="修改密码" @click="alter_change_password_windos()"/>
    </div>
    <AlterWindowChangeUserInfo :close="change_password_alter_close" class="alter_windows" @cannel="cannel_change_password">
    </AlterWindowChangeUserInfo>
    <AlterWindowChangeUsername :close="change_username_alter_close" class="alter_windows" @cannel="cannel_change_username">
    </AlterWindowChangeUsername>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
import NewUserInfoDisPlayBoard from '@/components/NewUserInfoDisPlayBoard.vue';
import AlterWindowChangeUserInfo from '@/components/AlterWindowChangeUserInfo.vue';
import AlterWindowChangeUsername from '@/components/AlterWindowChangeUsername.vue';
export default {
    name: "UserInfoPage",
    components:{
        NavigationBar,
        NewUserInfoDisPlayBoard,
        AlterWindowChangeUserInfo,
        AlterWindowChangeUsername
    },
    data:function() {
        return {
            change_password_alter_close: false,
            change_username_alter_close: false
        }
    },
    methods:{
        cannel_change_password:function(){
            this.$data.change_password_alter_close = false
        },
        alter_change_password_windos:function(){
            this.$data.change_password_alter_close = true
        },
        cannel_change_username:function(){
            this.$data.change_username_alter_close = false
        },
        alter_change_username_windos:function(){
            this.$data.change_username_alter_close = true
        },
    }
}
</script>

<style scoped>
    .background{
        position:absolute;
        overflow: hidden;
        object-fit: fill;
        width: 100%;
        height: 100%;
        z-index: 5;
        top: 0;
        bottom: 0;
    }
    .navigation_bar{
        position: relative;
        z-index: 10;
    }
    .operator {
        position: relative;
        z-index: 10;
        left: 43%;
        margin-top: 60vh;
    }
    .operator input{
        margin-left: 1%;
        color: #15739c;
        background-color: rgba(0, 0, 0, 0.8);
        border: #15739c solid 2px;
    }
    .operator input:hover{
        color: #ffffff;
        border: #ffffff solid 2px;
    }
    .user_info_board{
        position: absolute;
        top: 20%;
        left: 45%;
        z-index: 10;
    }

    .alter_windows{
        z-index: 100;
        left: 40%;
        bottom: 40vh;
    }
</style>