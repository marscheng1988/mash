<template>
    <div class="slide-page" v-show="pageShow">
        <transition name="fade">
            <div class="mask" v-show="contentShow" @click="hidePage"></div>
        </transition>
        <transition name="slide">
            <div class="content" v-show="contentShow">
                <!--<div class="header">分类</div>-->
                <scroller lock-x
                          scrollbarY
                          :bounce="true"
                          :height="getHeight"
                          ref="pageScroller">
                    <div>
                        <fold class="parent-item"
                              v-for="item in list"
                              :name="item.name"
                              ref="folds"
                              :updateFun="refreshScroll"
                              :key="item.name"
                              @expend="expend">
                            <div @click="itemSceneClick(scene.id,item.name)"
                                 class="scene-item" :class="{selected : selectedSceneIds.includes(scene.id)}"
                                 v-for="scene in item.childList"
                                 :scene-id="scene.id"
                                 >{{scene.name}}</div>
                        </fold>
                    </div>
                </scroller>
                <div class="bottomSelect">
                    <div class="filter-select" @click="openColorSelector">
                        <span class="fold-title">搭配色系</span>
                        <div class="fold-content">
                            {{selectedColourName || '未选择'}}
                        </div>
                        <img class="more-icon" src="../../views/search/images/more.png">
                    </div>
                    <div class="filter-select" @click="openPriceSelector">
                        <span class="fold-title">价格区间</span>
                        <div class="fold-content">
                            {{priceMapName || '未选择'}}
                        </div>
                        <img class="more-icon" src="../../views/search/images/more.png">
                    </div>
                    <div class="confirm-footer">
                        <span></span>
                        <div @click="hidePage">取消</div>
                        <div @click="confirmClick">确认</div>
                    </div>
                </div>
            </div>
        </transition>

    </div>
</template>
<script type="text/ecmascript-6">
    import fold from '../../components/fold/fold.vue'
    import {Scroller} from 'vux'

    export default{
        props: [
            'list',
            'itemSceneClick',
            'itemColorClick',
            'itemPriceClick',
            'confirmClick',
            'selectedSceneIds',
            'sceneId',
            'colorList',
            'selectedColourName',
            'priceMapName',
            'openColorSelector',
            'openPriceSelector',
            'hideCallBack',
        ],
        data(){
            return {
                pageShow: false,
                contentShow: false,
                height: -window.innerWidth*2.48/6.4 + '',

                showSelector: false,
                selectorIndex: 0,
                selectDataType: '',
            }
        },
        methods: {
            showPage: function(){
                this.pageShow = true;
                this.contentShow = true;
            },
            hidePage: function(){
                this.contentShow = false;
                if (this.hideCallBack) {
                    this.hideCallBack()
                }

                setTimeout(()=>{
                    this.pageShow = false;
                }, 300)
            },
//            changeSceneId: function(){
//
//            },
            refreshScroll (index) {
//                console.log(index)
                this.$nextTick(() => {
                    this.$refs.pageScroller.reset()
                })
            },
            expend: function(data){
                for(let item of this.$refs.folds){
                    if(item.name !== data.name && item.expend === true){
                        item.expend = false;
                    }
                }

                let scrollerHeight = this.$refs.pageScroller.styles.height.split('px')[0] - 0;

//                if(data.top + data.height > scrollerHeight){
//                    this.$refs.pageScroller.reset({
//                        top: data.top + data.height - scrollerHeight
//                    })
//                }
            }
        },
        created(){
//            console.log(this.colorList)
        },
        updated:function(){
            this.$nextTick(() => {
                if(this.$refs.pageScroller) this.$refs.pageScroller.reset();
            });
        },
        computed: {
            getHeight: function(){
                return this.height;
            },
            getSelecortList () {
                let list = [];
                if(this.selectDataType === 'priceMap'){
                    list = this.priceMap;
                }else if(this.selectDataType === 'colorList'){
                    list = this.colorList;
                }
                return list;
            }
        },
        components:{
            Scroller,
            fold,
        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/css/common.less";

    .slide-page{
        position: absolute;
        top: 0;
        right: 0;
        width: 200%;
        height: 100%;
        z-index: 999;
    }
    .content{
        position: absolute;
        top: 0;
        right: 0;
        width: 4.8rem;
        height: 100%;
        background: @color-ff;
    }
    .header{
        height: .8rem;
        background: @color-f4;
        text-align: center;
        font-size: .24rem;
        line-height: .8rem;
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
        margin: .05rem .05rem;
        font-size: .2rem;
        &.selected{
            background: @color-33;
            color: @color-ff;
        }
    }
    .confirm-footer{
        position: relative;
        width: 100%;
        height: .88rem;
        background: #000000;
        >div{
            width: 50%;
            height: 100%;
            float: left;
            text-align: center;
            color: @color-ff;
            line-height: .88rem;
            font-size: .26rem;
        }
        span{
            position: absolute;
            width:0;height:.48rem;
            border-left:1px dotted #999;
            left: 50%;
            top:.2rem;
        }
    }

    .mask{
        position: absolute;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 1);
        opacity: .5;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }

    .slide-enter-active {
        transition: all .3s ease-in-out;
    }
    .slide-enter{
        transform: translateX(200%);
        opacity: 0;
    }
    .slide-leave-active {
        transition: all .3s ease-in-out;
        transform: translateX(200%);
        opacity: 0;
    }
    .bottomSelect{
        position: absolute;
        bottom:0;
        left:0;
        overflow: hidden;
        width: 100%;
    }
    .filter-select{
        position: relative;
        height: .8rem;
        width: 100%;
        .border-1px-bottom();
        background: @color-f4;
        .fold-title{
            width: 100%;
            position: relative;
            font-size: .24rem;
            line-height: .8rem;
            height: .8rem;
            padding-left: .3rem;
            .ellipsis;
        }
        .fold-content{
            position: absolute;
            height: 100%;
            right: .8rem;
            top: 0;
            line-height: .8rem;
            color: @color-33;
            font-size: .24rem;
        }
        .more-icon{
            position: absolute;
            right: .3rem;
            top: 50%;
            margin-top: -.05rem;
        }
    }

</style>
