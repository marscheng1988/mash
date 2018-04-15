<template>
    <div class="shopping-cart-view">
        <scroller lock-x
                  scrollbarY
                  :height="getHeight"
                  ref="scroller">
            <div>
                <div class="ui-page-head"><p>购物车</p></div>
                <div v-if="!noGoods" class="cart-line"></div>
                <div v-if="!noGoods" @click="triggerEdit" class="edit-item">{{edit?'完成':'编辑'}}</div>
                <cart v-for="item of enableCart" :key="item.id" ref="enableCart"
                    :item="item"
                    :edit="edit"
                    :getTotalPrice="getTotalPrice"
                    :showChooseProduce="showSlidePage"
                ></cart>
                <div v-if="!noGoods" class="cart-line"></div>
                <cart v-for="item of disAbleCart" :key="item.id" ref="disAbleCart"
                      :getTotalPrice="getTotalPrice"
                      :item="item"
                      :edit="edit"
                ></cart>
                <div v-if="disAbleCart.length>0" class="cart-line"></div>
                <div v-if="noGoods" class="emptyState"><p>暂无数据</p></div>
            </div>
        </scroller>
        <div class="cart-footer" @touchmove.prevent :style="cartFooter">
            <!--<div @click="triggerAll" :class="{radio: true, selected: selectAll}">全选</div>-->
            <div class="radio">
                <check-box class="radio-el"
                        :selected="selectAll"
                        @change="triggerAll"
                >
                </check-box>
                全选
            </div>

            <div v-if="!edit" class="price">总价<span>￥{{totalPrice?totalPrice.toFixed(2):'0.00'}}</span></div>
            <div v-if="!edit" @click="experienceFun" class="experience-btn">体验</div>
            <div v-if="edit" @click="deleteCart" class="experience-btn">删除</div>
        </div>
        <!--<v-footer :shoppingCart=true ref="footer"></v-footer>-->

        <!--选择产品页-->
        <slide-page
            slideType="bottom"
            :updateFun="updateFun"
            :confirmFun="slidePageConfirm"
            ref="slidePage">

            <scroller lock-x
                      scrollbarY
                      :bounce="true"
                      :height="pageHeight"
                      ref="pageScroller">
                <div>
                    <c-good :isEnd="true"
                            :item="getSlidePageData"
                            :hideRadio="true"
                            ref="produce"></c-good>
                </div>
            </scroller>

        </slide-page>
    </div>
