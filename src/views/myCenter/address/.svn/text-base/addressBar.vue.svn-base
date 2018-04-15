<template>
    <div class="list-item">
        <div class="list-content" @click="clickAddress">
            <div class="name">
                <span>{{addressData.receiveName}}</span>
                <span>{{addressData.receiveTel}}</span>
            </div>
            <div class="address">
                <p>{{addressData.area.name+addressData.addressDetail}}</p>
            </div>
        </div>
        <div class="list-button">

            <span class="setDefault" :class ="{active:addressData.defaultFlag == '1'}" @click="setDefault(addressData.id)">
                <check-box class="del-radio" :selected="addressData.defaultFlag == '1'"></check-box>
                默认地址
            </span>
            <span class="delete" @click="deleteAddress(addressData.id)"><i class="iconfont" ></i>删除</span>
            <span class="edit" @click="editAddress(addressData.id)"><i class="iconfont" ></i>编辑</span>
        </div>
        <div class="order-line"></div>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common.less";
        .list-item{
            width: 100%;
            background: @color-ff;
            .active{
                color: @color-33 !important;
            }
            .list-content{
                position: relative;
                width: 100%;
                padding: .1rem 0.3rem 0 0.3rem;
                box-sizing: border-box;
                overflow: hidden;
                .name{
                    height: .64rem;
                    width: 100%;
                    span{
                        line-height: 0.64rem;
                        font-size: @f-24;
                        &:first-child{
                            float: left;
                        }
                        &:last-child{
                            float: right;
                        }
                    }
                }
                .address{
                    width: 100%;
                    padding-bottom: .2rem;
                    overflow: hidden;
                    p{
                        line-height: 0.4rem;
                        font-size: @f-22;
                        color: @color-33;
                    }
                }
            }
            .list-button{
                position: relative;
                height:0.8rem;
                width: 100%;
                padding: 0 0.3rem;
                box-sizing: border-box;
                .border-1px-top();

                /*display: flex;*/
                /*align-items:center;*/
                span{
                    position: absolute;
                    height: 0.8rem;
                    line-height: 0.835rem;
                    font-size: @f-22;
                    color: @color-99;
                    &:last-child{
                        padding-right: .3rem;
                    }
                    i{
                        display: inline-block;
                        width: 0.2rem;
                        height: 0.3rem;
                        padding: 0 .1rem;

                    }
                    &.setDefault{
                        position: absolute;
                        left: .15rem;
                        padding-left: .55rem;
                        .del-radio{
                            left: 0;
                            top:.1rem;
                        }
                    }
                    &.edit{
                        right: 1rem;
                        /*float: right;*/
                        i{
                            background: url('./images/edit.png') center 0.1em no-repeat;
                            background-size: 0.2rem 0.2rem;
                        }
                    }
                    &.delete{
                        right: .3rem;
                        /*float: right;*/
                        i{
                            background: url('./images/delete.png') center 0.1em no-repeat;
                            background-size: 0.2rem 0.2rem;
                        }

                    }
                }
            }
        }
</style>
<script type="text/ecmascript-6">
    import CheckBox from '../../../components/checkBox/checkBox.vue'
    export default{
        props:[
            'addressData',
            'chooseAddress'
        ],
        components:{
            CheckBox
        },
        methods:{
            deleteAddress (targetId) {
                let self = this;
                this.confirm('确定删除该收货地址？',function(index){
                    if(index == 1 ){
                        self.deleteQuery(true,
                                        CTX_URL + '/index/member/address/' + targetId,
                                        function(response){
                                            if(response.status == 1) {
                                                let listData =self.$parent.addressListData;
                                                listData.forEach(function(term,index){
                                                    if(term.id == targetId)
                                                        listData.splice(index,1);

                                                })
                                            }
                                        })
                    }

                })

            },
            setDefault (targetId) {
                let self = this;
                this.putQuery(true,
                            CTX_URL + '/index/member/address/' + targetId,
                            {},
                            function(response){
                                if(response.status == 1){
                                    let listData =self.$parent.addressListData;
                                    listData.forEach(function(term,index){
                                        listData[index].defaultFlag = "0";
                                        if(term.id == targetId){
                                            listData[index].defaultFlag = "1"
                                        }

                                    })
                                }

                            })
            },
            editAddress (targetId) {
                this.save('editAddressId',targetId);
                this.pushView('/myCenter/newAddress',{Id:targetId})
            },
           	clickAddress () {
                if(this.chooseAddress){
                    this.save('confirmOrder.address', this.addressData);
                    this.save('returnGoods.address', this.addressData);
                    this.backToView();
                }
            }
        }

    }
</script>
