<template>
    <div class="borad_body">
       <canvas class="canvas" ref="user_info_borad" width="1500" height="600">请更换浏览器，浏览器版本过低</canvas>
    </div>
</template>

<script>
import { store } from '@/store/index.js'

export default {
    name:"UserInfoDisPlayBorad",
    data:function(){
        return {
            store
        }
    },
    methods: {
        draw_user_info() {
            let user_info_borad = this.$refs['user_info_borad']
            if(user_info_borad == null) return
            let ctx = user_info_borad.getContext('2d')
            //画名片头
            for(let i = 0;i<16;i++) {
                if(i % 2 ==0)
                this.Draw_rice_rect_path(-50+(i*100),0,ctx)
                else
                this.Draw_red_rect_path(60+((i-1)*100),0,ctx)
            }
            //画名片右上角的文字
            ctx.fillStyle = "#c4965a"
            ctx.font = "bold 45px 黑体"
            ctx.fillText(this.$data.store.username+" Hello",900,125)
            ctx.font = "30px 黑体"
            ctx.fillStyle = "#000000"
            let level = this.$data.store.level == 0?"普通用户":"管理员"
            ctx.fillText(level,level=="普通用户"?1100:1125,170) //行间距大概45
            ctx.fillStyle = "#c4965a"
            ctx.fillText(level=="普通用户"?"normal user":"amdin",level=="普通用户"?1050:1140,215)
            //画小红斜杠
            for(let i = 0;i < 14 ;i++) {
                this.Draw_litter_red_line(900+(i*25),250,ctx)
            }
            
            for(let i = 0;i < 35;i++) {
                this.Draw_litter_red_line(75+(i*25),550,ctx)
            }
            ctx.fillStyle = "#c4965a"
            ctx.arc(120,320,5,0,2*Math.PI)
            ctx.fill()
            ctx.fillStyle = "#000000"
            ctx.font = "normal 20px 黑体"
            store.user_create_time = sessionStorage.getItem("user_create_time")
            ctx.fillText("注册时间:"+store.user_create_time,130,325)
           
            ctx.moveTo(0,260)

        },
        Draw_rice_rect_path_half(startX,startY,ctx){
            let rice_rect_path = new Path2D()
            ctx.fillStyle = "#f0e5d2"
            rice_rect_path.moveTo(startX,startY)
            rice_rect_path.lineTo(startX,startY+25)
            rice_rect_path.lineTo(50+startX,25+startY)
            rice_rect_path.lineTo(60+startX,startY)
            ctx.fill(rice_rect_path)
            ctx.fillStyle = "#000000"
        },
        Draw_red_rect_path(startX,startY,ctx){
            let red_rect_path = new Path2D()
            ctx.fillStyle = "#c52121"
            red_rect_path.moveTo(startX,startY)
            red_rect_path.lineTo(startX-10,startY+25)
            red_rect_path.lineTo(startX+100,startY+25)
            red_rect_path.lineTo(startX+110,startY)
            ctx.fill(red_rect_path)
            ctx.fillStyle = "#000000"
        },
        Draw_rice_rect_path(startX,startY,ctx) {
            let rice_rect_path = new Path2D()
            ctx.fillStyle = "#f0e5d2"
            rice_rect_path.moveTo(startX,startY)
            rice_rect_path.lineTo(startX-10,startY+25)
            rice_rect_path.lineTo(startX+100,startY+25)
            rice_rect_path.lineTo(startX+110,startY)
            ctx.fill(rice_rect_path)
            ctx.fillStyle = "#000000"
        },
        Draw_litter_red_line(startX,startY,ctx) {
            ctx.fillStyle = "#c52121"
            let red_path = new Path2D()
            red_path.moveTo(startX,startY)
            red_path.lineTo(startX+10,startY-20)
            red_path.lineTo(startX+20,startY-20)
            red_path.lineTo(startX+10,startY)
            ctx.fill(red_path)
            ctx.fillStyle = "#000000"
        }
    },
    mounted(){
        this.draw_user_info()
    }
}
</script>

<style scoped>
    .borad_body {
        position: absolute;
        top: 15%;
        left: 10%;
        width: 80%;
        height: 65%;
        box-shadow: #000000 10px 10px 25px;
        background-color: #ffffff;
    }
    .canvas{
        width: 100%;
        height: 100%;
    }
</style>