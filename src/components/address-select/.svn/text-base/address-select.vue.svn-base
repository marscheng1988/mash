<template>
    <div >
        <div class="addressShadow"></div>
        <div class="addressPage">
            <section>
                <div class="addressMark"><a class="markProvince"></a><a class="markCity"></a><a class="markArea"></a></div>
                <div class="addressScroll">

                    <div class="swiper-container provinceWrapper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="item in province">{{item.name}}</div>
                        </div>
                    </div>

                    <div class="swiper-container cityWrapper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="item in city">{{item.name}}</div>
                        </div>
                    </div>

                    <div class="swiper-container areaWrapper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="item in area">{{item.name}}</div>
                        </div>
                    </div>

                    <!--<div class="provinceWrapper" >
                        <ul>
                            <li>&nbsp;</li>
                            <li v-for="item in province">{{item.name}}</li>
                            <li>&nbsp;</li>
                            <li>&nbsp;</li>
                            &lt;!&ndash;<li>&nbsp;</li>&ndash;&gt;
                        </ul>
                    </div>
                    <div class="cityWrapper">
                        <ul>
                            <li>&nbsp;</li>
                            <li v-for="item in city">{{item.name}}</li>
                            <li>&nbsp;</li>
                            <li>&nbsp;</li>
                            &lt;!&ndash;<li>&nbsp;</li>&ndash;&gt;
                        </ul>
                    </div>
                    <div class="areaWrapper">
                        <ul>
                            <li>&nbsp;</li>
                            <li v-for="item in area">{{item.name}}</li>
                            <li>&nbsp;</li>
                            <li>&nbsp;</li>
                            &lt;!&ndash;<li>&nbsp;</li>&ndash;&gt;
                        </ul>
                    </div>-->
                </div>
            </section>
            <footer class="addressFooter">
                <span class="addressConfirm" @click="confirmArea">确定</span>
                <span class="addressCancel" @click="hidePanel">取消</span>
            </footer>
            <footer class="addressBottom">
                如您没有找到所在区域，请耐心等待，我们会陆续开通更多区域
            </footer>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import router from '../../router';
//    import IScroll from './iscroll-probe.js';
    import Swiper from './swiper-3.4.2.min.js';
