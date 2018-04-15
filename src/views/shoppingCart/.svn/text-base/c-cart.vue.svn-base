<template>
    <transition name="fold">

        <!--有效状态-->
        <div class="c-cart" v-if="!deleted && !disable">

            <check-box class="radio"
                    :selected="selected"
                    @change="triggerItemSclected"
            >
            </check-box>

            <div class="title">{{title}}</div>

            <div v-if="!edit" class="type">
                <span class="content">{{name}}</span>
            </div>
            <div v-if="(!edit && status === '1') || buy" class="price">￥{{price?price.toFixed(2):''}}</div>
            <div v-if="!edit && status === '3' && stock > 0" class="error-info">该商品库存不足!</div>
            <div v-if="!edit && status === '3' && stock <= 0 " class="error-info">该商品已无库存！</div>
            <div v-if="(!edit && status === '1') || buy " class="num">x{{num}}</div>

            <div @click="showTypeList" v-if="edit" class="type-edit">
                <span class="content">{{name}}</span>
                <span class="down-arrow"></span>
            </div>
            <div v-if="edit && !buy" class="num-edit">
                <div @click="reduceNum" class="n-reduce"></div>
                <div @click="addNum" class="n-add"></div>
                <div class="n-num">{{num}}</div>
            </div>

            <img class="img" v-lazy="getImgUrl">
        </div>

        <!--失效状态-->
        <div class="c-cart" v-if="!deleted && disable">

            <check-box v-if="edit" class="radio"
                       :selected="selected"
                       @change="triggerItemSclected"
            >
            </check-box>

            <div v-if="!edit" class="disable-name">失效</div>
            <div class="title disable">{{title}}</div>

            <div class="type">
                <span class="content disable">{{name}}</span>
            </div>
            <div class="price disable">￥{{price?price.toFixed(2):''}}</div>
            <div class="num disable">x{{num}}</div>

            <img class="img" v-lazy="getImgUrl">
        </div>
    </transition>
