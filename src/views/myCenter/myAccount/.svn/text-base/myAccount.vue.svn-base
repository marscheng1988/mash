<template>
    <div class="ui-page">
        <div class="page-head">
            <div class="assets-total">
                <p>个人资产(元)</p>
                <h2 data-type="money">{{memberAssets}}</h2>
            </div>
            <div class="assets-detail" @click="checkDetail">
                <h3>查看余额明细</h3>
            </div>
        </div>
        <div class="sub-bar">
            <span> 提现</span>
        </div>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common.less";
    .ui-page{
        background: @color-f4;
    }
    .page-head{
        height: 3.56rem;
        background-color: @color-33;
        .assets-total{
            overflow: hidden;
            height: 1.4rem;
            padding: .7rem 0 .4rem 0;
            text-align: center;
            >p{
                font-size: @f-20;
                color: @color-99;
                line-height: .4rem;
            }
            >h2{
                font-size: .7rem;
                color:@color-gold-dark;
                line-height: 1.2rem;
            }
        }
        .assets-detail{
            h3{
                text-align: center;
                font-size: @f-20;
                color: @color-99;
                line-height: .4rem;
            }

        }
    }
    .sub-bar{
        height: 0.88rem;
        margin-top:.2rem;
        position: relative;
        padding: 0 1.2rem 0 0.3rem;
        font-size: @f-26;
        line-height: 0.9rem;
        text-align: left;
        .border-1px-bottom();
        background: #fff;
        &.myAccount,&.buy{
            margin-bottom: 10px;
        }
        &:active{
            background: @color-e4;
        }
        &:after{
            content: "";
            position: absolute;
            right: 0.5rem;
            top: 50%;
            margin-top: -0.06rem;
            height: 0.12rem;
            width: 0.12rem;
            .border-1px-bottom();
            border-left: 1px solid @color-e4;
            -webkit-transform: rotate(-135deg);
            transform: rotate(-135deg);
        }
    }
</style>
<script type="text/ecmascript-6">
    import axios from 'axios';
    import router from '../../../router';
    import Constants from '../../../static/constants';
    import { fmoney } from '../../../static/validate'
    export default{

        data () {
            return{
                memberAssets:''
            }
        },
        updated () {

        },
        created () {
            this.getQuery(false,CTX_URL + '/index/member/bankbookBalance',(response) => {
                this.memberAssets = response.data.usableBalance.toFixed(2)
            })
        },
        mounted () {
        },
        methods:{
            checkDetail () {
                this.pushView('/myCenter/accountDetail')
            }
        },
        components:{
        }
    }


</script>
