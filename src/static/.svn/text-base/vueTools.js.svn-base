/**
 * Created by abc on 2017/4/10.
 */
export default{
    install: function(Vue, options){
        Vue.prototype.pushView = function(path, data){
            this.$root.$children[0].pushView(path, data);
        };
        Vue.prototype.backToView = function(path){
            this.$root.$children[0].backToView(path);
        };
        Vue.prototype.replaceView = function(path, data){
            this.$root.$children[0].replaceView(path, data);
        };
        Vue.prototype.alert = function(info, callbackfun, btnStr, title){
            this.$root.$children[0].$refs.notification.alert(info, callbackfun, btnStr, title);
        };
        Vue.prototype.confirm = function(info, callbackfun, btnStr, title, showCloseBtn){
            this.$root.$children[0].$refs.notification.confirm(info, callbackfun, btnStr, title, showCloseBtn);
        };
        Vue.prototype.tip = function(info, callbackfun, tipType){
            this.$root.$children[0].$refs.notification.tip(info, callbackfun, tipType);
        };
        Vue.prototype.showLoading = function(info, callbackfun){
            this.$root.$children[0].$refs.notification.showLoading(info, callbackfun);
        };
        Vue.prototype.hideLoading = function(){
            this.$root.$children[0].$refs.notification.hideLoading();
        };
    }
}