//    import JRoll from 'jroll'
    export default {
        props:[

        ],
        data () {
            return{
                province: [],
                city: [],
                area: [],
                selectedPro: '',
                selectedCity: '',
                indexP: 0 ,
                indexC: 0 ,
                indexA: 0 ,
                init:true,
                initP: 0 ,
                initC: 0 ,
                initA : 0 ,
                areaId: ''
            }
        },
        computed:{
            areaDetail () {
                let self = this;
                return self.province[self.indexP].name
                        +self.city[self.indexC].name
                        + self.area[self.indexA].name
            }
        },
        watch :{
            indexP () {
                let self = this;
                if(self.province.length ===0) return;
                let targetId = this.province[this.indexP].id;
                this.requestCity({type:3,parentId:targetId});
            },
            indexC () {
                let self = this;
                if(self.city.length ===0) return;
                let targetId = this.city[this.indexC].id;
                this.requestArea({type:4,parentId:targetId});
            },
        },
        created () {
            let self = this;
            self.initP = this.$parent.initP;
            self.initC = this.$parent.initC;
            self.initA = this.$parent.initA;
            this.requestProvince();
        },
        updated () {

        },
        mounted () {

        },
        methods:{
            setColor (target,index) {
                for(let i = 0;i<target.length;i++){
                    target[i].style.color = "#999"
                }
                target[index +1].style.color = "#333";
            },
            hidePanel () {
                this.$parent.selectorShow = false
            },
            requestProvince () {
                let self = this;
                this.$root.postQuery(false,
                                    CTX_URL+'/index/area',
                                    {type:2},
                                    function(response){
                                        if(response.data && response.data.length != 0){
                                            self.province = response.data;
                                            let targetId = self.province[self.indexP].id;
                                            self.requestCity({type:3,parentId:targetId});
                                            setTimeout(function(){
                                                let provinceScroll = new Swiper('.provinceWrapper', {
                                                    initialSlide :0,
                                                    direction: 'vertical',
                                                    slidesPerView: 5,
                                                    centeredSlides : true,
                                                    freeMode: true,
                                                    freeModeSticky : true,
                                                    onTransitionEnd: function (swiper) {
                                                        self.indexP = swiper.activeIndex;
                                                    }
                                                });
                                            },100)

                                            /*setTimeout(function(){
//                                                let provinceScroll = new IScroll(".provinceWrapper",{snap:"li",vScrollbar:false});
                                                let provinceScroll = new JRoll(".provinceWrapper");

                                                if(self.init == true) {
                                                    provinceScroll.scrollTo(0,-self.initP*40);
                                                    self.indexP = Math.round((provinceScroll.y/40)*(-1));
                                                }
                                                provinceScroll.on("scrollEnd",function(){
                                                    self.indexP = Math.floor((this.y/40)*(-1));
                                                    this.scrollTo(0,-self.indexP*40,);
                                                    self.$parent.initP = self.indexP;
                                                    self.setColor(this.scroller.children,self.indexP)

                                                });
                                            },200)*/

                                        }
                                    })
            },
            requestCity (param) {
                let self = this;
                this.$root.postQuery(false,
                                    CTX_URL+'/index/area',
                                    param,
                                    function(response){
                                        if(response.data && response.data.length != 0){
                                            self.city = response.data;
                                            let targetId = self.city[self.indexC].id;
                                            self.requestArea({type:4,parentId:targetId});

                                            setTimeout(function(){
                                                let cityScroll = new Swiper('.cityWrapper', {
                                                    initialSlide :0,
                                                    direction: 'vertical',
                                                    slidesPerView: 5,
                                                    centeredSlides : true,
                                                    freeMode: true,
                                                    freeModeSticky : true,
                                                    onTransitionEnd: function (swiper) {
                                                        self.indexC = swiper.activeIndex;
                                                    }
                                                });
                                            },100)

                                            /*setTimeout(function(){
//                                                let cityScroll = new IScroll(".cityWrapper",{snap:"li",vScrollbar:false});
                                                let cityScroll = new JRoll(".cityWrapper");
                                                if(self.init == true) {
                                                    cityScroll.scrollTo(0,-self.initC*40);
                                                    self.indexC = Math.round((cityScroll.y/40)*(-1));
                                                }

                                                cityScroll.on("scrollEnd",function(){
                                                    self.indexC = Math.floor((this.y/40)*(-1));
                                                    this.scrollTo(0,-self.indexC*40);
                                                    self.$parent.initC = self.indexC;
                                                    self.setColor(this.scroller.children,self.indexC)
                                                });
                                            },200)*/

                                        }
                                    })
            },
            requestArea (param) {
                let self = this;
                this.$root.postQuery(false,CTX_URL+'/index/area',param,function(response){
                    if(response.data && response.data.length != 0){
                        self.area = response.data;
//                        self.indexA = 0;
//                        self.areaId = self.city[0].id;
                        self.areaId = self.area[self.indexA].id;

                        setTimeout(function(){

                            let areaScroll = new Swiper('.areaWrapper', {
                                initialSlide :0,
                                direction: 'vertical',
                                slidesPerView: 5,
                                centeredSlides : true,
                                freeMode: true,
                                freeModeSticky : true,
                                onTransitionEnd: function (swiper) {
                                    self.indexA = swiper.activeIndex;
                                }
                            });
                        },100)

                        /*setTimeout(function(){
//                            let areaScroll = new IScroll(".areaWrapper",{snap:"li",vScrollbar:false});
                            let areaScroll = new JRoll(".areaWrapper");
                            if(self.init == true) {
                                areaScroll.scrollTo(0,-self.initA*40);
                                self.init = false
                            }
                            areaScroll.on("scrollEnd",function(){
//                                setTimeout(function () {
                                    self.indexA = Math.round((areaScroll.y/40)*(-1));
                                    this.scrollTo(0,-self.indexA*40);
                                    self.$parent.initA = self.indexA;
                                    self.areaId = self.area[self.indexA].id;
                                    self.setColor(areaScroll.scroller.children,self.indexA)
//                                },10)
                            });
                        },200)*/

                    }
                })
            },
            confirmArea () {
                this.$parent.area = this.areaDetail;
                this.$parent.areaId = this.areaId;
                this.hidePanel ()
            }
        },


    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/css/common";

    .addressShadow {
        position: absolute;
        width: 100% ;
        height: 100% ;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
    }
    .addressPage {
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        overflow: hidden;
        font-size: 22px;
        margin-right: auto;
        vertical-align: middle;
        margin-left: auto;
        height: 320px;
        background: #FFFFFF;
        z-index: 9999999;
    }
    .addressMark {
        font-size: 18px;
        left: 0 ;
        width: 100% ;
        height: 42px;
        position: absolute;
        top: 140px;
        .border-1px-top-bottom();
        .markProvince {
            position: relative;
            margin-left: 76px;
            top: -2px;
        }
        .markCity {
            position: relative;
            margin-left: 40px;
            top: -2px;
        }
        .markArea {
            position: relative;
            margin-left: 42px;
            top: -2px;
        }
    }
    .addressScroll{
        display: flex;
        justify-content: space-between;
        background: #fff;
        width: 94% ;
        margin: 55px 3% 10px;
        height: 200px;
        text-align: center;
        line-height: 40px;
        touch-action: none;
        .provinceWrapper,.cityWrapper,.areaWrapper {
            position: absolute;
            top: 45px;
            bottom: 60px;
            width: 30%;
            height: 200px;
            margin-left: 10% ;
            margin-top: 17px;
            padding-right: 22px;
            overflow: hidden;
            z-index: 1;
            .swiper-slide {
                color: #999;
                &.swiper-slide-active {
                    color: #333;
                }
            }
            ul{
                width: 40%;
                li{
                    color: #999;
                    font-size: 14px;
                    height: 40px;
                    width: 100%;
                    word-break: break-all;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    &:nth-child(2){
                        color: #333;
                    }
                }
            }
        }

        .provinceWrapper {
            left: 0;
        }
        .cityWrapper {
            left: 26% ;
        }
        .areaWrapper {
            left: 50% ;
        }
    }

    .addressHeader {
        width: 100% ;
        height: 50px;
        background: #79C12F;
        text-align: center;
        color: #fff;
        line-height: 50px;
        font-size: 20px;

    }

    .addressFooter {
        width: 100% ;
        background: #f4f4f4;
        height: 50px;
        top: 0px;
        position: absolute;
        span{
            display: block;
            color: #000;
            padding: 10px 15px;
            font-size: 14px;
            line-height: 30px;
        }
        .addressConfirm {
            float: right;
        }
        .addressCancel {
            float: left;
        }
    }
    .addressBottom{
        position: absolute;
        bottom: 0px;
        height: 30px;
        text-indent:10px;
        background: #f4f4f4;
        width: 100% ;
        font-size:.18rem;
        color:#999;
        line-height:30px
    }


</style>
