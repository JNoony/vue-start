<template>
    <div class="chart-wrap">
        <h2>chart</h2>
        <!-- <v-chart class="chart" :options="option" /> -->
        <v-chart
          :option="pie"
          :init-options="initOptions"
          ref="pie"
          autoresize
        />
    </div>
</template>

<script>
import qs from "qs";
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/pie';
import pie from "./pie.js";
// import CanvasRenderer from "echarts/renderers";
// import PieChart from "echarts/charts";
// import {
//   TitleComponent,
// //   TooltipComponent,
// //   LegendComponent
// } from "echarts/components";

export default {
    name: 'Chart',
    components: {
        "v-chart": ECharts,
        // CanvasRenderer,
        // PieChart,
        // TitleComponent
    },
    props: {
    },
    data(){
        const options = qs.parse(location.search, { ignoreQueryPrefix: true });
        return{
            pie,
            expand: {
                pie: true,
            },
            initOptions: {
                renderer: options.renderer || "canvas"
            },
            option: {
                title: {
                    text: "饼图程序调用高亮示例",
                    x: "center",
                },
                // tooltip: {
                //     trigger: 'item'
                // },
                // legend: {
                //     top: '5%',
                //     left: 'center'
                // },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        // avoidLabelOverlap: false,
                        // label: {
                        //     show: false,
                        //     position: 'center'
                        // },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '40',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            {value: 1048, name: '搜索引擎'},
                            {value: 735, name: '直接访问'},
                            {value: 580, name: '邮件营销'},
                            {value: 484, name: '联盟广告'},
                            {value: 300, name: '视频广告'}
                        ]
                    }
                ]
            },

        };
    },
    computed:{
    },
    methods:{  
    },
    mounted(){  
        // this.renderChart(this.chartData, {responsive: true, maintainAspectRatio: false})      
    },
}
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
