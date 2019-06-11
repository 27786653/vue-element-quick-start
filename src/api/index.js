/* eslint-disable prefer-template,no-var,no-const-assign */
import axios from 'axios';
import Store from '@/store/index';
import Router from '@/router/index';

import { Message, MessageBox  } from 'element-ui';

const config = require('@/config/index');


/**
 * axios 全局设置
 * @type {string}
 */
axios.defaults.baseURL = config.apiServer;


const onAccessTokenFailed = () => {
  Message.error({
    message: '检测到您尚未登录，或登录超时。需要重新登录。',
    type: 'error',
    duration: 2000,
    onClose: () => {
      console.warn('检测到您尚未登录，或登录超时。需要重新登录。');
      Router.push('login');
    },
  });
};

/**
 * 请求后缀 AccessToken
 * @param api
 *
 * @returns {string}
 */
const getApiAceessToken = () => {
  Store.dispatch('getSysUserInfo');
  const sysUserInfo = Store.state.sysUserInfo;
  if (!sysUserInfo || !sysUserInfo.accessToken) {
    return '';
  }
  return sysUserInfo.accessToken;
};

/**
 * uri 后缀 accessToken
 * @param api
 * @returns {*}
 */
const suffixApiAceessToken = (api) => {
  const accessToken = getApiAceessToken();
  if (!accessToken) {
    return false;
  }

  return api + '?AccessToken=' + accessToken;
};

const hendleErrorResponse = (code, msg, error) => {
  if (code === 0) {
    return;
  }

  if (msg === '身份校验失败：无效的身份令牌') {
    error(msg, code);
    Store.dispatch('reLogin','请求异常：账号已在其他应用端登录。请重新登录。');
    // MessageBox.confirm('请求异常：账号已在其他应用端登录。请重新登录。' , "提示",{ confirmButtonText: "确定", cancelButtonText: "取消", type: "error" }).then(() => {
    // });
    Message.error({
    message: '请求异常：账号已在其他应用端登录。请重新登录。',
    type: 'error',
    duration: 2000,
    onClose: () => {
      window.sessionStorage.setItem("sysUserInfo", null);
      Router.push({ path:  'login'})
    },
  });
  } else {
    error(msg, code);
  }
};

/**
 * axios post method wrapper
 * @param api
 * @param data
 * @param success
 * @param error
 * @param exception
 * @param needAccessToken 是否需要 accessToken（免登陆接口不需要）
 */
export const axiosPostWrapper = (api, data, success, error, exception, needAccessToken) => {
  let accessToken = '';
  if (needAccessToken !== false) {
    accessToken += getApiAceessToken();
    if (!accessToken) {
      error('无法获取身份令牌');
      // onAccessTokenFailed();
      return;
    }
  }

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  axios.post(
    api,
    data,
    {
      cancelToken: source.token,
      transformRequest: [(param) => {
        let ret = '';
        Object.keys(param).forEach((key) => {
          if ({}.hasOwnProperty.call(param, key)) {
            ret += `${encodeURIComponent(key)}=${encodeURIComponent(param[key])}&`;
          }
        });
        ret += 'AccessToken=' + accessToken;
        return ret;
      }],
    },
  ).then((response) => {
    const resData = response.data || {};
    const headers = response.headers || {};
    const request = response.request || {};
    const responseConfig = response.config || {};
    const code = resData.resultCode || 0;

    if (code > 0) {
      if (axios.isCancel(true)) {
        console.warn('请求终止：' + resData.resultMsg || '服务器异常');
      }

      hendleErrorResponse(code, resData.resultMsg || '', error);
    } else {
      success(resData.data || {}, headers, request, responseConfig, resData);
    }
  }).catch((e) => {
    if (axios.isCancel(e)) {
      console.warn('请求终止', e.message);
    }
    exception(e);
  });
};

export const urlWrapper = (api, requestdata) => {
  const uri = axios.defaults.baseURL + suffixApiAceessToken(api);
  if (!uri) {
    return "";
  }
  let ret = '';
  Object.keys(requestdata).forEach((key) => {
    if ({}.hasOwnProperty.call(requestdata, key)) {
      ret += `${encodeURIComponent(key)}=${encodeURIComponent(requestdata[key])}&`;
    }
  });
  return uri +"&"+ ret;
}

