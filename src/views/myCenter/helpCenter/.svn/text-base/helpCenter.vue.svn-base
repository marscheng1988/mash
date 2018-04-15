<template>
    <div class="ui-page">
        <div class="func-bar">
            <div class="sub-bar buy" @click="deposit">
                关于押金问题的介绍
            </div>
            <div class="sub-bar" @click="deposit">
                免费体验怎么玩
            </div>
            <div class="sub-bar" >
                申请退款后，钱如何退回
            </div>
            <div class="sub-bar myAccount" >
                关于押金问题的介绍
            </div>
            <div class="sub-bar" >
                珠宝丢了坏了怎么办
            </div>
            <div class="sub-bar">
                延期归还商品怎么办
            </div>
        </div>
    </div>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common.less";
    .ui-page{
        background: @color-f4;
        -webkit-overflow-scrolling: touch
    }
    .func-bar{
        overflow: hidden;
        padding-bottom: 0.97rem;
        .sub-bar{
            height: 0.9rem;
            position: relative;
            padding: 0 1.2rem 0 0.3rem;
            font-size: @f-24;
            line-height: 0.9rem;
            text-align: left;
            .border-1px-bottom();
            background: #fff;
            &:active{
                background: @color-e4;
            }
            &:after{
                content: "";
                position: absolute;
                right: 0.3rem;
                top: 50%;
                margin-top: -0.06rem;
                height: 0.12rem;
                width: 0.12rem;
                border-bottom: 1.5px solid @color-e4;
                border-left: 1.5px solid @color-e4;
                -webkit-transform: rotate(-135deg);
                transform: rotate(-135deg);
            }
        }
    }

</style>
<script>
    import router from '../../../router';
    export default{
        data () {
            return{
                headPicUrl:'data:image/png;base64,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',
                userName:'注册/登录',
            }
        },
        watch: {
//            '$route': function () {
//                var self = this;
//                self.isLoading = true
//            }
        },
        computed : {

        },
        mounted () {
            window.scrollTo(0,0);
        },
        methods: {
            deposit (e) {
                this.pushView('/myCenter/helpDetail');
                this.save('helpTitle',e.target.innerHTML)
            }
        },
        components:{
        }
    }
</script>
