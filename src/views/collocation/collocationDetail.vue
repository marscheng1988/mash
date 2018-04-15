<template>
    <div>
        <scroller lock-x
                  scrollbarY
                  :height="height"
                  ref="scroller">
            <div>
                <collocation-mode :item="params">
                </collocation-mode>
                <div class="type-info">
                    <img class="left-icon" src="../../views/collocation/images/introduce-icon.png">
                    <div class="right-info">{{params.description}}</div>
                </div>
                <div class="page-line"></div>
                <img class="title-img" src="../../views/collocation/images/title-related-good.png">
                <good-mode
                        :list="getGroupList"
                ></good-mode>
            </div>
        </scroller>
        <v-xfbox></v-xfbox>
        <v-footer
            :data="params"
            :cId="cId"
            :collected="getCollected"
            commontType="collocation"
            :commontId="cId"
        ></v-footer>
    </div>
</template>
<script type="text/ecmascript-6">
    import collocationMode from '../../views/collocation/collocationMode.vue'
    import footer from '../../views/collocation/collocationFooter.vue'
    import goodMode from '../../views/collocation/goodMode.vue'
    import {Scroller} from 'vux'
    import xfBox from  '../../components/xuanfuBox/xfBox';

    export default{
        props: [

        ],
        data(){
            return {
                show1: false,
                cId: this.$route.query.cId,
                height: -window.innerWidth/6.4*.98 + '',
                getGoodListUrl: CTX_URL + '/index/collocation?collocationId=',
                collected: false,
                params: '',
            }
        },
        created: function(){
            this.getQuery(true, this.getGoodListUrl + this.$route.query.cId, (data)=>{
                if(data.status === 1){
                    this.params = data.data;
                    this.collected = data.data.isCollect === '1'? true: false;
                }
            })
        },
        methods: {

        },
        updated:function(){
            this.$nextTick(() => {
                this.$refs.scroller.reset();
            });
        },
        computed: {
            getCollected: function(){
                return this.collected;
            },
            getHeight: function(){
                return this.height;
            },
            getGroupList: function(){
                if(this.params && this.params.groupList){
                    this.params.groupList.sort((a, b)=>{
                        return a.orderNo - b.orderNo
                    })
                    return this.params.groupList;
                }
                return []
            }
        },
        components:{
            collocationMode,
            goodMode,
            'v-footer': footer,
            'v-xfbox': xfBox,
            Scroller,
        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/css/common.less";
    .type-info{
        position: relative;
        min-height: 1.6rem;
        .left-icon{
            position: absolute;
            left: 0;
            width: 1.92rem;
            height: 1.21rem;
            margin-top: .39rem;
        }
        .right-info{
            position: relative;
            margin-left: 1.92rem;
            width: 4.48rem;
            padding: .3rem .3rem .63rem;
            line-height: .32rem;
            font-size: .16rem;
            color: @color-66;
            box-sizing: border-box;
            text-align: left;
            font-family: PingFangSC-Regular;
        }
    }
    .title-img{
        position: relative;
        height: 1.95rem;
        width: 100%;
    }
    .page-line{
        position: relative;
        height: .2rem;
        width: 100%;
        background: @color-f4;
    }
</style>
