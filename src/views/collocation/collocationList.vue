<template>
    <div>
        <div class="header-outer">
            <div class="c-header">
                <scroller lock-y :bounce="true" ref="sceneScroll" :style="{width: '5.6rem', dispaly: 'inline-block'}">
                    <div :style="getTypeScrollWidth()">
                        <div class="scene-types" v-for="item in list" v-if="item.id === pId">
                            <div @click="showAllC"
                                 :class="sceneId===''?'selected':''"
                                 :style="{width: getTypeWidth('全部') + 'rem'}">全部</div>
                            <div @click="showC"
                                 v-for="type in item.childList"
                                 :class="sceneId===type.id?'selected':''"
                                 :scene-id="type.id"
                                 :style="{width: getTypeWidth(type.name) + 'rem'}">{{type.name}}</div>
                        </div>
                    </div>
                </scroller>
            </div>
        </div>
        <div @click="showChooseScenePage" class="expend-icon"></div>
        <scroller lock-x
                  scrollbarY
                  :bounce="true"
                  :height="height"
                  @on-pullup-loading="loadMore"
                  ref="scroller">
            <div>
                <img class="scene-head-img" v-lazy="getSceneHeadImg">
                <div class="type-info">
                    <img class="left-icon" src="../../views/collocation/images/introduce-icon.png">
                    <div class="right-info">{{getSceneDescribe}}</div>
                </div>
                <!--<div class="describe" v-html="getSceneDescribe">{{getSceneDescribe}}</div>-->
                <collocationMode v-for="item in cList" :item="item" :key="item.id" :clickCallback="clickMode"></collocationMode>
                <div class="emptyState" v-if="!cList || cList.length === 0"><p>暂无数据</p></div>
            </div>
        </scroller>
        <!--<v-footer ref="footer"></v-footer>-->
        <slide-page
            slideType="right"
            :updateFun="updateFun"
            :confirmFun="slidePageConfirm"
            ref="slidePage"
        >
            <div class="header">分类</div>
            <scroller lock-x
                      scrollbarY
                      :height="pageHeight"
                      ref="pageScroller">
                <div>
                    <fold class="parent-item"
                          v-for="item in list"
                          :updateFun="updateFun"
                          :name="item.name"
                          @expend="expend"
                          :key="item.name"
                          ref="folds"
                    >
                        <div @click="callback" :class="slidePageSceneId===scene.id?'scene-item selected':'scene-item'" v-for="scene in item.childList" :scene-id="scene.id" :pid="scene.parent.id">{{scene.name}}</div>
                    </fold>
                </div>
            </scroller>

        </slide-page>

        <v-xfbox></v-xfbox>
    </div>
