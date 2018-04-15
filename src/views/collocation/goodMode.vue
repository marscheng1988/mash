<template>
    <div class="good-mode">
        <div class="good-item" :data-id="item.id" v-for="item in list" @click="showGoodDetail">
            <img class="good-img" v-lazy="imgUrl + item.photo">
            <div class="good-name">{{item.title}}</div>
            <div class="good-price">￥{{item.price}}起</div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">

    export default{
        props: [
            'list'
        ],
        data(){
            return {
                imgUrl: IMG_URL,
            }
        },
        methods: {
            showGoodDetail: function(e){
                let groupId = e.currentTarget.getAttribute('data-id');
                this.pushView('/group?groupId=' + groupId + '&from=group');
            }
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
    .good-mode{
        position: relative;
        width: 5.8rem;
        margin-left: .3rem;
        text-align: left;
        .good-item{
            position: relative;
            display: inline-block;
            width: 2.9rem;
            height: 4.25rem;
            .border-1px-top();
            &:first-child::after{
                content: "";
                height: .4rem;
                width: 1px;
                background: @color-e4;
                position: absolute;
                right: 0;
                top: 0;
                transform-origin: left top;
                transform: scaleX(0.5);
            }
            &:nth-child(2n+0):last-child::after{
                content: "";
                height: .4rem;
                width: 1px;
                background: @color-e4;
                position: absolute;
                left: 0;
                bottom: 0;
                transform-origin: left bottom;
                transform: scaleX(0.5);
            }
            .good-img{
                position: absolute;
                width: 2.5rem;
                height: 2.85rem;
                top: .4rem;
                left: .2rem;
            }
            .good-name{
                position: absolute;
                text-align: center;
                width: 100%;
                bottom: .7rem;
                height: .18rem;
                line-height: .18rem;
                font-size: .16rem;
                color: @color-99;
                font-family: @PFSC-R;
                .ellipsis;
            }
            .good-price{
                position: absolute;
                text-align: center;
                width: 100%;
                bottom: .34rem;
                height: .24rem;
                line-height: .24rem;
                font-size: .22rem;
                color: @color-33;
                font-family: @PFSC-M;
                .ellipsis;
            }
        }
    }
</style>