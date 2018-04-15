<template>
    <div class="slide-page" v-show="pageShow">
        <transition name="fade">
            <div class="mask" v-show="contentShow" @click="hidePage"></div>
        </transition>
        <transition name="slide">
            <div class="content" v-show="contentShow">
                <div class="header">分类</div>
                <scroller lock-x
                          scrollbarY
                          :bounce="true"
                          :height="getHeight"
                          ref="pageScroller">
                    <div>
                        <fold class="parent-item" v-for="item in list" :name="item.name" :key="item.name">
                            <div @click="callback" :class="sceneId===scene.id?'scene-item selected':'scene-item'" v-for="scene in item.childList" :scene-id="scene.id" :pid="scene.parent.id">{{scene.name}}</div>
                        </fold>
                    </div>
                </scroller>
                <div class="confirm-footer">
                    <div @click="hidePage">取消</div>
                    <div @click="hidePage">确认</div>
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
            'callback',
            'sceneId',
        ],
        data(){
            return {
                pageShow: false,
                contentShow: false,
                height: -window.innerWidth/6.4*(.88+.8) + '',
            }
        },
        methods: {
            showPage: function(){
                this.pageShow = true;
                this.contentShow = true;
            },
            hidePage: function(){
                this.contentShow = false;
                setTimeout(()=>{
                    this.pageShow = false;
                }, 300)
            },
            changeSceneId: function(){

            }
        },
        created(){

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
        },
        components:{
            Scroller,
            fold
        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/css/common.less";
    .slide-page{
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
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
        margin: .1rem;
        font-size: .2rem;
        &.selected{
            background: @color-33;
            color: @color-ff;
        }
    }
    .confirm-footer{
        position: absolute;
        width: 100%;
        bottom: 0;
        height: .88rem;
        background: #000000;
        >div{
            width: 50%;
            height: 100%;
            float: left;
            text-align: center;
            color: @color-ff;
            line-height: .88rem;
            font-size: .3rem;
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
</style>