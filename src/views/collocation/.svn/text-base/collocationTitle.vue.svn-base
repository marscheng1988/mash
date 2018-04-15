<template>
    <div class="c-title">
        <!--<div class="en-title">{{en}}</div>-->
        <!--<div class="en-icon"><span class="left-line"></span><span class="zf-icon"></span><span class="right-line"></span></div>-->
        <div class="ch-title">{{(ch && ch.length>12)?ch.substring(0, 11) + '...': ch}}</div>
    </div>
</template>
<script type="text/ecmascript-6">
//    import HeaderComponent from '../../views/'
    
    export default{
        props: [
            'en',
            'ch',
        ],
        data(){
            return {
                
            }
        },
        methods: {

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
    .c-title{
        position: relative;
        width: 100%;
        height: 2.36rem;
        background: @color-ff url("images/c-title-bg.png") center no-repeat;
        background-size: 100%;
        .en-title{
            position: absolute;
            top: 1.05rem;
            left: 5%;
            width: 90%;
            height: .32rem;
            line-height: .3rem;
            text-align: center;
            color: @color-99;
            font-family: @TJPRO3-R;
            .ellipsis;
        }
        .en-icon{
            position: absolute;
            left: 5%;
            width: 90%;
            top: 1.35rem;
            font-size: .24rem;
            line-height: .24rem;
            height: .24rem;
            color: @color-33;
            text-align: center;
            font-family: @PFSC-M;
            .ellipsis;
            .left-line{
                position: relative;
                display: inline-block;
                width: 1.06rem;
                height: 1px;
                background: @color-99;
                margin-right: .26rem;
                bottom: .05rem;
                &::after{
                    content: "";
                    position: absolute;
                    top: -1px;
                    height: 3px;
                    width: 3px;
                    border-radius: 3px;
                    background: @color-99;
                    right: -.07rem;
                }
            }
            .right-line{
                position: relative;
                display: inline-block;
                width: 1.06rem;
                height: 1px;
                background: @color-99;
                margin-left: .26rem;
                bottom: .05rem;
                &::before{
                    content: "";
                    position: absolute;
                    top: -1px;
                    height: 3px;
                    width: 3px;
                    border-radius: 3px;
                    background: @color-99;
                    left: -.07rem;
                }
            }
            .zf-icon{
                display: inline-block;
                vertical-align: middle;
                top: 1.88rem;
                width: .6rem;
                height: .09rem;
                left: 2.9rem;
                background: url("images/zf-word.png") center no-repeat;
                background-size: 100%;
            }
        }
        .ch-title{
            position: absolute;
            left: 5%;
            width: 90%;
            bottom: .7rem;
            font-size: .22rem;
            line-height: .24rem;
            height: .24rem;
            color: @color-33;
            text-align: center;
            font-family: @PFSC-M;
            .ellipsis;
        }
    }
</style>