import {createRouter,createWebHistory} from "vue-router"


import IndexPage from "@/pages/IndexPage.vue"
import LoginPage from "@/pages/LoginPage.vue"
import SetUserPage from "@/pages/SetUserPage.vue"
import DataInfoPage from "@/pages/DataInfoPage.vue"
import UserInfoPage from "@/pages/UserInfoPage.vue"
import FileResourcePage from "@/pages/FileResourcePage.vue"
import MangerUserPage from "@/pages/MangerUserPage.vue"
import MangerHardwarePage from "@/pages/MangerHardwarePage"
import SearchPage from "@/pages/SearchPage"

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            component: IndexPage
        },
        {
            path: "/login",
            component: LoginPage
        },
        {
            path: "/set_user",
            component: SetUserPage
        },
        {
            path:"/data_info",
            name: "data_info",
            component: DataInfoPage
        },
        {
            path:"/user_info",
            name: "user_info",
            component: UserInfoPage
        },
        {
            path:"/file",
            name:"file",
            component: FileResourcePage 
        },
        {
            path:"/manger_user",
            name:"manger_user",
            component: MangerUserPage 
        },
        {
            path:"/manger_hardware",
            name:"manger_hardware",
            component: MangerHardwarePage
        },
        {
            path: "/search",
            component: SearchPage
        }
    ]
})

router.beforeEach((to,form,next)=>{
    if((to.name == 'user_info' || to.name == 'data_info')){
        if(sessionStorage.getItem("login_state") == 'true') {
            next()
        }else{
            router.push("/login")
        }
    }else{
        next()
    }

})


export default router;