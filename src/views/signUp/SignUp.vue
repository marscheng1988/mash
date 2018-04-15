<template>
    <div class="sign-up-bg">
        <img class="bg" src="../../views/signUp/images/sign-bg.png">
        <div class="empty-d-1"></div>
        <v-input id="phone" type="tel" placeholder="请输入手机号"></v-input>
        <v-input
                id="smsCode"
                phoneId="phone"
                type="smsCode"
                :url="smsCodeUrl"
                placeholder="请输入验证码"></v-input>
        <v-input v-show="invite"
                 id="inviteCode"
                 type="tel"
                 placeholder="输入邀请码可获得20元优惠券(可不填)"></v-input>
        <div @click="signUpPw" class="btn">下一步</div>
        <div class="sign-info">注册后立即获得1000元现金券并享专属权益</div>
    </div>
</template>

<script type="text/ecmascript-6">
    import router from '../../router';
    import axios from 'axios';
    import input from '../../components/input/input';
    import {isNull, isPhone} from '../../static/validate';

    export default {
        data: function(){
            return {
                name: '',
                invite: 0,
                signUpUrl: CTX_URL + '/index/signUp',
                signUpPW: CTX_URL + '/index/signUpPW',
                smsCodeUrl: CTX_URL + '/index/sms/api/member/'
            }
        },
        created: function () {
            let self = this;
            this.getQuery(true, self.signUpUrl, data => {
                    if(data.status === 1){
                        self.invite = data.data.REGISTER_INVITECODE_USABLE_FLAG - 0;
                    }
            })
        },
        methods: {
            signUpPw: function(){
                let self = this;
                let parent = this.$parent;
                let qs = require('qs');

                let data = {
                    phone: document.getElementById('phone').value,
                    smsCode: document.getElementById('smsCode').value,
                    inviteCode: document.getElementById('inviteCode').value
                };

                console.log(data.phone)
                if(isNull(data.phone)){
                    this.$root.alert('请输入手机号');
                    return;
                }
                if(!isPhone(data.phone)){
                    this.$root.alert('手机号格式错误');
                    return;
                }
                if(isNull(data.smsCode)){
                    this.$root.alert('请输入验证码');
                    return;
                }
                this.save('signUpPw.data', data);

                this.postQuery(true, self.signUpPW,data, data => {
                    if(data.status === 1){
                        self.$root.pushView('/signUpPw');
                    }
                })

            },
        },
        components: {
            'v-input': input,
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/less" lang="less">
    .sign-up-bg{
        position: relative;
        height: 100%;
        width: 100%;
        /*background: url("images/sign-bg.png") center no-repeat;*/
        /*background-size: cover;*/
    }
    .bg{
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: 0;
        left: 0;
    }
    .empty-d-1{
        position: relative;
        height: 2.2rem;
    }
    .btn{
        position: relative;
        margin: 1.1rem .3rem .3rem;
        width: 5.8rem;
        text-align: center;
        height: .8rem;
        line-height: .8rem;
        font-size: .26rem;
        background: rgba(255,255,255,.6);
    &:active{
         background: rgba(255,255,255,.4);
     }
    }
    .sign-info{
        position: relative;
        height:.24rem;
        line-height: .24rem;
        padding: 0 .3rem;
        color: #FFFFFF;
        font-size: .2rem;
        text-align: left;
    }
</style>
