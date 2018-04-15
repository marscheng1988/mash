<template>
    <div class="page">
        <c-nativeScroll
            ref="scrollWarp"
            :param="param"
            :url="questUrl"
            :questCallback="questCallback">
                <div class="ui-page-head" >
                    <p>体验订单</p>
                </div>
                <!--<tab :line-width=0-->
                     <!--active-color='#333'-->
                     <!--class="tabStyle"-->
                     <!--v-model="index">-->
                    <!--<tab-item >全部</tab-item>-->
                    <!--<tab-item >待支付</tab-item>-->
                    <!--<tab-item >待收货</tab-item>-->
                    <!--<tab-item >-->
                        <!--体验中-->
                        <!--<span :class="{remindBlock:expOrder.length == 0}">11</span>-->
                    <!--</tab-item>-->
                    <!--<tab-item >待评价</tab-item>-->
                <!--</tab>-->
                <div class="tabWarp" >
                    <div class="tabStyle" :class="{tabTerm:tabFixed}">
                        <span @click="index = 0" :class="{active:index == 0}">
                            全部
                        </span>
                        <span @click="index = 1;waitpayCount = false" :class="{active:index == 1}">
                            <b v-if="memberData && memberData.waitPayCount !=0 && waitpayCount " class="remindBlock">{{memberData.waitPayCount}}</b>
                            待支付
                        </span>
                        <span @click="index = 2;waitReceive = false" :class="{active:index == 2}">
                            <b v-if="memberData && memberData.waitReceiveCount + memberData.waitSendCount !=0 && waitReceive" class="remindBlock">{{memberData.waitReceiveCount + memberData.waitSendCount}}</b>
                            待收货
                        </span>
                        <span @click="index = 3;experience = false" :class="{active:index == 3}">
                            <b v-if="memberData && memberData.experiencingCount !=0 && experience" class="remindBlock">{{memberData.experiencingCount}}</b>
                            体验中
                        </span>
                        <span @click="index = 4;waitJudge = false" :class="{active:index == 4}">
                            <b v-if="memberData && memberData.waitJudgeCount !=0 && waitJudge" class="remindBlock">{{memberData.waitJudgeCount}}</b>
                            待评价
                        </span>
                    </div>
                </div>
                <div class="order-line"></div>
                <transition name="switch" v-if="orderList !== ''&& orderList.length !== 0">
                    <div>
                        <div class="orderItem"  v-if="bottomTimeData" v-for="item in orderList" :key="item.experienceOrder.id" >
                            <c-good :item="item"
                                    :borderShow="item.experienceOrder.statusMember == 2"
                                    :timeData="bottomTimeData"
                                    :type="orderType"
                            ></c-good>
                            <div class="order-line"></div>
                        </div>
                    </div>
                </transition>

                <no-data v-else :icon="icon"
                        :message="message"
                        :buttonText = "buttonText"
                        :warpHeight ="nodataHeight"
                        :buttonUrl="buttonUrl">
                </no-data>
        </c-nativeScroll>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common.less";
    .tabWarp{
        width:100%;
        height: .88rem;
        .tabStyle{
            background-color: #fff;
            height: .88rem;
            display: flex;
            display: -webkit-flex;
            padding:0 .4rem;
            justify-content: space-between;
            > span{
                position: relative;
                display: inline-block;
                line-height: .88rem;
                font-size: .24rem;
                color:#999;
                &.active{
                    color: #333;
                    font-weight: 600;
                }
            }
            &.tabTerm{
                position: fixed;
                top:0;
                left: 0;
                width: 100%;
                box-sizing: border-box;
                -webkit-box-sizing: border-box;
                z-index: 99;
            }
        }
    }
    .switch-enter-active {
        transition: all .3s ease-in-out;
    }
    .switch-leave-active {
        transition: all .3s ease-in-out;
    }
    .switch-enter{
        transform: translate3D(-100%, 0, 0);
    }
    .switch-leave{
        transform: translate3D(100%, 0, 0);
    }
    .page{
        background: @color-f4;
        overflow: hidden;
    }
    .hasRemind{
        position: relative;
    }
    .remindBlock{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0.18rem;
        right: -0.2rem;
        width: .24rem;
        height: .24rem;
        text-align: center;
        background: red;
        color: #fff;
        font-size: 0.18rem;
        border-radius: 100%;
    }
    .orderItem{
        /*margin-top: .2rem;*/
        background: #fff;
        overflow: hidden;

    }
    .order-line{
        position: relative;
        height: .2rem;
        width: 100%;
        background: @color-f4;
        .border-1px-top();
    }
