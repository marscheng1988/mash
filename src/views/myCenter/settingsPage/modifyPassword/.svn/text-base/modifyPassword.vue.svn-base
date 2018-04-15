<template>
    <div class="ui-page">
        <div class="ui-page-head" >
            <p>修改密码</p>
        </div>
        <div class="editPanel" >
             <div class="inputArea">
                 <div>
                     <input type="tel"  maxlength="13" v-model="phoneNum" id="phone" placeholder="请输入您的手机号码"/>
                     <span>手机号</span>
                 </div>
                 <div>
                     <input type="text" id="smsCode" maxlength="6" placeholder="请输入6位验证码"/>
                     <span class="verif" @click="getSmsCode">{{info}}</span>
                 </div>
             </div>

            <div class="confirm-button single">
                <div @click="next"><span>下一步</span></div>
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
            position: relative;
            .border-1px-bottom();
            overflow: hidden;
            margin-top:0.2rem;
            div{
                position: relative;
                width: 100%;
                height:0.88rem;
                background:#fff;
                .border-1px-top();
                input{
                    float: left;
                    width: 50%;
                    height: 0.88rem;
                    font-size: @f-26;
                    background:@color-ff;
                    box-sizing: border-box;
                    padding:0.02rem 10px;
                    line-height:0.48rem;
                    &::-webkit-input-placeholder{
                        font-size: @f-22;
                    }
                }
                span{
                    line-height: 0.88rem;
                    font-size: @f-26;
                    float: right;
                    padding:0 0.3rem;
                    &.verif{
                        color: @color-gold-dark;
                    }
                }

            }
        }

    }

</style>
<script type="text/ecmascript-6">
    import axios from 'axios';
    import router from '../../../../router';
    import {isNull, isPhone} from '../../../../static/validate';
    export default{
        data(){
            return{
                seconds:60,
                info: '获取验证码',
                counted:false,
                countdown:'',
                phoneNum:'',
                loginStates:false,
                questUrl:'',
                countFuncs:''
            }
        },
        created () {
            let self = this;
            axios.get(CTX_URL + '/index/member/info')
                .then((response) => {
                    console.log(response)
                    if(response.data.status == 21){
                        self.loginStates = false
                    }else if(response.data.status == 1){
                        self.loginStates = true
                    }else {
                        self.tipStatus(response.data.status);
                    }

                })
                .catch((error) => {
                    console.log(error)
                })
        },
        mounted (){
            if(this.find("totalCookieTime") !== ""){
                this.setSmsCodeTime();
            }
            if(this.find("phoneNum") !== ""){
                this.phoneNum = this.find("phoneNum")
            }

        },
        computed: {
            getBtnInfo: function(){
                if(this.seconds === 60){
                    return this.info
                }else{
                    return this.seconds + 'S';
                }

            }
        },
        beforeDestroy () {
            this.remove('totalCookieTime');
        },
        methods:{
            next () {
                var self = this;
                let phone = document.getElementById('phone').value;
                let smsCode = document.getElementById('smsCode').value;
                clearTimeout(self.countFuncs);
                if (!isNull(phone) && isPhone(phone) && !isNull(smsCode)) {
                    self.$root.postQuery(true,
                                        CTX_URL + '/index/forgetPWset',
                                        {
                                            'phone':phone,
                                            'smsCode':smsCode
                                        }
                                        ,function (response) {
                                            if (response.status === 1) {
                                                //验证通过
                                                self.remove('totalCookieTime');
                                                self.save('modifyPw.data', {
                                                    phone:phone,
                                                    smsCode:smsCode
                                                });
                                                self.$root.pushView("modifyPassword2");
                                            }
                                        })
                }
                else if (isNull(phone)) {
                    this.alert('请输入手机号');

                }
                else if (!isPhone(phone)) {
                    this.alert('手机号格式错误');
                }

            },
            getSmsCode: function() {
                let self = this;
                let phone = self.phoneNum;

                if(self.counted) return;

                this.save("phoneNum", phone);

                if (!isNull(phone) && isPhone(phone)) {
                    self.$root.getQuery(true,
                                        CTX_URL + '/index/sms/api/password/'+phone,
                                        function (response) {
                                            if (response.status === 1) {
                                                self.setSmsCodeTime ()
                                            }
                                        })
                }
                else if (isNull(phone)) {
                    this.$root.$children[0].$refs.notification.alert('请输入手机号');

                }
                else if (!isPhone(phone)) {
                    this.$root.$children[0].$refs.notification.alert('手机号格式错误');
                }
            },
            setSmsCodeTime () {
                let time = 0;
                let self =this;
                let totalCookieTime = this.find("totalCookieTime");
                let nowtime1 = Date.parse(new Date());
                let totalTime =nowtime1 + self.seconds*1000;

                if(totalCookieTime === ""){
                    self.save("totalCookieTime", totalTime);
                    self.info = "获取验证码";
                    time =parseInt((totalTime-nowtime1)/1000);

                } else {
                    time =parseInt((totalCookieTime-nowtime1)/1000);
                }

                time--;
                self.counted = true;
                self.info = time + "秒后重新获取" ;

                //过1秒递归调用times()函数
                self.countFuncs = setTimeout(self.setSmsCodeTime, 1000);

                if ( time <= 0 ){

                    //删除递归调用函数
                    clearTimeout(self.countFuncs);
                    self.info = "重新获取";
                    self.counted = false;

                    //删除Cookie中的值
                    self.remove("phoneNum");
                    self.remove("totalCookieTime");
                    return
                }


            }
        },

    }
</script>
