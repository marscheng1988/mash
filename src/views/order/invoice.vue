<template>
    <div class="invoice-page">
        <scroller lock-x
                  scrollbarY
                  :height="height"
                  ref="scroller">
            <div>
                <div class="page-line"></div>
                <v-select
                        name="发票类型"
                        :list="typeList"
                        ref="type"
                ></v-select>
                <div class="page-line"></div>
                <v-select
                        name="发票抬头"
                        :list="taitouList"
                        hasInput=true
                        placeholder="请输入发票抬头"
                        inputValue="张三"
                        ref="taitou"
                ></v-select>
                <div class="page-line"></div>
                <v-select
                        name="发票内容"
                        :list="contentList"
                        ref="content"
                ></v-select>
            </div>
        </scroller>
        <div class="page-footer" @click="confirmInvoice">确定</div>
    </div>
</template>
<script type="text/ecmascript-6">
    import VSelect from '../../views/order/c-select.vue';
    import {Scroller} from 'vux';

    export default{
        props: [

        ],
        data(){
            return {
                height: -window.innerWidth / 6.4 * .88 + '',  //页面scroll高度
                typeList: [
                    {name: '普通发票'},
                    {name: '增值税发票'},
                ],
                taitouList: [
                    {name: '个人'},
                    {name: '公司'},
                ],
                contentList: [
                    {name: '明细'},
                    {name: '礼品'},
                    {name: '服饰'},
                ],
            }
        },
        methods: {
            confirmInvoice(){
                this.backToView();
            }
        },
        created(){

        },
        updated (){
            this.$nextTick(() => {
                if(this.$refs.scroller) this.$refs.scroller.reset();
            });
        },
        computed: {

        },
        components:{
            VSelect,
            Scroller
        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/css/common.less";
    .invoice-page{
        background: @color-f4;
        height: 100%;
    }
    .page-line{
        height: .2rem;
        width: 100%;
    }
    .page-footer{
        position: absolute;
        bottom: 0;
        height: .88rem;
        width: 100%;
        background: @color-33;
        text-align: center;
        color: @color-ff;
        font-size: .24rem;
        line-height: .88rem;
    }
</style>