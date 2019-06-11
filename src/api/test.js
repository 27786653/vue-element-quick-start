import {urlWrapper, axiosPostFileWrapper, axiosPostWrapper, axiosGetWrapper, axiosDeleteWrapper, axiosPostJsonWrapper, axiosPutJsonWrapper, axiosPutWrapper } from './index';


export const getList = (data, success, error, exception) => {
  axiosGetWrapper('/api/test/list', data, success, error, exception);
};
