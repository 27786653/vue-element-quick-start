<template>
  <div class="error-table">
    <el-row style="background: #ebebec;height: 38px;padding: 5px;">
      <el-form ref="form" :model="searchForm"  size="mini" inline="">
        <el-form-item label="活动名称">
          <el-input v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="searchForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" icon="el-icon-search"></el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" icon="el-icon-refresh"></el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-table ref="functionsTable" size="mini" :data="tableData" @row-dblclick="checkDetail" :show-header="true"
                v-loading="tableLoading" element-loading-text="数据加载中......" class="table-font" max-height="450">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="错误" width="400" fixed>
          <template slot-scope="scope">
            <el-row>
              504&nbsp;&nbsp;&nbsp;POST&nbsp;&nbsp;http://localhost:8090/api/user/login
            </el-row>
            <el-row>
              Gateway Timeout&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1008.00ms
            </el-row>
            <el-row>
              5天前&nbsp;&nbsp;~&nbsp;&nbsp;5天前
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="错误类型" width="180" fixed align="center" fixed>
          <el-tag effect="dark">HTTP</el-tag>
        </el-table-column>
        <el-table-column prop="state" label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.state==0">全部</span>
            <span v-if="scope.row.state==1">未解决</span>
            <span v-if="scope.row.state==2">正在处理</span>
            <span v-if="scope.row.state==3">已处理</span>
            <span v-if="scope.row.state==4">忽略</span>
          </template>
        </el-table-column>
        <el-table-column prop="expectJoinCount" label="时间" width="160" align="center">
          5天前
        </el-table-column>
        <el-table-column prop="expectJoinCount" label="事件数" width="160" align="center">
          2
        </el-table-column>

        <el-table-column prop="expectJoinCount" label="用户数" width="160" align="center">
          2
        </el-table-column>

        <el-table-column prop="expectJoinCount" label="版本" width="160" align="center">
          dev
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px; margin-left: -5px;float: right">
        <el-pagination @current-change="handleCurrentChange" :page-count="pagination.pages"
                       :current-page.sync="pagination.current" layout="prev, pager, next, jumper"></el-pagination>
      </div>
    </el-row>
    <error-detail v-show="errorDetailShow" @close="errorDetailShow=false"></error-detail>
  </div>
</template>

<script>
  import tableCommon from '@/mixins/tableCommon';
  import errorDetail from './errorDetail';
  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button";
  export default {
    mixins: [tableCommon],
    components: {
      ElButton,
      errorDetail},
    activated() {

    },
    mounted() {
      let me = this;
      me.init();
    },
    props: {
    },
    data(){
      return {
        tableData: [{
          id: ''
        }],
        searchForm:{},
        errorDetailShow:false,
      }
    },
    methods: {
      init(){

      },
      checkDetail(row, event){
        this.errorDetailShow=!this.errorDetailShow;
      }
    },
    deactivated(){
      this.$destroy();
    },
    watch: {}

  };
</script>

<style lang="scss" scoped>
  .error-table {
    /deep/ .el-table__body tr.hover-row > td {
      background-color: #ebebec !important;
    }
  }
</style>
