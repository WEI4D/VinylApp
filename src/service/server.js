import axios from "axios";
let CancelToken = axios.CancelToken;
axios.create({
    timeout: 12000,
    headers : {
        "Content-Type": "application/x-www-form-urlencoded"
    }
});
axios.interceptors.request.use(config =>{
    let requestName = config.method === 'post' ? config.data.requestName : config.params.requestName;
    if( requestName ){
        if(axios[requestName] && axios[requestName].cancel ){
            axios[requestName].cancel();
        }
        config.cancelToken = new CancelToken(c=>{
            axios[requestName] = {};
            axios[requestName].cancel = c;
        })
    }
    return config;
},error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(response=>{
    const res = response.data;
    if(res.msg === "success" || res.msg !== "success"){
        return Promise.resolve(response.data);
    }else{
        return Promise.reject();
    }
},error => {
    return Promise.reject(error);
});
export default axios;
