<template>
    <div>
        <div class="type">
            <p>订单编号:{{orderNo}}</p><b >{{orderTypeText}}</b>
        </div>
        <div class="orderCondent" @click="showOrderDetail(orderId)">
            <div class="goodsItem" :class="{noborder:!bottomShow}">
                <div class="img"><img :src="getImgUrl"/></div>
                <div class="text" >
                    <h2>{{title}}</h2>
                    <h3>{{name}}</h3>
                    <h4>共&nbsp;{{num}}&nbsp;件商品</h4>
                </div>
            </div>
        </div>
        <div class="orderButton" v-if="bottomShow">
            <p v-if=" payTimeShow">付款时间:<b>{{closeTime}}</b></p>
            <p v-if=" statusMember == 4 && expCloseTimeShow">体验剩余:<b>{{expCloseTime}}</b></p>
            <span v-for="sub in bottons" :class="{active:sub.active == true}" @click="orderListBtnClick(sub.type,orderId)">{{sub.text}}</span>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    //import HeaderComponent from '../../views/'

    export default{
        props: [
            'item',
            'borderShow',
            'timeData',
            'type'
        ],
        data(){
            return {
                imgUrl: IMG_URL,
                bottomShow:true,
                bottons:[],
                closeTime:'',
                expCloseTime:'',
                expCloseTimeShow:false,
                payTimeShow:false,

                num: this.item.num,
                img: this.item.icon,
                title: this.type == 'experience' ? this.item.experienceProduce.goodsTitle : this.item.buyProduce.goodsTitle,
                name: this.type == 'experience' ? this.item.experienceProduce.produceName : this.item.buyProduce.produceName,
                orderId: this.type == 'experience' ? this.item.experienceOrder.id : this.item.buyOrder.id,

                orderTypeText:'',
                orderNo : this.type == 'experience' ? this.item.experienceOrder.orderNo : this.item.buyOrder.orderNo,

                //1待支付，2待发货，3待收货，5体验中，7退货中，98交易完成，99交易关闭
                statusMember : this.type == 'experience' ? this.item.experienceOrder.statusMember : this.item.buyOrder.statusMember,

                //1待支付，2待付定金，3待付尾款，98支付完成
                statusPay: this.type == 'experience' ? this.item.experienceOrder.statusPay : this.item.buyOrder.statusPay,

                //1体验，2预约体验，3购买，4预约购买
                orderType: this.type == 'experience' ? this.item.experienceOrder.type : this.item.buyOrder.type,

                //1待评价   2已评价   9评价关闭
                statusJudge: this.type == 'experience' ? this.item.experienceOrder.statusJudge : this.item.buyOrder.statusJudge,

                //0待结算，1待支付，2待发货，3待收货，4已送达,5体验中（已确认收货），6决策中，7退货中，98交易完成，99交易关闭
                statusSystem: this.type == 'experience' ? this.item.experienceOrder.statusSystem : this.item.buyOrder.statusSystem,

                //1待采购，2采购中，3已到货
                appointStockStatus: this.type == 'experience' ? this.item.experienceOrder.appointStockStatus : this.item.buyOrder.appointStockStatus,
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
            document.getElementsByTagName('body')[0].style.background = '#f4f4f4';
        },
        mounted () {

            let self = this;

            let nowTime = Date.parse(self.timeData.nowDate.replace(/-/g,'/'));

            if(self.statusMember == 0) {
                self.orderTypeText = '交易完成';
                this.bottomShow = false;

            }
            else if(self.statusMember == 1){

                self.payTimeShow = true;
                //订单类型
                if(self.statusPay ==1){
                    if(self.orderType == 1) self.orderTypeText = "待付款";
                }
                else if(self.statusPay ==2){
                    if(self.orderType == 2) self.orderTypeText = "待付定金";
                }
                else if(self.statusPay ==3){
                    self.payTimeShow = false;
                    if(self.orderType == 2) self.orderTypeText = "预约体验尾款待支付";
                    if(self.orderType == 4) self.orderTypeText = "预定尾款待支付";
                }

                //支付状态为待支付和待付定金的时候，需要倒计时和立即付款
                if(self.statusPay == 1 ||self.statusPay == 2){

                    //处理时间，倒计时
                    let closeMils = this.timeData.closeMinute*60*1000;
                    let creatTime;
                    if (self.type == 'experience') {
                        creatTime =Date.parse(self.item.experienceOrder.createDate.replace(/-/g,'/'));
                    }
                    else {
                        creatTime =Date.parse(self.item.buyOrder.createDate.replace(/-/g,'/'));
                    }

                    let closeTime = creatTime + closeMils;

                    let closeLastTime = closeTime-nowTime;
                    self.closeTime = self.MillisecondToDate( closeLastTime );
                    if(closeLastTime <= 0) {
                        self.payTimeShow = false;
                        self.bottomShow = false;
                        self.closeTime = '0秒';
                        self.bottons =[];
                        self.orderTypeText = '订单关闭';
                        return
                    }
                    //执行倒计时
                    let timer =setInterval(function(){
                        closeLastTime -= 1000;
                        self.closeTime = self.MillisecondToDate( closeLastTime);
                        if(closeLastTime <= 0){
                            self.payTimeShow = false;
                            self.closeTime = '0秒';
                            clearInterval(timer);
                            self.bottons =[];
                            self.orderTypeText = '订单关闭'
                        }
                    },1000);
                    this.bottons =[
                        {
                            text:'立即付款',
                            type:1,
                            active:true
                        },
                        {
                            text:'取消订单',
                            type:2
                        },
                    ];

                }
                else if(self.statusPay == 3){

                    this.bottomShow = false;
                    self.bottons = [];

                    if (self.appointStockStatus == 3) {
                        this.bottomShow = true;
                        self.bottons =[
                            {
                                text:'支付尾款',
                                type:7,
                                active:true
                            },

                        ];
                    }
                }



            }
            else if(self.statusMember == 2){

                self.orderTypeText = '待发货';
                this.bottomShow = false;
                this.$parent.$parent.goodsBorderShow = true;

            }
            else if(self.statusMember == 3){

                self.orderTypeText = '待收货';
                this.bottons =[
                    {
                        text:'确认收货',
                        type:3,
                        active:true
                    },
                    {
                        text:'查看物流',
                        type:4
                    },
                ];

            }
            else if(self.statusMember == 5){

                self.orderTypeText = '体验中';
                //处理时间，倒计时
                let closeMils = this.timeData.experienceDays*24*60*60*1000;
                let creatTime =Date.parse(self.item.experienceOrder.createDate.replace(/-/g,'/'));

                let closeTime = creatTime + closeMils;

                let expCloseLastTime = closeTime-nowTime;
                self.expCloseTime = self.MillisecondToDate( expCloseLastTime );

                if(expCloseLastTime <= 24*60*60*1000 && expCloseLastTime > 0){
                    self.expCloseTimeShow = true;
                    let expTimer = setInterval(function(){
                        expCloseLastTime -= 1000;
                        self.expCloseTime = self.MillisecondToDate( expCloseLastTime);
                        if(expCloseLastTime <= 24*60*60*1000 && expCloseLastTime > 0){
                            self.expCloseTimeShow = true;
                        }
                        if(expCloseLastTime <= 0){
                            self.expCloseTimeShow = false;
                            self.expCloseTime = '0秒';
                            clearInterval(expTimer);

                        }
                    },1000);
                }

                if(self.statusSystem == 6){
                    this.bottons =[
                        {
                            text: '归还商品',
                            type: 6
                        },

                    ];
                } else {
                    this.bottons =[
                        {
                            text:'立即购买',
                            active:true,
                            type:5
                        },
                        {
                            text:'归还商品',
                            type:6
                        },
                    ];
                }

            }
            else if(self.statusMember == 7){

                self.orderTypeText = '退货中';

            }
            else if(self.statusMember == 98){

                self.orderTypeText = '交易完成';
                if( self.type === 'experience'){
                    if(self.statusJudge == 1){
                        this.bottons =[
                            {
                                text:'立即购买',
                                active:true,
                                type:5
                            },
                            {
                                text:'立即评价',
                                type:9
                            },

                        ];
                    } else {
                        this.bottons =[
                            {
                                text:'立即评价',
                                type:9
                            },

                        ];
                    }
                }
                else if(self.type === 'buy'){
                    if(self.statusJudge == 1){
                        this.bottons =[
                            {
                                text:'立即购买',
                                active:true,
                                type:5
                            },

                        ];
                    } else {
                        self.bottomShow = false,
                        this.bottons =[

                        ];
                    }
                }
            }
            else if(self.statusMember == 99){

                self.orderTypeText = '交易关闭';
                this.bottons =[
                    {
                        text:'删除订单',
                        type:10
                    },
                ];
            }
        },
        methods: {
            showOrderDetail (targetId) {
                let self = this;

                if(self.type == 'experience'){
                    this.pushView('/myCenter/orderDetail',{experienceOrderId:targetId});
                    this.save('orderCreatTime',self.item.experienceOrder.createDate);
                } else {
                    this.save('orderCreatTime',self.item.buyOrder.createDate);
                    this.pushView('/myCenter/orderDetail',{buyOrderId:targetId});
                }

                this.save('orderListTimeData',self.timeData);
            },
            MillisecondToDate(msd) {
                let Millisecond =msd/1000;
                let time =new Date();
                if (null != Millisecond && "" != Millisecond) {
                    if (Millisecond >60 && Millisecond < 60 * 60) {
                        return time.Decode(msd).minutes + "分钟" + time.Decode(msd).seconds + "秒";
                    }
                    else if (Millisecond >= 60 * 60 && Millisecond < 60 * 60 * 24) {
                        return time.Decode(msd).hours + "小时" +
                            time.Decode(msd).minutes + "分钟" +
                            time.Decode(msd).seconds + "秒";
                    }
                    else if(Millisecond >= 60 * 60 * 24){
                        return time.Decode(msd).day + "天" +
                            time.Decode(msd).hours + "小时" +
                            time.Decode(msd).minutes + "分钟" +
                            time.Decode(msd).seconds+ "秒";
                    }
                    else {
                        return time.Decode(msd).seconds + "秒";
                    }
                }
            },
            btnClickCallback () {
                this.$parent.$parent.dotData()
            },
            orderListBtnClick (type,orderId) {
                let self = this;
                let url,params;
                //立即支付
                if(type == 1){
                    let waitPayOrderData;
                    if (self.type == 'experience') {
                        waitPayOrderData = self.item.experienceOrder
                    } else {
                        waitPayOrderData = self.item.buyOrder
                    }
                    //付款订单数据存缓存
                    self.save('payData',waitPayOrderData);
                    self.pushView('/pay')
                }
                //取消订单
                if (type == 2) {

                    if (self.type == 'experience') {
                         url = CTX_URL + '/index/member/experienceOrder/cancel';
                         params = {"experienceOrderId": orderId};
                    } else {
                        url = CTX_URL + '/index/member/buyOrder/cancel';
                        params = {"buyOrderId": orderId};
                    }

                    this.confirm('我们的宝贝还在等待主人的宠幸，您怎么忍心拒绝我',(index)=>{
                        if(index == 1){
                            self.postQuery(true,url,params,response => {
                                if(response.status == 1){
                                    self.$parent.$parent.orderList.forEach((sub,index)=>{
                                        if(sub == self.item){
                                            self.$parent.$parent.orderList.splice(index,1)
                                        }
                                    });
                                    self.btnClickCallback();
                                    self.tip('取消成功！')
                                }
                            });

                        }
                    },"","取消订单");
                }
                //确认收货
                if (type == 3) {

                    if (self.type == 'experience') {
                        url = CTX_URL + '/index/member/experienceOrder/confirmDelivery';
                        params = {"experienceOrderId": orderId};
                    } else {
                        url = CTX_URL + '/index/member/buyOrder/confirmDelivery';
                        params = {"buyOrderId": orderId};
                    }

                    this.confirm('请检查并确认商品外观是否完整无损坏',(index)=>{
                        if (index == 1) {
                            self.postQuery(true,url,params,response =>{
                                if (response.status == 1) {
                                    self.$parent.$parent.orderList.forEach((sub,index)=>{
                                        if (sub == self.item) {
                                            self.$parent.$parent.orderList.splice(index,1)
                                        }
                                    });
                                    self.btnClickCallback();
                                    self.tip('确认收货成功！')
                                }

                            });


                        }
                    },"","确认收货")
                }
                //查看物流
                if (type == 4) {
                    this.save('checkDelivery.orderNo',self.orderNo);
                    this.pushView('/checkDelivery')
                }
                //购买商品
                if (type == 5) {
                    this.pushView('/buyExperienceGood',{ orderId: orderId})
                }
                //归还商品
                if (type == 6) {
                    this.pushView('/returnGoods',{ orderId: orderId})
                }
                //支付尾款
                if (type == 7) {
                    this.remove('confirmOrder.address');
                    this.pushView('/appointOrder',{
                        type: 'order',
                        id: orderId
                    })
                }
                //立即评价
                if (type == 9) {
                    this.save('judgeGoodData',self.item);
                    this.pushView('/goodsJudge',{ orderId: orderId})
                }
                //立即评价
                if (type == 9) {
                    this.save('judgeGoodData',self.item);
                    this.pushView('/goodsJudge',{ orderId: orderId})
                }
                //删除订单
                if (type == 10) {

                    if (self.type == 'experience') {
                        url = CTX_URL + '/index/member/experienceOrder/delete';
                        params = {"experienceOrderId": orderId};
                    } else {
                        url = CTX_URL + '/index/member/buyOrder/delete';
                        params = {"buyOrderId": orderId};
                    }

                    this.confirm('  ',(index)=>{
                        if (index == 1) {
                            self.postQuery(true,url,params,response =>{
                                if (response.status == 1) {
                                    self.$parent.$parent.orderList.forEach((sub,index)=>{
                                        if (sub == self.item) {
                                            self.$parent.$parent.orderList.splice(index,1)
                                        }
                                    });
                                    self.btnClickCallback();
                                    self.tip('删除订单成功')
                                }
                            });


                        }
                    },"","删除订单")
                }
            },

        },
        computed: {
            getImgUrl: function(){
                return this.imgUrl + this.img;
            }
        },
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common.less";
    .type{
        height: .78rem;
        line-height: .78rem;
        padding: 0 .3rem 0 .4rem;
        position: relative;
        .border-1px-bottom();
        p{
            float: left;
            font-size: @f-18;
            color: @color-66;
        }
        b{
            position: absolute;
            right: .2rem;
            top: 50%;
            line-height: .2rem;
            margin-top: -.15rem;
            font-size: @f-18;
            color: @color-33;
            padding: 0.05rem .15rem;
            border-radius: .15rem;
        }
    }
    .orderCondent{
        overflow: hidden;
        padding:0 .1rem 0 .4rem;
        box-sizing: border-box;
        .goodsItem{
            position: relative;
            padding:.2rem 0 ;
            overflow: hidden;
            box-sizing: border-box;
            .border-1px-bottom();
            .img{
                float: left;
                width: 1.4rem;
                height: 1.39rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .text{
                float: left;
                width: 3.8rem;
                height: 1.4rem;
                box-sizing: border-box;
                padding-left:.3rem ;
                h2{
                    font-size:@f-22;
                    line-height: .4rem;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: @color-33;
                }
                h3{
                    font-size:@f-16;
                    line-height: .4rem;
                    color: @color-99;
                    margin-bottom:.25rem;
                }
                h4{
                    font-size:@f-20;
                    color: @color-66;
                }
            }
            &.noborder:before{
                border:none;
            }
        }
    }
    .orderButton{
        height: .8rem;
        box-sizing: border-box;
        padding: 0 .3rem 0 .4rem;
        background: @color-ff;
        text-align: center;
        p{
            float: left;
            line-height: .8rem;
            color: @color-33;
            font-size: @f-20;
            b{
                font-size: @f-20;
                color: @color-error;
            }
        }
        span{
            display: inline-block;
            float: right;
            line-height: .24rem;
            color: @color-33;
            font-size: @f-20;
            margin: .28rem 0 .28rem .24rem;
            padding: 0 0 0 .24rem;
            border-left: 1px solid @color-e4;
            text-align: right;
            &:last-child{
                border:none;
            }
            &.active{
                color: @color-gold-dark;
            }
        }
    }
</style>
