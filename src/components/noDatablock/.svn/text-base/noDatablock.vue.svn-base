<template>
    <div >
        <div class="noDataWarp" :style="{height:warpHeight}">
            <div>
                <div><span v-if="icon" :style="backImg"></span></div>
                <h3 >{{message}}</h3>
                <div><p  v-if="buttonText" @click="go(buttonUrl)">{{buttonText}}</p></div>
            </div>
        </div>
    </div>
</template>
<script >
    import router from '../../router';

    export default {
        props:[
            'icon',
            'message',
            'buttonText',
            'buttonUrl',
            'warpHeight'
        ],
        data () {
            return{
            }

        },
        computed:{
            backImg () {
                return  {
                    backgroundImage:'url('+this.icon+')'
                }
            }
        },
        //将数据绑定到template
        mounted : function() {
//            console.log(this.warpHeight)
        },
        methods:{
            go (url) {
                this.pushView(url)
            }
        }

    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/css/common";
    .noDataWarp{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width:100%;
        height:100%;
        > div{
            /*position: absolute;*/
            /*top:50%;*/
            /*left:25%;*/
            /*width: 50%;*/
            height:2.4rem;
            /*margin-top:-1.2rem;*/
            > div{
                position: relative;
                height:.8rem;
                width: 100%;
                span{
                    position: absolute;
                    left:50%;
                    margin-left:-.3rem;
                    width: .6rem;
                    height:.6rem;
                    background-size: 100% 100%;
                    background-position: center;
                }
                p{
                    position: absolute;
                    left:50%;
                    bottom:0;
                    margin-left:-.95rem;
                    width: 1.9rem;
                    height: .6rem;
                    line-height: .6rem;
                    text-align: center;
                    background: #333;
                    color: #fff;;
                }
            }
            h3{
                text-align: center;
                font-size: @f-26;
                color: @color-99;
            }

        }
    }
</style>
