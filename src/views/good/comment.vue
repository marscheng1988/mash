<template>
    <div>
        <scroller lock-x
                  scrollbarY
                  use-pullup
                  :pullup-config="pullupConfig"
                  v-model="status"
                  @on-pullup-loading="loadComment"
                  ref="scroller">
            <div>
                <comment v-for="item of getShowList" :item="item" key="item.id"></comment>
                <div v-if="list.length === 0" class="no-data">暂无评论</div>

                <!--pullup slot-->
                <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
                    <span v-show="status.pullupStatus === 'default'"></span>
                    <span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
                    <span v-show="status.pullupStatus === 'loading'"></span>
                </div>
            </div>
        </scroller>
    </div>
</template>
<script type="text/ecmascript-6">
    import comment from '../../components/comment/commentItem.vue'
    import {Scroller} from 'vux'

    export default{
        props: [

        ],
        data(){
            return {
                status: {
                    pullupStatus: 'default',
                    pulldownStatus: 'disabled'
                },
                id: this.$route.query.id,
                list: [],
                type: this.$route.query.type,
                pageNo: 1,
                pageSize: 20,
                pullupConfig: {
                    content: '',
                    pullUpHeight: 60,
                    height: 40,
                    autoRefresh: false,
                    downContent: '',
                    upContent: '',
                    loadingContent: '',
                    clsPrefix: ''
                }
            }
        },
        methods: {
            loadComment: function(){
                this.pageNo++;

                setTimeout(()=>{
                    if(this.page <= 3){
                        this.status.pullupStatus = 'default';
                    }else {
                        this.status.pullupStatus = 'disabled';
                    }
                }, 100)

            }
        },
        updated:function(){
            this.$nextTick(() => {
                if(this.$refs.scroller) this.$refs.scroller.reset();
            });
        },
        created(){
            let url = CTX_URL;
            if(this.type === 'collocation'){
                url += '/index/collocation/' + this.id + '/judge'
            }else if(this.type === 'group'){
                url += '/index/group/' + this.id + '/judge'
            };
            this.getQuery(true, url, data=>{
                if(data.status === 1 && data.data){
                    this.list = data.data;
                    this.pageNo = 1;

                }
            })

        },
        computed: {
            getShowList: function(){
                let showLen = this.pageNo*this.pageSize;
                let maxLen = this.list.length;
                if(showLen > maxLen){
                    this.status.pullupStatus = 'disable';
                    return this.list;
                }else {
                    let newList = this.list.concat();
                    this.status.pullupStatus = 'default';

                    newList.splice(showLen);
                    return newList
                }
            }
        },
        components:{
            Scroller,
            comment,
        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/css/common.less";
    .no-data{
        padding: 1rem .3rem;
        font-size: .24rem;
        text-align: center;
        line-height: .25rem;
        color: @color-99;
    }
</style>