<template>
    <div class="ui-page">
        <div class="ui-page-expain ">
            <h2 >积分说明</h2>
            <p>京豆是用户在京东购物、评价、晒单等相关活动中获得的奖励，京豆仅可在京东购物时使用，可直接用于支付京东订单（投资性金银、收藏品和部分虚拟产品等不支持京豆支付的产品除外），在消费时100京豆可抵用1元现金，京豆支付不得超过每笔订单结算金额的50%，可使用的京豆数量为1000的整数倍。如：结算金额是100元，50%就是50元，那结算时最多只能用5000个京豆支付。</p>
        </div>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common.less";
    .ui-page-expain{
        padding:0 30/64rem;
        background: #fff;
        h2{
            line-height: 88/64rem;
            font-size: @f-24;
            color: @color-33;
            .border-1px-bottom();

        }
        p{
            padding: 20/64rem 0 30/64rem;
            line-height: 36/64rem;
            font-size: @f-22;
            color: @color-66;
            word-break: break-all;

        }
    }
</style>
<script>
    export default{
        data(){
            return{

            }
        },
        mounted () {
            console.log(this.detailList)

        },
        methods :{
            goExchange () {
//                this.pushView('/myCenter/integralMall')
                this.tip('敬请期待 ！')
            }
        },
        components:{

        }
    }
</script>
