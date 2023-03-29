import { reactive } from "vue";
//组件之间的共享变量
export const store = reactive({
    login_status: false,
    username: '芙芙芙呜',
    level: 0 ,//0是普通用户，1是管理员
    /*
    0 选择的是用户信息操作
    1 选择的是温湿度信息传感
    2 选择的是首页
    3 选择了文件资源管理页
    4 选择了用户信息管理
    5 选择了设备资源管理
   -1 选择的是了登录
    */
    user_create_time: "",
    navigation_bar_select: 2  //当前导航栏，所选的内容
})