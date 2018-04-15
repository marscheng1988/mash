<template>
    <div class="ui-page">
        <div class="exchange-block" :style = "{backgroundImage:'url(' + integraPic+')'}">
            <!--<h2>10</h2>-->
            <!--<h3>满100可用</h3>-->
        </div>
        <section class="total">
            <p>满100减10现金券</p>
            <h1>800<span>积分</span></h1>
        </section>
        <section class="exchange-detail">
            <h2>详细说明</h2>
            <div class="detail-item">
                <h3>适用范围</h3>
                <p>本券可在本平台租赁珠宝时以抵扣租金的方式使用，时机支付满100元即可使用本券扣租金10元。</p>
            </div>
            <div class="detail-item">
                <h3>注意事项</h3>
                <p>本券可在本平台租赁珠宝时以抵扣租金的方式使用，时机支付满100元即可使用本券扣租金10元。</p>
            </div>
        </section>
        <div class="comfirm-button" @click="exchange">
            立即兑换
        </div>

    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common.less";
    .ui-page{
        background-color: @color-f4
    }
    .exchange-block{
        margin: .4rem auto;
        width: 4rem;
        height: 2rem;
        box-sizing: border-box;
        padding: .2rem;
        .bg-img;
    }

    .total{
        height: 1.38rem;
        width: 100%;
        background: #fff;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: .2rem .3rem;
        .border-1px-bottom();
        margin-bottom:.2rem;
        p{
            line-height: .4rem;
            font-size: @f-22;
            color: @color-33;
            .ellipsis;
        }
        h1{
            /*line-height: .68rem;*/
            font-size: .48rem;
            color: @color-gold-dark;
            span{
                font-size: @f-26;
            }
        }
    }
    .exchange-detail{
        width: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 .3rem .3rem .3rem;
        overflow: hidden;
        background:#fff;
        > h2{
            line-height: .7rem;
            font-size: @f-22;
            color: @color-99;
            border-bottom:1px solid @color-e4;

        }
        .detail-item{
            width: 100%;
            box-sizing: border-box;
            padding: .1rem 0 .2rem 0;
            > h3{
                line-height: .4rem;
                font-size: @f-22;
                color: @color-33;
                font-family:@PFSC-B;
            }
            > p{
                line-height: .3rem;
                font-size: @f-22;
                color: @color-66;
                font-family:@PFSC;
            }
        }
    }

    .comfirm-button{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: .88rem;
        text-align: center;
        line-height: .88rem;
        font-size: @f-26;
        color: @color-ff;
        background: @color-33;
    }
</style>
<script>
    export default{
        data(){
            return{
                msg:'hello vue',
                integraPic:require('./images/integra.jpg')

            }
        },
        components:{
        },
        methods:{
            exchange() {
                let point ="<b style ='color:#d6a41d'>800积分</b>";
                let name ="<b style ='color:#d6a41d'>10元现金券</b>";
                let str = "确定以"+point+"兑换"+name+"？";
                this.confirm(str,function (index) {
                    if(index === '1'){
                        this.pushView('/myCenter/integralMall')
                    }
                },"取消,确定兑换","兑换优惠券")

            }
        }
    }
</script>
