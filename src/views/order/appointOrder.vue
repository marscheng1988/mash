<template>
    <div class="order-page">
        <scroller lock-x
                  scrollbarY
                  :height="getHeight"
                  ref="scroller">
            <div>
                <div class="ui-page-head"><p>订单确认</p></div>
                <c-address
                        :address="address"
                        v-if="type === 'order'"
                        ref="address"
                ></c-address>
                <div v-if="type !== 'order'" class="order-info">先行支付商品价值的5%作为预约定金，接到商品到货通知后请在48小时内登录平台完成体验订单，否则订单将被取消，定金不予退还！</div>
                <div v-if="type !== 'order'" class="time-mode">
                    <div class="title">预约时间选择</div>
                    <div v-if="!chooseTime" class="time-info">
                        <span>预计到货时间</span>
                        <span class="time-str">{{appointDate}}</span>
                    </div>
                    <div v-if="chooseTime" class="time-info">
                        <span v-if="!appointDate">发货需2-3天请您提前预定！</span>
                        <span v-if="appointDate">您选择的时间为</span>
                        <span class="time-str">{{appointDate}}</span>
                    </div>
                    <div v-if="chooseTime" class="choose-time-btn" @click="chooseDate">{{appointDate?'重新选择时间':'选择体验时间'}}</div>
                </div>

                <div class="order-line"></div>

                <c-good v-for="item of pageData.experienceProduceList"
                        :item="item"
                        key="item.id"
                ></c-good>
                <div class="order-line"></div>

                <div class="price-list" v-if="type !== 'order'">
                    <div class="item" >
                        <div class="title">预约服务费</div>
                        <div class="content">
                            <span class="left">￥{{pageData.moneyAppointService? pageData.moneyAppointService.toFixed(2): ''}}</span>
                            <span class="right">￥{{pageData.moneyAppointServiceActual? pageData.moneyAppointServiceActual.toFixed(2): '0.00'}}</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">支付定金</div>
                        <div class="content">
                            <span class="left"></span>
                            <span class="right">￥{{pageData.moneyAppoint? pageData.moneyAppoint.toFixed(2): '0.00'}}</span>
                        </div>
                    </div>
                    <div class="bottom-info">支付定金作为预定依据，到货后再支付全款完成下单！</div>
                </div>

                <div class="price-list" v-if="type === 'order'">
                    <div class="item" >
                        <div class="title">预约服务费</div>
                        <div class="content">
                            <!--<span class="left">￥{{pageData.moneyAppointService? pageData.moneyAppointService.toFixed(2): ''}}</span>-->
                            <span class="right">￥{{pageData.moneyAppointService? pageData.moneyAppointService.toFixed(2): '0.00'}}</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">7天体验服务</div>
                        <div class="content">
                            <!--<span class="left">￥{{pageData.moneyExperience?pageData.moneyExperience.toFixed(2):'0.00'}}</span>-->
                            <span class="right">￥{{pageData.moneyExperience?pageData.moneyExperience.toFixed(2):'0.00'}}</span>
                        </div>
                    </div>
                    <div class="item" >
                        <div class="title">运费</div>
                        <div class="content">
                            <span v-show="address && address.transportFee" class="left">￥{{address && address.transportFee? address.transportFee.money.toFixed(2):''}}</span>
                            <span class="right">￥{{pageData.moneyLgtActual? pageData.moneyLgtActual.toFixed(2): '0.00'}}</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">预购金</div>
                        <div class="content">
                            <span class="left"></span>
                            <span class="right">￥{{pageData.moneyProduce?pageData.moneyProduce.toFixed(2):'0.00'}}</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">支付定金</div>
                        <div class="content">
                            <span class="left"></span>
                            <span class="right">-￥{{pageData.moneyAppoint? pageData.moneyAppoint.toFixed(2): '0.00'}}</span>
                        </div>
                    </div>
                    <!--<div class="bottom-info">支付定金作为预定依据，到货后再支付全款完成下单！</div>-->
                </div>
                <div class="order-line"></div>
            </div>
        </scroller>
        <c-footer
                :totalPrice="needPay"
                :btnAction="appointNow"
        ></c-footer>
    </div>
