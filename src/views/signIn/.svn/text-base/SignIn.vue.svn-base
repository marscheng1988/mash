<template>
    <div class="sign-in-bg">
        <img class="bg" src="../../views/signUp/images/sign-bg.png">
        <div class="empty-d-1"></div>
        <v-input id="userCode" type="tel" placeholder="请输入手机号" ref="userCode"></v-input>
        <v-input id="password" type="password" placeholder="请输入密码" ref="password"></v-input>
        <v-input v-show="errorTimes >= 3?true: false" type="imgCode" :url="imgCodeUrl" id="imgCode" placeholder="请输入验证码" ref="imgCode"></v-input>
        <div @click="signUp" class="reg"><span>注册</span></div>
        <div @click="forgetPassword" class="forget-password"><span class="icon"></span><span>忘记密码</span></div>
        <div @click="signIn" class="btn">登录</div>
        <div class="sign-info">登录后立享专属定制权益、会员折扣</div>
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
                loginUrl: CTX_URL + '/index/doLogin',
                errorTimes: 0,
                imgCodeUrl: CTX_URL + '/servlet/validateCodeServlet'
            }
        },
        methods: {
            signUp: function(){
                this.$root.pushView('/signUp');
            },
            signIn: function(){
                let self = this;

                const userCode = this.$refs.userCode.inputValue;
                const password = this.$refs.password.inputValue;
                const imgCode = this.$refs.imgCode.inputValue;

                if(isNull(userCode)){
                    this.alert('请输入手机号');
                    return;
                }
                if(!isPhone(userCode)){
                    this.alert('手机号格式错误');
                    return;
                }
                if(isNull(password)){
                    this.alert('请输入密码');
                    return;
                }

                this.postQuery(true, self.loginUrl, {
                        "userCode": userCode,
                        "password": password,
                        "imgCode": imgCode,
                        "returnUrl": ''
                    }, response => {
                        if(response.status === 1){
                            this.save("loginState","true",0.21);
                            this.backToView(this.$route.query.path)
                        }else if(response.status === 201){
                            this.errorTimes++;
                            if(this.errorTimes > 3){
                                this.$refs.imgCode.inputValue = '';
                                this.$refs.imgCode.changeImgCode();
                            }
                        }
                    })
            },
            forgetPassword: function(){
                this.pushView('/myCenter/settingsPage/modifyPassword');
            }
        },
        components: {
            'v-input': input,
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/less" lang="less">
    .sign-in-bg{
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
        top: 0;
    }
    .empty-d-1{
        position: relative;
        height: 2.2rem;
    }
    .reg{
        position: relative;
        padding: .16rem 0;
        float: left;
        margin: .2rem .3rem;
        height: .24rem;
        color: #FFFFFF;
        font-size: .24rem;
        line-height: .4rem;
    }
    .forget-password{
        position: relative;
        padding: .16rem 0;
        text-indent: 5px;
        float: right;
        margin: .2rem .3rem;
        height: .24rem;
        color: #FFFFFF;
        font-size: .24rem;
        line-height: .4rem;
        .icon{
            margin-right: .1rem;
            margin-top: -.08rem;
            vertical-align: middle;
            display: inline-block;
            height: .24rem;
            width: .24rem;
            background: url("images/forgetIcon.png") center no-repeat;
            background-size: .24rem;
        }
    }
    .btn{
        position: relative;
        margin: 2.26rem .3rem .3rem;
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
