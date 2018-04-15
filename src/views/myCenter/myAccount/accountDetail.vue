<template>
    <div class="ui-page">
        <div class="refund-list">
            <div class="detail-warp">
                <ul>
                    <li>
                        <h3>退款</h3>
                        <h4>2016.6.22</h4>
                        <h5>+200</h5>
                        <h6>已完成</h6>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common.less";
    .ui-page{
        background: @color-f4;
    }
    .refund-list{
        overflow: hidden;
        .detail-warp{
            overflow: hidden;
            ul li{
                height: 1.02rem;
                position: relative;
                background-color: @color-ff;
                .border-1px-bottom();
                h3{
                    position: absolute;
                    left:.3rem ;
                    top: .18rem;
                    font-size: @f-26;
                    color: @color-33;
                }
                h4{
                    position: absolute;
                    left:.3rem ;
                    bottom: .18rem;
                    font-size: @f-20;
                    color: @color-33;
                }
                h5{
                    position: absolute;
                    right:.8rem ;
                    top: .2rem;
                    font-size: @f-26;
                    color: @color-33;
                }
                h6{
                    position: absolute;
                    right:.8rem ;
                    bottom: .2rem;
                    font-size: @f-20;
                    color: @color-33;
                }
            }
        }
    }
</style>
<script type="text/ecmascript-6">

    export default{
        data () {
            return{

            }
        },
        updated () {

        },
        created () {
            this.getQuery(false,
                            CTX_URL + '/index/member/bankbookItem/1',
                            (response) => {
                                console.log(response)
                            })
        },
        mounted () {

        },
        methods:{

        },
        components:{
        }
    }


</script>
