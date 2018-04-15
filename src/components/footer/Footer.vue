<template>
    <div id="footer" class="footer" v-if="show">
        <div class="footerboxwarp">
            <router-link tag="div" to="/" exact class="footerbox">
                <i class="index"></i>
                <span>首页</span>
            </router-link>
            <router-link tag="div" to="shoppingCart" class="footerbox">
                <i class="shoppingCart"></i>
                <span>购物车</span>
            </router-link>
            <div class="footerbox">
                <i class="Guide"></i>
                <span>新手导航</span>
            </div>
            <div class="footerbox">
                <i class="classification"></i>
                <span>免费体验</span>
            </div>
            <!--<div class="footerbox" :class = "{active: classification}" @click="showSceneList">-->
            <!--<i class="classification"></i>-->
            <!--<span>免费体验</span>-->
            <!--</div>-->
            <router-link tag="div" to="myCenter" class="footerbox">
                <i class="myFan"></i>
                <span>我的范儿</span>
            </router-link>

            <!--<div class="footerbox" :class = "{active: index}" @click="showIndex">
                <i class="index"></i>
                <span>首页</span>
            </div>
            <div class="footerbox" :class = "{active: shoppingCart}" @click="showShoppingCart">
                <i class="shoppingCart"></i>
                <span>购物车</span>
            </div>
            <div class="footerbox">
                <i class="Guide"></i>
                <span>新手导航</span>
            </div>
            <div class="footerbox">
                <i class="classification"></i>
                <span>免费体验</span>
            </div>
            &lt;!&ndash;<div class="footerbox" :class = "{active: classification}" @click="showSceneList">&ndash;&gt;
                &lt;!&ndash;<i class="classification"></i>&ndash;&gt;
                &lt;!&ndash;<span>免费体验</span>&ndash;&gt;
            &lt;!&ndash;</div>&ndash;&gt;
            <div class="footerbox" :class = "{active: myFan}" @click="showMyCenter">
                <i class="myFan"></i>
                <span>我的范儿</span>
            </div>-->
        </div>
    </div>
</template>
<script>
    import router from '../../router';

    export default {
        name:'footer',
        props:{
            index:{
                type:Boolean,
                default:false
            },
            shoppingCart:{
                type:Boolean,
                default:false
            },
            Guide:{
                type:Boolean,
                default:false
            },
            classification:{
                type:Boolean,
                default:false
            },
            myFan:{
                type:Boolean,
                default:false
            }
        },
        data () {
            return {
                show:true
            }
        },
        methods:{
            showIndex () {
                this.pushView('/');
            },
            showMyCenter () {
                this.pushView('/myCenter')
            },
            showSignIn () {
                this.pushView('/signIn')
            },
            showSceneList () {
                this.pushView('/sceneList')
            },
            showShoppingCart (){
                this.pushView('/shoppingCart')
            }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/css/common.less";
    .footer{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: 0.98rem;
        width: 100%;
        background: #000;
        z-index:100;
        .footerboxwarp{
            .box-flex;
            height: 100%;
            width: 100%;
            .footerbox{
                height: 100%;
                flex: 1;
                text-align: center;
                overflow: hidden;
                /*&:active{
                    background:@color-66
                }
                &.active{
                    span{
                        color: @color-ff;
                    }
                    .index{
                        background-image:url('index-active.png') ;
                    }
                    .shoppingCart{
                        background-image:url('shoppingCart-active.png') ;
                    }
                    .Guide{
                        background-image:url('Guide-active.png') ;
                    }
                    .classification{
                        background-image:url('classification-active.png') ;
                    }
                    .myFan{
                        background-image:url('myFan-active.png') ;
                    }
                }*/
                &.router-link-active {
                    span {
                        color: #fff;
                    }
                    .index{
                        background-image:url('index-active.png') ;
                    }
                    .shoppingCart{
                        background-image:url('shoppingCart-active.png') ;
                    }
                    .Guide{
                        background-image:url('Guide-active.png') ;
                    }
                    .classification{
                        background-image:url('classification-active.png') ;
                    }
                    .myFan{
                        background-image:url('myFan-active.png') ;
                    }
                }
                span{
                    color: @color-99;
                }
                i{
                    display: block;
                    width: 100%;
                    height: 0.6rem;
                    box-sizing: border-box;
                    padding: 0.1rem;
                    background-size: 0.4rem 0.4rem;
                    background-repeat: no-repeat;
                    background-position: center;
                    &.index{
                        background-image:url('index.png') ;
                    }
                    &.shoppingCart{
                        background-image:url('shoppingCart.png') ;
                    }
                    &.Guide{
                        background-image:url('Guide.png') ;
                    }
                    &.classification{
                        background-image:url('classification.png') ;
                    }
                    &.myFan{
                        background-image:url('myFan.png') ;
                    }
                }
                span{
                    display: block;
                    width: 100%;
                    height: 0.37rem;
                    line-height: 0.28rem;
                    font-size: 0.2rem;
                }
            }
        }
    }
</style>
