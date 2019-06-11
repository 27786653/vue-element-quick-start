/**
 * Created by DELL on 2018/9/14.
 */
export default {


  install: function (Vue, options) {
    /**
     * 是否存在操作权限
     * @param authCode
     * @returns {boolean}
     */
    Vue.prototype.isExistAuthorization=function(authCode){
      var me=this;
      if(!me.$store.state.sysUserInfo||me.$store.state.sysUserInfo == undefined ||!me.$store.state.sysUserInfo.userFunctions|| me.$store.state.sysUserInfo.userFunctions.length==0 || me.$store.state.sysUserInfo.userFunctions ==[]){
        return false;
      }
      for(var i=0;i<me.$store.state.sysUserInfo.userFunctions.length;i++){
        if(me.$store.state.sysUserInfo.userFunctions[i].code===authCode){
          return true
        }
      }
      return false;
    }



  }
}
