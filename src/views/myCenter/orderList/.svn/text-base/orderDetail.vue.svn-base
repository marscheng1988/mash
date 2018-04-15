<template>
    <div>
        <div class="order-page">
            <div class="ui-page-head"><p>订单详情</p></div>
            <div class="order-line"></div>
            <c-address
                v-if="type == 1"
                :address="address"
                ref="address"
                :rightArrow="false"
            ></c-address>
            <div class="order-line"></div>
            <div class="orderBlock">
                <c-good v-if="orderData" :item="orderData" ></c-good>
            </div>
            <div class="order-line"></div>
            <div class="price-list-warp" v-if="type == 1">
                <div class="price-list">
                    <div class="item">
                        <div class="title">支付方式</div>
                        <div class="content">
                            <span class="right">微信支付</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">商品</div>
                        <div class="content">
                            <span class="right">￥{{orderData.moneyProduce}}</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">运费</div>
                        <div class="content">
                            <span class="right">￥{{orderData.moneyLgt}}</span>
                        </div>
                    </div>
                    <div class="item" v-if="orderData.moneyExperience && orderData.moneyExperience !=0">
                        <div class="title">体验服务</div>
                        <div class="content">
                            <span class="right">￥{{orderData.moneyExperience}}</span>
                        </div>
                    </div>
                    <div class="item" v-if="orderData.moneyAppoint != 0">
                        <div class="title">优惠</div>
                        <div class="content">
                            <span class="right">-￥{{orderData.moneyAppoint}}</span>
                        </div>
                    </div>
                </div>
                <div class="total">
                    <div class="title">合计</div>
                    <div class="content">￥{{orderData.moneyTotal}}</div>
                </div>

            </div>
            <div class="price-list-warp" v-if="type == 2">
                <div class="price-list" >
                    <div class="item">
                        <div class="title">预约定金</div>
                        <div class="content">
                            <span class="right">￥{{orderData.moneyAppoint}}</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">预约服务费</div>
                        <div class="content">
                            <span class="right">￥{{orderData.moneyAppointService}}</span>
                        </div>
                    </div>
                </div>
                <div class="total">
                    <div class="title">合计</div>
                    <div class="content">￥{{orderData.moneyAppoint + orderData.moneyAppointService}}</div>
                </div>
            </div>
            <div class="price-list-warp" v-if="Settlement">
                <div class="price-list">
                    <div class="item">
                        <div class="title">结算信息</div>
                    </div>
                    <div class="item">
                        <div class="title">应退押金</div>
                        <div class="content">
                            <span class="right">￥{{orderData.moneyTotal}}</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">维修补偿</div>
                        <div class="content">
                            <span class="right cross" v-if="orderData.moneyLgt != 0">￥{{repairCompensate}}</span>
                            <span class="right">￥0.00</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">购买抵扣</div>
                        <div class="content">
                            <span class="right cross" v-if="orderData.moneyExperience != 0">￥{{buyDeposit}}</span>
                            <span class="right">￥0.00</span>
                        </div>
                    </div>
                </div>
                <div class="total">
                    <div class="title">实退押金</div>
                    <div class="content">￥{{orderData.moneyTotal - repairCompensate - buyDeposit}}</div>
                </div>
            </div>
            <div class="order-line"></div>
            <div class="orderNo">
                <p>订单编号<span>{{orderData.orderNo}}</span></p>
                <p>创建时间<span>{{creatTime}}</span></p>
            </div>
            <div class="bottom-tip">
                人工客服时间:  9:00-23:00
            </div>
            <recommend :list="recommendList" v-if="orderData.statusMember != 1"></recommend>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import cAddress from '../../../views/order/c-order-address.vue'
    import cGood from './c-orderDetail-good.vue'
    import recommend from '../../../components/recommend/recommend.vue';

    export default{
        name:'orderDetail',
        data(){
            return {
                address: '',
                orderData:'',
                orderType:'', //体验单experienceOrder，购买单buyOrder
                height: -window.innerWidth / 6.4 * .98 + '',  //页面scroll高度
                type:'',

                payWay:'',            //支付方式
                goodsPrice:'',        //商品价格
                deliverPrice:'',      //运费
                experiencePrice:'',   //体验费
                discount:'',          //折扣
                total:'',             //总计

                Settlement:false,     //结算信息
                repairCompensate:'',  //维修补偿
                buyDeposit:'',        //购买折扣
                totalReturn:'',       //实退押金

                recommendList:[],

            }
        },
        beforeCreate () {
            if(!Date.Decode){
                Date.prototype.Decode=function(timestamp){
                    let days=Math.floor(timestamp/(24*3600*1000));
                    let leave1=timestamp%(24*3600*1000);
                    let hours=Math.floor(leave1/(3600*1000));
                    let leave2=leave1%(3600*1000);
                    let minutes=Math.floor(leave2/(60*1000));
                    let leave3=leave2%(60*1000);
                    let seconds=Math.round(leave3/1000);
                    let o={
                        "day":days,
                        "hours":hours,
                        "minutes":minutes,
                        "seconds":seconds
                    };
                    return o;
                }
            }

        },
        created(){

            if(this.$route.query.experienceOrderId != undefined) this.orderType = 'experience';
            if(this.$route.query.buyOrderId != undefined) this.orderType = 'buy';

            this.creatTime = this.find('orderCreatTime').substring(-1,16)
        },
        mounted () {
            console.log(this.orderData.moneyExperience)
            this.questData();
            this.requestRecommendData();

        },
        methods: {
            questData () {
                let self = this;
                let selfId,questUrl;
                if (self.orderType == 'experience') {
                    selfId = this.$route.query.experienceOrderId;
                    questUrl =  CTX_URL + '/index/member/experienceOrder/detail?experienceOrderId=' + selfId;
                }
                else {
                    selfId = this.$route.query.buyOrderId;
                    questUrl =  CTX_URL + '/index/member/buyOrder/detail?buyOrderId=' + selfId;
                }

                if (selfId != undefined) {
                    self.getQuery(true, questUrl, data => {
                        if (data.status === 1) {
                            self.orderData = data.data;
                            self.type = data.data.type;
                            //有结算信息
//                            if(data.data.statusMember == 98){
//                                self.Settlement = true;
//                                self.orderData.experienceProduceList.forEach((term) =>{
//                                    if(term.moneySettlementDec && term.priceBuyFact){
//                                        self.repairCompensate += term.moneySettlementDec*item.num;
//                                        self.buyDeposit += term.priceBuyFact*item.num
//                                    }
//                                })
//                            }

                            self.address = {
                                receiveName:data.data.receiveName,
                                receiveTel: data.data.receiveTel,
                                area: {
                                    name:data.data.receiveAreaStr
                                },
                                addressDetail: data.data.receiveAreaDetail

                            };

                        }
                    })
                }
            },

            requestRecommendData () {
                let self = this;
                self.getQuery(false,
                            CTX_URL + '/index/collocation/recommend',
                            function(response){
                            if(response.status === 1){
                                self.recommendList = response.data;
                            }
                        })
            },
        },

        components:{
            cAddress,
            cGood,
            recommend,
        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common.less";
    .router-view {
        height: 100%;
    }
    .order-page{
        background: @color-f4;
        padding-bottom: .98rem;
    }
    .price-list{
        background: @color-ff;
        position: relative;
        width: 100%;
        padding: .2rem 0 ;
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
                >.right{
                    font-size: .2rem;
                    color: @color-33;
                    line-height: .46rem;
                }
                >.cross{
                    text-decoration: line-through;
                    color: @color-99;
                    padding-right: .1rem;
                }
            }
        }

    }
    .total{
        height: .84rem;
        line-height: .84rem;
        padding: 0 .3rem;
        background: @color-ff;
        .title{
            float: left;
            font-size: @f-24;
            color: @color-33;
        }
        .content{
            float: right;
            font-size: @f-24;
            color: @color-gold-dark;
        }
    }
    .orderNo{
        overflow: hidden;
        padding: .2rem .3rem;
        background: @color-ff;
        p{
            font-size: .2rem;
            line-height: .3rem;
            color: @color-99;
            span{
                padding-left: .2rem;
                font-size: .2rem;
                line-height: .4rem;
                color: @color-99;
            }
        }
    }
    .bottom-tip{
        line-height: .8rem;
        font-size: .16rem;
        color: @color-99;
        text-align: center;
    }
</style>
