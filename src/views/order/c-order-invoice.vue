<template>
    <div class="order-coupon" @click="showInvoice">
        <div class="title">发票信息</div>
        <div class="name">未选择</div>
        <div class="right-arrow"></div>
    </div>
</template>
<script type="text/ecmascript-6">
    //import HeaderComponent from '../../views/'
    
    export default{
        props: [

        ],
        data(){
            return {
                
            }
        },
        methods: {
            showInvoice: function(){
                this.pushView('/invoice', {type: 'choose'})
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
    .order-coupon{
        position: relative;
        height: .88rem;
        .border-1px-bottom();
        background: @color-ff;
        >.title{
            position: absolute;
            left: .3rem;
            top: 0;
            height: .88rem;
            color: @color-33;
            font-size: .24rem;
            line-height: .88rem;
        }
        >.name{
            position: absolute;
            right: .7rem;
            top: 0;
            height: .88rem;
            color: @color-33;
            font-size: .20rem;
            line-height: .88rem;
            text-align: right;
        }
        .right-arrow::after{
            right: .3rem;
        }
    }
</style>