</style>
<script type="text/ecmascript-6">
    import axios from 'axios';
    import { Tab, TabItem, Scroller } from 'vux';
    import noData from '../../../components/noDatablock/noDatablock.vue';
    import cGood from './c-orderList-good.vue';
    import cNativeScroll from '../../../components/native-scroll-page/native-scroll-page.vue';

    export default{
        name:'experienceOrderList',
        data () {
            return{
                index: '0',
                orderList:[],
                imgUrl: IMG_URL,
                waitPayData:[],
                preSendData:[],
                closeTime:'',
                tabFixed:false,

                questUrl:CTX_URL + '/index/member/experienceOrder/',
                questMethod:'get',
                param:' ',

                memberData:'',
                orderType:'experience',

                icon:require('./images/emptyOrder.png'),
                message:'您还没有订单',
                buttonText:'去逛逛',
                buttonUrl:'/sceneList',
                nodataHeight: window.innerHeight - (window.innerWidth/6.4)*3.56 - 44 + 'px',

                waitpayCount: true,
                waitReceive: true,
                experience: true,
                waitJudge:  true,
            }
        },
        watch: {
            index () {
                let self = this;
//                this.orderList = [];
                this.questData(self.index);
                if(this.index == 1){
                    this.waitpayCount = false
                }
                if(this.index == 2){
                    this.waitReceive = false
                }
                if(this.index == 3){
                    this.experience = false
                }
                if(this.index == 4){
                    this.waitJudge = false
                }
            }
        },
        created () {
            let self = this;
            this.index = Number(this.$route.query.tab);
//            self.bottomTimeData = this.$refs.scrollWarp.timeData;
//            this.getQuery(true,CTX_URL + '/index/member/experienceOrder/1',function(response){
//                self.bottomTimeData = response.data;
//            })
        },
        computed:{
            dataArr () {
                return this.$refs.scrollWarp.dataArr
            },
            bottomTimeData(){
                return this.$refs.scrollWarp.timeData
            }
        },
        mounted (){

            this.dotData()

        },
        methods:{
//            scrolling () {
//                console.log("111")
//                if(window.scrollY >= window.innerWidth*3.56/6.4){
//                    this.tabFixed = true
//                }else{
//                    this.tabFixed = false
//                }
//            },
            questCallback () {
                this.orderList = this.dataArr;
            },
            questData (index) {
                let self = this;
                self.replaceView('/myCenter/experienceOrderList',{
                    tab:index
                });
                if(index == 0 )
                    self.paramMethod();

                else if(index == 1 )
                    self.paramMethod(1);

                else if(index == 2 )
                    self.paramMethod(3);

                else if(index == 3 )
                    self.paramMethod(5);

                else if(index == 4 )
                    self.paramMethod('',1)
            },
            paramMethod (status,judge) {
                let self = this;

                if(status !== undefined && judge == undefined){
                    if(status == 3){
                        this.param = '?statusMember[]=3&statusMember[]=2' ;
                    }else{
                        this.param =  '?statusMember[]=' + status;
                    }

                }else if( judge == undefined && status == undefined)
                    this.param = '';

                else if(status == '' && judge !== undefined){
                    this.param =  '?statusJudge=' + judge;
                }

//                this.getQuery(true,questUrl,function(response){
//                    if(response.page.list != undefined && response.page.list.length !== 0){
//                        self.maxPage = Math.ceil(response.page.count/response.page.pageSize);
//                        response.page.list.forEach(function(item,index,arr){
//                            self.order.push(item)
//                        });
//                        self.bottomTimeData = response.data;
//                        self.scrollStates = true;
//                        self.replaceView('/myCenter/experienceOrderList',{
//                            tab:self.index
//                        })
//                    }else{
//                        self.maxPage = 0
//                    }
//
//                })
            },
//            loadMore () {
//                let self = this;
//                if (this.scrollStates) {
//                    let totalheight = parseFloat(window.innerHeight) + parseFloat(window.scrollY);
//                    if (document.body.clientHeight <= totalheight + 200) {
//                        self.scrollStates = false;
//                        self.gopage += 1;
//                        if(self.gopage > self.maxPage) return;
//                        self.questData (self.index)
//                    }
//                }
//            },
            dotData () {
                let self = this;
                this.logGetQuery(true,CTX_URL + '/index/member/info',function(response){
                    console.log(response)
                    if(response.status == 1){
                        self.memberData = response.data
                    }
                });
            }


        },
        components:{
//            Tab,
//            TabItem,
//            Scroller,
            cGood,
            noData,
            cNativeScroll
        },
        beforeDestroy () {
            this.$refs.scrollWarp.beforeDestroy()
        }
    }
</script>
