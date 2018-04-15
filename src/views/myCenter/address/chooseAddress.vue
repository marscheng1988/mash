<template>
    <div class="ui-page">
        <scroller
                lock-x
                scrollbarY
                :height="height"
                ref="scroller">
            <div>
                <div class="address-warp" v-if="addressListData.length !== 0">
                    <addressBar v-for="item in addressListData"
                                :addressData="item"
                                :key="item.id"
                                :chooseAddress="true">

                    </addressBar>
                </div>
                <div v-else class="emptyState page-middle">
                    <img src="./images/noAddress.png"/>
                    <p>您还没有添加收货地址</p>
                </div>
            </div>
        </scroller>
        <div class="confirm-button single" @click="addNewAddress">添加新地址</div>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common.less";
    .ui-page{
        background: @color-f4;
    }
    .address-warp{
        overflow: hidden;
    }
    .page-middle{
        margin-top: 50%;
    }
</style>
<script type="text/ecmascript-6">
    import {Scroller} from 'vux';
    import router from '../../../router';
    import addressBar from './addressBar.vue'
    export default{
        data(){
            return{
                addressListData:[],
                height: -window.innerWidth/6.4*.88 + '',
            }
        },
        updated:function(){
            this.$nextTick(() => {
                this.$refs.scroller.reset();
            });
        },
        components:{
            'addressBar':addressBar,
            Scroller
        },
        mounted () {
            this.queryAddressData ()
        },
        methods:{
            queryAddressData () {
                let self = this;
                this.postQuery(false ,
                            CTX_URL + "/index/member/addressList" ,
                            {},
                            function(response){
                                if(response.status ===1 ){
                                    console.log(response)
                                    if(response.data && response.data.length != 0){
                                        response.data.forEach(function(item){
                                            self.addressListData.push(item)
                                        })
                                    }
                                }
                            })
            },
            deleteAddress (targetId) {
                console.log(this)
                let self = this;
                this.confirm('确定删除该收货地址？',function(){
                    self.deleteQuery(true,
                                    CTX_URL + '/index/member/address/' + targetId,
                                    {},
                                    function(response){
                                        console.log(response)
                                        self.tip('删除成功！')
                                    })
                })

            },

            editAddress (targetId) {
                this.save('editAddressId',targetId);
                this.$root.pushView('newAddress')
            },

            addNewAddress () {
                this.remove('editAddressId');
                this.$root.pushView('newAddress')
            }
        }

    }
</script>
