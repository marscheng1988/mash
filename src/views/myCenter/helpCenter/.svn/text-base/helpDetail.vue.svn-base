<template>
    <div class="ui-page">
        <div>
            <h2>钱包体现到账时间说明</h2>
            <p>当日16点前操作的体现预计当日24点前可以到账，当日16点以后操作
            的体现将顺延1个工作日，到账时间最长不会超过5个工作日，麻烦耐心等待。
            当日16点以后操作的体现预计会顺延至下一个工作日的24点到账，比如您周五16点后操作体现，周六日不是工作日，那么预计下周一的24点前到账</p>
        </div>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common.less";
    .ui-page{
        background: @color-f4;
        -webkit-overflow-scrolling: touch;
        div{
            background: #fff;
            padding:0 .3rem;
            h2{
                line-height: .8rem;
                font-size: @f-24;
                position: relative;
                .border-1px-bottom();
            }
            p{
                padding:.3rem 0;
                line-height: .36rem;
                font-size: @f-24;
            }
        }

    }

</style>
<script>
    import router from '../../../router';
    export default{
        data () {
            return{
            }
        },
        watch: {
        },
        computed : {

        },
        mounted () {
            let title = this.find('helpTitle');
            window.document.title = title;
            window.scrollTo(0,0);
        },
        methods: {
            deposit () {
                this.pushView()
            }
        },
        components:{
        }
    }
</script>
