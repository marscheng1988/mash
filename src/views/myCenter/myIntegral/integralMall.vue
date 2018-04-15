<template>
    <div class="ui-page">
        <v-banner height="4rem" :url="bannerUrl" ></v-banner>
        <section class="member-tab">
            <div class="name">
                <img :src="integraPic"/>
                <h2>韩梅梅</h2>
                <h3>普通会员</h3>
            </div>
            <div class="total-inregra">
                <h2>6445积分</h2>
                <h3 @click="showDetail">查看兑换明细</h3>
            </div>
        </section>
        <section class="exchange-area">
            <div class="cross">
                <div class="exchange-block" @click="showBlockDetail">
                    <div class="upper" :style = "{backgroundImage:'url(' + integraPic+')'}">
                        <!--<h2>10</h2>-->
                        <!--<h3>满100可用</h3>-->
                    </div>
                    <div class="down">
                        <h4>10现金券</h4>
                        <h5>800积分</h5>
                    </div>
                </div>
                <div class="exchange-block" @click="showBlockDetail">
                    <div class="upper" :style = "{backgroundImage:'url(' + integraPic+')'}">
                        <!--<h2>10</h2>-->
                        <!--<h3>满100可用</h3>-->
                    </div>
                    <div class="down">
                        <h4>10现金券</h4>
                        <h5>800积分</h5>
                    </div>
                </div>
            </div>
            <div class="member-cross">
                <p>——  认证会员专属  ——</p>
            </div>
            <div class="cross">
                <div class="exchange-block" @click="showBlockDetail">
                    <div class="upper" :style = "{backgroundImage:'url(' + integraPic+')'}">
                        <!--<h2>10</h2>-->
                        <!--<h3>满100可用</h3>-->
                    </div>
                    <div class="down">
                        <h4>10现金券</h4>
                        <h5>800积分</h5>
                    </div>
                </div>
                <div class="exchange-block" @click="showBlockDetail">
                    <div class="upper" :style = "{backgroundImage:'url(' + integraPic+')'}">
                        <!--<h2>10</h2>-->
                        <!--<h3>满100可用</h3>-->
                    </div>
                    <div class="down">
                        <h4>10现金券</h4>
                        <h5>800积分</h5>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common.less";
    .ui-page{
        background-color: @color-f4
    }
    .member-tab{
        height: 1.2rem;
        background: #fff;
        padding: .3rem 0;
        box-sizing: border-box;
        .name{
            position: relative;
            width: 50%;
            float: left;
            height: .6rem;
            box-sizing: border-box;
            border-right: 1px solid @color-f4;
            padding:0 .8rem;
            img{
                position: absolute;
                top: 0;
                left: .8rem;
                width: .6rem;
                height: .6rem;
                -webkit-border-radius: 100%;
                border-radius: 100%;

            }
            h2{
                position: absolute;
                top: 0;
                left: 1.6rem;
                width: 1.6rem;
                line-height: .3rem;
                font-size: @f-24;
                color: @color-33;
            }
            h3{
                position: absolute;
                top: .3rem;
                left: 1.6rem;
                width: 1.6rem;
                line-height: .3rem;
                font-size: @f-20;
                color: @color-99;
            }
        }
        .total-inregra{
            width: 50%;
            float: right;
            box-sizing: border-box;
            h2{
                line-height: .3rem;
                text-align:center;
                font-size: @f-24;
                color: @color-33;
            }
            h3{
                line-height: .3rem;
                text-align:center;
                font-size: @f-20;
                color: @color-gold-light
            }
        }
    }
    .exchange-area{
        width: 100%;
        overflow: hidden;
        padding: .3rem 0;
        .cross{
            overflow: hidden;
            padding: 0 .15rem;
            .exchange-block{
                float: left;
                width: 2.75rem;
                height: 2.2rem;
                margin: 0 .15rem .15rem .15rem;
                .upper{
                    height: 1.4rem;
                    width: 2.75rem;
                    //padding: 20/64rem;
                    //box-sizing: border-box;
                    .bg-img
                    //> h2{
                    //    line-height:60/64rem;
                    //    width: 100/64rem;
                    //    text-align: center;
                    //    margin: 0 auto;
                    //    font-size: 50/64rem;
                    //    color: #fff;
                    //    .border-1px-bottom();
                    //}
                    //> h3{
                    //    line-height: 40/64rem;
                    //    text-align: center;
                    //    font-size: @f-20;
                    //    color: #fff;
                    //}
                }
                .down{
                    height: .8rem;
                    width: 2.75rem;
                    background-color: @color-ff;
                    padding: .1rem;
                    box-sizing: border-box;
                    > h4{
                        line-height: .3rem;
                        text-align: center;
                        font-size: @f-18;
                        color: @color-33;
                        .ellipsis;
                    }
                    > h5{
                        line-height: .3rem;
                        text-align: center;
                        font-size: @f-18;
                        color: @color-99;
                    }
                }
            }

        }
        .member-cross{
            line-height:1.2rem;
            text-align: center;
            font-size: @f-24;
            color: @color-33;
        }
    }

</style>
<script type="text/ecmascript-6">
    import banner from '../../../components/banner/Banner.vue';
    export default{

        data(){
            return{
                bannerUrl: '/index/advertisement/3',
                integraPic:require('./images/integra.jpg')
            }
        },
        mounted () {
            console.log(this.integraPic)
        },
        methods:{
            showDetail () {
                this.pushView('/myCenter/exchangeDetail')
            },

            showBlockDetail () {
                this.pushView('/myCenter/exchangeIntegra')
            }
        },
        components:{
            'v-banner': banner,
        }
    }
</script>
