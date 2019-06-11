<template>
  <slide-view @close="$emit('close')">
    <div slot="header" class="clearfix">
      <span>异常详情</span>
      <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-close" @click="$emit('close')"></el-button>
    </div>
    <el-tabs class="region-tabs" v-model="activeTabs" @tab-click="changeTabHandler" style="height: 90%;">
      <el-tab-pane name="1" label="基本信息">基本信息
      </el-tab-pane>
      <el-tab-pane name="2" label="日程表" >日程表
      </el-tab-pane>
      <el-tab-pane name="3" label="参训人员" >参训人员
      </el-tab-pane>
      <el-tab-pane name="4" label="培训事项" >培训事项
      </el-tab-pane>
      <el-tab-pane name="5" label="签到">签到
      </el-tab-pane>
    </el-tabs>
  </slide-view>
</template>

<script>
    import slideView from '@/components/common/slideView.vue'
    export default {
        components: {slideView},
        mounted() {
            let me = this;
            me.init();
        },
        props: {},
        data(){
            return {
              activeTabs: '1',
            }
        },
        methods: {
            init(){

            },

          changeTabHandler(tab, event){
            let me = this;
          }
        },
        watch: {}
    };
</script>

<style lang="scss" scoped>
  /deep/ .el-card__header{
    padding: 11px 20px
  }
</style>
