<template>
  <div class="page">
    <el-container>
      <el-header height="39px" style="background: #26262e">
        <el-col :span="1">
          <el-popover
            placement="bottom"
            width="200"
            trigger="hover"
            v-model="visible">
            <el-button style="width: 100%;margin-left: 0px;border-radius:0;border: 0px" v-for="(item,index) in projectData" :key="item">{{item}}</el-button>
            <el-button style="width: 100%;margin-left: 0px;border-radius:0;border: 0px">创建新项目</el-button>
            <el-button class="black" style="width: 100%;" slot="reference" icon="el-icon-caret-bottom" @click="visible = !visible">EPC</el-button>
          </el-popover>
        </el-col>
        <el-col :span="21" :offset="1" style="border-left: 1px #303133 solid;height: 100%;">
          <el-button class="black">错误列表</el-button>
          <el-button class="black">项目设置</el-button>
        </el-col>
      </el-header>
      <el-header height="43px" style="background: #35353d">
        <el-col :span="10">
          <el-input class="black-input" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="7"  style="border-left: 1px #505051 solid;height: 100%;">
          <el-button-group>
            <el-button type="primary" class="time-region-btn">1小时</el-button>
            <el-button type="primary" class="time-region-btn">1天</el-button>
            <el-button type="primary" class="time-region-btn">7天</el-button>
            <el-button type="primary" class="time-region-btn">30天</el-button>
            <el-button type="primary" class="time-region-btn">90天</el-button>
          </el-button-group>
        </el-col>
        <el-col :span="7"  style="border-left: 1px #505051 solid;height: 100%;">
          <el-date-picker class="date-range-picker"
            format="yyyy 年 MM 月 dd 日 HH 时 mm 分 SS 秒" size="small"
            type="datetime" value-format="yyyy/MM/dd HH:mm:ss"
            v-model="searchForm.startTime" placeholder="开始时间"  style="width: 40%;" clearable></el-date-picker>
          &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
          <el-date-picker class="date-range-picker"
            format="yyyy 年 MM 月 dd 日 HH 时 mm 分 SS 秒" size="small"
            type="datetime" value-format="yyyy/MM/dd HH:mm:ss"
            v-model="searchForm.endTime" placeholder="结束时间" style="width: 40%;" clearable></el-date-picker>
        </el-col>
      </el-header>
      <el-main style="padding: 0px;width: 100%;">
        <el-row style="background: #26262e;">
          <div id="myChart" :style="chartStyle"></div>
        </el-row>
        <error-table :searchForm="searchForm" @close="visible=false"></error-table>
      </el-main>
      <el-footer height="27px">Footer</el-footer>
    </el-container>
  </div>
</template>

<script type="text/javascript">
  const echarts = require("echarts");
  import errorTable from './comp/table.vue';
  export default {
    components: {
      errorTable
    },
    created() {

    },
    mounted() {
      document.getElementById("myChart").style.height=document.body.clientHeight/100*25+'px';
      this.init();
    },
    data() {
      return {
        searchForm:{},
        visible:false,
        projectData:["epc","abc"],
        myChart:{},
        chartStyle:{},
      };
    },
    methods: {
        init(){
          let me = this;
          me.myChart = echarts.init(document.getElementById("myChart"));
          let option = {
            tooltip : {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            },
            grid: {
              left: '1.2%',
              right: '1.2%',
              bottom: '10%',
              top:'2%'
//              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: [
                  '05-01', '05-02', '05-03', '05-04', '05-05', '05-06', '05-07', '05-08', '05-09', '05-10',
                '05-11', '05-12', '05-13', '05-14', '05-15', '05-16', '05-17', '05-18', '05-19', '05-20',
              ],
              axisLabel: {
                textStyle: {
                  color: '#fff',//坐标值得具体的颜色

                }
              }
            },
            yAxis: {
              show : false,
              type: 'value'
            },
            series: [{
              data: [
                  820, 932, 901, 934, 1290, 1330, 1320,800,400,500,900,
                820, 932, 901, 934, 1290, 1330, 1320,800,400,500,900,
              ],
              type: 'line',
              label:{show:true},
              areaStyle: {
                color:{
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#6c9bc9' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#000' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
              },
              itemStyle:{
                color:'#6c9bc9'
              },
            }]
          };
          me.myChart.setOption(option);
        }
    },
    watch: {
    },
  };
</script>

<style lang="scss">
  .page {
    .black{
      background: #00000000;border-radius:0;border: 0px;color: #ffffff;
    }
    .time-region-btn{
      background: #00000000;border-radius:0;border: 0px;padding: 12px 7px;color: #a5a5a5;
    }
    .date-range-picker  .el-input__inner{
      width: 100%;height: 42px;background-color: #35353d;border: 0px;    color: #ffffff;
    }
    .black-input .el-input__inner{
      background-color: #35353d;
      border: 0px;
      color: #ffffff;
    }
    h1 {
      text-align: center;
      color: #ff0000;
    }
    .vuex-example {
      margin: 200px auto;
      text-align: center;
      font-size: 16px;
      color: #fff;
      span {
        display: inline-block;
        margin-left: 20px;
        margin-right: 20px;
      }
      button {
        border: none;
        width: 40px;
        height: 40px;
        outline: none;
        border-radius: 50%;
        background-color: #fff;
      }
    }
  }
  .el-popover{
    padding: 0px;
  }

</style>