</template>
<script type="text/ecmascript-6">
    import collocationMode from '../../views/collocation/collocationMode.vue'
    import Footer from '../../components/footer/Footer.vue'
    import slidePage from '../../components/slidePage/slidePage.vue'
    import fold from '../../components/fold/fold.vue'
    import {Scroller} from 'vux'
    import xfBox from  '../../components/xuanfuBox/xfBox';

    export default{
        data(){
            return{
                //height: -window.innerWidth/6.4*.98 + '',
                //pageHeight: (-window.innerWidth/6.4*(.98+.8)).toFixed(2) + 'px',
                height: -window.innerWidth/6.4*.8 + '',
                pageHeight: (-window.innerWidth/6.4*(.98 + .8)).toFixed(2) + 'px',
                list: '',
                getCUrl: CTX_URL + '/index/collocation/',
                sceneId: this.$route.query.sceneId,
                pId: this.$route.query.pId,
                slidePageSceneId: this.$route.query.sceneId,
                slidePagePId: this.$route.query.pId,
                goPage: 1,
                cList: this.find('collocationList'),
            }
        },
        computed: {
            getSceneHeadImg: function(){
                let img = '';
                for(let item of this.list){
                    if(item.id === this.pId){
                        if (this.sceneId != ''){
                            for (let sub of item.childList) {
                                if (sub.id === this.sceneId) {
                                    img = IMG_URL + sub.dpPhoto;
                                }
                            }
                        }
                        else {
                            img = IMG_URL + item.topPhoto;
                        }
                        break;
                    }
                }
                return img;
            },
            getSceneDescribe: function(){
                let html = '';
                for(let item of this.list){
                    if(item.id === this.pId){
                        html = item.description;
                        break;
                    }
                }
                return html;
            }
        },
        updated:function(){
            this.$nextTick(() => {
                if(this.$refs.scroller) this.$refs.scroller.reset();
                if(this.$refs.sceneScroll) this.$refs.sceneScroll.reset();
            });
        },
        created: function(){
            if(!this.list){
                this.getQuery(true, CTX_URL + '/index/scene/sceneList', (data)=>{
                    if(data.status === 1){
                        this.save('sceneList', data.data);
                        this.list = data.data;
                        this.getC();
                    }
                });
            }
        },
        methods: {
            updateFun: function(){
                if(this.$refs.pageScroller) {
                    this.$refs.pageScroller.reset()
                };
            },
            callback: function(e){
                let sceneId = e.currentTarget.getAttribute('scene-id');
                let pId = e.currentTarget.getAttribute('pid');

                this.slidePageSceneId = sceneId;
                this.slidePagePId = pId;

            },
            slidePageConfirm: function(){
                this.sceneId = this.slidePageSceneId;
                this.pId = this.slidePagePId;

                this.replaceView('/collocationList',{
                    pId: this.pId,
                    sceneId: this.sceneId,
                    gpPage: this.gpPage||1,
                })

                this.save('collocationList', []);
                this.save('collocationListPage', 1);
                this.getC();
            },
            showCDetail(){
                this.pushView('/collocationDetail', {})
            },
            getTypeWidth: function(name){
                return name.length*.24 + .6;
            },
            getTypeList: function(){
                for(let item in this.list){
                    if(item.id === this.pId){
                        //console.log(item.childList)
                        return item.childList;
                    }
                }
            },

            /**获取页面顶部导航栏高度*/
            getTypeScrollWidth: function(){
                for(let item of this.list){
                    if(item.id === this.pId){
                        let width = this.getTypeWidth('全部');
                        for(let type of item.childList){
                            width += this.getTypeWidth(type.name);
                        }
                        width = width
                        return {
                            width: width + 'rem'
                        };
                    }
                }
            },

            /**显示全部搭配*/
            showAllC: function(){
                this.replaceView('/collocationList',{
                    pId: this.pId,
                    gpPage: this.gpPage||1,
                })
                this.sceneId = '';
                this.getQuery(true, this.getCUrl + this.goPage + '?pId=' + this.pId, response => {
                    if(response.status === 1 && response.page.list){
                        if(this.goPage === 1){
                            this.save('collocationList', []);
                            this.save('collocationListPage', 1);
                        }
                        let cList = this.find('collocationList') || [];
                        cList = cList.concat(response.page.list);
                        this.save('collocationList', cList)
                        this.cList = cList;
                    }else{
                        this.save('collocationList', []);
                        this.cList = [];
                    }
                });
            },

            /**获取搭配*/
            getC: function(){
                let url = this.getCUrl + this.goPage + '?sceneId=' + this.sceneId;
                if(!this.sceneId){
                    url = this.getCUrl + this.goPage + '?pId=' + this.pId;
                }
                this.getQuery(true, url, response => {
                    if(response.status === 1 && response.page.list){
                        if(this.goPage === 1){
                            this.save('collocationList', []);
                            this.save('collocationListPage', 1);
                        }
                        let cList = this.find('collocationList') || [];
                        cList = cList.concat(response.page.list);
                        this.save('collocationList', cList)
                        this.cList = cList;
                    }else{
                        this.save('collocationList', []);
                        this.cList = [];
                    }
                });
            },

            /**显示某个分类下的搭配*/
            showC: function(e){
                if(this.$refs.slidePage && this.$refs.slidePage.pageShow === true){
                    this.$refs.slidePage.hidePage();
                }
                let sceneId = e.currentTarget.getAttribute('scene-id');
                let pId = e.currentTarget.getAttribute('pid');

                if(this.sceneId === sceneId) return;

                if(pId && pId !== this.pId){
                    this.pId = pId;
                }
                this.sceneId = sceneId;

                this.replaceView('/collocationList',{
                    pId: this.pId,
                    sceneId: this.sceneId,
                    gpPage: this.gpPage||1,
                })

                this.save('collocationList', []);
                this.save('collocationListPage', 1);
                this.getC();
            },
            loadMore: function(){
                this.getQuery(true, this.getCUrl + (this.goPage+1) + '?sceneId=' + this.sceneId, response => {
                    if(response.status === 1){
                        let cList = this.find('collocationList') || [];
                        cList = cList.concat(response.page.list);
                        this.save('collocationList', cList)
                        this.save('collocationListPage', this.goPage+1);
                        this.goPage++;
                        this.cList = cList;
                    }
                });
            },
            showChooseScenePage: function(){
                this.$refs.slidePage.showPage();
            },
            clickMode: function(e){
                let cId = e.currentTarget.getAttribute('c-id');
                this.pushView('/collocationDetail', {cId: cId});
            },
            expend: function(data){
                for(let item of this.$refs.folds){
                    if(item.name !== data.name && item.expend === true){
                        item.expend = false;
                    }
                }
                let scrollerHeight = this.$refs.pageScroller.styles.height.split('px')[0]-0;
                if(data.top + data.height > scrollerHeight){
                    this.$refs.pageScroller.reset({
                        top: data.top + data.height - scrollerHeight
                    })
                }
            }
        },
        components:{
            collocationMode,
            'v-footer': Footer,
            'v-xfbox': xfBox,
            Scroller,
            slidePage,
            fold
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/css/common.less";
    .router-view {
        height: 100%;
    }
    .header-outer{
        position: relative;
        height: .8rem;
        width: 100%;
        .border-1px-bottom();
    }
    .c-header{
        display: inline-block;
        height: .8rem;
    }
    .scene-types{
        position: relative;
        height: .8rem;
        div{
            height: 100%;
            display: inline-block;
            float: left;
            text-align: center;
            font-size: .22rem;
            line-height: .88rem;
            color: @color-99;
            &.selected{
                color: #000000;
            }
        }
    }
    .expend-icon{
        position: absolute;
        right: 0;
        top: 0;
        height: .8rem;
        width: .7rem;
        background: #fff url("images/expend-icon.png") center no-repeat;
        background-size: 35%;
    }
    .scene-head-img{
        position: relative;
        height: 8rem;
        width: 100%;
    }
    .type-info{
        position: relative;
        min-height: 1.6rem;
        background: @color-f4;
        .left-icon{
            position: absolute;
            left: 0;
            width: 1.92rem;
            height: 1.21rem;
            margin-top: .39rem;
        }
        .right-info{
            position: relative;
            margin-left: 1.92rem;
            width: 4.48rem;
            padding: .3rem .3rem .63rem;
            line-height: .32rem;
            font-size: .16rem;
            color: @color-66;
            box-sizing: border-box;
            text-align: left;
            font-family: PingFangSC-Regular;
        }
    }
    .describe{
        position: relative;
        padding: .3rem;
        font-size: .20rem;
        color: @color-33;
    }
    .header{
        height: .8rem;
        background: @color-f4;
        text-align: center;
        font-size: .24rem;
        line-height: .8rem;
        color: #000000;
    }
    .parent-item{
        position: relative;
        min-height: .8rem;
        .p-mode{
            position: relative;
            font-size: .24rem;
            line-height: .8rem;
            height: .8rem;
            padding-left: .3rem;
        }

    }
    .scene-item{
        position: relative;
        display: inline-block;
        text-align: center;
        height: .4rem;
        line-height: .4rem;
        padding: 0 .3rem;
        background: @color-f4;
        color: @color-33;
        border-radius: .4rem;
        margin: .1rem;
        font-size: .2rem;
        &.selected{
            background: @color-33;
            color: @color-ff;
        }
    }
</style>
