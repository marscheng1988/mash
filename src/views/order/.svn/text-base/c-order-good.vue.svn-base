<template>
    <transition name="fold">
        <div class="c-cart">
            <div v-if="type === '2'" class="c-head">贵重物品需单独定制，收取体验订单押金作定金，商品到货及时支付尾款</div>
            <div class="c-body">
                <div class="title">{{title}}</div>

                <div class="type">
                    <span class="content">{{name}}</span>
                </div>
                <div class="price">￥{{price.toFixed(2)}}</div>
                <div class="num">x{{num}}</div>

                <img class="img" v-lazy="getImgUrl">
            </div>
            <div v-if="type === '2'" class="type-str">贵重</div>
        </div>
    </transition>
</template>
<script type="text/ecmascript-6">
    //import HeaderComponent from '../../views/'
    
    export default{
        props: [
            'item',
            'type',
        ],
        data(){
            return {
                selected: false,
                deleted: false,
                imgUrl: IMG_URL,

                cartId: this.$props.item.id,
                produceId: this.$props.item.produce.id,
                title: this.$props.item.produce.goods.title,
                name: this.$props.item.produce.name,
                price: this.$props.item.produce.priceBuy,
                num: this.$props.item.num,
                stock: this.$props.item.stock,
                img: this.$props.item.produce.goods.icon,
                goodId: this.$props.item.produce.goods.id,
            }
        },
        methods: {

        },
        created(){

        },
        computed: {
            getImgUrl: function(){
                return this.imgUrl + this.img;
            }
        },
        components:{
            
        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/css/common.less";
    .fold-enter-active, .fold-leave-active {
        transition: all .3s ease-in-out;
        transform-origin: 0 0;
    }
    .fold-leave-active {
        transform: scaleY(0);
    }
    .c-cart{
        background: @color-ff;
        position: relative;
        width: 100%;
        .border-1px-bottom();
        .c-head{
            position: relative;
            padding: .3rem;
            line-height: .20rem;
            font-size: .18rem;
            color: @color-99;
            .border-1px-bottom();
        }
        .c-body{
            position: relative;
            height: 1.8rem;
            .disable-name{
                position: absolute;
                height: .6rem;
                width: .6rem;
                left: .2rem;
                top: .6rem;
                color: @color-cc;
                line-height: .6rem;
                font-size: .2rem;
            }
            .img{
                position: absolute;
                left: .4rem;
                top: .2rem;
                height: 1.4rem;
                width: 1.4rem;
            }
            .title{
                position: absolute;
                left: 2.2rem;
                top: .3rem;
                width: 3.5rem;
                height: .26rem;
                line-height: .26rem;
                font-size: .24rem;
                color: @color-33;
                .ellipsis;
                &.disable{
                    color: @color-cc;
                }
            }
            .type{
                position: absolute;
                left: 2.2rem;
                top: .70rem;
                height: .26rem;
                line-height: .26rem;
                .content{
                    position: relative;
                    font-size: .18rem;
                    line-height: .18rem;
                    color: @color-99;
                    &.disable{
                        color: @color-cc;
                    }
                }
            }
            .price{
                position: absolute;
                left: 2.2rem;
                bottom: .3rem;
                color: @color-33;
                font-size: .2rem;
                line-height: .2rem;
                &.disable{
                    color: @color-cc;
                }
            }
            .num{
                position: absolute;
                right: .3rem;
                bottom: .3rem;
                color: @color-33;
                font-size: .2rem;
                line-height: .2rem;
                &.disable{
                    color: @color-cc;
                }
            }
        }
        .type-str{
            position: relative;
            padding-left: .9rem;
            font-size: .2rem;
            line-height: .22rem;
            color: @color-gold-dark;
            padding-bottom: .28rem;
        }
    }
</style>