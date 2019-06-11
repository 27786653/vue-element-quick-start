/**
 * Created by DELL on 2018/9/14.
 */

/** 获取最大 z-index 的值 */
import {
  PopupManager
} from 'element-ui/lib/utils/popup'
export function getMaxIndex() {
  return PopupManager.nextZIndex()
}

let util = {};

util.parseAryParam=function (ary) {
  var str='';
  ary.forEach(m=>{str+=m+",";  })
  return str;
};

util.splitStrToAry=function (str,splitStr) {
  var ary = str.split(splitStr);
  for(var i=0;i<ary.length;i++){
       if(this.isEmpty(ary[i])) ary.splice(i,1);
  }
  return ary;
};

/**
 * 数据字典
 * @param dict_key 项key
 * @param key       值key
 */
util.getDictLabel=function(dictKey,key){
  let me=this;
  for(var i=0;i<me.$store.state.dictData.length;i++){
    var item=me.$store.state.dictData[i];
    if(item.key===dictKey){
     for(var j=0;j<item.childDict.length;j++){
       if(item.childDict[j].key==key){
         return item.childDict[j].value;
       }
     }
    }
  }
}
// 判断一个字符串是否都为数字
util.isDigit=function(strNum){
  var match = strNum.match(/^\d+$/);   //考虑小数写法 ^\d+(\.\d+)?$
  return match;
}


util.parseParam=function(param, key){
  var paramStr="";
  if(typeof param ==="string"||typeof param ==="number"||typeof param ==="boolean"){
    paramStr+="&"+key+"="+encodeURIComponent(param);
  }else{
    for(var i in param){
      var k=key==null?i:key+(param instanceof Array?"["+i+"]":"."+i);
      if(param[i]) {//参数如果为空，则抛弃
        paramStr+='&'+util.parseParam(param[i], k);
      }
    }
  }
  return paramStr.substr(1);
};

util.uniqueAry=function (arr){
  var res = [arr[0]];
  for(var i=1; i<arr.length; i++){
    var repeat = false;
    for(var j=0; j<res.length; j++){
      if(arr[i] === res[j]){
        repeat = true;
        break;
      }
    }
    if(!repeat){
      res.push(arr[i]);
    }
  }
  return res;
}

util.formatDate = function (date,fmt) {
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

util.isEmpty=function(val){
  return !val||val==null||val.length<=0;
}




export default util;
