<template>
    <div class="table_body">
        <canvas ref="table" width="600" height="400">
            浏览器版本过低不支持canvas，请及时更新
        </canvas>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "LineTable",
    data:function() {
        return {
            data_info:[20,21,22,23,24,50,40,100,20]
        }
    },
    methods:{
        draw_table_body:function() {
            let table = this.$refs['table']
            if(table == null) return
            let cxt = table.getContext("2d")
            cxt.clearRect(0,0,table.clientWidth,table.clientHeight)
            cxt.fillStyle = '#00a8e5'
            cxt.strokeStyle='#00a8e5';
            
            //拿来画表体
            let table_body = new Path2D()
            table_body.moveTo(50,30)
            table_body.lineTo(50,350)
            table_body.lineTo(550,350)
            for(let i = 1;i<=10;i++) {
                table_body.moveTo(50,350-i*30)
                table_body.lineTo(550,350-i*30)
            }
            for(let i = 1;i<=10;i++) {
                table_body.moveTo(50 + i*50,350)
                table_body.lineTo(50 + i*50,345)
            }
            cxt.stroke(table_body)
            //表明纵坐标刻度
            cxt.fillText("湿度(%)",10,30)
            for(let i = 0;i < 10;i++) {
                cxt.fillText(""+(100-i*10),20,55+i*30)
            }
            //爷拿来画横坐标
            for(let i =0;i<10;i++) {
                let date = new Date()
                let seconds = date.getSeconds() - (10 -i)
                let minutes = 0
                let hours = 0
                if(seconds <0) {
                    minutes = date.getMinutes() - 1
                    seconds = 60 + seconds
                    if(minutes < 0) {
                        hours = date.getHours() - 1
                        minutes = 60 +minutes
                    } else {
                        hours = date.getHours()
                    }
                }else {
                    minutes = date.getMinutes()     
                    hours = date.getHours()
                }
            
                
                let string = (hours>=10?hours:("0"+hours))
                +":"+(minutes>=10?minutes:("0"+minutes))
                +":"+(seconds>=10?seconds:("0"+seconds))
                cxt.fillText(string,80+i*50,375)
            }
        },
        draw_data:function() {
            let data_list = this.$data.data_info
            let canvas = this.$refs['table']
            if(canvas == null) return
            let cxt = canvas.getContext('2d')
            cxt.fillStyle = '#00a8e5'
            cxt.moveTo(50,350)
            for(let i = 0;i<data_list.length;i++) {
                let data = -((parseInt(data_list[i].humidity) + 50)+20*((parseInt(data_list[i].humidity)+50)/10)-150) //y=(x+50)+20*((x+50)/10)-150)映射关系
                switch(i) {
                    case 0:
                        cxt.fillStyle = "#FF0033"
                        break;
                    case 1:
                        cxt.fillStyle = "#FF9900"    
                        break;                 
                    case 2:
                        cxt.fillStyle = "#3366CC"    
                        break;
                    case 3:
                        cxt.fillStyle = "#99CC33"    
                        break;
                    case 4:
                        cxt.fillStyle = "#996600"  
                        break;
                    case 5:
                        cxt.fillStyle = "#9933FF"  
                        break;
                    case 6:
                        cxt.fillStyle = "#3399CC"  
                        break;
                    case 7:
                        cxt.fillStyle = "#FF99CC"  
                        break;
                    case 8:
                        cxt.fillStyle = "#66CC99"  
                        break;
                    case 9:
                        cxt.fillStyle = "#000000"  
                        break;  
                    default:
                        cxt.fillStyle = "#000000"            
                }
                cxt.lineTo(100+i*50,350+data)     
                cxt.stroke()
                cxt.beginPath()
                cxt.arc(100+i*50,350+data,3,0,Math.PI*2)
                cxt.fill()
                cxt.closePath()
                cxt.fillStyle = "#00a8e5" 
            }

        },
        request_humidity(){
            let that = this
            axios.post("/network/info")
            .then((response)=>{
                let receive_data = response.data.data
                console.log(receive_data)
                that.$data.data_info = receive_data
            })
            .catch((error)=>{
                console.error(error)
            })
        }
    },
    mounted: function(){
        let that = this
        that.request_humidity()
        that.draw_table_body()
        that.draw_data()
        setInterval(()=>{
            that.request_humidity()
            that.draw_table_body()
            that.draw_data()
        },10000)
        // that.draw_table_body()
        // this.draw_data()
    }
}
</script>

<style scoped>
    .table_body {
        margin: 0;
        padding: 0;
        width: 80%;
    }
</style>