</template>
<script type="text/ecmascript-6">
    //import HeaderComponent from '../../views/'
    import CheckBox from '../../components/checkBox/checkBox.vue'
    
    export default{
        props: {
            edit: {
                type: Boolean,
                default: false,
            },
            isSelect: {
                type: Boolean,
                default: false,
            },
            isBuy: {
                type: Boolean,
                default: false,
            },
            item: {
                type: Object,
                default: null,
            },
            getTotalPrice: {
                type: Function,
                default: null
            },
            showChooseProduce: {
                type: Function,
                default: null
            }
        },
        data(){
            return {
                updateCartUrl: CTX_URL + '/index/shoppingcart',
                selected: this.isSelect || false,
                buy: this.isBuy || false,
                deleted: false,
                imgUrl: IMG_URL,

                disable: this.$props.item.status !== '2'?false: true,
                cartId: this.$props.item.id,
                produceId: this.$props.item.produce.id,
                initProduceId: this.$props.item.produce.id, //体验转购买时，初始的产品Id
                title: this.$props.item.produce.goods.title,
                name: this.$props.item.produce.name,
                price: this.$props.item.produce.priceBuy,
                num: this.$props.item.num,
                initNum: this.$props.item.num,
                stock: this.$props.item.produce.stockSell,//体验转购买时，初始的产品数量
                img: this.$props.item.produce.goods.icon,
                goodId: this.$props.item.produce.goods.id,
                status: this.$props.item.status,
            }
        },
        methods: {
            triggerItemSclected: function(){
                if(this.status === '3' && !this.edit){
                    if(this.num > this.stock && this.stock > 0){
                        this.tip('该商品库存不足，请修改数量！')
                    }else if(this.stock <= 0){
                        this.confirm(`
                    <p class="notification-p">由于平台单量过大，当前选择商品已无库存，请您选择到过提醒或预约体验。</p>
                    <p class="notification-p">到货提醒：商品到货后会以短信形式通知您！</p>
                    <p class="notification-p">预约体验：预约后将为您保留最新到货的库存，预约周期为45天！</p>
                    `, index => {
                            if(index === '0'){
                                this.setRemind(this.produceId);
                            }else if(index === '1'){
                                this.save('appointOrder', {
                                    'shoppingcartProduceList[0].id': this.cartId
                                })
                                this.save('chooseDate', '');
                                this.pushView('/appointOrder', {type: 'cart'});
                            }
                        },'到货提醒,预约体验',null, true)
                        return;
                    }
                    return;
                }
                this.selected = !this.selected;
                if(this.$props.getTotalPrice){
                    this.$props.getTotalPrice();
                }
            },
            setRemind: function(produceId){
                this.postQuery(true, CTX_URL + '/index/member/stockAddRemind', { produceId: produceId}, data=>{
                    if(data.status === 1){
                        this.tip('到货提醒设置成功!')
                    }
                })
            },
            reduceNum: function(){
                if(this.num <= 1){
                    this.$root.tip('不能再少了哦！')
                }else{
                    let num = this.num;
                    if(this.num > this.stock ){
                        if(this.stock >= 1){
                            this.num = this.stock
                        }else {
                            this.num = 1;
                        }
                    }else{
                        this.num--;
                    }

                    this.updateCart(error=>{
                        this.num = num;
                    });
                    this.getTotalPrice();
                }
            },
            addNum: function(){
                if(this.num >= this.stock){
                    this.$root.tip('不能再加了哦！')
                }else{
                    this.num++;
                    this.updateCart(error=>{
                        this.num--
                    });
                    this.getTotalPrice();
                }
            },
            updateCart: function(errorFun){
                let params = {
                    id: this.cartId,
                    num: this.num,
                    'produce.id': this.produceId
                }
                this.putQuery(true, this.updateCartUrl, params, data=>{
                    if(data.status === 1){

                        //this.disable = data.data.status === '1'?true: false;
                        this.disable = false;
                        this.status = '1';

                        this.cartId = data.data.id;
                        this.produceId = data.data.produce.id;
                        this.title = data.data.produce.goods.title;
                        this.name = data.data.produce.name;
                        this.price = data.data.produce.priceBuy;
                        this.num = data.data.num;
                        this.stock = data.data.produce.stockSell;
                        this.gooodId = data.data.produce.goods.id;
                        //this.status = data.data.status;
                        //this.img = data.data.produce.goods.icon;

                        this.getTotalPrice();
                    }

                }, errorFun)
            },
            showTypeList: function(){
                this.getQuery(true, CTX_URL + '/index/shoppingcart/goods/'+ this.goodId + '/produceList', data=>{
                    if(data.status === 1){
                        let params = {
                            name: this.title,
                            icon: this.img,
                            produceId: this.produceId,
                            produceList: data.data,
                            cartId: this.cartId,
                            num: this.num,
                            initProNum: this.initNum,
                            initProduceId: this.initProduceId,
                        }
                        if(this.showChooseProduce){
                            this.showChooseProduce(params)
                        }
                    }
                })
            }
        },
        created(){

        },
        computed: {
            getImgUrl: function(){
                return this.imgUrl + this.img;
            }
        },
        components:{
            CheckBox,
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
        height: 1.8rem;
        .border-1px-bottom();
        .radio{
            left: .15rem;
            top: .6rem;
        }
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
            left: .76rem;
            top: .2rem;
            height: 1.4rem;
            width: 1.4rem;
        }
        .title{
            position: absolute;
            left: 2.46rem;
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
            left: 2.46rem;
            top: .7rem;
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
        .type-edit{
            position: absolute;
            left: 2.46rem;
            top: .74rem;
            height: .28rem;
            background: @color-e4;
            line-height: .28rem;
            padding: 0 .06rem;
            .content{
                position: relative;
                font-size: .18rem;
                line-height: .28rem;
                color: @color-99;
            }
            .down-arrow{
                margin-left: .3rem;
                &::after{
                    right: .1rem;
                }
            }
            &:active{
                background: darken(@color-e4, 20%);
            }
        }
        .price{
            position: absolute;
            left: 2.46rem;
            bottom: .3rem;
            color: @color-33;
            font-size: .2rem;
            line-height: .2rem;
            &.disable{
                color: @color-cc;
            }
        }
        .error-info{
            position: absolute;
            left: 2.46rem;
            bottom: .3rem;
            color: @color-error;
            font-size: .2rem;
            line-height: .2rem;
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
        .num-edit{
            position: absolute;
            height: .6rem;
            width: 2.3rem;
            bottom: .15rem;
            left: 2.31rem;
            .n-reduce{
                position: absolute;
                height: 100%;
                width: .6rem;
                left: 0;
                background: url("images/reduce-icon-2.png") center no-repeat;
                background-size: 50%;
            }
            .n-add{
                position: absolute;
                top: 0;
                height: 100%;
                width: .6rem;
                right: 0;
                background: url("images/add-icon-2.png") center no-repeat;
                background-size: 50%;
            }
            .n-num{
                position: absolute;
                width: 1.1rem;
                left: .6rem;
                top: 0;
                height: 100%;
                text-align: center;
                line-height: .6rem;
                color: @color-gold-dark;
                font-size: .3rem;
            }
        }
    }
</style>