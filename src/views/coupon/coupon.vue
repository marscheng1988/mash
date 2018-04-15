<template>
    <div class="coupon-list">
        <coupon v-for="item of getList" key="item.id" :item="item">

        </coupon>
        <div v-if="list.length === 0" class="emptyState"><p>暂无数据</p></div>
    </div>
</template>
<script type="text/ecmascript-6">
    import coupon from '../../views/coupon/c-coupon.vue'

    export default{
        props: [

        ],
        data(){
            return {
                list: [],
            }
        },
        methods: {

        },
        created(){
            this.getQuery(true, CTX_URL + '/index/member/couponList', data=>{
                if(data.status === 1){
                    let dataList = [
                        {
                            "id":"f78de83d7bdd4d44845211b2134958c8",
                            "isNewRecord":false,
                            "couponTemplate":{
                                "id":"7e57a57f38c3433dadb0aad40a3a398d",
                                "isNewRecord":false,
                                "introduction":"本券可在本平台租赁珠宝时以租金抵扣的方式适用。"},
                            "name":"可用于单次珠宝租赁，免除一件商品租金10元",
                            "code":"8ohfat6u",
                            "status":"2",
                            "startTime":"2016-12-01",
                            "endTime":"2017-02-01",
                            "type":"1",
                            "reachMoney":100.00,
                            "decreaseMoney":10.00,
                            "member":{"id":"aa10b5bd43904cdbb7a64566c3c81d17","isNewRecord":false},
                            "receiveType":"1",
                            "receiveTime":1484624492000,
                            "useDecMoney":10.00,"useTime":1484709767000
                        },
                        {
                            "id":"f78de83d7bdd4d44845211b2134958c8",
                            "isNewRecord":false,
                            "couponTemplate":{
                                "id":"7e57a57f38c3433dadb0aad40a3a398d",
                                "isNewRecord":false,
                                "introduction":"本券可在本平台租赁珠宝时以租金抵扣的方式适用。"},
                            "name":"可用于单次珠宝租赁，免除一件商品租金10元",
                            "code":"8ohfat6u",
                            "status":"2",
                            "startTime":"2016-12-01",
                            "endTime":"2017-02-01",
                            "type":"1",
                            "reachMoney":100.00,
                            "decreaseMoney":10.00,
                            "member":{"id":"aa10b5bd43904cdbb7a64566c3c81d17","isNewRecord":false},
                            "receiveType":"1",
                            "receiveTime":1484624492000,
                            "useDecMoney":10.00,"useTime":1484709767000
                        },
                    ]

                    //this.list = data.data || [];
                    this.list = dataList;
                    let enableCoupon = [];
                    let disableCoupon = [];
                    for(let coupon in data.data || []){
                        if(coupon){

                        }
                    }
                }
            })
        },
        computed: {
            getList () {
                return this.list;
            }
        },
        components:{
            coupon
        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/css/common.less";
    .coupon-list{
        position: relative;
        padding: .3rem 0;
        height: 100%;
        width: 100%;
        background: @color-f4;
        box-sizing: border-box;
    }
</style>