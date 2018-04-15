<template>
    <scroller lock-x
              scrollbarY
              use-pullup
              @on-pullup-loading="loadMore"
              @on-scroll ="onScroll"
              v-model="status"
              ref="scroller">
        <div>
            <v-banner height="4rem" :url="bannerUrl"></v-banner>

        </div>
        <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
            <span v-show="status.pullupStatus === 'done'"  class="pullup-done">已到底</span>
            <span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" >↑</span>
            <span v-show="status.pullupStatus === 'loading'" class="pullup-loading">正在加载<spinner type="ios-small"></spinner></span>
        </div>
    </scroller>
</template>
<script type="text/ecmascript-6">
    import { Scroller,Spinner} from 'vux';
    //import HeaderComponent from '../../views/'
    
    export default{
        props: [

        ],
        data(){
            return {
                bannerUrl: '/index/advertisement/3'
            }
        },
        methods: {
            loadMore
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
</style>