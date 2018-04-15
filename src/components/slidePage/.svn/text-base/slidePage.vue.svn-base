<template>
    <div class="slide-page" v-show="pageShow" @touchmove="touchmove">
        <transition name="fade">
            <div class="mask" v-show="contentShow" @click="hidePage"></div>
        </transition>
        <transition :name="'slide-' + type">
            <div :class="'content ' + type" v-show="contentShow">
                <slot></slot>
                <confirm-footer
                    :confirm="hidePageConfirm"
                    :cancel="hidePageCancel"
                ></confirm-footer>
            </div>
        </transition>
    </div>
</template>
<script type="text/ecmascript-6">
    import confirmFooter from '../../components/footer/confirmFooter.vue'

    export default{
        props: [
            'slideType', //页面动画类型：left,right,top,bottom,
            'confirmFun',   //确认按钮事件
            'cancelFun',    //取消按钮事件
            'updateFun',    //更新事件
        ],
        data(){
            return {
                pageShow: false,
                contentShow: false,
                type: this.$props.slideType ? this.$props.slideType : 'right'
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
            hidePageCancel: function(){
                this.contentShow = false;
                setTimeout(()=>{
                    this.pageShow = false;
                    if(this.cancelFun) this.cancelFun();
                }, 300)
            },
            hidePageConfirm: function(){
                this.contentShow = false;
                setTimeout(()=>{
                    this.pageShow = false;
                    if(this.confirmFun) this.confirmFun();
                }, 300)
            },
            touchmove: function(e){
                e.preventDefault();
            }
        },
        created(){

        },
        updated:function(){
            this.$nextTick(() => {
                if(this.updateFun) this.updateFun()
            });
        },
        computed: {

        },
        components:{
            confirmFooter
        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/css/common.less";
    .slide-page{
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
    }
    .content{
        position: absolute;
        height: 100%;
        background: @color-ff;
        z-index: 999;
        &.left{
            left: 0;
            top: 0;
            width: 4.8rem;
            height: 100%;
        }
        &.right{
            right: 0;
            top: 0;
            width: 4.8rem;
            height: 100%;
        }
        &.top{
            top: 0;
            left: 0;
            width: 100%;
            height: 80%;
        }
        &.bottom{
            bottom: 0;
            left: 0;
            height: 80%;
            width: 100%;
        }
    }
    .mask{
        position: absolute;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 1);
        opacity: .5;
        z-index: 999;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }

    /*从左滑出*/
    .slide-left-enter-active {
        transition: all .3s ease-in-out;
    }
    .slide-left-enter{
        transform: translateX(-100%);
        opacity: 0;
    }
    .slide-left-leave-active {
        transition: all .3s ease-in-out;
        transform: translateX(-100%);
        opacity: 0;
    }

    /*从右滑出*/
    .slide-right-enter-active {
        transition: all .3s ease-in-out;
    }
    .slide-right-enter{
        transform: translateX(100%);
        opacity: 0;
    }
    .slide-right-leave-active {
        transition: all .3s ease-in-out;
        transform: translateX(100%);
        opacity: 0;
    }

    /*从上滑出*/
    .slide-top-enter-active {
        transition: all .3s ease-in-out;
    }
    .slide-top-enter{
        transform: translateY(-100%);
        opacity: 0;
    }
    .slide-top-leave-active {
        transition: all .3s ease-in-out;
        transform: translateY(-100%);
        opacity: 0;
    }

    /*从下滑出*/
    .slide-bottom-enter-active {
        transition: all .3s ease-in-out;
    }
    .slide-bottom-enter{
        transform: translateY(100%);
        opacity: 0;
    }
    .slide-bottom-leave-active {
        transition: all .3s ease-in-out;
        transform: translateY(100%);
        opacity: 0;
    }
</style>
