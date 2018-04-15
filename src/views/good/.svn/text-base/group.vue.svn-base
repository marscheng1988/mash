<template>
    <div>

        <scroller lock-x
                  scrollbarY
                  :bounce="true"
                  :height="height"
                  ref="scroller">
            <div style="padding-bottom: .98rem;">
                <!--轮播-->
                <div class="banner-outer" @touchmove="touchFun">
                    <v-banner height="5.5rem"
                              :dataList="getImgList"
                              :dotClass="'goods-detail-banner'"
                    ></v-banner>
                </div>

                <!--模特图-->
                <div v-if="modelList.length > 0 && !jewelFlag" class="model-pic-title"></div>
                <div v-if="modelList.length > 0 && !jewelFlag" :class="{'model-pic-list': !jewelFlag, 'model-pic-list-jewel': jewelFlag}">
                    <img v-for="item of modelList" class="model-pic" v-lazy="imgUrl + item">
                </div>

                <!--商品图册-->
                <div v-for="item of list" class="good-pic-mode">
                    <good-title :en="item.goods.englishName" :ch="item.goods.name" ></good-title>
                    <img class="good-pic" v-for="img of item.goods.goodsResources" v-lazy="imgUrl + img.url">
                </div>

                <!--商品参数-->
                <div class="good-params-title"></div>
                <div class="line"></div>

                <div v-for="item of list" class="good-params">

                    <!--珠宝类详情-->
                    <div v-if="jewelFlag" class="top">
                        <img class="img" v-lazy="imgUrl + item.goods.icon">
                        <div class="title">{{item.goods.title}}</div>
                    </div>
                    <div v-if="jewelFlag" class="content">

                        <!--精华服饰版-->
                        <div class="type">
                            <div class="name">
                                精华服饰版
                                <div class="j-top-left"></div>
                                <div class="j-top-right"></div>
                                <div class="j-bottom-left"></div>
                                <div class="j-bottom-right"></div>
                            </div>
                        </div>
                        <div class="mid-list">
                            <div class="item">浏览量：<span class="value">{{item.goods.viewCount || 0}}次</span></div>
                            <div class="item">已加购物车：<span class="value">{{item.goods.shoppingcartCount}}件</span></div>
                            <div class="item">销量：<span class="value">{{item.goods.sellNum}}件</span></div>
                        </div>
                        <div class="cut-line"></div>
                        <div class="params-list">
                            <div class="item" v-for="p of item.normalList">
                                <div class="name">{{p.key}}：</div>
                                <div class="value">
                                    <span :class="p.style">{{p.value}}</span>
                                </div>
                            </div>
                        </div>

                        <!--奢华定制版-->
                        <div class="type" v-if="item.jewelFlag">
                            <div class="name">
                                奢华定制版
                                <div class="j-top-left"></div>
                                <div class="j-top-right"></div>
                                <div class="j-bottom-left"></div>
                                <div class="j-bottom-right"></div>
                            </div>
                        </div>
                        <div class="mid-list" v-if="item.jewelFlag">
                            <div class="item">浏览量：<span class="value">{{item.goods.viewCount || 0}}次</span></div>
                            <div class="item">已加购物车：<span class="value">{{item.goods.shoppingcartCount}}件</span></div>
                            <div class="item">销量：<span class="value">{{item.goods.sellNum}}件</span></div>
                        </div>
                        <div class="cut-line" v-if="item.jewelFlag"></div>
                        <div class="params-list" v-if="item.jewelFlag">
                            <div class="item" v-for="p of item.specailList">
                                <div class="name">{{p.key}}：</div>
                                <div class="value">{{p.value}}</div>
                            </div>
                        </div>

                    </div>

                    <!--非珠宝类详情-->
                    <div v-if="!jewelFlag" class="top-2">
                        <img class="img" v-lazy="imgUrl + item.goods.icon">
                        <div class="title">{{item.goods.title}}</div>
                    </div>
                    <div v-if="!jewelFlag" class="content-2">
                        <div class="params-list-2">
                            <div class="item" v-for="p of item.normalList">
                                <div class="name">{{p.key}}</div>
                                <div class="value">
                                    <span :class="p.style">{{p.value}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--证书-->
                <div v-if="certificateList.length > 0" class="quality-title"></div>
                <div v-if="certificateList.length > 0" class="line"></div>
                <img v-if="certificateList.length > 0" class="certificate-img" v-for="img of certificateList" v-lazy="imgUrl + img">

                <!--查看尺码参考-->
                <div v-if="!showSize && introduction" @click="hideBtn" class="show-size-btn">查看尺码参考</div>

                <!--尺寸参考-->
                <div v-if="introduction && showSize" class="size-title"></div>
                <div v-if="introduction && showSize" class="line"></div>
                <div v-if="introduction && showSize" class="size-content">
                    <div class="n-info" v-html="introduction">{{introduction}}</div>
                </div>
            </div>
        </scroller>
        <v-footer
            data="groupData"
            :cId="cId"
            :collected="getCollected"
            commontType="group"
            :commontId="groupId"
        ></v-footer>
        <v-xfbox></v-xfbox>
    </div>
</template>
<script type="text/ecmascript-6">
    import {Scroller} from 'vux';
    import Footer from '../../views/collocation/collocationFooter.vue';
    import banner from '../../components/banner/Banner.vue';
    import goodTitle from '../../views/collocation/collocationTitle.vue';
    import xfBox from  '../../components/xuanfuBox/xfBox';

    export default{
        props: [

        ],
        data(){
            return {
                groupId: this.$route.query.groupId,
                getGroupUrl: CTX_URL + '/index/groupGoods/' + this.$route.query.groupId,
                imgUrl: IMG_URL,
                list: '',
                imgList: '',
                certificateList: [],
                height: -window.innerWidth/6.4*.98 + '',
                cId: '',
                collected: false,
                introduction: '',
                showSize: false,
                modelList: [],
                jewelFlag: false,   //商品是否属于珠宝

                groupData:''
            }
        },
        methods: {
            touchFun: function(e){
                //console.log(e.type);
            },
            hideBtn: function(){
                this.showSize =  true;
            }
        },
        updated:function(){
            this.$nextTick(() => {
                this.$refs.scroller.reset();
            });
            let imgs = document.querySelectorAll('img');
            for(let img of imgs){
                let className = img.className;
                if(className.indexOf('bind') == -1){
                    img.className = className + ' bind';
                    img.onload = ()=>{
                        this.$refs.scroller.reset();
                    }
                }
            }
        },
        created(){
            let self = this;
            this.$root.getQuery(true, this.getGroupUrl, data => {
                if(data.status === 1){

                    self.groupData = data.data;
                    /*封装banner图片*/
                    let imgList = [];
                    /*封装模特图*/
                    let modelList = [];
                    for(let img of data.data.list){
                        if(img.jewelFlag == true){
                            this.jewelFlag = true;
                        }
                        let item ={
                            url: '',
                            img: IMG_URL + img.goods.photo,
                            title: ''
                        };
                        if(img.goods.modelPhoto){
                            modelList.push(img.goods.modelPhoto);
                        }

                        imgList.push(item);
                    }
                    /*封装证书*/
                    let certificateList = [];

                    /*封装尺寸列表*/
                    let introductionList = [];

                    for(let item of data.data.list){

                        /*封装商品参数*/
                        let proplList = [];
                        for(let prop of item.goods.goodsPropList || []){
                            let value = '';
                            for(let val of prop.goodsPropvalue){
                                value += val.propvalue?val.propvalue.pvalueName:val.pvalue;
                            }
                            let attr = {
                                key: prop.property.propName,
                                value: value,
                            }
                            proplList.push(attr);
                        }
                        let normalList = proplList.concat();

                        normalList.splice(0, 0, {key: '商品单价', style: 'price-span', value: '￥' + item.produceMarrowPrice})
                        normalList.splice(2, 0, {key: '体验费',style: 'price-span', value: '￥' + (item.produceMarrowFee || '(未知)')})
                        normalList.splice(5, 0, {key: '库存', value: item.goods.stock + '件'})
                        item.normalList = normalList;

                        if(item.jewelFlag){
                            let specailList = proplList.concat();
                            specailList.splice(0, 0, {key: '商品单价', value: '￥' + item.produceLuxuriousPrice});
                            item.specailList = specailList;
                        }
                        if(item.goods.certificatePhoto && !certificateList.includes(item.goods.certificatePhoto)){
                            certificateList.push(item.goods.certificatePhoto);
                        }

                        introductionList.push(item.goods.introduction|| '');
                    }

                    this.introduction = [...new Set(introductionList)].join('');

                    this.certificateList= certificateList;
                    this.imgList = imgList;
                    this.modelList = [...new Set(modelList)];
                    this.list = data.data.list;
                    this.cId = data.data.collocation.id;
                    this.collected = data.data.collocation.isCollect === '1'? true: false;

                }
            })
        },
        computed: {
            getImgList: function(){
                return this.imgList;
            },
            getCollected: function(){
                return this.collected;
            },
        },
        components:{
            Scroller,
            goodTitle,
            'v-footer': Footer,
            'v-banner': banner,
            'v-xfbox': xfBox
        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/css/common.less";

    /*轮播*/
    .banner-outer{
        position: relative;
        width: 100%;
        height: 5.5rem;
        padding-top: .55rem;
    }

    /*模特图*/
    .model-pic-title{
        position: relative;
        width: 100%;
        height: .78rem;
        margin-top: 1.05rem;
        margin-bottom: .56rem;
        background: url("images/model-title.png") center no-repeat;
        background-size: 100%;
    }
    .model-pic-list{
        position: relative;
        width: 100%;
        .model-pic{
            position: relative;
            width: 100%;
        }
    }
    .model-pic-list-jewel{
        position: relative;
        width: 6rem;
        margin-left: .2rem;
        .model-pic{
            position: relative;
            display: inline-block;
            height: 2.8rem;
            width: 2.8rem;
            margin: .1rem;
        }
    }

    /*商品图册*/
    .good-pic-mode{
        position: relative;
        width: 100%;
        .good-pic{
            position: relative;
            width: 100%;
            margin: 0;
        }
    }

    /*商品参数*/
    .good-params-title{
        position: relative;
        width: 100%;
        height: .78rem;
        margin-top: .5rem;
        margin-bottom: .56rem;
        background: url("images/good-params.png") center no-repeat;
        background-size: 100%;
    }

    /*分割线*/
    .line{
        position: relative;
        height: 0px;
        width: 5.8rem;
        margin-left: .3rem;
        .border-1px-top();
    }

    .good-params{
        position: relative;
        .top{
            position: relative;
            height: 3.13rem;
            width: 100%;
            .img{
                position: absolute;
                height: 1.06rem;
                width: 1.26rem;
                top: .96rem;
                left: 2.57rem;
            }
            .title{
                position: absolute;
                top: 2.13rem;
                width: 80%;
                left: 10%;
                font-size: .2rem;
                line-height: .22rem;
                height: .22rem;
                color: @color-99;
                text-align: center;
                font-family: @PFSC-M;
                .ellipsis;
            }
        }
        .top-2{
            position: relative;
            height: 2.8rem;
            width: 100%;
            .img{
                position: absolute;
                height: 1.06rem;
                width: 1.26rem;
                top: .96rem;
                left: 2.57rem;
            }
            .title{
                position: absolute;
                top: 2.13rem;
                width: 80%;
                left: 10%;
                font-size: .2rem;
                line-height: .22rem;
                height: .22rem;
                color: @color-33;
                text-align: center;
                font-family: @PFSC-M;
                .ellipsis;
            }
        }
        .content{
            position: relative;
            .type{
                position: relative;
                height: .4rem;
                width: 100%;
                text-align: center;
                margin-bottom: .34rem;
                .name{
                    position: absolute;
                    left: 50%;
                    padding: 0 .2rem;
                    height: .4rem;
                    line-height: .4rem;
                    font-size: .22rem;
                    font-family: @PFSC-M;
                    text-align: center;
                    color: @color-33;
                    transform: translateX(-50%);
                    .j-top-left{
                        position: absolute;
                        left: 0;
                        top: 0;
                        height: .09rem;
                        width: .06rem;
                        border-top: 1px solid @color-99;
                        border-left: 1px solid @color-99;
                    }
                    .j-top-right{
                        position: absolute;
                        right: 0;
                        top: 0;
                        height: .09rem;
                        width: .06rem;
                        border-top: 1px solid @color-99;
                        border-right: 1px solid @color-99;
                    }
                    .j-bottom-left{
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        height: .09rem;
                        width: .06rem;
                        border-bottom: 1px solid @color-99;
                        border-left: 1px solid @color-99;
                    }
                    .j-bottom-right{
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        height: .09rem;
                        width: .06rem;
                        border-bottom: 1px solid @color-99;
                        border-right: 1px solid @color-99;
                    }
                }

            }
            .mid-list{
                position: relative;
                width: 5.8rem;
                margin-left: .3rem;
                .box-flex;
                .item{
                    position: relative;
                    text-align: center;
                    font-size: .2rem;
                    line-height: .22rem;
                    color: @color-99;
                    font-family: @PFSC-M;
                    .box-flex-1;
                    .value{
                        font-size: .2rem;
                        color: @color-33;
                        /*font-family: @PFSC-B;*/
                    }
                }
            }
            .cut-line{
                position: relative;
                width: 5.06rem;
                margin: .18rem .67rem;
                height: .1rem;
                .border-1px-top();
            }
            .params-list{
                position: relative;
                margin-left: 1.3rem;
                width: 4.9rem;
                padding-bottom: .5rem;
                .item{
                    position: relative;
                    display: inline-block;
                    height: .38rem;
                    width: 2.4rem;
                    .name{
                        position: absolute;
                        width: 1.2rem;
                        top: 0;
                        left: 0;
                        font-size: .18rem;
                        color: @color-66;
                        line-height: .20rem;
                        font-family: @PFSC-R;
                        .ellipsis;
                    }
                    .value{
                        position: absolute;
                        right: 0;
                        width: 1.2rem;
                        top: 0;
                        font-size: .18rem;
                        color: @color-66;
                        line-height: .20rem;
                        font-family: @PFSC-R;
                        .ellipsis;
                        span{
                            font-size: .18rem;
                            color: @color-66;
                            line-height: .20rem;
                            font-family: @PFSC-R;
                            padding-left: .05rem;
                            &.price-span{
                                padding-left: 0;
                            }
                        }
                    }

                }
            }
        }
        .content-2{
            .params-list-2{
                position: relative;
                margin-left: .8rem;
                width: 6rem;
                padding-bottom: .5rem;
                .item{
                    position: relative;
                    display: inline-block;
                    height: .6rem;
                    width: 2.4rem;
                    margin-right: .5rem;
                    .name{
                        position: absolute;
                        width: 1.2rem;
                        top: 0;
                        left: 0;
                        font-size: .2rem;
                        color: @color-66;
                        line-height: .6rem;
                        font-family: @PFSC-R;
                        .ellipsis;
                    }
                    .value{
                        position: absolute;
                        height: .6rem;
                        right: .1rem;
                        width: 1.2rem;
                        top: 0;
                        font-size: .18rem;
                        color: @color-66;
                        line-height: .60rem;
                        font-family: @PFSC-R;
                        .ellipsis;
                        span{
                            font-size: .18rem;
                            color: @color-66;
                            line-height: .20rem;
                            font-family: @PFSC-R;
                            padding-left: .05rem;
                            &.price-span{
                                padding-left: 0;
                            }
                        }
                    }

                }
            }
        }
    }

    /*品质保证*/
    .quality-title{
        position: relative;
        width: 100%;
        height: .78rem;
        margin-top: 1rem;
        margin-bottom: .56rem;
        background: url("images/quality-title.png") center no-repeat;
        background-size: 100%;
    }
    .certificate-img{
        position: relative;
        width: 100%;
    }

    /*尺寸参考*/
    .show-size-btn{
        position: relative;
        width: 2.04rem;
        height: .5rem;
        line-height: .5rem;
        text-align: center;
        font-size: .24rem;
        background: @color-ff;
        border: 1px solid @color-33;
        border-radius: .5rem;
        font-family: @PFSC-R;
        margin: 1rem 0 0rem 2.18rem;
    }
    .size-title{
        position: relative;
        width: 100%;
        height: .78rem;
        margin-top: .5rem;
        margin-bottom: .56rem;
        background: url("images/size-title.png") center no-repeat;
        background-size: 100%;
    }
    .size-content{
        position: relative;
        width: 100%;
    }

</style>
