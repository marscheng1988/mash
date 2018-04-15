<template>
    <div>
        <scroller lock-x
                  :scrollbarY="true"
                  :height="getHeight"
                  ref="scroller">
            <div>
                <div class="ui-page-head"><p>选择商品属性</p></div>
                <div v-if="$route.query.cId" v-for="items in goods">
                    <c-good v-for="(item, $index) in items.groupGoodslist"
                            :isEnd="$index===items.groupGoodslist.length-1?true: false"
                            :item="item"
                            :key="item.id"
                            ref="cgood"></c-good>
                </div>

                <c-good v-if="$route.query.groupId" v-for="(item, $index) in goods"
                        :isEnd="$index===goods.length-1?true: false"
                        :item="item"
                        :key="item.id"
                        ref="cgood"></c-good>
            </div>
        </scroller>
        <v-footer
            :cancel="goBack"
            :confirm="confirmFun"
        ></v-footer>
    </div>
</template>
<script type="text/ecmascript-6">
    import VFooter from '../../components/footer/confirmFooter.vue'
    import CGood from '../../views/shoppingCart/c-good.vue'
    import {Scroller} from 'vux'

    export default{
        props: [],
        data: function () {
            return {
                getGoodsUrl: CTX_URL + '/index/shoppingcart/group/' + this.$route.query.groupId + '/groupGoods',
                height: -window.innerWidth / 6.4 * .98 + '',
                goods: [],
                addShoppingCartUrl: CTX_URL + '/index/shoppingcart/group/' + this.$route.query.groupId
            }
        },
        methods: {
            goBack: function () {
                this.backToView();
            },
            confirmFun () {
                if(this.$route.query.type === 'experience'){
                    this.experienceNow();
                }else {
                    this.confirmAddShoppingCart();
                }
            },

            /**确认添加到购物车*/
            confirmAddShoppingCart: function () {
                if(this.goods.length === 0) return;
                let params = {};
                let i = 0;
                for(const cgood of this.$refs.cgood){
                    if(cgood.selected && cgood.produceId){
                        params['shoppingcartProduceList[' + i + '].produce.id'] = cgood.produceId;
                        params['shoppingcartProduceList[' + i + '].num'] = cgood.num;
                        i++;
                    }
                }
                if (this.$route.query.cId) {
                    this.addShoppingCartUrl = CTX_URL + '/index/shoppingcart/collocation/' + this.$route.query.cId;
                }
                if(i > 0){
                    this.postQuery(true, this.addShoppingCartUrl, params, data=>{
                        if(data.status === 1){
                            this.$root.tip('添加购物车成功！', ()=>{
                                this.$router.go(-1);
                            })
                        }
                    })
                }else {
                    alert(1)
                    this.tip('请先选择商品！');
                }
            },

            /**立即体验*/
            experienceNow () {
                if(this.goods.length === 0) return;
                let params = {};
                let i = 0;

                for(const cgood of this.$refs.cgood){
                    if(cgood.selected && cgood.produceId){
                        params['experienceProduceList[' + i + '].produce.id'] = cgood.produceId;
                        params['experienceProduceList[' + i + '].num'] = cgood.num;
                        i++;
                    }
                }

                if(i > 0){
                    this.save('confirmOrder', params);
                    this.save('confirmOrder.address', '');
                    this.pushView('/confirmOrder')
                }else {
                    this.tip('请先选择商品！');
                }
            }
        },
        created(){
            if(this.$route.query.type === 'appoint'){
                document.title = '立即体验';
            }
            if (this.$route.query.cId) {
                this.getGoodsUrl = CTX_URL + '/index/shoppingcart/collocation/' + this.$route.query.cId + '/groupGoods';
            }
            this.getQuery(true, this.getGoodsUrl, data=>{
                if(data.status === 1){
                    this.goods = data.data;
                }
            })
        },
        updated:function(){
            this.$nextTick(() => {
                if(this.$refs.scroller) this.$refs.scroller.reset();
            });
        },
        computed: {
            getHeight: function () {
                return this.height;
            },
        },
        components: {
            VFooter,
            Scroller,
            CGood
        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/css/common.less";
</style>