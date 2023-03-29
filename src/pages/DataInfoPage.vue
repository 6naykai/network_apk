<template>
    <div class="page_body">
        <NavigationBar></NavigationBar>
        <LineTable class="table_of_t"></LineTable>
        <LineTableH class="table_of_h"></LineTableH>
    <!-- <div class="operator_borad"></div> -->
        <OperatorBorad/>
    </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
import LineTable from '@/components/table/LineTable.vue';
import LineTableH from '@/components/table/LineTableH.vue';
import OperatorBorad from '@/components/OperatorBorad.vue';
import axios from 'axios';


export default {
    name:"DataInfoPage",
    components:{
        NavigationBar,
        LineTable,
        LineTableH,
        OperatorBorad
    },
    data:function() {
        return {
        }
    },
    methods:{
        start_motor:function(){
            axios.post("/motor/start")
            .then((response)=>{
                console.log(response.data.tag)
            })
            .catch((error)=>{
                console.error(error)
            })

        },
        stop_motor:function() {
            axios.post("/motor/down")
            .then((response)=>{
                console.log(response.data)
            })
            .catch((error)=>{
                console.error(error)
            })
        }
    }
}
</script>


<style scoped>
    .page_body {
        background: #000000;
    }
    .table_of_t {
        margin-left: 13%;
        display: inline;
    }
    .table_of_h{
        display: inline;
    }
    .operator_borad {
        
        width: 100%;
        
    }
    .operator_borad input:hover {
        background-color: #CC0033;
    }
</style>