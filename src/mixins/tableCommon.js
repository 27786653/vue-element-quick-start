/**
 * Created by DELL on 2019/3/2.
 */
import { parseParam,cleanObj } from "@/util";
export default {
  created () {
    console.log("mixin");
  },
  data(){
    return{
      tableName:'',
      tableLoading: false,
      loadingText:'数据加载中......',
      pagination: { current: 1, limit: 10, total: 0, pages: 0, max: 1, next: 1 },
      searchForm:{},
      multipleSelection:[],
    }
  },
  methods:{
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    successMsg(msg){
      this.$message({
        type: "success", message: msg==null?'操作成功':msg, duration: 2000, onClose: () => {
        }
      });
    },
    errorMsg(error){
      this.$message({
        type: "error", message: error==null?'操作异常':error, duration: 2000, onClose: () => {
        }
      });
    },
    jump(path,query){
      this.$router.push(
        {path:path,query:query});
    },
    resetSearchButtonClicked() {
      cleanObj(this.searchForm);
      this.fetchData();
    },
    parseEnable(row, column, cellValue, index){
      return row.state==0?'禁用':'可用';
    },
    //      当前分页改变
    async handleCurrentChange(val) {
      this.setPaginationNextPage(val);
      this.fetchData();
    },
    searchButtonClicked() {
      this.fetchData();
    },
    setPaginationNextPage(next) {
      this.pagination.next = next;
    },
    //获取分页跳转数
    getPaginationSkip() {
      return Math.max(1, this.pagination.next);
    },
    fetchData(){
    //  todo 业务获取数据
    },
    //设置分页总数
    setPaginationTotal(page) {
      this.pagination.total = page.total;
      this.pagination.pages = page.pages;
    },
    checkRow(row, event){
      this.$refs[this.tableName].toggleRowSelection(row);
    },
    initTable(refreshFlag){
      let me=this;
      if(refreshFlag)me.resetSearchButtonClicked();
    },
  },
  deactivated(){
    this.$destroy();
  },
}
