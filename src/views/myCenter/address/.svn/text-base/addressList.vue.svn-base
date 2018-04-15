<template>
    <div class="page">
        <!--<scroller lock-x-->
            <!--scrollbarY-->
            <!--:height="height">-->
            <div class="sub-page">
                <div class="ui-page-head">
                    <p>{{title}}</p>
                </div>
                <div class="address-warp" v-if="addressListData.length !== 0">
                    <addressBar v-for="item in addressListData" :addressData="item" :key="item.id" @questData="queryAddressData" :chooseAddress="choose">

                    </addressBar>
                </div>
                <div v-else class="emptyState" :style="{marginTop: emptyStateMarginTop + 'px'}">
                    <img src="./images/noAddress.png"/>
                    <p>您还没有添加收货地址</p>
                </div>
            </div>
        <!--</scroller>-->
        <div class="confirm-button single" @click="addNewAddress">添加新地址</div>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common.less";
    .page{
        position: relative;
        background: @color-f4;
        height:100%;
        > .sub-page {
            height: calc(~"100% - 0.88rem");
            overflow: scroll;
            -webkit-overflow-scrolling: touch;

        }
    }
    .confirm-button{
        position: absolute;
    }
    .address-warp{
        padding-bottom: .88rem;
        overflow: hidden;
    }

</style>
<script type="text/ecmascript-6">
    import router from '../../../router';
    import addressBar from './addressBar.vue';
    import {Scroller} from 'vux'
    export default{
        data(){
            return{
                addressListData:[
//                    {
//                        addressDetail:"的",
//                        area:{
//                            id:"03b7423bba44451bbe77ec0faefbaa57",
//                            isNewRecord:false,
//                            name:"浙江省杭州市上城区",
//                            parentId:"0",
//                        },
//                        defaultFlag:"0",
//                        id:"942c52dcd4cd4b76bc8639d044419860",
//                        isNewRecord:false,
//                        receiveName:"订单",
//                        receiveTel:"13211111111",
//                        transportDays:1,
//                    }
                ],
                choose: false,
                emptyStateMarginTop:'',
                title: '管理收货地址'
            }
        },
        components:{
            addressBar,
            Scroller
        },
        updated () {
            this.$nextTick(() => {
                window.scrollTo(0,0)
            });
        },
        created: function(){
            let type = this.$route.query.type;
            if (type === 'choose') {
                this.choose = true;
                this.title = '选择地址';
                document.title = this.title;
            }
        },
        mounted () {
            this.emptyStateMarginTop = (window.innerHeight- (3.56+0.88-0.7)*window.innerHeight/6.4)/2;
            this.queryAddressData ();
        },
        methods:{
            queryAddressData () {
                let self = this;
               this.postQuery(false ,
                            CTX_URL + "/index/member/addressList" ,
                            {},
                            function(response){
                               if(response.status ===1 ){
                                   if(response.data && response.data.length != 0){
                                       response.data.forEach(function(item){
                                           self.addressListData.push(item)
                                       })
                                   }

                               }
                           })
            },
            addNewAddress () {
                this.pushView('newAddress')
            }
        }

    }
</script>
