<template>
    <div>
        <div class="recommendWarp" v-if="list.length">
            <div class="guessLike">
                <!--<h2>猜<span>&nbsp;/&nbsp;</span>你<span>&nbsp;/&nbsp;</span>喜<span>&nbsp;/&nbsp;</span>欢</h2>-->
                <!--<p>Guess You Like</p>-->

            </div>
            <collocationMode v-for="item in list" :item="item" :clickCallback="goTarget" :key="item.id">
            </collocationMode>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios';
    import router from '../../router';
    import collocationMode from '../../views/collocation/collocationMode.vue'

    export default {
        props:{
            list:{
                type: Array,
                required: false
            }
        },
        data:function(){
            return{
                hasData:false,
                imgSrc: IMG_URL
            }
        },
        //将数据绑定到template
        mounted : function() {
//            console.log(this.list)

        },
        methods:{
            goTarget (e) {
                this.pushView('/collocationDetail?cId=' + e.target.getAttribute('c-id'))
            }
        },
        components : {
            collocationMode
        }

    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/css/common";
    .recommendWarp{
        width: 100%;
        overflow: hidden;
        background: #fff;
        .guessLike{
            position: relative;
            margin-top: .3rem;
            height:0.7rem;
            padding:0.2rem 0;
            width:100%;
            background: url("recommendedTitle.png") no-repeat center;
            background-size: 100% 100%;

        }
    }
    .collocationBlock{
        margin-top:0.3rem;
        > h3{
            font-size:0.26rem;
            line-height:0.4rem;
            text-align: center;
        }
        > p{
            font-size:0.18rem;
            line-height:0.4rem;
            color:@color-d4;
            text-align: center;
            margin-bottom:0.4rem;
        }
        img{
            width: 100%;
            height:7rem;
        }
    }
</style>
