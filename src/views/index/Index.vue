<template>
    <div>
        <v-header></v-header>
        <v-banner height="4rem"
                  :dataList="bannerList" ></v-banner>

        <div class="indexNavBlock">
            <div class="navbox" v-for="item in senceList" @click="goTarget(item)" :key="item.id">
                <img v-lazy="IMG_URL+item.bgPhoto" />
                <span v-text="item.name"></span>
                <!--<div class="shade"></div>-->
            </div>

            <v-recommend :list="recommendList"></v-recommend>

            <div class="loadingbox" v-show="showBottom">
                <div  v-if="isBottom">已经到底了</div>
                <div class="loading" v-else></div>
            </div>
        </div>
        <!--<v-footer :index=true v-show="bottomShow"></v-footer>-->
        <!--<v-footer :index=true></v-footer>-->
    </div>
</template>

<script type="text/ecmascript-6">
    import router from '../../router';
    import header from '../../components/header/indexHeader.vue';
    import banner from '../../components/banner/Banner.vue';
    import recommend from '../../components/recommend/recommend.vue';
    import footer from '../../components/footer/Footer.vue';
    export default {
        name: 'index',
        data: function(){
            return {
                scroll : true,   //避免快速滚动，无限拉取数据源
                showBottom : false,

                IMG_URL:IMG_URL,
                scorllHeight:"",
//                recomendParam:{
//                    gopage:1
//                },

                bannerList:[],
                senceList:[],
                recommendList:[],
                isBottom:false,

                scrollTop:'',
//                bottomShow:false
            }
        },
        created () {
            this.requestBanner ();
            this.getChannelScript(this.requestRecommendData);
        },

        mounted () {

        },
        methods:{

            bindWindow () {
                document.getElementsByTagName('html')[0].style.height = "auto";
                document.getElementsByTagName('body')[0].style.height = "auto";
                this.$root.$el.style.height = "auto";

                let top = this.$store.state.indexScrollTop;
                window.scrollTo(0,top);

                window.addEventListener('scroll', this.scrollFunction, false);
//                this.bottomShow = true
            },
            requestBanner () {
                let self = this;
                if (!this.$store.state.firstOpen && this.find('indexBannerList')) {
                    self.bannerList = this.find('indexBannerList');
                }
                else {
                    self.getQuery(false,
                        CTX_URL + '/index/advertisement/3',
                        (response) => {
                            if (response.status === 1) {
                                let list = [];
                                for (let i = 0; i < response.data.length; i++) {
                                    let item = {
                                        url: response.data[i].url,
                                        img: IMG_URL + response.data[i].dpPhoto,
                                        title: ''
                                    };
                                    list.push(item);
                                }
                                self.bannerList = list;
                                self.$store.commit('indexOpened');
                                self.save('indexBannerList',list);
                            }
                        })
                }
            },
            requestRecommendData () {
                let self = this;
                if (!this.$store.state.firstOpen && this.find('indexRecomendList')) {
                    self.recommendList = this.find('indexRecomendList');
                }
                else {

                    this.getQuery(true,CTX_URL + '/index/collocation/recommend',function(response){
                        if (response.status === 1) {
                            self.recommendList =  response.data;

                            self.save('indexRecomendList',response.data);
//                        let maxPage =Math.ceil(response.page.count/response.page.pageSize);
//                        if(maxPage <= self.recomendParam.gopage){
//                            self.overBottom()
//                        }
//                        self.showLoading = true;
//                        self.overBottom()
                        }

                    })
                }

            },

            // 滚动触发方法
            scrollFunction () {
                let self = this;

                this.scrollTop = window.scrollY;
                if(self.scrollFunc) self.scrollFunc();
                if (this.scroll) {
                    let totalheight = parseFloat(window.innerHeight) + parseFloat(window.scrollY) ;
                    if (document.body.clientHeight <= totalheight + 200) {
                        self.scroll = false;
                        self.isBottom = true;
                        setTimeout(function(){
                            self.showBottom = false
                        },1000);
                    }
                }
            },

            getChannelScript (callback) {
                let self =this;
                let questParam = self.senceParam;

                if (!this.$store.state.firstOpen && this.find('indexChanelList')) {
                    self.senceList = this.find('indexChanelList');
                }
                else {
                    self.postQuery(false,
                        CTX_URL + '/index/channel/1',
                        { type:2},
                        function(response){
                            if (response.status === 1) {

                                for(let i=0;i<response.page.list.length;i++){
                                    self.senceList.push(response.page.list[i]);
                                }
                                self.save('indexChanelList',response.page.list);
                            }
                        })
                }

                if(callback) callback();

            },

            goTarget (item) {
                if(item.name == "明星穿搭专区") return;
                if(item.scene.id != '' ){
                    this.pushView('/collocationList',{
                        pId:item.scene.parent.id,
                        sceneId:'',
                        gopage:1
                    })
                }
                else {
                    window.location.href = item.url
                }
            }

        },
        beforeDestroy () {
            document.getElementsByTagName('html')[0].style.height = "100%";
            document.getElementsByTagName('body')[0].style.height = "100%";
            this.$root.$el.style.height = "100%";

            window.removeEventListener('scroll', this.scrollFunction, false);

            this.$store.commit('setScrollTop',this.scrollTop);
        },
        components:{
            'v-header': header,
            'v-banner': banner,
            'v-recommend':recommend,
            'v-footer': footer,
        },

    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/css/common.less";
    body .main .router-view .vux-slider .vux-indicator-right > a > i.vux-icon-dot{
        background: red !important;
    }
    /*.main{
        height:auto;
    }*/
    .indexNavBlock{
        width: 100%;
        padding:0.08rem 0.08rem 0.98rem 0.08rem;
        box-sizing: border-box;
        .navbox {
            height: 1.94rem;
            width: 100%;
            position: relative;
            margin-bottom: 0.08rem;
            img {
                width: 100%;
                height: 100%;
            }
            span {
                position: absolute;
                left: .22rem;
                bottom: .17rem;
                font-size: .24rem;
                color: @color-ff;
                z-index: 99;
            }
            .shade{
                position: absolute;
                left: 0;
                bottom: 0;
                height:1rem;
                width:100%;
                opacity: 0.5;
                background: -webkit-gradient(linear,0% 30%, 0% 0%, from(#000000), to(transparent));
                z-index: 9;
            }
        }
        .loadingbox {
            position: relative;
            width: 100%;
            height: 0.6rem;
            text-align: center;
            > div {
                font-size:0.2rem;
                line-height:0.6rem;
            }

        }
    }
    .loading {
        position: absolute;
        width: 0.6rem;
        height: 0.6rem;
        left: 0px;
        top: 0px;
        right: 0px;
        bottom: 0px;
        margin: auto;
        background: url('../../assets/images/loading.gif') center no-repeat;
        background-size: 100%;
    }
    .rotate {
        display: inline-block;
        transform: rotate(-180deg);
    }
    .pullup-done{
        line-height:40px;
    }
    .pullup-arrow {
        transition: all linear 0.2s;
        color: #666;
        font-size: 25px;
    }
    .pullup-loading{
        font-size: 16px;
    }
</style>
