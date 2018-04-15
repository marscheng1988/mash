<template>
    <div class="ui-page">
        <section class="total">
            <p>当前积分<span @click="goExchange"><i></i>积分说明</span></p>
            <h1>{{totalPoint}}<span>分</span></h1>
            <h2 @click="goExchange">积分兑换商品</h2>
        </section>
        <section class="exchange-detail">
            <h2>积分明细<span>(消费获取积分时不包含押金,保险以及银行贷款费用)</span></h2>
            <div class="detail-item" v-for="item in detailList" :key = "item.id">
                <i ><img :src="item.icon"/></i>
                <span class="changetype">{{item.changeReasonType}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.changeTime.substring(-1,10)}}</span>
                <span class="num">+{{item.changePoint}}</span>
            </div>
        </section>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common.less";
    body{
        background-color:#ff0000;
    }
    .ui-page{
        background: @color-f4;
    }
    .total{
        height: 3.25rem;
        width: 100%;
        background: #fff;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 .3rem;
        position: relative;
        .border-1px-bottom();
        margin-bottom:.2rem;
        p{
            padding-top:.4rem;
            line-height: .4rem;
            font-size: @f-22;
            color: @color-33;
            span{
                float: right;
                font-size: @f-22;
                color: @color-gold-dark;
                i{
                    display: inline-block;
                    height: .3rem;
                    width: .3rem;
                    margin-right: .1rem;
                    background: url('./images/explain.png') no-repeat center;
                    background-size: .3rem .3rem;
                    vertical-align: middle
                }
            }

        }
        h1{
            line-height: 1rem;
            font-size: .72rem;
            color: @color-33;
            font-family: PingFangSC-Regular, sans-serif;
            span{
                font-size: @f-26;
                color: @color-33;
            }
        }
        h2{
            width: 5.8rem;
            height: .8rem;
            line-height: .8rem;
            font-size: @f-26;
            color: @color-ff;
            text-align: center;
            background: @color-gold-light;

        }
    }
    .exchange-detail{
        width: 6.4rem;
        box-sizing: border-box;
        overflow: hidden;
        background:#fff;

        > h2{
            line-height: .9rem;
            font-size: @f-26;
            color: @color-33;
            padding: 0 .3rem;
            position: relative;
            .border-1px-bottom();
            span{
                font-size: @f-20;
                color: @color-99;
            }
            .ellipsis
        }
        .detail-item{
            min-height: .88rem;
            width: 100%;
            box-sizing: border-box;
            padding: .3rem;
            position: relative;
            display: flex;
            align-items:center;
            .border-1px-bottom();
            &:last-child{
                border:none;
            }
            i{
                float: left;
                display: inline-block;
                height: .3rem;
                width: .3rem;
                margin-right: .1rem;
                vertical-align: middle;
                img{
                    width: 100%;
                    height:100%;
                }
            }
            span{
                float: left;
                font-size: @f-22;
                color:@color-33;
                padding: 0 .2rem;
            }
            .changetype{
                padding: 0 .1rem 0 0;
                zoom:1;
                vertical-align:baseline
            }
            .time{
                color: @color-99;
            }
            .num{
                position: absolute;
                right: 0.1rem;
                color: @color-gold-dark;
            }
        }
    }
</style>
<script>
    export default{
        data(){
            return{
                msg:'hello vue',
                totalPoint:0,
                IMGURL:IMG_URL,
                detailList:[
//                    {
//                        changePoint:10,
//                        changeReasonType:"订单评价",
//                        changeTime:"2017-05-15 11:03:21",
//                        changeType:"A",
//                        icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkRFRTAzMEJDMDg4NzExRTdBQjYxQTc1RDBGMjM5MkRFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkRFRTAzMEJEMDg4NzExRTdBQjYxQTc1RDBGMjM5MkRFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REVFMDMwQkEwODg3MTFFN0FCNjFBNzVEMEYyMzkyREUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REVFMDMwQkIwODg3MTFFN0FCNjFBNzVEMEYyMzkyREUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4fZbKCAAAB4ElEQVR42tyXu0sDQRCHEzVRgoiI2ohRMYkEfKCNpX+BhaCFgi/EFIoW0UawFAkI2qcQbG3UgKCtpBIrtRJBLLRJ8IWKGOP5LWzgCnPe7gUiWfiYu8vuzM3M7/YubsMwXMUYZa4ijYq/JsTjcT8mAXUwG4lEji3mrmMm4BDmmfvlJOMp6IFm2LAI2oBZgSaIQNjKqTtfj3HUiXmEEdiSl0UmM7Bp9gFJ2IWU6foAZOCMzDO2MiZoAHMBXbBn+kkE+IQxE6OwgPM09iU3kfMTzD5cqpR6R9ooDm6l8zmOY9ilX+a3cbN92HZYBD/nQWwjhGyXmkXmi+ewJjOdhCGL1q3KSnVATCb2zA3X2lX1O/jkcbfsn52xZreq+UqdLYUN5FtnA3kTLYcnjYDiiRgGj07ga4QR1U1VitSnEzjM4m3sA5TbjGdIuk1VUw7shWmHPc4WS1xurbeTFFbK5txcqYWSA05ULcQV1BSWWHcF1TqBPThoxd7Lfqv0NWSqgHLgFriBj3zPo0WpvU5UnRtVhd4d/+2WKb5AliGteJOi3P3yU6hSJ/Adqt7WzPQAYSoHzm2PnSxOyIxVR6+0ryqBzRv7oMMeGyriOi2guGpUMh6HI6gvQOCk0nd1yf53+hFgALAohrfC+Ht6AAAAAElFTkSuQmCC",
//                        id:"9334056d259c45b2a276498a15aac7e7",
//                        isNewRecord:false
//                    },
                ],

            }
        },
        mounted () {
            let self = this;

            this.getQuery(true,CTX_URL + '/index/member/info',function(data){
                self.totalPoint = data.data.memberDTO.point
            });

            this.postQuery(true,CTX_URL + '/index/member/pointDetail/1',{},function(data){
                self.detailList = data.page.list;
                self.detailList.forEach(function(item,index,arr){

                    if (item.changeReasonType === 'A20') {
                        arr[index].changeReasonType = '订单支付';
                        arr[index].icon = require('./images/orderInte.png');
                    }
                    else if (item.changeReasonType === 'A21') {
                        arr[index].changeReasonType = '确认收货';
                        arr[index].icon = require('./images/orderInte.png');
                    }
                    else if (item.changeReasonType === 'A22'){
                        arr[index].changeReasonType = '订单结算';
                        arr[index].icon = require('./images/orderInte.png');
                    }
                    else if (item.changeReasonType === 'A23'){
                        arr[index].changeReasonType = '订单评价';
                        arr[index].icon = require('./images/orderInte.png');
                    }

                })

            })

        },
        methods :{
            goExchange () {
//                this.pushView('/myCenter/integralMall')
                this.tip('敬请期待 ！')
            }
        },
        components:{

        }
    }
</script>
