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

                <c-order v-for="order of orederList" :key="order.id"
                         :order="order"
                         ref="orders"
                >
                </c-order>

                <div class="order-line"></div>

            </div>
        </scroller>
        <c-footer
                :btnAction="payNow"
                btnStr="提交"
        ></c-footer>
    </div>
</template>
<script type="text/ecmascript-6">
    import {Scroller} from 'vux'
    import cAddress from '../../views/order/c-order-address.vue'
    import cGood from '../../views/order/c-order-good.vue'
    import cCoupon from '../../views/order/c-order-coupon.vue'
    import cFooter from '../../views/order/c-order-footer.vue'
    import cOrder from '../../views/order/c-order.vue'

    export default{
        props: [

        ],
        data(){
            return {
                info:'体验转购买订单确认',
                address: '',
                pageData: '',
                height: -window.innerWidth / 6.4 * .98 + '',  //页面scroll高度
                orederList: []
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

                let url = CTX_URL + '/index/member/experienceOrder/decideSubmit';
                console.log(confirmOrder)
                this.postQuery(
                        true,
                        url,
                        confirmOrder,
                        data => {
                            if(data.status === 1){
                                if(data.data.length && data.data.length === 1){
                                    this.alert('提交成功!', ()=> {
                                        this.replaceView('/myCenter/orderDetail', {
                                            buyOrderId: data.data[0].id
                                        })
                                    });
                                    return;
                                }
                                this.save('payData', data.data);
                                this.replaceView('/pay', {

                                })
                            }
                        }
                )
            },
        },
        created(){
            this.address = this.find('confirmOrder.address');
            this.orederList = this.find('buyOrder');
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
            cOrder,
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
</style>