</template>
<script type="text/ecmascript-6">
    import {Scroller} from 'vux'
    import cAddress from '../../views/order/c-order-address.vue'
    import cGood from '../../views/order/c-order-good.vue'
    //import cCoupon from '../../views/order/c-order-coupon.vue'
    import cFooter from '../../views/order/c-order-footer.vue'

    /**预约体验订单确认、者支付尾款订单确认；
     * 进入该页面前，需要设置
     *          this.save("confirmOrder.address","");
     *  或者    this.remove("confirmOrder.address")
     **/

    export default{
        props: [

        ],
        data(){
            return {
                address: '',
                pageData: '',
                height: -window.innerWidth / 6.4 * .98 + '',  //页面scroll高度
                appointDate: '',
                chooseTime: false,
                type: this.$route.query.type,
                needPay: 0.00,
            }
        },
        methods: {
            appointNow () {

                if(this.type !== 'order'){ //不是支付尾款的情况
                    let appointOrder = this.find('appointOrder');
                    let url = CTX_URL + '/index/member/appointExperienceOrder/submit';
                    if(!this.appointDate){
                        this.tip('请您选择预约时间！')
                        return;
                    }
                    let date = new Date(this.appointDate.replace(/-/g, "/"));
                    appointOrder.appointDate = date.toString();

                    if(this.type === 'cart'){
                        url = CTX_URL + '/index/shoppingcart/appointExperienceOrder/submit';
                        appointOrder.appointDate = this.appointDate;
                    }
                    this.postQuery(
                            true,
                            url,
                            appointOrder,
                            data => {
                                if(data.status === 1){
                                    this.save('payData', data.data);
                                    this.replaceView('/pay', {

                                    })
                                }
                            }
                    )
                }else { //支付尾款的情况
                    if(!this.address){
                        this.tip('请您添加收货地址！');
                        return;
                    }else if( !this.address.id){    //已经提交过，没有改变地址
                        this.save('payData', this.pageData);
                        this.replaceView('/pay', {

                        })
                    }else {     //改变了地址
                        this.postQuery(
                                true,
                                CTX_URL + '/index/member/experienceOrder/payRest',
                                {
                                    experienceOrderId: this.$route.query.id,
                                    addressId: this.address.id,
                                },
                                data => {
                                    if(data.status === 1){
                                        this.save('payData', data.data);
                                        this.replaceView('/pay', {

                                        })
                                    }
                                }
                        )
                    }
                }

            },
            chooseDate: function(){
                this.pushView('/chooseDate',{
                    startDate: new Date().getTime()
                })
            }
        },
        created(){
            let appointOrder = this.find('appointOrder');
            let url = CTX_URL + '/index/member/appointExperienceOrder';

            if(this.type !== 'order'){  //不是支付尾款的情况
                if(this.type === 'cart'){   //从购物车里触发预体验
                    url = CTX_URL + '/index/shoppingcart/appointExperienceOrder'
                }
                this.postQuery(true, url, appointOrder, data => {
                    if(data.status === 1){
                        this.pageData = data.data;
                        if(data.data.experienceProduceList[0].isForeexperienceDate === '1'){
                            this.chooseTime = true;
                            this.appointDate = this.find('chooseDate');
                        }else{
                            this.appointDate = data.data.appointDate.substring(0,10);
                        }
                        this.needPay = this.pageData.moneyAppoint + this.pageData.moneyAppointServiceActual;
                    }
                })
            }else if(this.type === 'order'){
                url = CTX_URL + '/index/member/experienceOrder/payRest?experienceOrderId=' + this.$route.query.id;
                this.getQuery(true, url, data => {
                    if(data.status === 1){
                        this.pageData = data.data.experienceOrder;
                        let address = this.find('confirmOrder.address');
                        if(!address){
                            if(this.pageData.receiveName){
                                this.save('confirmOrder.address', {
                                    addressDetail: this.pageData.receiveAreaStr + this.pageData.receiveAreaDetail,
                                    receiveName: this.pageData.receiveName,
                                    receiveTel: this.pageData.receiveTel,
                                    area:{},
                                });
                            }else{
                                this.save('confirmOrder.address', data.data.address || {});
                            }

                        }
                        this.address = this.find('confirmOrder.address');
                        if(data.data.experienceOrder.experienceProduceList[0].isForeexperienceDate === '1'){
                            this.chooseTime = true;
                            this.appointDate = this.find('chooseDate');
                        }else{
                            this.appointDate = data.data.experienceOrder.appointDate.substring(0,10);
                        }
                        this.needPay = this.pageData.moneyTotal - this.pageData.moneyAppoint - this.pageData.moneyAppointService;
                        console.log('needpay=' + this.needPay);
                    }
                })
            }



        },
        computed: {
            getHeight(){
                return this.height;
            },
            getAddress (){
                return this.address;
            },
        },
        updated (){
            this.$nextTick(() => {
                if(this.$refs.scroller) this.$refs.scroller.reset();
            });
        },
        components:{
            Scroller,
            cAddress,
            cGood,
            //cCoupon,
            cFooter,
        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/css/common.less";
    .order-page{
        background: @color-f4;
    }
    .order-info{
        position: relative;
        padding: .27rem .3rem;
        font-size: .18rem;
        line-height: .24rem;
        color: @color-error;
    }
    .time-mode{
        position: relative;
        background: @color-ff;
        .border-1px-bottom();
        >.title{
            position: relative;
            margin-left: .3rem;
            height: .74rem;
            width: 6.1rem;
            line-height: .84rem;
            font-size: .24rem;
            color: @color-33;
            .border-1px-bottom();
        }
        >.time-info{
            position: relative;
            width: 6.1rem;
            margin-left: .3rem;
            line-height: .84rem;
            >span{
                font-size: .2rem;
                line-height: .84rem;
                color: @color-gold-dark;
                &.time-str{
                    font-weight: bold;
                }
            }
        }
        .choose-time-btn{
            position: relative;
            display: inline-block;
            margin-left: .3rem;
            height: .4rem;
            padding: 0 .3rem;
            .border-1px(@color-33);
            font-size: .2rem;
            line-height: .4rem;
            color: @color-33;
            text-align: center;
            margin-bottom: .3rem;
        }
    }
    .order-line{
        position: relative;
        height: .2rem;
        width: 100%;
        background: @color-f4;
    }
    .price-list{
        background: @color-ff;
        position: relative;
        width: 100%;
        padding: .2rem 0;
        .border-1px-bottom();
        >.item{
            position: relative;
            width: 5.8rem;
            margin-left: .3rem;
            height: .46rem;
            >.title{
                position: absolute;
                left: 0;
                top: 0;
                line-height: .46rem;
                height: 100%;
                width: 2rem;
                font-size: .2rem;
                color: @color-33;
            }
            >.content{
                position: absolute;
                right: 0;
                top: 0;
                width: 3rem;
                text-align: right;
                >.left{
                    font-size: .2rem;
                    color: @color-33;
                    line-height: .46rem;
                    text-decoration:line-through;
                }
                >.right{
                    font-size: .2rem;
                    color: @color-gold-dark;
                    line-height: .46rem;
                }
            }

        }
        .bottom-info{
            background: @color-ff;
            position: relative;
            width: 5.8rem;
            margin-left: .3rem;
            .border-1px-top();
            padding: .1rem 0 0 0;
            font-size: .18rem;
            line-height: .3rem;
            color: @color-error;
        }
    }
</style>