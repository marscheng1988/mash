<template>
    <div class="ui-page">
        <div class="ui-page-head" >
            <p>确认密码</p>
        </div>
        <div class="editPanel" >
             <div class="inputArea">
                 <div>
                     <span>新密码</span>
                     <input type="password"  maxlength="13" id="password" placeholder="请输入您的新密码"/>
                 </div>
                 <div>
                     <span >请确认密码</span>
                     <input type="password"  maxlength="13" id="repassword" placeholder="请再次输入新密码"/>
                 </div>
             </div>

            <div class="confirm-button single">
                <div @click="confirmPassword"><span>重置密码</span></div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../../assets/css/common.less";
    .ui-page{
        background: @color-f4;
    }
    .editPanel{
        width:100%;
        .inputArea{
            overflow: hidden;
            margin-top:0.2rem;
            position: relative;
            .border-1px-bottom();
            div{
                position: relative;
                width: 100%;
                height:0.88rem;
                background:#fff;
                .border-1px-top();
                box-sizing: border-box;
                -webkit-box-sizing: border-box;
                padding-right: .3rem;
                input{
                    float: right;
                    text-align: right;
                    width: 60%;
                    height: 0.88rem;
                    font-size: @f-22;
                    background:@color-ff;
                    box-sizing: border-box;
                    padding:0.02rem 0;
                    line-height:0.48rem;
                    &::-webkit-input-placeholder{
                        font-size: @f-22;
                    }

                }
                span{
                    line-height: 0.88rem;
                    font-size: @f-26;
                    float: left;
                    padding:0 0.3rem;
                }

            }
        }

    }
    .confirm-button >div >span{
        font-size: @f-30;
    }
</style>
<script type="text/ecmascript-6">
    import axios from 'axios';
    import router from '../../../../router';
    import {isNull, isLength,isSimple,isSpace} from '../../../../static/validate';
    export default{
        data(){
            return{
            }
        },
        created () {
            document.title="确认密码"
        },
        mounted (){
            this.remove('totalCookieTime');
        },
        methods:{
            confirmPassword () {
                let self = this;
                let password = document.getElementById('password').value;
                let repassword = document.getElementById('repassword').value;
                let phone = this.find('modifyPw.data').phone;
                let smsCode = this.find('modifyPw.data').smsCode;

                if (!isNull(password) && !isNull(repassword) ) {
                    self.postQuery(true,
                                    CTX_URL + '/index/getBackPassWord',
                                    {
                                        'phone':phone,
                                        'smsCode':smsCode,
                                        'password':password,
                                        'rePassword':repassword
                                    },
                                    function (response) {
                                        if (response.status === 1) {
                                            //验证通过
                                            self.$root.tip("修改密码成功",function(){
                                                self.$root.pushView("/myCenter/settingsPage")
                                            })

                //                            setTimeout(function(){
                //                                self.$root.pushView("/myCenter/settingsPage")
                //                            },)

                                        }
                                    })
                }
                else if (isNull(password)) {
                    this.$root.$children[0].$refs.notification.alert('请输入密码');

                }
                else if (isNull(repassword)) {
                    this.$root.$children[0].$refs.notification.alert('请确认密码');

                }
                else if(password !== repassword){
                    self.$root.tip('两次密码不一致')

                }
                else if(isLength(6,16,password)){
                    self.$root.tip('密码长度为6~16位')

                }
                else if(isSimple(password)){
                    self.$root.tip('密码不能过于简单')
                }

            },

        }
    }
</script>
