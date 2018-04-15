<template>
    <div class="sign-up-bg">
        <img class="bg" src="../../views/signUp/images/sign-bg.png">
        <div class="empty-d-1"></div>
        <v-input id="password" type="password" placeholder="请输入密码" ref="password"></v-input>
        <v-input id="rePassword" type="password" placeholder="请确认密码" ref="rePassword"></v-input>
        <div @click="signUpPw" class="btn">提交</div>
        <div class="sign-info">注册后立即获得1000元现金券并享专属权益</div>
    </div>
</template>

<script type="text/ecmascript-6">
    import router from '../../router';
    import axios from 'axios';
    import input from '../../components/input/input';
    export default {
        data: function(){
            return {
                name: '',
                finishRegist: CTX_URL + '/index/finishRegist',
            }
        },
        methods: {
            signUpPw: function(){
                let self = this;
                let params = this.find('signUpPw.data');
                let password = this.$refs.password.inputValue;
                let rePassword = this.$refs.rePassword.inputValue;

                if(!password){
                    this.$root.tip('请输入密码', '' , 'no');
                    return;
                }
                if(!rePassword){
                    this.$root.tip('请确认密码', '' , 'no');
                    return;
                }
                if(password !== rePassword){
                    this.$root.tip('密码不一致!', '' , 'no');
                    return;
                }
                params.password = password;
                params.rePassword = rePassword;

                this.postQuery(true, self.finishRegist, params, data=>{
                    if(data.status === 1){
                        this.save("loginState","true");
                        self.backToView('/');
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
