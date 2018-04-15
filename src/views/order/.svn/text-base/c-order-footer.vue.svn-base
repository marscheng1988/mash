<template>
    <div class="order-footer">
        <div class="content" v-if="totalPrice">
            <span class="title">合计：</span>
            <span class="price">￥{{totalPrice.toFixed(2)}}</span>
        </div>
        <div @click="btnAction" class="btn">{{btnStr?btnStr:'立即支付'}}</div>
    </div>
</template>
<script type="text/ecmascript-6">
    //import HeaderComponent from '../../views/'
    
    export default{
        props: [
            'totalPrice',
            'btnAction',
            'btnStr',
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
    .order-footer{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: .98rem;
        .border-1px-top();
        >.content{
            position: absolute;
            right: 1.92rem;
            width: 4rem;
            top: 0;
            height: .98rem;
            text-align: right;
            padding-right: .3rem;
            >.title{
                font-size: .22rem;
                line-height: .98rem;
                color: @color-33;
            }
            >.price{
                font-size: .24rem;
                line-height: .98rem;
                color: @color-gold-dark;
            }
        }
        >.btn{
            position: absolute;
            right: 0;
            height: .98rem;
            width: 1.92rem;
            background: @color-33;
            color: @color-ff;
            font-size: .24rem;
            line-height: .98rem;
            text-align: center;
        }
    }
</style>