/**
 * 本地数据库操作对象(通过H5 localStorage或cookie实现，视浏览器支持情况选择不同的存储媒介)
 */
export default {
    install: function(Vue, options){
        let db = window.localStorage?window.localStorage:'';
        let dbtype = window.localStorage?'h5':'cookie';

        //写入数据
        Vue.prototype.save = function(key,val,exdays){
            if(dbtype=="h5"){
                exdays = exdays === undefined ? 30 : exdays;
                var curTime = new Date().getTime();
                db.setItem(key,JSON.stringify({data:val,time:curTime+exdays*60*60*24}));
                //console.log("log[info] 写入数据"+key+":"+val);
                return true;
            }
            if(dbtype=="cookie"){
                this.setCookie(key,val,exdays);
                //console.log("log[info] 写入数据"+key+":"+val);
                return true;
            }
            return false;
        };

        Vue.prototype.saveSession = function(key,val){
            let ss = sessionStorage;
            ss.setItem(key,JSON.stringify(val));
            return false;
        };

        //获取数据
        Vue.prototype.find = function(key){
            if(dbtype=="h5"){
                var item = JSON.parse(db.getItem(key));
                if(db.getItem(key) === null){
                    return "";
                }else {
                    if(item.time > new Date().getTime()){
                        return item.data;
                    }else{
                        this.remove(key);
                        return ""
                    }
                }
            }
            if(dbtype=="cookie"){
                return this.getCookie(key);
            }
            return "";
        };
        Vue.prototype.findSession = function(key){
            let ss = sessionStorage;
            let item = ss.getItem(key);
            if(item){
                return JSON.parse(ss.getItem(key));
            }
            return "";
        };

        //删除数据
        Vue.prototype.remove = function(key){
            if(dbtype=="h5"){
                db.removeItem(key)
                return true;
            }
            if(dbtype=="cookie"){
                this.clearCookie(key);
                return true;
            }
            return false;
        };
        Vue.prototype.removeSession = function(key){
            let ss = sessionStorage;
            ss.removeItem(key);
            return true;
        };

        //写入cookie
        Vue.prototype.setCookie = function(cname, cvalue, exdays) {
            var d = new Date();
            exdays = exdays === "" ? 30 : exdays;
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        };

        //获取cookie
        Vue.prototype.getCookie = function(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
            }
            return "";
        };

        //删除cookie
        Vue.prototype.clearCookie = function(name) {
            this.setCookie(name, "", -1);
        }
    }
}
