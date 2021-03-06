import axios from "axios";

const cancelTokenSources = new Map(); // 定义cancel队列

class Https{
    constructor(config) {
        this.config = config || {
          timeout: 6000,
          // withCredentials: false, //指定具体请求来源域名
          // baseURL: process.env.VUE_APP_API_BASE_URL,
          baseURL: 'http://127.0.0.1:3000',
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        };       
      }

      interceptors(instance) {
          instance.interceptors.request.use(config => {
            debugger
                const token = localStorage.getItem("token");
                if (token) {
                     config.headers["Access-Token"] = token;
                }               
                // 请求拦截器中将请求加入cancel队列
                if (!config.hasOwnProperty('cancelToken')) { // 排除不需要cancel的请求
                    const source = axios.CancelToken.source();  
                    cancelTokenSources.set(source.token, source.cancel); // 加入cancel队列   
                    config.cancelToken = source.token;
                 }
                return config;
            },
            error=>{
                return Promise.reject(error); 
          });
          instance.interceptors.response.use(
             response => {
                if (response.config.cancelToken) {
                    cancelTokenSources.delete(response.config.cancelToken);
                 }
                return response.data;
              },
              error => {
                if (error.response) {
                    const data = error.response.data;
                    if (error.response.status === 403) {
                        console.log("无权限访问",data.message)
                    }
                    if (error.response.status === 401) {
                         //退出登陆
                    }

                }else{
                    let { message } = error;
                    if (message === "Network Error") {
                        message = "连接异常";
                    }
                    if (message.includes("timeout")) {
                        message = "请求超时";
                    }
                    if (message.includes("Request failed with status code")) {
                        const code = message.substr(message.length - 3);
                        message = "接口" + code + "异常";
                    }
                    console.log(message);
                }
                if (axios.isCancel(error)) {
                    cancelTokenSources.delete(error.message)
                  }
                return Promise.reject(error);
              }
          );
      }
      request(options) {      
        const instance = axios.create();
        const requestOptions = Object.assign({}, this.config, options);
        this.interceptors(instance);
        return instance(requestOptions);
      }
}

const https = new Https();
export default https;
export {
    cancelTokenSources
}