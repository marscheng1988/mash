/**
 * 依赖vue.js
 */
import axios from 'axios';

axios.defaults.withCredentials=true;

export default{
    install: function(Vue, options){

        let qs = require('qs');

        const successFun = function(response, callBack, self, stay){
            if(response.data.status === 21) {
                setTimeout(()=>{
                    self.confirm("您还没有登陆，现在登陆？",function (type) {
                        if(type === "0") {
                            if(!stay){
                                self.backToView();
                            }
                        }else {
                            let currentUrl = this.$route.path;
                            self.pushView("/signIn", {path: currentUrl});
                        }
                    })
                }, 350)
            }else {
                if(response.data.status !== 1){

                    if(response.data.status == 50000) self.tip('物流信息查询失败');

                    else self.tipStatus(response.data.status);

                }else if(callBack!=null) callBack(response.data);
            }
        };

        const errFun = function(error, errCallBack, self){
            if(errCallBack!=null){
                errCallBack(error);
            }else{
                self.tip('网络繁忙！');
            }
        };

        Vue.prototype.getQuery = function(isLoading,url,callBack,errCallBack,stay){
            if(isLoading){
                this.showLoading();
            }
            let path = this.$route.path;
            axios.get(url)
                .then((response) => {
                    if(isLoading){
                        this.hideLoading();
                    }
                    if(this.$route.path !== path){
                        console.error('页面已切换，回调方法不执行');
                        return;
                    }
                    successFun(response, callBack, this, stay);
                })
                .catch((error) => {
                    console.log(error);
                    if(isLoading){
                        this.hideLoading();
                    }
                    if(this.$route.path !== path){
                        console.error('页面已切换，回调方法不执行');
                        return;
                    }
                    errFun(error, errCallBack, this)
                })
        };
        //请求未登录，不弹出confirm框
        Vue.prototype.logGetQuery = function(isLoading,url,callBack,errCallBack){
            if(isLoading){
                this.showLoading();
            }
            let path = this.$route.path;
            axios.get(url)
                .then((response) => {
                    if(isLoading){
                        this.hideLoading();
                    }
                    if(this.$route.path !== path){
                        console.error('页面已切换，回调方法不执行');
                        return;
                    }
                    if(response.data.status !== 1){
                        if(response.data.status === 21){
                            return
                        }
                        self.tipStatus(response.data.status);
                    }else if(callBack!=null) callBack(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    if(isLoading){
                        this.hideLoading();
                    }
                    if(this.$route.path !== path){
                        console.error('页面已切换，回调方法不执行');
                        return;
                    }
                    errFun(error, errCallBack, this)
                })
        };
        Vue.prototype.postQuery = function(isLoading,url,data,callBack,errCallBack,stay){
            if(isLoading){
                this.showLoading();
            }
            let path = this.$route.path;
            axios.post(url, qs.stringify(data))
                .then((response) => {
                    if(isLoading){
                        this.hideLoading();
                    }
                    if(this.$route.path !== path){
                        console.error('页面已切换，回调方法不执行');
                        return;
                    }
                    successFun(response, callBack, this, stay);
                })
                .catch((error) => {
                    console.log(error);
                    if(isLoading){
                        this.hideLoading();
                    }
                    if(this.$route.path !== path){
                        console.error('页面已切换，回调方法不执行');
                        return;
                    }
                    errFun(error, errCallBack, this)
                })
        };

        Vue.prototype.putQuery = function(isLoading,url,data,callBack,errCallBack,stay){
            if(isLoading){
                this.showLoading();
            }
            let path = this.$route.path;
            axios.put(url, qs.stringify(data))
                .then((response) => {
                    if(isLoading){
                        this.hideLoading();
                    }
                    if(this.$route.path !== path){
                        console.error('页面已切换，回调方法不执行');
                        return;
                    }
                    successFun(response, callBack, this, stay);
                })
                .catch((error) => {
                    console.log(error);
                    if(isLoading){
                        this.hideLoading();
                    }
                    if(this.$route.path !== path){
                        console.error('页面已切换，回调方法不执行');
                        return;
                    }
                    errFun(error, errCallBack, this)
                })
        };

        Vue.prototype.deleteQuery = function(isLoading,url,callBack,errCallBack,stay){
            if(isLoading){
                this.showLoading();
            }
            let path = this.$route.path;
            axios.delete(url)
                .then((response) => {
                    if(isLoading){
                        this.hideLoading();
                    }
                    if(this.$route.path !== path){
                        console.error('页面已切换，回调方法不执行');
                        return;
                    }
                    successFun(response, callBack, this, stay);
                })
                .catch((error) => {
                    console.log(error);
                    if(isLoading){
                        this.hideLoading();
                    }

                    if(this.$route.path !== path){
                        console.error('页面已切换，回调方法不执行');
                        return;
                    }
                    errFun(error, errCallBack, this)
                })
        };
    }
}
