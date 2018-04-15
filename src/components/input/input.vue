<style scoped lang="less">
    .input-container{
        position: relative;
        height: 1.14rem;
        box-sizing: border-box;
        margin: 0 .3rem;
        border-bottom: 1px solid rgba(255,255,255,0.3);
        >input{
             left: .3rem;
             font-size: .2rem;
             height: .8rem;
             width: 4.7rem;
             bottom: 2px;
             position: absolute;
             color: #fff;
             background: transparent;
             border: none;
             padding: 0 .5rem 0 0;
             border-radius: 0;
            -webkit-user-select: text;
            &.img-code-input{
                width: 2.2rem;
            }
            &.sms-code{
                width: 3.4rem;
             }
            &::-webkit-input-placeholder{
                 color: #fff;
             }
        }
    }
    .sms-code-btn{
        position: absolute;
        height: .5rem;
        width: 1.3rem;
        font-size: .2rem;
        line-height: .5rem;
        text-align: center;
        color: #FFFFFF;
        right: 0;
        bottom: .21rem;
        border: 1px solid #FFFFFF;
    }
    .input-clear-btn{
        position: absolute;
        height: .5rem;
        width: .5rem;
        right: .2rem;
        top: 60%;
        margin-top: -.25rem;
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUI2NTdFMDA4MDk2MTFFNkFCMTBCNTQ3MjY3OTY3NkMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUI2NTdFMDE4MDk2MTFFNkFCMTBCNTQ3MjY3OTY3NkMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5QjY1N0RGRTgwOTYxMUU2QUIxMEI1NDcyNjc5Njc2QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5QjY1N0RGRjgwOTYxMUU2QUIxMEI1NDcyNjc5Njc2QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjTx4xIAAAHhSURBVHjatJW5SwNREMYTlVgFCxsPPDrtPSMEgmDpbVJqIUYbG63MH6BWnoUQRay9r0bBmEYLUQQPVLAQD6yjlYrEb+B7y3PZl5jCgR/svp353jHzZt3JZNL1H+YW4Wg06vTNA9qIDxSBT/AMzsEG2OLYLwuHw64sw4Tt4Br0gzhoAl6QD5o5NkCfDieBHNt7NhgFLaCPAna7J7LNAJgDdSACvpWTfcUiWk/H+B+OUnxq6T+qf9CFu0ArV/uWQZ7etbguu7AkagL0ggTHGpg0k5WCIJ8TjJ2kliUsDnfgSAv0MvM+g+ghKNDGjsEtCOnCUlLLtuA90OMgrkSnwKwtZplalnANnV1pxFOJisVAtV5usqVHw1kq8W1ehnGDqNgTKNRXLAG5KRJ1A7547qd/KRUl/AqKDT5l3P4Yk7yRolpKqGUJXwC/QTSmnakpocoa1Y6U8KYqEwfRaduZphIPUcsSXgEVvBTKqig6Y0hot3RHbUwmqaSWVRWSvGGwQAe5Setp8rOvPeeBRTAEPuy9QmbaZY/1ZtArvIzZUat16m4j4BKcsCWmswB9rxhr7MfSTwdBJ5gHD7ymByx+D0vKz0SVU3A1XaNXtsatBfk3iWh1/gLOwBK3/mn85/2H/QgwANVVeF7Ls2yjAAAAAElFTkSuQmCC") center no-repeat;
        background-size: 60%;
        &.sms-code{
            right: 1.5rem;
        }
        &.img-code-clear{
            right: 2.2rem;
        }
    }
    .img-code{
        position: absolute;
        height: .7rem;
        width: 1.6rem;
        right: .6rem;
        bottom: .13rem;
    }
    .change-img-code{
        position: absolute;
        right: 0;
        height: .8rem;
        line-height: .8rem;
        font-size: .18rem;
        bottom: 0;
        text-align: right;
        color: #FFFFFF;
        text-decoration-line: underline;
    }
</style>

<template>
    <div class="input-container">

        <input v-if="type === 'tel'" type="tel" @input="inputF" v-on:focus="focusF" :id="id"   :placeholder="placeholder" v-model="inputValue" />

        <input v-if="type === 'text'" type="text" @input="inputF" v-on:focus="focusF" :id="id" :placeholder="placeholder" v-model="inputValue" />

        <input v-if="type === 'number'" type="number" @input="inputF" v-on:focus="focusF" :id="id" :placeholder="placeholder" v-model="inputValue" />

        <input v-if="type === 'password'" type="password" @input="inputF" v-on:focus="focusF" :id="id" :placeholder="placeholder" v-model="inputValue" />

        <input v-if="type === 'smsCode'" class="sms-code" type="tel" @input="inputF" v-on:focus="focusF" :id="id" :placeholder="placeholder" v-model="inputValue" phone="phoneId" />
        <div v-if="type === 'smsCode'" class="sms-code-btn" @click="getSmsCode">{{getBtnInfo}}</div>

        <div :class="{
            'input-clear-btn': true,
            'sms-code': type === 'smsCode'?true: false,
            'img-code-clear': type === 'imgCode'?true: false,
        }" v-show="showClearbtn" @click="clean"></div>

        <input v-if="type === 'imgCode'" class="img-code-input" type="tel" @input="inputF" v-on:focus="focusF" :id="id" :placeholder="placeholder" v-model="inputValue" />
        <img v-if="type === 'imgCode'" id="imgCode" class="img-code" :src="getImgCodeUrl">
        <div v-if="type === 'imgCode'" class="change-img-code" @click="changeImgCode">换一张</div>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios';
    import {isNull, isPhone} from '../../static/validate';
    export default {
        props:[
            'id',
            'type',
            'placeholder',
            'value',
            'phoneId',
            'url'
        ],
        data: function(){
            return {
                inputValue: this.$props.value,
                active: false,
                hasValue: false,
                seconds: 60,
                info: '获取验证码',
                countdown:'',
                time: new Date().getTime(),
            }
        },
        computed: {
            showClearbtn: function() {
                return (this.active && this.hasValue)
            },
            getBtnInfo: function(){
                if(this.seconds === 60){
                    return this.info
                }else{
                    return this.seconds + 'S';
                }
            },
            getImgCodeUrl: function(){
                return this.url + '?time=' + this.time;
            }
        },
        methods:{
            clean: function(){
                this.inputValue = '';
                document.getElementById(this.$props.id).focus()
                this.hasValue = false;
            },
            inputF: function (e){
                this.active = true;
                this.hasValue = e.target.value?true:false
            },
            focusF: function (e){
                this.active = true;
                this.hasValue = e.target.value?true:false
                document.getElementsByTagName('body')[0].style.height = document.body.clientHeight+'px';
            },
            getSmsCode: function(){
                var self = this;
                let phone = document.getElementById(this.$props.phoneId).value;

                if(!isNull(phone) && isPhone(phone) ){
                    this.$root.getQuery(true, this.$props.url + phone, data => {
                        if(data.status === 1){
                            self.$root.tip('验证码发送成功!', '', 'yes');
                            self.countdown = setInterval(function(){
                                if(self.seconds > 0){
                                    self.seconds--;
                                }else{
                                    self.seconds = 60;
                                    clearInterval(this.countdown)
                                }
                            }, 1000)
                        }else{
                            self.$root.tip('验证码发送失败!', '', 'no');
                        }

                    } )
                }else if(isNull(phone)){
                    this.$root.tip('请输入手机号', '', 'no');
                }else if(!isPhone(phone)){
                    this.$root.tip('手机号格式错误', '', 'no');
                }
            },
            changeImgCode: function(){
                this.time = new Date().getTime();
            }
        }
    }
</script>
