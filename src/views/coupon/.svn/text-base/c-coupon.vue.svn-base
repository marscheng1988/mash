<template>
    <div @click="couponClick" :class="{
            'coupon-item': true,
            'disable': (item && item.status === '1')?false: false
        }">
        <div class="title">
            <span class="amount">10</span>
            <span class="unit">{{couponType[item.type].unit}}</span>
        </div>
        <div class="type">{{couponType[item.type].name}}</div>
        <div v-if="item.name.length > 25" class="name">{{item.name.substring(0, 25) + '...'}}</div>
        <div v-if="item.name.length <= 25" class="name">{{item.name}}</div>
        <div class="time">使用期限：{{item.startTime + '~' + item.endTime}}</div>
        <div v-if="item.couponTemplate.introduction.length > 25" class="intro">{{item.couponTemplate.introduction.substring(0, 25) + '...'}}</div>
        <div v-if="item.couponTemplate.introduction.length <= 25" class="intro">{{item.couponTemplate.introduction}}</div>
    </div>
</template>
<script type="text/ecmascript-6">

    export default{
        props: [
            'item'
        ],
        data(){
            return {
                kobe: this.item,
                couponType :{
                    '1': {
                        name: '满减券',
                        unit: '元',
                        propertyName: 'decreaseMoney'
                    },
                    '2': {
                        name: '抵扣券',
                        unit: '元',
                        propertyName: 'decreaseMoney'
                    },
                    '3': {
                        name: '折扣券',
                        unit: '折',
                        propertyName: 'discountScale'
                    },
                    '4': {
                        name: '体验券',
                        unit: '天',
                        propertyName: 'decreaseMoney'
                    }
                },
            }
        },
        methods: {
            couponClick(){
                if(this.$route.query.type === 'choose'){
                    this.save('coupon', this.item);
                    //console.log(this.item);
                    this.backToView();
                }
            }
        },
        created(){
            console.log(this.$props.item);
        },
        computed: {

        },
        components:{
            
        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/css/common.less";
    .coupon-item{
        position: relative;
        width: 5.8rem;
        margin-left: .3rem;
        height: 1.8rem;
        margin-bottom: .3rem;
        border-radius: .14rem;
        background: transparent;
        background-image: url("images/coupon-bg.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        &.disable{
            background-image: url("images/disable-coupon-bg.png");
            .title .amount,.title .unit, .type, .name, .time{
                color: @color-66;
            }
        }
        >.title{
            position: absolute;
            height: .7rem;
            top: .35rem;
            left: 0;
            width: 1.63rem;
            text-align: center;
            >.amount{
                font-size: .7rem;
                color: @color-gold-dark;
                line-height: .7rem;
            }
            >.unit{
                font-size: .2rem;
                color: @color-gold-dark;
                line-height: .2rem;
            }
        }
        >.type{
            position: absolute;
            height: .6rem;
            width: 1.8rem;
            left: 0;
            top: 1rem;
            line-height: .6rem;
            font-size: .24rem;
            color: @color-gold-dark;
            text-align: center;
        }
        >.name{
            position: absolute;
            height: .6rem;
            left: 2.2rem;
            top: .25rem;
            width: 3rem;
            font-size: .2rem;
            color: @color-33;
        }
        >.time{
            position: absolute;
            top: .9rem;
            left: 2.2rem;
            width: 3.2rem;
            height: .2rem;
            line-height: .2rem;
            color: @color-33;
            font-size: .16rem;
        }
        >.intro{
            position: absolute;
            left: 2.2rem;
            top: 1.3rem;
            width: 3rem;
            height: .4rem;
            color: @color-99;
            font-size: .16rem;
            line-height: .2rem;
        }
    }
</style>