export const url = (api, requestdata) => {
  const uri = suffixApiAceessToken(api);
  if (!uri) {
    return "";
  }
  let ret = '';
  Object.keys(requestdata).forEach((key) => {
    if ({}.hasOwnProperty.call(requestdata, key)) {
      ret += `${encodeURIComponent(key)}=${encodeURIComponent(requestdata[key])}&`;
    }
  });
  return uri +"&"+ ret;
}
/**
 * axios get method wrapper
 * @param api api interface
 * @param data
 * @param success success callback
 * @param error error callback
 * @param exception exception handller
 */
export const axiosGetWrapper = (api, requestdata, success, error, exception) => {
  const uri = suffixApiAceessToken(api);
  if (!uri) {
    error('无法获取身份令牌');
    // onAccessTokenFailed();
    return;
  }
  axios.get(
    uri,
    {
      params: requestdata,
      data: requestdata,
      transformRequest: [(param) => {
        let ret = '';
        Object.keys(param).forEach((key) => {
          if ({}.hasOwnProperty.call(param, key)) {
            ret += `${encodeURIComponent(key)}=${encodeURIComponent(param[key])}&`;
          }
        });
        return ret;
      }],
    },
  ).then((response) => {
    const resData = response.data || {};
    const headers = response.headers || {};
    const request = response.request || {};
    const responseConfig = response.config || {};
    const code = resData.resultCode || 0;

    if (code > 0) {
      if (axios.isCancel(true)) {
        console.warn('请求终止：' + resData.resultMsg || '服务器异常');
      }

      hendleErrorResponse(code, resData.resultMsg || '', error);
    } else {
      success(resData.data || {}, headers, request, responseConfig);
    }
  }).catch((e) => {
    if (axios.isCancel(e)) {
      console.warn('请求终止', e.message);
    }
    exception(e);
  });
};

/**
 * axios delete method wrapper
 * @param api api interface
 * @param data
 * @param success success callback
 * @param error error callback
 * @param exception exception handller
 */
export const axiosDeleteWrapper = (api, requestdata, success, error, exception) => {
  const uri = suffixApiAceessToken(api);
  if (!uri) {
    error('无法获取身份令牌');
    // onAccessTokenFailed();
    return;
  }
  axios.delete(
    uri,
    {
      params: requestdata,
      data: requestdata,
      transformRequest: [(param) => {
        let ret = '';
        Object.keys(param).forEach((key) => {
          if ({}.hasOwnProperty.call(param, key)) {
            ret += `${encodeURIComponent(key)}=${encodeURIComponent(param[key])}&`;
          }
        });
        return ret;
      }],
    },
  ).then((response) => {
    const resData = response.data || {};
    const headers = response.headers || {};
    const request = response.request || {};
    const responseConfig = response.config || {};
    const code = resData.resultCode || 0;

    if (code > 0) {
      if (axios.isCancel(true)) {
        console.warn('请求终止：' + resData.resultMsg || '服务器异常');
      }

      hendleErrorResponse(code, resData.resultMsg || '', error);
    } else {
      success(resData.data || {}, headers, request, responseConfig);
    }
  }).catch((e) => {
    if (axios.isCancel(e)) {
      console.warn('请求终止', e.message);
    }
    exception(e);
  });
};

/**
 * axios put method wrapper
 * @param api api interface
 * @param data
 * @param success success callback
 * @param error error callback
 * @param exception exception handller
 */
export const axiosPutWrapper = (api, requestdata, success, error, exception) => {
  const uri = suffixApiAceessToken(api);
  if (!uri) {
    error('无法获取身份令牌');
    // onAccessTokenFailed();
    return;
  }
  axios.put(
    uri,
    requestdata,
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: [(param) => {
        let ret = '';
        Object.keys(param).forEach((key) => {
          if ({}.hasOwnProperty.call(param, key)) {
            ret += `${encodeURIComponent(key)}=${encodeURIComponent(param[key])}&`;
          }
        });
        return ret;
      }],
    },
  ).then((response) => {
    const resData = response.data || {};
    const headers = response.headers || {};
    const request = response.request || {};
    const responseConfig = response.config || {};
    const code = resData.resultCode || 0;

    if (code > 0) {
      if (axios.isCancel(true)) {
        console.warn('请求终止：' + resData.resultMsg || '服务器异常');
      }

      hendleErrorResponse(code, resData.resultMsg || '', error);
    } else {
      success(resData.data || {}, headers, request, responseConfig);
    }
  }).catch((e) => {
    if (axios.isCancel(e)) {
      console.warn('请求终止', e.message);
    }
    exception(e);
  });
};



