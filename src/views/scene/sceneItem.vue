<template>
    <div class="scene-item">
        <!--<transition name="fold">-->
            <div v-show="!show" class="show-mode" @click="triggerMode">
                <img class="img" v-lazy="imgUrl + item.dpPhoto">
                <div class="name-ch">{{item.name}}</div>
                <div class="name-en">{{item.englishName}}</div>
            </div>
        <!--</transition>-->
        <transition name="fold">
            <div v-show="show" class="hide-mode">
                <div class="top" @click="triggerMode">{{item.name}}</div>
                <div class="type-list">
                    <div @click="showCollection" class="type-item" v-for="type in item.childList" :type-id="type.id">{{type.name}}</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        props: [
                'item',
                'index',
                'callbackFun'
        ],
        data(){
            return{
                show: false,
                imgUrl: IMG_URL
            }
        },
        beforeDestroy: function(){
            this.$parent.reset();
        },
        destroyed: function(){
            this.$parent.reset();
        },
        updated:function(){
            this.$nextTick(() => {
                this.$parent.reset();
            });
        },
        methods: {
            triggerMode: function(e){
                this.callbackFun()
                if(this.show){
                    this.show = false;
                }else{
                    this.show = true;
                }
            },
            showCollection: function(e){
                let sceneId = e.currentTarget.getAttribute('type-id');
                this.pushView('/collocationList', {pId: this.$props.item.id, sceneId: sceneId, goPage: 1})
            }
        },
        components:{

        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/css/common.less";
    .fold-enter-active, .fold-leave-active {
        transition: all .3s ease-in-out;
        transform-origin: 0 0;
    }
    .fold-enter, .fold-leave-active {
        transform: scaleY(0);
        opacity: 0;
    }
    .scene-item{
        position: relative;
        width: 100%;
    >.show-mode{
         position: relative;
         width: 100%;
         height:3.18rem;
    .img{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }
    .name-ch{
        position: absolute;
        width: 100%;
        text-align: center;
        top: 1.21rem;
        color: @color-ff;
        font-size: .30rem;
        height: .3rem;
        line-height: .3rem;
    }
    .name-en{
        position: absolute;
        width: 100%;
        text-align: center;
        top: 1.67rem;
        color: @color-ff;
        font-size: .30rem;
        height: .3rem;
        line-height: .3rem;
    }
    }
    >.hide-mode{
         position: relative;
    >.top{
         position: relative;
         width: 100%;
         text-align: center;
         height: .78rem;
         line-height: .78rem;
         background: @color-33;
         color: @color-ff;
         font-size: .3rem;
     }
    >.type-list{
         position: relative;
         padding: .2rem .2rem;
    >.type-item{
         display: inline-block;
         margin: .1rem;
         width: 1.8rem;
         height: .3rem;
         line-height: .3rem;
         font-size: .2rem;
         text-align: center;
         color: @color-99;
         /*background: #f6afaf;*/
     }
    }
    }
    }
</style>
