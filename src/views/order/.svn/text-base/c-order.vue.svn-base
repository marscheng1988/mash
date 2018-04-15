<template>
    <div>
        <c-good v-for="item of order.buyProduceList"
                :item="item"
                :type="order.type"
                key="item.id"
        ></c-good>
        <div class="order-line"></div>

        <div class="price-list">
            <div class="item">
                <div class="title">商品价格</div>
                <div class="content">
                    <span class="left"></span>
                    <span class="right">￥{{order.moneyProduce?order.moneyProduce.toFixed(2):'0.00'}}</span>
                </div>
            </div>
            <div class="item">
                <div class="title">运费</div>
                <div class="content">
                    <span class="left">￥100</span>
                    <span class="right">￥{{order.moneyLgt?order.moneyLgt.toFixed(2):'0.00'}}</span>
                </div>
            </div>
        </div>
        <div class="order-line"></div>
        <c-coupon ref="coupon"></c-coupon>
        <div class="order-line"></div>
        <c-invoice v-if="order.type === '1'" ref="invoice"></c-invoice>
        <div v-if="order.type === '1'" class="order-line"></div>
        <div class="common-item">
            <div class="title">合计</div>
            <div class="name">￥{{order.moneyPaid}}</div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import cGood from '../../views/order/c-order-good.vue'
    import cCoupon from '../../views/order/c-order-coupon.vue'
    import cInvoice from '../../views/order/c-order-invoice.vue'

    export default{
        props: [
            'order'
        ],
        data(){
            return {
                name: 'order'
            }
        },
        methods: {

        },
        created(){

        },
        computed: {

        },
        components:{
            cGood,
            cCoupon,
            cInvoice,
        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/css/common.less";
    .order-line{
        position: relative;
        height: .2rem;
        width: 100%;
        background: @color-f4;
    }
    .common-item{
        position: relative;
        height: .88rem;
        .border-1px-bottom();
        background: @color-ff;
        >.title{
            position: absolute;
            left: .3rem;
            top: 0;
            height: .88rem;
            color: @color-33;
            font-size: .24rem;
            line-height: .88rem;
        }
        >.name{
            position: absolute;
            right: .3rem;
            top: 0;
            height: .88rem;
            color: @color-33;
            font-size: .20rem;
            line-height: .88rem;
            text-align: right;
        }
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