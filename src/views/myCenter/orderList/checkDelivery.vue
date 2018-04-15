<template>
    <div class="ui-page">
        <div class="ui-page-head" >
            <p>查看物流</p>
        </div>
        <section class="delivery-state">
            <p class="orderNum">订单编号:  5556664444455</p>
            <p class="delivery-sta">物流状态:  {{logisticsStates}}</p>
            <p class="deliveryCop">承运来源:  宅急送</p>
        </section>
        <section class="delivery-process" >
            <div class="process" v-for="item in logisticsPro">
                <span></span>
                <p>{{item.acceptAddress}}</p>
            </div>
            <div class="process">
                <span></span>
                <p>快件正在揽收</p>
            </div>
            <div class="process">
                <span></span>
                <p>您已下单成功</p>
            </div>
        </section>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common.less";
    .ui-page{
        background: @color-f4;
    }
    .delivery-state{
        overflow: hidden;
        background: #fff;
        padding:.2rem 0;
        > p{
            line-height: .5rem;
            font-size: @f-20;
            color: @color-33;
            text-indent: .3rem;
        }
    }
    .delivery-process{
        overflow: hidden;
        margin-top: .2rem;
        background: #fff;
        > div{
            position: relative;
            height: 1.08rem;
            padding: 0 .3rem;
            &:first-child span{
                background-image: url("images/last-active.png");;
            }
            &:last-child span{
                background-image: url("images/start.png");
            }
            span{
                position: absolute;
                height: 1.08rem;
                width: .36rem;
                left: .3rem;
                top: 0;
                background-image: url("images/process.png");
                background-size: 100% 100%;
                background-position: center;
                background-repeat: no-repeat;
            }
            p{
                position: absolute;
                left: 1.06rem;
                height:1.08rem;
                line-height: .4rem;
                display:flex;
                align-items:center;
                font-size: @f-20;
                color: @color-99;
                text-indent: .1rem;
                .border-1px-bottom();
                width:5.04rem;
            }
        }
    }
</style>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                logisticsStates:'待揽收',
                logisticsPro:[],
                orderNo:''
            }
        },
        created () {
            this.orderNo = this.find('checkDelivery.orderNo')
        },
        mounted () {
            let self = this;
            this.getQuery(false,
                            CTX_URL + '/index/member/express/zjs/find/3847109089',
                            response => {
//                                console.log(response)
                                if(response.data.orders != undefined) {
                                    self.logisticsPro = response.data.orders[0].steps;
                                    let states = response.data.orders[0].orderStatus;
                                    if (states === 'SIGNED') {
                                        self.logisticsStates = '已签收';
                                    }
                                    else if (states === 'GOT') {
                                        self.logisticsStates = '运输中';
                                    }
                                    else if (states === 'FAILED'){
                                        self.logisticsStates = '已拒收';
                                    }
                                }

            })
        }
    }
</script>
