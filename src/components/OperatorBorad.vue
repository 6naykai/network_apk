<template>
    <div class="operator_borad">
        <div class="button_area">
            <canvas ref="operator_screen" width="500" height="220">浏览器版本太低建议升级浏览器</canvas>
        </div>
        <div class="info_area">
            <canvas ref="info_screen" width="500" height="220">浏览器版本太低建议升级浏览器</canvas>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'OperatorBorad',
    data:function(){
        return {
            screen_infos:['============BANNER==============',
                            'Welcome to use consloe make by FuWu~',
                            'This console will printing some tips',
                            '================================',
                        'This data will updating every 10 secondes']
        }
    },
    methods:{
        draw_screen:function(){
            let info_screen = this.$refs['info_screen']
            let ctx = info_screen.getContext('2d')
            ctx.clearRect(0, 0, 500, 220);
            
            let screen_infos = this.$data.screen_infos
            console.log(screen_infos.length)
            if(screen_infos.length > 20) {
                let temp_array = []
                for(let i = 0;i<screen_infos.length - 1;i++) {
                    temp_array[i] = screen_infos[i+1]
                }
                screen_infos = temp_array
                this.$data.screen_infos = temp_array
            }
            ctx.fillStyle = '#00a8e5'
            for(let i = 1;i<=screen_infos.length;i++)
                ctx.fillText(screen_infos[i-1],0,10* i)
        },
        draw_borad:function(){
            let operator_screen = this.$refs['operator_screen']
            let ctx = operator_screen.getContext('2d')
            
            // for(let i = 0;i<6;i++) {
            //     if(i % 2 ==0)
            //     this.Draw_rice_rect_path(-50+(i*100),0,ctx)
            //     else
            //     this.Draw_red_rect_path(60+((i-1)*100),0,ctx)
            // }
            //绘制一手提示信息
            ctx.fillStyle="#00a8e5"
            ctx.font = 'bold 15px 黑体'
            ctx.fillText('远程电机控制台',200,50)
            //绘制红色按钮 作为关闭电机
            ctx.moveTo(300,110)
            ctx.beginPath()
            ctx.strokeStyle = "#00a8e5"
            ctx.arc(300,110,25,0,Math.PI*2)
            ctx.stroke()
            ctx.fillStyle="#00a8e5"
            ctx.font = 'bold 10px 黑体'
            ctx.fillText('关闭',290,113)
            ctx.closePath()
            //绘制绿色按钮 作为启动电机
            ctx.beginPath()
            ctx.strokeStyle = "#00a8e5"
            ctx.arc(200,110,25,0,Math.PI*2)
            ctx.stroke()
            ctx.fillStyle="#00a8e5"
            ctx.font = 'bold 10px 黑体'
            ctx.fillText('启动',190,113)
            ctx.closePath()
            let that = this
            operator_screen.onmousemove = (e) => {
                //获取绝对坐标
                let x = (e.clientX - operator_screen.getBoundingClientRect().left) 
                let y = (e.clientY - operator_screen.getBoundingClientRect().top)
                //计算水平转换因子
                let h_factor = (-1)*(operator_screen.getBoundingClientRect().left - operator_screen.getBoundingClientRect().right) / 500
                //计算垂直转换因子
                let v_factor = (-1)*(operator_screen.getBoundingClientRect().top - operator_screen.getBoundingClientRect().bottom) / 220
                //获取相对坐标
                x = x / h_factor
                y = y / v_factor
                let gap_red = (x - 300)*(x-300) + (y - 110)*(y-110)
                let gap_green = (x -200)*(x-200) + (y-110)*(y-110)
                if(gap_green <= 640) {
                    that.Draw_green_button_focuse(ctx)
                    that.Draw_red_button_no_focuse(ctx)
                }else if(gap_red <= 640) {
                    that.Draw_green_button_no_focuse(ctx)
                    that.Draw_red_button_focuse(ctx)
                }else{
                    that.Draw_green_button_no_focuse(ctx)
                    that.Draw_red_button_no_focuse(ctx)
                }
                operator_screen.onmousedown = ()=>{
               //误差允许 +- 5
                    if(gap_red <= 640) {
                            console.log('关闭电机')
                            that.stop_motor()
                    }else if(gap_green <= 640) {
                            console.log('启动电机')
                            that.start_motor()
                    }else{
                         console.log('没有在有效范围内点击')
                    }
                }
            }
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
        Draw_red_button_no_focuse:function(ctx) {
            ctx.moveTo(300,110)
            ctx.beginPath()
            ctx.strokeStyle = "#00a8e5"
            ctx.arc(300,110,25,0,Math.PI*2)
            ctx.stroke()
            ctx.fillStyle="#00a8e5"
            ctx.font = 'bold 10px 黑体'
            ctx.fillText('关闭',290,113)
            ctx.closePath()
        },
        Draw_red_button_focuse:function(ctx) {
            ctx.moveTo(300,110)
            ctx.beginPath()
            ctx.strokeStyle = "#15739c"
            ctx.arc(300,110,25,0,Math.PI*2)
            ctx.stroke()
            ctx.fillStyle="#15739c"
            ctx.font = 'bold 10px 黑体'
            ctx.fillText('关闭',290,113)
            ctx.closePath()
        },
        Draw_green_button_no_focuse:function(ctx) {
            ctx.beginPath()
            ctx.strokeStyle = "#00a8e5"
            ctx.arc(200,110,25,0,Math.PI*2)
            ctx.stroke()
            ctx.fillStyle="#00a8e5"
            ctx.font = 'bold 10px 黑体'
            ctx.fillText('启动',190,113)
            ctx.closePath()
        },
        Draw_green_button_focuse:function(ctx) {
            ctx.beginPath()
            ctx.strokeStyle = "#15739c"
            ctx.arc(200,110,25,0,Math.PI*2)
            ctx.stroke()
            ctx.fillStyle="#15739c"
            ctx.font = 'bold 10px 黑体'
            ctx.fillText('启动',190,113)
            ctx.closePath()
        },
        start_motor:function(){
            this.$data.screen_infos.push('request motor start! [ON]')
            this.draw_screen()
            axios.post("/motor/start")
            .then((response)=>{
                console.log(response.data.tag)
            })
            .catch((error)=>{
                console.error(error)
            })

        },
        stop_motor:function() {
            this.$data.screen_infos.push('request motor stop![OFF]')       
            this.draw_screen()
            axios.post("/motor/down")
            .then((response)=>{
                console.log(response.data)
            })
            .catch((error)=>{
                console.error(error)
            })
        }
    },
    mounted:function(){
        this.draw_borad()
        this.draw_screen()
    }
}
</script>

<style scoped>
    .operator_borad{
        /* bottom: 30vh; */
        position: fixed;
        height: 40vh;
        background: #000000;
    }
    .button_area{
        /* float: left; */
        display: inline-block;
        width: 50%;
        height: 45vh;
        background: #000;
    }
    .info_area{
        /* float: right; */
        display: inline-block;
        background-color: black;
        width: 50%;
        height: 50vh;
    }
    .operator_borad input {
        border: none;
        color: #999999;
        background-color: #ff0033;
        margin-right: 10px;
    }

    .operator_borad input:hover {
        background-color: #CC0033;
    }
    canvas{
        width: 100%;
        height: 100%;
    }
</style>