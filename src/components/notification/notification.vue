<style scoped rel="stylesheet/less" lang="less">
    @import "../../assets/css/common.less";

    .fade-enter-active {
        transition: all .25s ease-in-out;
        opacity: 1;
        /*transform: scale(1);*/
    }
    .fade-leave-active {
        transition: all .3s ease-in-out;
        opacity: 0;
    }
    .fade-enter{
        opacity: 0;
        /*transform: scale(2);*/
    }

    .notification{
        position: fixed;
        height:  100%;
        width: 100%;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.6);
        z-index: 9999;
        &.tipPanel{
            background: transparent;
        }
        >.n-body{
            position: fixed;
            width: 80%;
            max-width: 300px;
            top: 50%;
            left: 50%;
            background: #fff;
            border-radius: 3px;
            z-index: 9999;
            transform: translate3d(-50%,-50%, 0);
            >.n-title{
                position: relative;
                padding: .4rem 0 0;
                text-align: center;
                font-size: .26rem;
                color: @color-33;
                font-weight: bold;
                line-height: .28rem;
            }
            >.content{
                position: relative;
                >.n-info{
                    position: relative;
                    padding: .1rem .4rem 0 .45rem;
                    font-size: .24rem;
                    line-height: .26rem;
                    color: @color-33;
                    text-align: center;
                    &:first-child{
                        padding-top: .4rem;
                    }
                    &:last-child{
                        padding-bottom: .4rem;
                    }
                }
            }

            >.n-btn-group{
                position: relative;
                height: .8rem;
                .box-flex;
                .border-1px-top();
                >.n-btn{
                    position: relative;
                    height: 100%;
                    line-height: .8rem;
                    text-align: center;
                    font-size: .26rem;
                    color: @color-33;
                    /*font-weight: bold;*/
                    background: transparent;
                    .box-flex-1;
                    &:nth-child(2){
                        border-left: 1px solid @color-e4;
                    }
                }
            }
            .close-btn{
                position: absolute;
                top: 0;
                right: 0;
                height: .4rem;
                width: .4rem;
                background-position: center;
                background-repeat: no-repeat;
                background-image: url(close.png);
                background-size: 50%;
            }
        }
        .black-tip{
            position: fixed;
            top: 50%;
            left: 50%;
            margin: -0.88rem 0 0 -1.7rem;
            //  height: 156/64rem;
            width: 3.4rem;
            box-sizing: border-box;
            padding: 0.2rem 0;
            text-align: center;
            background-color: #000;
            color: #fff;
            z-index: 9999;
            border-radius: 2px;
            >i{
                display: block;
                height: 0.5rem;
                margin: 0.1rem;
                font-size: 0.5rem;
                background-position: center;
                background-repeat: no-repeat;
                background-size: 0.5rem 0.5rem;
                &.yes{
                    background-image: url(yes.png);
                }
                &.no{
                    background-image: url(no.png);
                }
            }
            >span{
                display: block;
                font-size: 14px;
                margin: 0.1rem;
            }
        }
        .black-loading{
            position: fixed;
            top: 50%;
            left: 50%;
            margin: -0.88rem 0 0 -1.4rem;
            height: 1.56rem;
            width: 2.8rem;
            box-sizing: border-box;
            padding: 0.2rem 0;
            text-align: center;
            background-color: rgba(0,0,0,0.6);
            color: #fff;
            z-index: 9999;
            border-radius: 5px;
            >i{
                display: block;
                height: 0.64rem;
                margin: 0.1rem;
                background: url("loading.gif") center no-repeat;
                background-size: 0.64rem 0.64rem;
            }
            >span{
                display: block;
                font-size: 14px;
                margin: 0.1rem;
            }
        }
    }
.scrollTest{
    position: fixed;
    top: 50%;
    left: 50%;
    height: 60%;
    width: 80%;
    margin: -40%;
    background: #fff;
    overflow:scroll;
    ul li{
        width: 100%;
        height:1rem;
    }
}
</style>

