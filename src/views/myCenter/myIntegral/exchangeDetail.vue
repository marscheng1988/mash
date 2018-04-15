<template>
    <div class="ui-page">
        <section class="total">
            <p>累积兑换</p>
            <h1>8000<span>分</span></h1>
        </section>
        <section class="exchange-detail">
            <h2>兑换明细</h2>
            <div class="detail-item" v-for="i in 4">
                <div class="number">
                    <span>订单编号：555555555</span>
                    <span>2016-6-22</span>
                </div>
                <div class="main">
                    <div class="exchange-block" :style = "{backgroundImage:'url(' + integraPic+')'}">
                        <!--<h2>10</h2>-->
                        <!--<h3>满100可用</h3>-->
                    </div>
                    <div class="right-part">
                        <h2>满100减10现金券 <span>x1</span></h2>
                        <h3>兑换成功 <span>-800积分</span></h3>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common.less";
    .ui-page{
        background-color:@color-f4;
    }
    .total{
        height: 1.94rem;
        width: 100%;
        background: #fff;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 .3rem;
        .border-1px-bottom();
        margin-bottom:.2rem;
        p{
            padding-top:.3rem;
            line-height: .4rem;
            font-size: @f-22;
            color: @color-33;

        }
        h1{
            line-height: 1rem;
            font-size: .72rem;
            color: @color-33;
            span{
                font-size: @f-26;
                color: @color-33;
            }
        }
    }
    .exchange-detail{
        width: 6.4rem;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 .3rem;
        overflow: hidden;
        background:#fff;
        > h2{
            line-height: .9rem;
            font-size: @f-26;
            color: @color-33;
            border-bottom:1px solid @color-e4;

        }
        .detail-item{
            min-height: 1.74rem;
            width: 100%;
            box-sizing: border-box;
            padding: .3rem 0;
            border-bottom:1px solid @color-e4;
            &:last-child{
                border:none;
            }
            .number{
                height:.2rem;
                line-height:.2rem;
                span{
                    font-size: @f-20;
                    color: @color-99;
                    float: left;
                    &:last-child{
                        float: right;
                    }
                }
            }
            .main{
                height: .8rem;
                margin-top: .2rem;
                width: 100%;
                .exchange-block{
                    float: left;
                    width: 1rem;
                    height: .8rem;
                    .bg-img;
                }
                .right-part{
                    width: 4.5rem;
                    height: .08rem;
                    float: right;
                    > h2{
                        line-height: .45rem;
                        font-size: @f-24;
                        color: @color-33;
                        .ellipsis;
                        span{
                            font-size: @f-24;
                            color: @color-33;
                            float: right;
                        }
                    }
                    > h3{
                        line-height: .35rem;
                        font-size: @f-20;
                        color: @color-33;
                        span{
                            font-size: @f-24;
                            color: @color-gold-dark;
                            float: right;
                        }
                    }
                }
            }
        }
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
        }
    }
</script>
