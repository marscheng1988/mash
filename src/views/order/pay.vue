<template>
    <div class="pay-page">
        <div class="pay-line"></div>
        <div class="pay-item">
            <div class="title">订单金额</div>
            <div class="content">￥{{totalPrice.toFixed(2)}}</div>
        </div>
        <div class="pay-line"></div>
        <div class="pay-item" @click="chooseZf">
            <div class="icon zf"></div>
            <div class="icon-title">余额支付</div>
            <div class="icon-info gold">当前周范账户余额￥{{yue.toFixed(2)}}</div>

            <check-box class="radio"
                       :selected="payType === 'zf'"
            >
            </check-box>
        </div>
        <div class="pay-line"></div>
        <div class="pay-item">
            <div class="title">第三方支付</div>
        </div>
        <div class="pay-item" @click="chooseWx">
            <div class="icon wx"></div>
            <div class="icon-title">微信支付</div>
            <div class="icon-info">亿万用户的选择，更快更安全</div>
            <check-box class="radio"
                       :selected="payType === 'wx'"
            >
            </check-box>
        </div>
        <div v-if="disable" class="error-info">账户余额不足，无法完成支付，请选择其他支付方式或先对账户进行充值！</div>
        <div :class="{'pay-btn': true, disable: disable}" @click="goPay">去支付</div>

    </div>
</template>
<script type="text/ecmascript-6">
    import CheckBox from '../../components/checkBox/checkBox.vue'

    export default{
        props: [

        ],
        data(){
            return {
                payData: '',
                error: true,
                payType: 'zf',
                disable: false,
                totalPrice: 0,
                yue: 0,
                experienceOrderId: null,
            }
        },
        methods: {
            chooseZf(){
                this.payType = 'zf';
            },
            chooseWx(){
                this.payType = 'wx';
            },
            goPay: function(){
                if(this.error){
                    return;
                }
                this.postQuery(true, CTX_URL + '/index/member/order/pay/experienceOrder', {
                    experienceOrderId: this.experienceOrderId
                }, data=>{
                    let payParams = {
                        "appId":data.data.appId,     //公众号名称，由商户传入
                        "timeStamp":data.data.timeStamp, //时间戳，自1970年以来的秒数
                        "nonceStr":data.data.nonceStr, //随机串
                        "package":data.data.packageId,
                        "signType":data.data.signType,         //微信签名方式：
                        "paySign":data.data.paySign //微信签名
                    };
                    console.log('获取支付参数成功');
                    console.log(payParams);

                    let self = this;

                    function onBridgeReady(){
                        WeixinJSBridge.invoke(
                                'getBrandWCPayRequest', payParams,
                                function(res){
                                    if(res.err_msg == "get_brand_wcpay_request:ok" ) {    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                                        console.log('支付成功');
                                        console.log(res);

                                        //let payData = self.find('payData');
                                        //self.save('paySuccessData', payData);
                                        self.replaceView('/paySuccess');
                                    }
                                }
                        );
                    }
                    if (typeof WeixinJSBridge == "undefined"){
                        if( document.addEventListener ){
                            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                        }else if (document.attachEvent){
                            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                        }
                    }else{
                        onBridgeReady();
                    }

                })
            },

        },
        created(){
            let payData = this.find('payData');

            let url = CTX_URL + '/index/member/experienceOrder/detail?experienceOrderId=' + payData.id;
            if(payData.type === '3' || payData.type === '4'){
                url = CTX_URL + '/index/member/buyOrder/detail?buyOrderId=' + payData.id;
            }
            this.getQuery(true, url, data => {
                if(data.status === 1){
                    payData = data.data;
                    this.payData = payData;
                    this.save('payData',payData);

                    this.error = false;

                    /**下方的switch代码与paySuccess.vue页面里的判断需要保持一致*/
                    switch (payData.type) {
                        case '1':   //体验单
                            this.totalPrice = payData.moneyTotal;
                            break;
                        case '2':   //预约体验单
                            if(payData.statusPay === '3'){ //待付尾款
                                this.totalPrice = payData.moneyTotal - payData.moneyAppoint - payData.moneyAppointService;
                                console.log(payData.moneyTotal,payData.moneyAppoint,payData.moneyAppointService)
                            }else { //待付定金
                                this.totalPrice = payData.moneyAppoint + payData.moneyAppointService;
                                console.log(payData.moneyTotal,payData.moneyAppoint,payData.moneyAppointService)
                            }
                            break;
                        case '3':   //购买单
                            this.totalPrice = payData.moneyTotal;
                            break;
                        case '4':   //预约购买单
                            this.totalPrice = payData.moneyTotal;
                            break;
                        default:
                            this.totalPrice = 100;
                            break;
                    }

                    this.experienceOrderId = payData.id;
                }
            })
        },
        computed: {

        },
        components:{
            CheckBox,
            //imgUpload,
        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/css/common.less";
    .pay-page{
        background: @color-f4;
        height: 100%;
    }
    .pay-line{
        position: relative;
        height: .2rem;
        width: 100%;
        background: @color-f4;
    }
    .pay-item{
        position: relative;
        width: 100%;
        height: .88rem;
        background: @color-ff;
        .border-1px-bottom();
        &:active{
            background: darken(@color-ff, 10%);
        }
        >.title{
            position: absolute;
            height: 100%;
            left: 0;
            line-height: .88rem;
            font-size: .26rem;
            color: @color-33;
            padding-left: .3rem;
        }
        >.content{
            position: absolute;
            height: 100%;
            right: 0;
            line-height: .88rem;
            font-size: .26rem;
            color: @color-gold-dark;
            padding-right: .3rem;
        }
        .icon{
            position: absolute;
            height: .5rem;
            width: .5rem;
            top: .22rem;
            left: .3rem;
            background-size: 100%;
            background-position: center;
            &.zf{
                background-image: url("images/zf.png");
            }
            &.wx{
                background-image: url("images/wx.png");
            }
        }
        .icon-title{
            position: absolute;
            left: 1.1rem;
            top: .22rem;
            font-size: .22rem;
            color: @color-33;
            line-height: .22rem;
        }
        .icon-info{
            position: absolute;
            top: .54rem;
            left: 1.1rem;
            font-size: .16rem;
            color: @color-99;
            line-height: .16rem;
            &.gold{
                color: @color-gold-dark;
            }
        }
        .radio{
            right: .14rem;
            top: .14rem;
        }
    }
    .error-info{
        position: relative;
        padding: .2rem .3rem;
        color: @color-error;
        font-size: .18rem;
        line-height: .2rem;
    }
    .pay-btn{
        position: fixed;
        bottom: 0;
        text-align: center;
        width: 100%;
        height: .98rem;
        background: @color-33;
        font-size: .26rem;
        line-height: .98rem;
        color: @color-ff;
        &.disable{
            background: @color-99;
            &:active{
                background: @color-99;
            }
        }
        &:active{
            background: darken(@color-33, 10%);
        }
    }
</style>
