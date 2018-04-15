<template>
    <div class="lable-warp">
        <span v-for="n in lables" :class="{active:selectedLables.includes(n.id)}" @click="clickLable(n.id)" :key="n.id">{{n.name}}</span>
    </div>
</template>
<script type="text/ecmascript-6">

    export default{
        props: ['item','produceIndex'],

        data () {
            return {
                index:'',
                lables:[],
                selectedLables:[]

            }
        },
        updated () {
            let self = this;
            this.$parent.lableSelected[self.produceIndex] = self.selectedLables;

        },
        mounted () {
            let self = this;

            let urlL = CTX_URL + '/index/member/summary?produceId=' + this.item.produce.id;

            //请求标签数据
            this.getQuery(false ,urlL, function (response) {
//                console.log(response.data);
                self.lables = response.data
            });
        },
        methods: {
            clickLable (targetId) {

                if (this.selectedLables.length == 0 || !this.selectedLables.includes(targetId)) {
                    this.selectedLables.push(targetId);
                }
                else if (this.selectedLables.includes(targetId)) {
                    this.selectedLables.splice(this.selectedLables.findIndex((n) => n === targetId),1)
                }
                this.$parent.param['orderJudgeList['+this.produceIndex +'].produce.id'] = this.item.produce.id;
            },
        },

        computed: {

        },
        components:{

        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common.less";
    .lable-warp{
        span{
            float: left;
            padding:.1rem;
            margin:.05rem .1rem;
            line-height: .2rem;
            font-size: @f-20;
            border: 1px solid @color-33;
            &.active{
                background: @color-33;
                color: #fff;
            }
        }
    }
</style>
