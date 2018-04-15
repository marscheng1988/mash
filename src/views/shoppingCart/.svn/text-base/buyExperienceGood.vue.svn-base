<template>
    <div>
        <scroller lock-x
                  scrollbarY
                  :height="height"
                  ref="scroller">
            <div>
                <div class="ui-page-head"><p>购买体验商品</p></div>
                <div class="cart-line"></div>
                <div class="edit-item">请选择您想购买的商品</div>

                <cart v-for="item of list" :key="item.id" ref="carts"
                      :item="item"
                      :isSelect="isSelect"
                      :isBuy="true"
                      :edit="true"
                      :showChooseProduce="showSlidePage"
                ></cart>

            </div>
        </scroller>
        <div class="cart-footer">
            <div class="radio">
                <check-box class="radio-el"
                           :selected="selectAll"
                           @change="triggerAll"
                >
                </check-box>
                全选</div>
            <div @click="submit" class="experience-btn">提交</div>
        </div>

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
                            :isBuy="true"
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
    import CheckBox from '../../components/checkBox/checkBox.vue'
    import Cart from '../../views/shoppingCart/c-cart.vue'
    import CGood from '../../views/shoppingCart/c-good.vue'

    export default{
        props: [

        ],
        data(){
            return {
                height: -window.innerWidth / 6.4 * (.98) + '',  //页面scroll高度
                pageHeight: window.innerHeight*.8 - window.innerWidth / 6.4 * .98 + 'px', //选择产品页面scroll高度
                orderId: this.$route.query.orderId,
                list: [],
                selectAll: true,
                isSelect: this.$route.query.buy? false: true,
                slidePageData: {
                    name: '',
                    icon: '',
                    produceList: []
                },
                orderData:''
            }
        },
        updated:function(){
            this.$nextTick(() => {
                if(this.$refs.scroller) this.$refs.scroller.reset();
                if(this.$refs.pageScroller) this.$refs.pageScroller.reset();
            });
        },
        methods: {
            submit(){
                let params = {};    //订单确认页参数
                let comfirmParams = {}; //提交订单参数
                let i = 0;
                let j = 0
                params.id = this.orderId;
                comfirmParams.id = this.orderId;

                for(let cart of this.$refs.carts){
                    if(!cart.selected){
                        comfirmParams['experienceProduceList[' + j + '].produce.id'] = cart.produceId;
                        comfirmParams['experienceProduceList[' + j + '].id'] = cart.cartId;
                        comfirmParams['experienceProduceList[' + j + '].num'] = cart.num;
                        comfirmParams['experienceProduceList[' + j + '].decisionType'] = '1';//退货
                    }else {
                        comfirmParams['experienceProduceList[' + j + '].produce.id'] = cart.produceId;
                        comfirmParams['experienceProduceList[' + j + '].id'] = cart.cartId;
                        comfirmParams['experienceProduceList[' + j + '].num'] = cart.num;

                        if(cart.initProduceId === cart.produceId){
                            comfirmParams['experienceProduceList[' + j + '].decisionType'] = '2';//购买
                        }else if(cart.num <= cart.stock){
                            comfirmParams['experienceProduceList[' + j + '].decisionType'] = '3';//换购
                        }else {
                            comfirmParams['experienceProduceList[' + j + '].decisionType'] = '4';//预购
                        }
                    }
                    j++;

                    if(cart.selected && cart.produceId){
                        params['experienceProduceList[' + i + '].produce.id'] = cart.produceId;
                        params['experienceProduceList[' + i + '].id'] = cart.cartId;
                        params['experienceProduceList[' + i + '].num'] = cart.num;

                        if(cart.initProduceId === cart.produceId){
                            params['experienceProduceList[' + i + '].decisionType'] = '2';//购买
                        }else if(cart.num <= cart.stock){
                            params['experienceProduceList[' + i + '].decisionType'] = '3';//换购
                            this.alert('暂时不支持换购!');
                            return;
                        }else {
                            params['experienceProduceList[' + i + '].decisionType'] = '4';//预购
                            this.alert('暂时不支持预购!');
                            return;
                        }
                        i++;
                    }
                }

                this.save('confirmOrder', comfirmParams);

                let url ='';
                if (this.orderData.statusMember == '98') {
                    url = CTX_URL + '/index/member/buyOrder/confirm';
                } else {
                    url = CTX_URL + '/index/member/experienceOrder/decideConfirm';
                }

                this.postQuery(true, url, params, data=>{
                    if(data.status === 1){
                        this.save('buyOrder', data.data);
                        if(data.data[0] && data.data[0].address){
                            this.save('confirmOrder.address', data.data[0].address);
                        }else{
                            this.save('confirmOrder.address', '');
                        }
                        this.replaceView('/buyOrder');
                    }
                })

            },
            updateFun(){

            },
            //产品列表页面 点击确认按钮
            slidePageConfirm: function(){
                let produce = this.$refs.produce;
                let params = {
                    name: produce.name,
                    price: produce.price,
                    num: produce.num,
                    stock: produce.stockSell,
                    produceId: produce.produceId,
                    styleType: produce.styleType,
                }
                for(let cart of this.$refs.carts){
                    if(cart.cartId === this.cartId){
                        let params = {
                            num: cart.num,
                            'produceId': cart.produceId
                        }
                        cart.produceId = produce.produceId;
                        cart.num = produce.num;

                        cart.name = produce.name;
                        cart.price = produce.price;
                        cart.stock = produce.stockSell;
                        break;
                    }
                }
            },
            triggerAll: function(){
                let carts = this.$refs.carts;
                let allNum = carts.length;
                let selectedNum = 0;

                for(let cart of carts){
                    if(cart.selected){
                        selectedNum++;
                    }
                }

                if(allNum === 0){
                    this.selectAll = false;
                }else if(allNum === selectedNum){
                    this.selectAll = false;
                    for(let cart of carts){
                        cart.selected = false;
                    }
                }else if(allNum > selectedNum){
                    this.selectAll = true;
                    for(let cart of carts){
                        cart.selected = true;
                    }
                }

            },
            //弹出产品列表页面
            showSlidePage: function(data){
                this.selectedProduceId = data.produceId;
                this.cartId = data.cartId;
                this.slidePageData = data;
                this.$refs.produce.initGood(data);
                this.$refs.slidePage.showPage();
            },
        },
        created(){
            let self = this;
            this.getQuery(true, CTX_URL + '/index/member/experienceOrder/produceList?experienceOrderId=' + this.orderId, data=>{
                if(data.status === 1 ){
                    self.orderData = data.data;
                    self.list = data.data.experienceProduceList;
                }
            })
        },
        computed: {
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
    .edit-item{
        position: relative;
        height: .88rem;
        width: 100%;
        .border-1px-bottom();
        line-height: .88rem;
        text-align: left;
        padding-left: .3rem;
        box-sizing: border-box;
        color: @color-66;
        font-size: .20rem;
    }
    .cart-footer{
        position: absolute;
        width: 100%;
        height: .98rem;
        .border-1px-top();
        left: 0;
        bottom: .0rem;
        background: @color-ff;
        .radio{
            position: absolute;
            width: 1rem;
            height:.98rem;
            line-height: .98rem;
            padding-left: .9rem;
            color: @color-33;
            .radio-el{
                left: .15rem;
                top: .19rem;
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