<template>
    <transition name="fade" >
        <div class="notification" :class="{ tipPanel : type === 'tip'|| type === 'loading'}"  @click.prevent >

            <div v-if="type === 'alert'"  class="n-body">
                <div v-show="title" class="n-title">{{title?title: ''}}</div>
                <div v-show="info" class="content">
                    <div v-if="contentType === 'text'? true: false" class="n-info" v-text="info">{{info}}</div>
                    <div v-if="contentType === 'html'? true: false" class="n-info" v-html="info">{{info}}</div>
                </div>
                <div class="n-btn-group">
                    <button @click="btnClick" class="n-btn">{{btnStr?btnStr:'确定'}}</button>
                </div>
            </div>

            <div v-if="type === 'confirm'" class="n-body">
                <div v-show="title" class="n-title">{{title}}</div>
                <div v-show="info" class="content">
                    <div v-if="contentType === 'text'? true: false" class="n-info" v-text="info">{{info}}</div>
                    <div v-if="contentType === 'html'? true: false" class="n-info" v-html="info">{{info}}</div>
                </div>
                <div class="n-btn-group">
                    <button @click="btnClick" class="n-btn" data-index="0">{{btnStr?btnStr.split(',')[0]:'取消'}}</button>
                    <button @click="btnClick" class="n-btn" data-index="1">{{btnStr?btnStr.split(',')[1]:'确定'}}</button>
                </div>
                <div v-if="showCloseBtn" @click="hideConfirm" class="close-btn"></div>
            </div>
            <!--<div v-if="type === 'tip'"  class="black-tip" >-->
                <!--<i v-if="icontype" id="tip-icon" :class="icontype"></i>-->
                <!--<span v-if="contentType === 'text'? true: false" class="tipText" v-text="info"></span>-->
                <!--<span v-if="contentType === 'html'? true: false" class="tipText" v-html="info"></span>-->
            <!--</div>-->
            <div v-if="type === 'loading'" class='black-loading'>
                <i class='iconfont' id='loading-icon'></i>
                <span v-if="contentType === 'text'? true: false" v-text="info" class='loadingText'>{{info}}</span>
                <span v-if="contentType === 'html'? true: false" v-html="info" class='loadingText'>{{info}}</span>
            </div>
            <div class="scrollTest" @touchmove="subTouchmove">
                <ul><li>111</li><li>111</li><li>111</li><li>111</li><li>111</li><li>111</li><li>111</li><li>111</li><li>111</li><li>111</li><li>111</li></ul>
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    import input from '../../components/input/input';
    export default {
        name: 'notification',
        data: function(){
            return {
                show: false,    //boolean true:显示, false:不显示
                type: 'alert',      //String alert; confirm; tip;
                title: '温馨提示',      //String 标题
                info: '你快乐吗?',      //String 提示信息
                btnStr: '我很快乐!',    //String 按钮文字信息，多个按钮时用','隔开 例如 '取消,确定'
                icontype: '',      //String tip的图标可以配置，yes，no分别需要对应的图标资源
                contentType: 'text', //String : text/html 提示信息的类型
                callback: (index) =>{   //function 点击按钮时的回调方法，type为'confirm'时，index表示按钮的顺序 0,1
                    console.log('notification index = ' + index);
                }
            }
        },
        mounted(){

            document.getElementsByTagName('html')[0].style.overflow = "hidden";
            document.getElementsByTagName('body')[0].style.height = "100%";
            document.getElementsByTagName('body')[0].style.overflow = "hidden";
//            window.addEventListener('touchmove',function(e){
//                e.preventDefault()
//            })
        },
        methods:{
            subTouchmove (e) {
//                window.addEventListener('touchmove',function(E){
//                    E.preventDefault()
//                })
//                e.target.addEventListener('touchmove')
            },
            setContentType: function(info){
                if(info && info.indexOf('<') > -1 && info.indexOf('>') > -1){
                    this.contentType = 'html';
                }else {
                    this.contentType = 'text';
                }
            },
            hideConfirm: function(){
                this.show = false;
            },
            btnClick: function(e){
                let index = e.currentTarget.getAttribute('data-index');
                this.show = false;
                if(typeof this.callback === 'function'){
                    this.callback(index);
                }
                setTimeout(function(){
                    this.info = '';
                    this.btnStr = '';
                    this.callback = '';
                    this.title = '';
                }, 300)
            },
            alert: function(info, callbackfun, btnStr, title){
                this.type = 'alert';
                this.info = info;
                this.callback = callbackfun;
                this.title = title;
                this.btnStr = btnStr;
                this.setContentType(info);
                this.show = true;
            },
            confirm: function(info, callbackfun, btnStr, title, showCloseBtn){
                this.type = 'confirm';
                this.info = info;
                this.callback = callbackfun;
                this.title = title;
                this.btnStr = btnStr;
                this.setContentType(info);
                this.showCloseBtn = showCloseBtn?true:false;
                this.show = true;
            },
            tip: function(info ,callbackfun,icontype){
                console.log('tip-' + icontype + ': ' + info);
                this.type = 'tip';
                this.info = info;
                this.icontype = icontype === undefined ? '' : icontype;
                this.setContentType(info);
                this.show = true;
                setTimeout(()=>{
                    this.show = false;
                    if(callbackfun) callbackfun()
                },2000)
            },
            showLoading: function(info, callbackfun){
                this.type = 'loading';
                this.info = info === undefined ? 'loading...' : info;
                this.setContentType(info);
                this.show = true;
                this.callback = callbackfun;
            },
            hideLoading: function(){
                this.show = false;
            }

        }
    }
</script>
