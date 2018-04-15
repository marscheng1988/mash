<template>
    <div>
        <div class="type">
            <p>订单编号:{{orderNo}}</p><b>{{orderTypeText}}</b>
        </div>
        <div class="orderCondent" :class="{noBottom:!afterService}" v-for="term in produceList" :key="term.id" >
            <div class="goodsItem">
                <div class="img"><img :src="imgUrl + term.produce.goods.icon"/></div>
                <div class="text" >
                    <h2>{{term.goodsTitle}}</h2>
                    <h3>{{term.produceName}}</h3>
                    <h4>￥&nbsp;{{term.priceBuy}}&nbsp;<b>X{{term.num}}</b></h4>
                </div>
            </div>
            <div class="orderButton" v-if="afterService">
                <span class="active" @click="applyAfterService(term)">{{afterService}}</span>
            </div>
        </div>
        <div class="timeCut appoint" v-if="orderType == 2">预约时间:<span>{{item.appointDate.substring(-1,10)}}</span></div>
        <div class="timeCut" v-if="cutTimeShow">付款剩余时间:<span>{{closeTime}}</span></div>
        <div class="order-footer">
            <div class="footerbox" @click="showService">
                <i class="kefu"></i>
                <span>客服</span>
            </div>
            <div v-for="term in bottons" @click="btnAction(term.type,item.id)" :key="term.type" class="btn">{{term.text}}</div>
        </div>
    </div>

