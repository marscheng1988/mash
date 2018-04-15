<template>
    <div>
        <scroller lock-x
                  scrollbarY
                  ref="scroller">
            <div>
                <div class="head-bg">
                    <div class="success-icon"></div>
                    <div class="success-info">订单支付完成</div>
                    <div class="price">￥{{totalPrice.toFixed(2)}}</div>
                </div>
                <div class="pay-line"></div>
                <div class="pay-mode">
                    <div class="pay-note">{{note}}</div>
                    <div class="pay-item">
                        <span class="title">订单编号:</span>
                        <span class="info">{{data.orderNo}}</span>
                    </div>
                    <div class="pay-item">
                        <span class="title">下单时间:</span>
                        <span class="info">{{data.createDate}}</span>
                    </div>
                    <div class="pay-item" v-if="data.receiveAreaStr">
                        <span class="title">收货地址:</span>
                        <span class="info">{{data.receiveAreaStr + data.receiveAreaDetail}}</span>
                    </div>
                    <div class="btn-list">
                        <div class="btn" @click="showDetail">订单详情</div>
                        <div class="btn" @click="showIndex">回到首页</div>
                    </div>
                    <div class="mode-line"></div>
                    <div class="pay-warn">{{warn}}</div>
                </div>
                <div class="pay-line"></div>
                <recommend :list="recommendList"></recommend>
            </div>
        </scroller>
    </div>

</template>
<script type="text/ecmascript-6">
    //import HeaderComponent from '../../views/'
    import recommend from '../../components/recommend/recommend.vue';
    import {Scroller} from 'vux'
    export default{
        props: [

        ],
        data(){
            return {
                data: this.find('payData') || {},
                note: '如果对体验商品满意，可在体验订单内进行购买，体验中购买还享受限时7.5折优惠！',
                warn: '体验订单结束后请尽快进行购买或寄回物品，以免产生不必要的费用，体验期间进行购买更有优惠哦！',
                recommendList: [],
                totalPrice: 0.00,
            }
        },
        methods: {
            requestRecommendData () {
                this.getQuery(false,CTX_URL + '/index/collocation/recommend',response => {
                    if(response.status === 1){
                        this.recommendList =  response.data;
                    }
                })
            },
            showDetail: function(){
                console.log('orderId = ' + this.data.id);
                let type = this.data.type;
                if(type === '1' || type === '2'){
                    this.pushView('/myCenter/orderDetail',{
                        experienceOrderId: this.data.id,
                    });
                }else{
                    this.pushView('/myCenter/orderDetail',{
                        buyOrderId: this.data.id,
                    });
                }
            },
            showIndex: function(){
                this.backToView('/');
            }
        },
        created(){
            this.requestRecommendData();
            let payData = this.find('payData') || {};

            /**下方的switch代码与pay.vue页面里的判断需要保持一致*/
            switch (payData.type) {
                case '1':   //体验单
                    this.totalPrice = payData.moneyTotal;
                    break;
                case '2':   //预约体验单
                    if(pageData.statusPay === '3'){ //待付尾款
                        this.totalPrice = payData.moneyTotal - payData.moneyAppoint - payData.moneyAppointService;
                    }else { //待付定金
                        this.totalPrice = payData.moneyAppoint + payData.moneyAppointService;
                    }
                    break;
                case '3':   //购买单
                    this.totalPrice = payData.moneyTotal;
                    break;
                case '4':   //预约购买单
                    this.totalPrice = payData.moneyTotal;
                    break;
            }
            console.log(payData.moneyTotal, payData.moneyAppoint, payData.moneyAppointService, this.totalPrice);

        },
        updated:function(){
            this.$nextTick(() => {
                if(this.$refs.scroller) this.$refs.scroller.reset();
            });
        },
        computed: {

        },
        components:{
            recommend,
            Scroller,
        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/css/common.less";
    .head-bg{
        position: relative;
        height: 3.55rem;
        width: 100%;
        background: url("images/pay-success-bg.png") center no-repeat;
        background-size: cover;
        >.success-icon{
            position: absolute;
            left: 2.9rem;
            width: .6rem;
            height: .6rem;
            top: 1rem;
            background: url("images/pay-success.png") center no-repeat;
            background-size: contain;
        }
        >.success-info{
            position: absolute;
            top: 1.8rem;
            height: .32rem;
            width: 100%;
            text-align: center;
            font-size: .3rem;
            line-height: .32rem;
            color: @color-ff;
        }
        >.price{
            position: absolute;
            top: 2.32rem;
            height: .32rem;
            width: 100%;
            text-align: center;
            font-size: .24rem;
            line-height: .28rem;
            color: @color-ff;
        }
    }
    .pay-line{
        position: relative;
        height: .2rem;
        width: 100%;
        background: @color-f4;
    }
    .pay-mode{
        position: relative;
        .border-1px-bottom();
        >.pay-note{
            position: relative;
            padding: .24rem .3rem .29rem .3rem;
            line-height: .36rem;
            font-size: .24rem;
            color: @color-gold-dark;
        }
        >.pay-item{
            position: relative;
            line-height: .22rem;
            padding: .15rem .3rem;
            >.title{
                line-height: .22rem;
                font-size: .2rem;
                color: @color-33;
            }
            >.info{
                line-height: .22rem;
                font-size: .2rem;
                color: @color-99;
            }
        }
        .btn-list{
            position: relative;
            height: .7rem;
            margin-top: .35rem;
            >.btn{
                position: relative;
                display: inline-block;
                margin-left: .8rem;
                height: .5rem;
                padding: 0 .5rem;
                border: 1px solid @color-33;
                border-radius: .5rem;
                line-height: .5rem;
                text-align: center;
            }
        }
        .mode-line{
            position: relative;
            width: 5.8rem;
            margin-left: .3rem;
            height: 0;
            .border-1px-bottom();
        }
        >.pay-warn{
            position: relative;
            padding: .14rem .3rem .24rem .3rem;
            line-height: .3rem;
            font-size: .18rem;
            color: @color-error;
        }
    }
</style>