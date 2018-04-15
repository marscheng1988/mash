<template>
    <!--<div class="lable-warp">-->
        <!--<span v-for="n in lables" :class="{active:selectedLables.includes(n.id)}" @click="clickLable(n.id)" :key="n.id">{{n.name}}</span>-->
    <!--</div>-->
    <div class="star">
        <span @click="changeStarIndex(1)" :class="{active: starIndex >= 1}"></span>
        <span @click="changeStarIndex(2)" :class="{active: starIndex >= 2}"></span>
        <span @click="changeStarIndex(3)" :class="{active: starIndex >= 3}"></span>
        <span @click="changeStarIndex(4)" :class="{active: starIndex >= 4}"></span>
        <span @click="changeStarIndex(5)" :class="{active: starIndex >= 5}"></span>
    </div>
</template>
<script type="text/ecmascript-6">

    export default{
        props: ['produceIndex'],

        data () {
            return {
                index:'',
                starIndex:[],  //商品评分

            }
        },
        updated () {
            let self = this;
//            this.$parent.lableSelected[self.produceIndex] = self.selectedLables;

        },
        mounted () {
            let self = this;

//            let urlL = CTX_URL + '/index/member/summary?produceId=' + this.item.produce.id;
//
//            //请求标签数据
//            this.getQuery(false ,urlL, function (response) {
//                console.log(response.data)
//                self.lables = response.data
//            });
        },
        methods: {
            changeStarIndex (star) {
                this.starIndex = star;
                console.log(this.starIndex)
                this.$parent.param['orderJudgeList['+this.produceIndex +'].goodsLevel'] = star;
            },
//            clickLable (targetId) {
//
//                if(this.selectedLables.length == 0 || !this.selectedLables.includes(targetId)){
//                    this.selectedLables.push(targetId);
//                }else if(this.selectedLables.includes(targetId)) {
//                    this.selectedLables.splice(this.selectedLables.findIndex((n) => n === targetId),1)
//                }
//                this.$parent.param['orderJudgeList['+this.produceIndex +'].produce.id'] = this.item.produce.id;
//            },
        },
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common.less";
    .star{
        width: 2.1rem;
        height: .86rem;
        span{
            height: .86rem;
            width: .22rem;
            float: left;
            margin:0 .1rem;
            background: url("images/star.png") center no-repeat;
            background-size: .22rem .22rem;
            &.active{
                background: url("images/star-light.png") center no-repeat;
                background-size: .22rem .22rem;
            }
        }
    }
</style>
