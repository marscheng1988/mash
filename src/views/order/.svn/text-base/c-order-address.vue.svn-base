<template>
    <div class="order-address-mode" @click="chooseAddress">
        <div v-if="!address" class="no-address-info">您还没有添加地址，点击添加</div>
        <div v-if="address" class="address-info">
            <div class="name">{{nameText}}{{address.receiveName}}</div>
            <div class="tel" :class="{orderDetail:!arrowShow}">{{address.receiveTel}}</div>
            <div class="address-icon"></div>
            <div class="address" :class="{orderDetail:!arrowShow}">{{(address.area.name?address.area.name:'') + address.addressDetail}}</div>
        </div>
        <span v-if="arrowShow" class="right-arrow"></span>
    </div>
</template>
<script type="text/ecmascript-6">
    //import HeaderComponent from '../../views/'

    export default{
        props: [
            'address',
            'rightArrow',
            'sendAddress'
        ],
        data(){
            return {
                arrowShow: this.rightArrow == undefined ? true : false,
                nameText:'收货人: '
            }
        },
        mounted (){
            if(this.sendAddress){
                this.nameText = ''
            }
        },
        methods: {
            chooseAddress(){
                if(this.arrowShow){
                    this.pushView('/myCenter/addressList',{type: 'choose'});
                }

            },
        },
        created(){

        },
        computed: {

        },
        components:{

        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/css/common.less";
    .order-address-mode{
        position: relative;
        width: 100%;
        height: 1.5rem;
        .border-1px-bottom();
        background: @color-ff;
        .right-arrow::after{
            right: .3rem;
        }
        >.no-address-info{
            position: relative;
            height: 100%;
            width: 5.8rem;
            padding: 0 .3rem;
            font-size: .24rem;
            color: @color-33;
            line-height: 1.5rem;
        }
        >.address-info{
            position: relative;
            height: 100%;
            width: 100%;
            >.name{
                position: absolute;
                top: .3rem;
                left: .8rem;
                line-height: .24rem;
                font-size: .24rem;
                font-family: @PFSC-R;
                color: @color-33;
            }
            >.tel{
                position: absolute;
                top: .3rem;
                right: .7rem;
                line-height: .24rem;
                font-family: @PFSC-R;
                color: @color-33;
                font-size: .24rem;
                &.orderDetail{
                    right: .3rem;
                }
            }
            >.address-icon{
                position: absolute;
                bottom: .31rem;
                left: .3rem;
                height: .3rem;
                width: .3rem;
                background: url("images/address-icon.png") center no-repeat;
                background-size: contain;
            }
            >.address{
                position: absolute;
                line-height: .2rem;
                width: 4.9rem;
                left: .8rem;
                top: .98rem;
                font-size: .18rem;
                font-family: @PFSC-R;
                color: @color-33;
                &.orderDetail{
                    width: 5.3rem;
                }
            }
        }
    }
</style>
