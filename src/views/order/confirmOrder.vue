<template>
    <div class="order-page">
        <scroller lock-x
                  scrollbarY
                  :height="getHeight"
                  ref="scroller">
            <div>
                <div class="ui-page-head"><p>订单确认</p></div>
                <div class="order-line"></div>

                <c-address
                    :address="address"
                    ref="address"
                ></c-address>
                <div class="order-line"></div>

                <c-good v-for="item of pageData.experienceProduceList"
                        :item="item"
                        key="item.id"
                ></c-good>
                <div class="order-line"></div>

                <div class="price-list">
                    <div class="item">
                        <div class="title">7天体验服务</div>
                        <div class="content">
                            <span class="left">￥{{pageData.moneyExperience?pageData.moneyExperience.toFixed(2):'0.00'}}</span>
                            <span class="right">￥{{pageData.moneyExperience?pageData.moneyExperienceActual.toFixed(2):'0.00'}}</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">运费</div>
                        <div class="content">
                            <span v-show="address" class="left">￥{{address && address.transportFee?address.transportFee.money.toFixed(2):''}}</span>
                            <span class="right">￥{{pageData.moneyLgt?pageData.moneyLgtActual.toFixed(2):'0.00'}}</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">预购金</div>
                        <div class="content">
                            <span class="left"></span>
                            <span class="right">￥{{pageData.moneyProduce?pageData.moneyProduce.toFixed(2):'0.00'}}</span>
                        </div>
                    </div>
                    <div class="bottom-info">体验先支付商品金额作为预购金，体验结束如需购买，均以当时活动价进行结算！</div>
                </div>
                <div class="order-line"></div>

                <c-coupon></c-coupon>

                <div class="order-line"></div>
            </div>
        </scroller>
        <c-footer
                :totalPrice="pageData.moneyTotal"
                :btnAction="payNow"
        ></c-footer>
    </div>
</template>
<script type="text/ecmascript-6">
    import {Scroller} from 'vux'
    import cAddress from '../../views/order/c-order-address.vue'
    import cGood from '../../views/order/c-order-good.vue'
    import cCoupon from '../../views/order/c-order-coupon.vue'
    import cFooter from '../../views/order/c-order-footer.vue'

    /**体验订单确认页面；
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
            }
        },
        methods: {
            payNow () {

                if(!this.address || !this.address.id){
                    this.tip('请您添加收货地址！');
                    return;
                }
                let confirmOrder = this.find('confirmOrder');
                confirmOrder.memberRemarks = '';
                confirmOrder.addressId = this.address.id;

                let url = CTX_URL + '/index/member/experienceOrder/submit';
                if(this.$route.query.type === 'cart'){
                    url = CTX_URL + '/index/shoppingcart/experienceOrder/submit';
                }

                this.postQuery(
                        true,
                        url,
                        confirmOrder,
                        data => {
                            if(data.status === 1){
                                this.save('payData', data.data);
                                this.replaceView('/pay', {

                                })
                            }
                        }
                )
            },
        },
        created(){
            let url = CTX_URL + '/index/member/experienceOrder';
            if(this.$route.query.type === 'cart'){
                url = CTX_URL + '/index/shoppingcart/experienceOrder'
            }
            let confirmOrder = this.find('confirmOrder');
            let address = this.find('confirmOrder.address');
            this.postQuery(true, url, confirmOrder, data => {
                if(data.status === 1){
                    this.pageData = data.data;

                    if(!address){
                        address = data.data.address
                        this.save('comfirmOrder.address', address);
                    }
                    this.address = address;
                }
            })
        },
        computed: {
            getHeight(){
                return this.height;
            },
            getAddress (){
                return this.address;
            }
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
            cCoupon,
            cFooter,
        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/css/common.less";
    .order-page{
        background: @color-f4;
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
                    color: @color-99;
                    line-height: .46rem;
                    text-decoration:line-through;
                }
                >.right{
                    font-size: .2rem;
                    color: @color-gold-dark;
                    line-height: .46rem;
                    margin-left: .12rem;
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