/**
 * axios post method wrapper
 * @param api api interface
 * @param data
 * @param success success callback
 * @param error error callback
 * @param exception exception handller
 */
export const axiosPostFileWrapper = (api, data, onprogress, success, error, exception) => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  let apiwrap = '';
  const accessToken = getApiAceessToken();
  if (!accessToken) {
    error('无法获取身份令牌');
    // onAccessTokenFailed();
    return;
  }
  apiwrap += '?AccessToken=' + encodeURIComponent(accessToken);
  apiwrap = api + apiwrap;
  axios.post(
    apiwrap,
    data,
    {
      headers: { 'Content-Type': 'multipart/form-data; boundary=ABCD' },
      cancelToken: source.token,
      onUploadProgress: onprogress,
    },
  ).then((response) => {
    const resData = response.data || {};
    const headers = response.headers || {};
    const request = response.request || {};
    const responseConfig = response.config || {};
    const code = resData.resultCode || 0;

    if (code > 0) {
      if (axios.isCancel(true)) {
        console.warn('请求终止：' + resData.resultMsg || '服务器异常');
      }

      hendleErrorResponse(code, resData.resultMsg || '', error);
    } else {
      success(resData.data || {}, headers, request, responseConfig);
    }
  }).catch((e) => {
    if (axios.isCancel(e)) {
      console.warn('请求终止', e.message);
    }
    exception(e);
  });
};

export const axiosPostJsonWrapper = (api, data, success, error, exception, needAccessToken) => {
  let accessToken = '';
  let apiwrap = '';
  if (needAccessToken !== false) {
    accessToken += getApiAceessToken();
    if (!accessToken) {
      error('无法获取身份令牌');
      // onAccessTokenFailed();
      return;
    }
  }

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  apiwrap += '?AccessToken=' + encodeURIComponent(accessToken);
  apiwrap = api + apiwrap;
  axios.post(
    apiwrap,
    data,
    {
      cancelToken: source.token,
      headers: { 'Content-Type': 'application/json' },
    }

  ).then((response) => {
    const resData = response.data || {};
    const headers = response.headers || {};
    const request = response.request || {};
    const responseConfig = response.config || {};
    const code = resData.resultCode || 0;

    if (code > 0) {
      if (axios.isCancel(true)) {
        console.warn('请求终止：' + resData.resultMsg || '服务器异常');
      }
      hendleErrorResponse(code, resData.resultMsg || '', error);
    } else {
      success(resData.data || {}, headers, request, responseConfig);
    }
  }).catch((e) => {
    if (axios.isCancel(e)) {
      console.warn('请求终止', e.message);
    }
    exception(e);
  });
};

export const axiosPutJsonWrapper = (api, data, success, error, exception, needAccessToken) => {
  let accessToken = '';
  let apiwrap = '';
  if (needAccessToken !== false) {
    accessToken += getApiAceessToken();
    if (!accessToken) {
      error('无法获取身份令牌');
      // onAccessTokenFailed();
      return;
    }
  }

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  apiwrap += '?AccessToken=' + encodeURIComponent(accessToken);
  apiwrap = api + apiwrap;
  axios.put(
    apiwrap,
    data,
    {
      cancelToken: source.token,
      headers: { 'Content-Type': 'application/json' },
    }

  ).then((response) => {
    const resData = response.data || {};
    const headers = response.headers || {};
    const request = response.request || {};
    const responseConfig = response.config || {};
    const code = resData.resultCode || 0;

    if (code > 0) {
      if (axios.isCancel(true)) {
        console.warn('请求终止：' + resData.resultMsg || '服务器异常');
      }
      hendleErrorResponse(code, resData.resultMsg || '', error);
    } else {
      success(resData.data || {}, headers, request, responseConfig);
    }
  }).catch((e) => {
    if (axios.isCancel(e)) {
      console.warn('请求终止', e.message);
    }
    exception(e);
  });
};