</template>
<script type="text/ecmascript-6">
    import {Scroller} from 'vux'
    import {accAdd, accMul} from '../../static/MathTools';
    import slidePage from '../../components/slidePage/slidePage.vue'
    import Footer from '../../components/footer/Footer.vue'
    import CheckBox from '../../components/checkBox/checkBox.vue'
    import Cart from '../../views/shoppingCart/c-cart.vue'
    import CGood from '../../views/shoppingCart/c-good.vue'

    export default{
        props: [

        ],

        data(){
            return {
                height: -window.innerWidth / 6.4 * (.98+.98) + '',  //页面scroll高度
                pageHeight: window.innerHeight*.8 - window.innerWidth / 6.4 * .98 + 'px', //选择产品页面scroll高度
                getShoppingCartUrl: CTX_URL + '/index/member/shoppingcart/1',
                deleteCartsUrl: CTX_URL + '/index/shoppingcart',
                enableCart: [],
                disAbleCart: [],
                allCartLength: 0,
                selectAll: false,
                totalPrice: 0,
                edit: false,
                cartId: '',
                slidePageData: {
                    name: '',
                    icon: '',
                    produceList: []
                },
                noGoods: false,
                cartFooter: {}
            }
        },
        mounted: function(){

        },
        updated:function(){
            this.$nextTick(() => {
                if(this.$refs.scroller) this.$refs.scroller.reset();
                if(this.$refs.pageScroller) this.$refs.pageScroller.reset();
            });
        },
        methods: {
            //获取购物车总数量,以及被选中的数量
            getAllNumAndSelectedNum: function(){
                let all = 0;
                let selected = 0;

                if(this.edit){ //编辑状态
                    for(let cart of this.$refs.enableCart||[]){
                        if(!cart.deleted){
                            all++;
                            if(cart.selected){
                                selected++
                            }
                        }
                    }
                    for(let cart of this.$refs.disAbleCart||[]){
                        if(!cart.deleted){
                            all++;
                            if(cart.selected){
                                selected++
                            }
                        }
                    }

                    if(all === selected && all!== 0){
                        this.selectAll = true;
                    }else{
                        this.selectAll = false;
                    }

                    if(all === 0){
                        this.noGoods = true;
                    }else {
                        this.noGoods = false;
                    }
                }else {     //非编辑状态

                    for(let cart of this.$refs.enableCart||[]){
                        if(!cart.deleted && cart.status === '1'){
                            all++;
                            if(cart.selected){
                                selected++
                            }
                        }
                    }

                    if(all === selected && all!== 0){
                        this.selectAll = true;
                    }else{
                        this.selectAll = false;
                    }

                    if(all === 0 && this.$refs.disAbleCart.length === 0){
                        this.noGoods = true;
                    }else {
                        this.noGoods = false;
                    }
                }
                return {all: all, selected: selected}
            },

            //编辑
            triggerEdit: function(){
                this.edit = !this.edit;
                if(!this.edit){
                    for(let cart of this.$refs.enableCart||[]){
                        if(!cart.deleted){
                            if(cart.selected && cart.status != 1){
                                cart.selected = false;
                            }
                        }
                    }
                }
            },

            //计算总价
            getTotalPrice: function(){
                let numData = this.getAllNumAndSelectedNum();

                let totalPrice = 0;
                for(let cart of this.$refs.enableCart||[]){
                    if(!cart.deleted){
                        if(cart.selected && cart.status == 1){
                            totalPrice = accAdd(totalPrice, accMul(cart.num, cart.price));
                        }
                    }
                }
                this.totalPrice = totalPrice;
            },

            //体验
            experienceFun: function(){
                let params = {};
                let i = 0;
                if(this.edit) return;

                for(let cart of this.$refs.enableCart||[]){
                    if(!cart.deleted && cart.selected){
                        params['shoppingcartProduceList[' + i + '].id'] = cart.cartId;
                        i++;
                    }
                }

                if(i > 0){
                    this.save('confirmOrder', params);
                    this.save('confirmOrder.address', '');
                    this.pushView('/confirmOrder', {type: 'cart'});
                }else {
                    this.tip('请先选择商品！');
                }

            },

            //全选
            triggerAll: function(e){

                let numData = this.getAllNumAndSelectedNum();

                if(this.edit){ //编辑状态
                    if(numData.all === numData.selected){
                        for(let cart of this.$refs.enableCart||[]){
                            if(!cart.deleted && cart.selected){
                                cart.selected = false;
                            }
                        }
                        for(let cart of this.$refs.disAbleCart||[]){
                            if(!cart.deleted && cart.selected){
                                cart.selected = false;
                            }
                        }
                        this.selectAll = false;
                    }else if(numData.all > numData.selected){
                        for(let cart of this.$refs.enableCart||[]){
                            if(!cart.deleted && !cart.selected){
                                cart.selected = true;
                            }
                        }
                        for(let cart of this.$refs.disAbleCart||[]){
                            if(!cart.deleted && !cart.selected){
                                cart.selected = true;
                            }
                        }
                        this.selectAll = true;

                    }
                }else{  //非编辑状态
                    if(numData.all === numData.selected){
                        for(let cart of this.$refs.enableCart||[]){
                            if(!cart.deleted && cart.selected){
                                cart.selected = false;
                            }
                        }
                        this.selectAll = false;
                    }else if(numData.all > numData.selected){
                        for(let cart of this.$refs.enableCart||[]){
                            if(!cart.deleted && !cart.selected && cart.status == 1){
                                cart.selected = true;
                            }
                        }
                        this.selectAll = true;
                    }
                }


                this.getTotalPrice();
            },

            //删除购物车
            deleteCart: function(){
                let carts = {};
                let i = 0;
                for(let cart of this.$refs.enableCart||[]){
                    if(cart.selected && !cart.deleted){
                        carts['shoppingcartProduceList[' + i + '].id'] = cart.cartId;
                        i++;
                    }
                }
                for(let cart of this.$refs.disAbleCart||[]){
                    if(cart.selected && !cart.deleted){
                        carts['shoppingcartProduceList[' + i + '].id'] = cart.cartId;
                        i++;
                    }
                }
                if(i > 0){
                    this.$root.confirm('确定删除选中商品？', i=>{
                        if(i==='1'){
                            this.postQuery(true, this.deleteCartsUrl, carts, data=>{
                                if(data.status === 1){
                                    this.$root.tip('删除成功');
                                    for(let cart of this.$refs.enableCart||[]){
                                        if(cart.selected && !cart.deleted){
                                            cart.deleted = true;
                                        }
                                    }
                                    for(let cart of this.$refs.disAbleCart||[]){
                                        if(cart.selected && !cart.deleted){
                                            cart.deleted = true;
                                        }
                                    }
                                    this.getTotalPrice();
                                    this.$refs.scroller.reset();
                                }
                            }, null, true)
                        }
                    })
                }
            },
            updateFun: function(){

            },

            //弹出产品列表页面
            showSlidePage: function(data){
                this.selectedProduceId = data.produceId;
                this.cartId = data.cartId;
                this.slidePageData = data;
                this.$refs.produce.initGood(data);
                this.$refs.slidePage.showPage();
            },

            //产品列表页面 点击确认按钮
            slidePageConfirm: function(){
                let produce = this.$refs.produce;
                if(!produce.produceId){
                    return;
                }
                let params = {
                    name: produce.name,
                    price: produce.price,
                    num: produce.num,
                    stock: produce.stockSell,
                    produceId: produce.produceId,
                }
                for(let cart of this.$refs.enableCart){

                    if(cart.cartId === this.cartId){
                        let params = {
                            num: cart.num,
                            'produceId': cart.produceId
                        }
                        cart.produceId = produce.produceId;
                        cart.num = produce.num;

                        cart.updateCart(error=>{
                            cart.produceId = params.produceId;
                            cart.num = params.num;
                        })
                        break;
                    }
                }
            },
        },
        created(){
            if(this.$route.query.from == 'xuanfu') {
                this.cartFooter = {
                    bottom: 0
                }
                this.height = -window.innerWidth / 6.4 * (.98) + '';
            } else {
                this.cartFooter = {
                    bottom: '0.98rem'
                }
                this.height = -window.innerWidth / 6.4 * (.98 +.98) + '';
            }
            this.postQuery(true, this.getShoppingCartUrl, {}, data=>{
                if(data.status === 1 && data.page && data.page.list){
                    let enableCart = [],
                        disAbleCart = [];
                    for(let item of data.page.list){
                        if(item.status !== '2'){
                            enableCart.push(item)
                        }else{
                            disAbleCart.push(item)
                        }
                    }
                    this.enableCart = enableCart;
                    this.disAbleCart = disAbleCart;
                    this.allCartLength = data.page.list.length;
                    this.noGoods = false;
                }else if(!data.page || !data.page.list){
                    this.enableCart = [];
                    this.disAbleCart = [];
                    this.allCartLength = 0;
                    this.noGoods = true;
                }
            })
        },
        computed: {
            getHeight: function () {
                return this.height;
            },
            getSlidePageData: function(){
                return this.slidePageData;
            }
        },
        components:{
            Scroller,
            Cart,
            slidePage,
            CGood,
            CheckBox,
            'VFooter':Footer,
        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/css/common.less";
    .cart-line{
        position: relative;
        height: .2rem;
        width: 100%;
        background: @color-f4;
    }
    .shopping-cart-view{
        min-height: 100%;
        background: @color-f4;
    }
    .edit-item{
        position: relative;
        height: .88rem;
        width: 100%;
        line-height: .88rem;
        text-align: right;
        padding-right: .3rem;
        box-sizing: border-box;
        color: @color-33;
        font-size: .24rem;
        background: @color-ff;
        .border-1px-bottom();
        &:active{
            background: darken(@color-ff, 10%);
        }
    }
    .cart-footer{
        background: @color-ff;
        position: absolute;
        width: 100%;
        height: .98rem;
        .border-1px-top();
        left: 0;
        bottom: .98rem;
        background: @color-ff;
        .radio{
            position: absolute;
            width: 1rem;
            height:.6rem;
            line-height: .6rem;
            padding-left: .75rem;
            color: @color-33;
            top: .19rem;
            left: .15rem;
            .radio-el{
                top: 0;
                left: 0;
            }
        }
        .price{
            position: absolute;
            right: 1.92rem;
            width: 2rem;
            top: 0;
            line-height: .98rem;
            font-size: .24rem;
            color: @color-66;
            text-align: right;
            padding-right: .3rem;
            span{
                font-size: .26rem;
                color: @color-gold-dark;
                font-weight: bold;
            }
        }
        .experience-btn{
            position: absolute;
            width: 1.92rem;
            right: 0;
            top: 0;
            height: .98rem;
            background: @color-33;
            text-align: center;
            color: @color-ff;
            line-height: .98rem;
        }
    }
</style>