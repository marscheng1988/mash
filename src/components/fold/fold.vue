<template>
    <div class="fold">
        <div class="fold-title" @click="triggerExpend">
            <span>{{name}}</span>
            <span :class="expend?'up-arrow':'down-arrow'"></span>
        </div>
        <transition name="fold"
                    v-on:enter="enter"
        >
            <div class="fold-content" v-if="expend">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<script type="text/ecmascript-6">
    //import HeaderComponent from '../../views/'

    export default{
        props: [
            'name',
            'updateFun',    //展开和收缩 触发的事件
        ],
        data(){
            return {
                expend: false,
            }
        },
        methods: {
            triggerExpend: function(e){
                this.expend = !this.expend;
                if(this.updateFun) {
                    setTimeout(this.updateFun, 300)
                }
                this.$parent.$parent.$parent.selectedSceneIds = []
//                console.log(this.$parent.$parent.$parent.selectedSceneIds)
            },
            enter: function(el){
                let data = {
                    top: el.parentNode.offsetTop,
                    height: el.parentNode.offsetHeight,
                    name: this.name,
                }
                this.$emit('expend',data);
            }
        },
        created(){

        },
        computed: {

        },
        components:{

        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/css/common.less";
    .fold{
        position: relative;
        min-height: .8rem;
        width: 100%;
        .border-1px-bottom();
        transition: all .3s ease-in-out;
    }
    .fold-title{
        width: 100%;
        position: relative;
        line-height: .8rem;
        height: .8rem;
        padding-left: .3rem;
        color: #000000;
        .ellipsis;
        span{
            font-size: .24rem ;
        }
    }
    .fold-content{
        transition: all .3s ease-in-out;
        padding: 0 .3rem .2rem .25rem;
    }
    .fold-enter-active, .fold-leave-active {
        transform-origin: 0 0;
    }
    .fold-enter, .fold-leave-active {
        transform: scaleY(0);
    }
</style>
