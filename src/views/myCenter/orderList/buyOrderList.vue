<template>
    <div>
        <c-nativeScroll
                        ref="scrollWarp"
                        :questMethod="questMethod"
                        :param="param"
                        :url="questUrl"
                        :questCallback="questCallback">
            <div class="ui-page-head" >
                <p>购买订单</p>
            </div>
            <!--<tab :line-width=0-->
                 <!--:class="{tabTerm:tabFixed}"-->
                 <!--active-color='#333'-->
                 <!--defaultColor="#999"-->
                 <!--v-model="index">-->
                <!--<tab-item >全部</tab-item>-->
                <!--<tab-item >待支付</tab-item>-->
                <!--<tab-item >待收货</tab-item>-->
                <!--<tab-item >交易结束</tab-item>-->
            <!--</tab>-->
            <div class="tabWarp" >
                <div class="tabStyle" :class="{tabTerm:tabFixed}">
                    <span @click="index = 0" :class="{active:index == 0}">全部</span>
                    <span @click="index = 1" :class="{active:index == 1}">待支付</span>
                    <span @click="index = 2" :class="{active:index == 2}">待收货</span>
                    <span @click="index = 3" :class="{active:index == 3}">交易结束</span>
                </div>
            </div>
            <div class="order-line"></div>
            <transition name="switch" v-if="orderList !== ''&& orderList.length !== 0">
                <div>
                    <div class="orderItem" v-if="bottomTimeData" v-for="item in orderList" :key="item.buyOrder.id" >
                        <c-good :item="item"
                                :borderShow="item.buyOrder.statusMember == 2"
                                :timeData="bottomTimeData"
                                :type="orderType"></c-good>
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
    .ui-page{
        background: @color-f4;
        overflow: hidden;
    }

    .orderItem{
        background: #fff;
        overflow: hidden;
        .type{
            height: .78rem;
            line-height: .78rem;
            padding: 0 .2rem;
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
                    height: 1.4rem;
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
                        color: @color-66;
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
                float: right;
                line-height: .8rem;
                color: @color-33;
                font-size: @f-24;
                margin-left:.24rem;
                &.active{
                    color: @color-gold-dark;
                }
            }
        }
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
    import { Tab, TabItem } from 'vux'
    import cNativeScroll from '../../../components/native-scroll-page/native-scroll-page.vue';
    import noData from '../../../components/noDatablock/noDatablock.vue';
    import cGood from './c-orderList-good.vue';
    export default{
        name:'buyOrderList',
        data () {
            return{
                index: '',
                orderList:[],
                imgUrl: IMG_URL,
                questUrl:CTX_URL + '/index/member/buyOrder/',
                questMethod:'get',
                param:' ',
                nowTime:Date.parse(new Date()),
                tabFixed:false,

                memberData:'',
                orderType:'buy',

                icon:require('./images/emptyOrder.png'),
                message:'您还没有订单',
                buttonText:'去逛逛',
                buttonUrl:'/sceneList',
                nodataHeight: window.innerHeight - (window.innerWidth/6.4)*3.56 - 44 + 'px',
            }
        },
        watch: {
            index () {
                let self = this;
                this.questData (self.index);
            }
        },
        created () {
            let self = this;
            this.index = Number(this.$route.query.tab);
//            self.bottomTimeData = this.$refs.scrollWarp.timeData;
//            this.getQuery(true,CTX_URL + '/index/member/buyOrder/1',function(response){
//                self.bottomTimeData = response.data;
//            })

        },
        beforeMount () {

        },
        mounted () {

            console.log(this.$refs.scrollWarp)
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
            let self = this;
            self.memberData = this.find('memberData')
//            this.logGetQuery(true,CTX_URL + '/index/member/info',function(response){
////                console.log(response)
//                if(response.status == 1){
//                    self.memberData = response.data
//                }
//            });

        },
        methods:{
            questCallback () {
                this.orderList = this.dataArr
            },
//            scrolling () {
//                if(window.scrollY >= window.innerWidth*3.56/6.4){
//                    this.tabFixed = true
//                }else{
//                    this.tabFixed = false
//                }
//            },
            questData (index) {
                let self = this;
                if(index === 0 ){
                    self.changeUrl();
                    //发送请求
                    this.replaceView('/myCenter/buyOrderList',{
                        tab:index
                    })
                }
                else if(index === 1 ){
                    self.changeUrl(1);
                    this.replaceView('/myCenter/buyOrderList',{
                        tab:index
                    })
                }
                else if(index === 2 ){
                    self.changeUrl(3);
                    this.replaceView('/myCenter/buyOrderList',{
                        tab:index
                    })
                }
                else if(index === 3 ){
                    self.changeUrl(99);
                    this.replaceView('/myCenter/buyOrderList',{
                        tab:index
                    })
                }
            },
            changeUrl (status,judge) {
                let self = this;
                if(status !== undefined && judge == undefined){
                    if(status == 3){
                        self.param = '?statusMember[]=3&statusMember[]=2' ;
                    } else {
                        self.param =  '?statusMember[]=' + status;
                    }

                }
                else if(status == '' && judge !== undefined)
                    self.param = '?statusJudge=' + judge;
                else if(status == undefined && judge == undefined)
                    self.param = '';

            },
        },
        beforeDestroy () {
            this.$refs.scrollWarp.beforeDestroy()
        },
        components:{
            Tab,
            TabItem,
            cGood,
            noData,
            cNativeScroll
        },
    }
</script>