</template>
<script type="text/ecmascript-6">
    //import HeaderComponent from '../../views/'

    export default{
        props: [
            'item',
            'tiggerShow'
        ],
        data(){
            return {
                bottons:[],
                imgUrl: IMG_URL,
                produceList:[],
                orderStyle:'',

                bottomShow:'',
                orderTypeText:'',
                afterService:'',
                memberData:'',

//                creatTime:'',        //创建时间
                closeTime:'',
                timeData : this.find('orderListTimeData'),
                createDate: this.find('orderCreatTime'),
                cutTimeShow:false,

                orderNo : this.item.orderNo,
                statusMember : this.item.statusMember,  //1待支付，2待发货，3待收货，5体验中，7退货中，98交易完成，99交易关闭
                statusPay: this.item.statusPay,         //1待支付，2待付定金，3待付尾款，98支付完成
                orderType: this.item.type,              //1体验，2预约体验，3购买，4预约购买
                statusJudge: this.item.statusJudge,     //1待评价，2已评价，99评价关闭
                statusSystem: this.item.statusSystem,   //0待结算，1待支付，2待发货，3待收货，4已送达，5体验中（已确认收货），6决策中，7退货中，98交易完成，99交易关闭
                appointStockStatus:this.item.statusSystem //1待采购，2采购中，3已到货
            }
        },
        beforeMount () {
            console.log(this.item)
            if(this.item.experienceOrder != undefined){
                this.produceList = this.item.buyProduceList;
                this.orderStyle = 'buy'
            } else {
                this.produceList = this.item.experienceProduceList;
                this.orderStyle = 'experience'
            }
        },
        mounted () {

            let self = this;

            let nowTime = Date.parse(self.timeData.nowDate.replace(/-/g,'/'));

            if(self.statusMember == 0) {
                self.orderTypeText = '交易完成';
                this.bottomShow = false;

            }
            else if(self.statusMember == 1){
                self.cutTimeShow = true;
                //订单类型
                if(self.statusPay ==1){
                    if(self.orderType == 1)
                        self.orderTypeText = "待付款";
                }
                else if(self.statusPay ==2){
                    if(self.orderType == 2)
                        self.orderTypeText = "待付定金";
                }
                else if(self.statusPay ==3){
                    if(self.orderType == 2)
                        self.orderTypeText = "预约体验尾款待支付";

                    if(self.orderType == 4)
                        self.orderTypeText = "预定尾款待支付";
                }

                //支付状态为待支付和待付定金的时候，需要倒计时和立即付款
                if(self.statusPay == 1 ||self.statusPay == 2){

                    //处理时间，倒计时
                    let closeMils = this.timeData.closeMinute*60*1000;
                    let creatTime =Date.parse(self.createDate.replace(/-/g,'/'));

                    let closeTime = creatTime + closeMils;

                    let closeLastTime = closeTime-nowTime;
                    self.closeTime = self.MillisecondToDate( closeLastTime );
                    if(closeLastTime <= 0) {
                        self.cutTimeShow = false;
                        self.closeTime = '0秒';
                        self.bottons =[
//                            {
//                                text:'删除订单',
//                                type:10
//                            },
                        ];
                        self.orderTypeText = '订单关闭';
                        return
                    }
                    //执行倒计时
                    let timer =setInterval(function(){
                        closeLastTime -= 1000;
                        self.closeTime = self.MillisecondToDate( closeLastTime);
                        if(closeLastTime <= 0){
                            self.cutTimeShow = false;
                            self.closeTime = '0秒';
                            clearInterval(timer);
                            self.bottons =[
                                {
                                    text:'删除订单',
                                    type:10
                                }
                            ];
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
                        }
                    ];

                }
                else if(self.statusPay == 3){

                    this.bottomShow = false;
                    self.bottons = [];

                    if(self.appointStockStatus == 3){
                        this.bottomShow = true;
                        self.bottons =[
                            {
                                text:'支付尾款',
                                type:7,
                                active:true
                            }

                        ];
                    }
                }

            }
            else if(self.statusMember == 2){
                this.orderTypeText = "待发货";

            }
            else if(self.statusMember == 3){
                this.orderTypeText = "待收货";
                this.bottons =[
                    {
                        text:'确认收货',
                        type:3,
                    },
                    {
                        text:'查看物流',
                        type:4
                    }

                ];
            }
            else if (self.statusMember == 5){
                this.orderTypeText = "体验中";

                if (self.item.fullRefundFlag == 0){
                    this.afterService = '申请售后';
                }
                else if (self.item.fullRefundFlag == 1){
                    this.afterService = '查看售后进度';
                }

                if(self.statusSystem == 6){
                    this.bottons =[
                        {
                            text: '归还商品',
                            type: 6
                        }

                    ];
                }else {
                    this.bottons =[
                        {
                            text:'立即购买',
                            active:true,
                            type:5
                        },
                        {
                            text:'归还商品',
                            type:6
                        }
                    ];
                }
            }
            else if (self.statusMember == 7) {
                this.orderTypeText = "退货中";
                this.afterService = '退货中';
                this.bottons =[

                ];
            }
            else if (self.statusMember == 98 ) {
                this.orderTypeText = "交易完成";
                this.afterService = '申请售后';
                if (self.statusJudge == 1) {
                    if ( self.orderStyle = 'experience'){
                        this.bottons =[
                            {
                                text:'立即评价',
                                type:9
                            },
                            {
                                text:'立即购买',
                                active:true,
                                type:5
                            }

                        ];
                    } else {
                        this.bottons =[
                            {
                                text:'立即评价',
                                type:9
                            }
                        ]

                    }
                }
                else if (self.statusJudge == 2) {
                    if ( self.orderStyle = 'experience'){
                        this.bottons =[
                            {
                                text:'立即购买',
                                active:true,
                                type:5
                            }

                        ];
                    }
                }


            }
            else if (self.statusMember == 99){
                this.orderTypeText = "交易关闭";
                this.bottons =[
                    {
                        text:'删除订单',
                        type:10
                    }

                ];
            }

            this.loadJS ()
        },
        methods: {
            applyAfterService (term) {
                let self = this;

                this.save('afterServiceOrderId',self.item.id);
                this.save('afterServiceGoods',term);

                if(self.orderStyle == 'buy'){
                    self.pushView('/afterService',{buyOrderId:term.id})
                }else {
                    self.pushView('/afterService',{experienceOrderId:term.id})
                }
            },
            btnAction (type,orderId) {
                let self = this;
                let url,params;
                //立即支付
                if(type == 1){
                    let waitPayOrderData = {
                        statusPay: self.item.statusPay,
                        moneyTotal : self.item.moneyTotal,
                        moneyAppoint: self.item.moneyAppoint,
                        id: self.item.id
                    };

                    self.save('payData',waitPayOrderData);
                    this.pushView('/pay')
                }

                //取消订单
                if(type == 2){
                    this.confirm('我们的宝贝还在等待主人的宠幸，您怎么忍心拒绝我',function(index){
                        if(index == 1){
                            if(self.orderStyle == 'buy'){
                                url = CTX_URL + '/index/member/buyOrder/cancel';
                                params = {"buyOrderId": orderId}

                            }
                            else {
                                url = CTX_URL + '/index/member/experienceOrder/cancel';
                                params = {"experienceOrderId": orderId}
                            }
                            self.postQuery(true,url, params ,function(response){
                                console.log(response)
                                if(response.status == 1){
                                    self.tip('取消成功！')
                                    setTimeout(() =>{
                                        self.backToView()
                                    },300)

                                }
                            })
//
                        }
                    },"","取消订单");
//                    this.pushView('/buyExperienceGood',{ orderId: orderId})
                }
                //确认收货
                if(type == 3){
                    this.confirm('请检查并确认商品外观是否完整无损坏',(index)=>{
                        if(index == 1){

                            if(self.orderStyle == 'buy'){
                                url = CTX_URL + '/index/member/buyOrder/confirmDelivery';
                                params = {"buyOrderId": orderId}

                            } else {
                                url = CTX_URL + '/index/member/experienceOrder/confirmDelivery';
                                params = {"experienceOrderId": orderId}
                            }
                            self.postQuery(true,url,params,response =>{
                                console.log(response)
                                if(response.status == 1){
                                    self.tip('确认收货成功！');
                                    setTimeout(() =>{
                                        self.backToView()
                                    },300)

                                }
                            });

                        }
                    },"","确认收货")
                }
                //查看物流
                if(type == 4){
                    this.save('checkDelivery.orderNo',self.orderNo);
                    this.pushView('/checkDelivery')
                }
                //购买商品
                if(type == 5){
                    this.pushView('/buyExperienceGood',{ orderId: orderId})
                }
                //归还商品
                if(type == 6){
                    this.pushView('/returnGoods',{ orderId: orderId})
                }
                //支付尾款
                if(type == 7){
                    this.remove('confirmOrder.address');
                    this.pushView('/appointOrder',{
                        type: 'order',
                        id: orderId
                    })
                }
                //立即评价
                if(type == 9){
                    this.save('judgeGoodData',self.item);
                    this.pushView('/goodsJudge',{ orderId: orderId})
                }
                //删除订单
                if(type == 10){
                    this.confirm('删除订单',(index)=>{
                        if(index == 1){
                            if(self.orderStyle == 'buy'){
                                url = CTX_URL + '/index/member/buyOrder/delete';
                                params = {"buyOrderId": orderId}

                            } else {
                                url = CTX_URL + '/index/member/experienceOrder/delete';
                                params = {"experienceOrderId": orderId}
                            }

                            self.postQuery(true,url,params,response =>{
                                if(response.status == 1){
                                    self.tip('删除成功！')
                                    setTimeout(() =>{
                                        self.backToView()
                                    },300)

                                }
                            });

                        }
                    })
                }
            },
            showService () {
                let self = this;
                self.getQuery(false,CTX_URL + '/index/member/info',response => {
                        self.memberData = response.data;
                        ysf.config({
                            uid:self.memberData.memberDTO.id,//用户ID
                            name:self.memberData.memberDTO.usercode,//用户帐号
                            email:self.memberData.memberDTO.email,//邮箱
                            mobile:self.memberData.memberDTO.mobile,//联系电话
                            data:JSON.stringify([
                                {"key":"name","label":"真实姓名","value":self.memberData.memberDTO.name},
                                {"key":"nickname","label":"昵称","value":self.memberData.memberDTO.nickname},
                                {"key":"sex","label":"性别","value":self.memberData.memberDTO.sex},
                                {"key":"level","label":"会员级别","value":self.memberData.memberDTO.level},//请使用levelPoint转换成会员等级
                                {"key":"point","label":"积分","value":self.memberData.memberDTO.point},
                                {"key":"birthday","label":"生日","value":self.memberData.memberDTO.birthday},
                                {"key":"age","label":"年龄","value":self.memberData.memberDTO.age},
                                {"key":"orderNo","label":"订单号","value":self.orderNo}
                            ])
                        });
                        location.href = ysf.url()
                });

            },
            //加载连接客服所需资源
            loadJS () {
                let oScript = document.createElement('script');
                oScript.src = "https://qiyukf.com/script/3ff3dab7b19cbe99627bf07fcf1122ba.js";
                document.getElementsByTagName('body')[0].appendChild(oScript);
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
        },
        created(){

        },
        components:{

        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common.less";
    .type{
        height: .78rem;
        line-height: .78rem;
        padding: 0 .3rem 0 .4rem;
        position: relative;
        background: #fff;
        position: relative;
        .border-1px-bottom();
        p{
            float: left;
            font-size: @f-18;
            color: @color-66;
        }
        b{
            float: right;
            line-height: .78rem;
            font-size: @f-18;
            color: @color-33;
            border-radius: .15rem;
        }
    }
    .timeCut{
        margin-top:.2rem;
        height: .8rem;
        padding: 0 .3rem;
        background: @color-ff;
        line-height: .8rem;
        color: @color-33;
        font-size: @f-20;
        position: relative;
        .border-1px-bottom();
        span{
            padding-left: .2rem;
            font-size: @f-20;
            color: @color-error;
        }
        &.appoint{
            font-size: @f-24;
            span{
                float: right;
                color: @color-33;
            }
        }
    }
    .orderCondent{
        overflow: hidden;
        padding-left:.4rem;
        box-sizing: border-box;
        background: #fff;
        position: relative;
        .border-1px-bottom();
        &.noBottom{
            border: none;
            &:last-child .goodsItem{
                border: none;
            }
        }
        .goodsItem{
            position: relative;
            padding:.2rem 0 ;
            width: 100%;
            overflow: hidden;
            box-sizing: border-box;
            .border-1px-bottom();
            .img{
                float: left;
                width: 1.4rem;
                height: 1.4rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .text{
                float: left;
                width: 4.3rem;
                height: 1.4rem;
                box-sizing: border-box;
                padding-left:.2rem ;
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
                    margin-bottom:.2rem;
                }
                h4{
                    font-size:@f-20;
                    color: @color-33;
                    b{
                        float: right;
                        font-size:@f-20;
                        color: @color-33;
                    }
                }
            }
        }
    }
    .orderButton{
        height: .8rem;
        box-sizing: border-box;
        padding: 0 .3rem;
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
    .order-footer{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: .98rem;
        background-color:#504e4f;
        z-index: 99;
        .footerbox{
            float: left;
            height: 100%;
            text-align: center;
            overflow: hidden;
            color: @color-ff;
            width: .846rem;
            &:active{
                background:@color-66
            }
            i{
                display: block;
                width: 100%;
                height: 0.6rem;
                box-sizing: border-box;
                padding: 0.1rem;
                background-size: 0.35rem 0.35rem;
                background-repeat: no-repeat;
                background-position: center;
                &.kefu{
                    background-image:url("images/kefu.png") ;
                }
            }
            span{
                display: block;
                width: 100%;
                height: 0.37rem;
                line-height: 0.28rem;
                font-size: 0.2rem;
            }
        }
        >.btn{
            float: right;
            height: .98rem;
            width: 1.92rem;
            background: @color-33;
            color: @color-ff;
            font-size: .24rem;
            line-height: .98rem;
            text-align: center;
            &:last-child{
                background: @color-66;
            }
        }
    }
</style>
