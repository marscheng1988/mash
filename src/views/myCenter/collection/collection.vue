<template>
    <div>
        <!--<scroller lock-x-->
                  <!--scrollbarY-->
                  <!--:bounce="false"-->
                  <!--ref="scroller">-->
            <div>
                <div class="list-warp" :class="{addBottom:isEdit}" v-if="list.length !== 0">
                    <div class="ui-page-head"  ></div>
                    <div class="editBar">
                        <span>近一个月收藏</span>
                        <span @click="edit">{{editText}}</span>
                    </div>
                    <div class="collectWarp">
                        <collocationMode v-for="item in list" :item="item" :key="item.id" :clickCallback="goTarget" class="collectItem">
                            <check-box v-if="isEdit"
                                       class="del-radio"
                                       :selected="deleteIds.includes(item.id)"
                                       @change="deleteSelect(item.id)"
                            >
                            </check-box>
                            <!--<span v-if="isEdit" class="check-box" :class="{checked : deleteIds.includes(item.id) }" :data-colId = "item.id" @click="deleteSelect"></span>-->
                        </collocationMode>
                    </div>
                </div>
                <no-data v-else :icon="icon"
                        :message="message"
                        :buttonText = "buttonText"
                        :warpHeight="height"
                        :buttonUrl="buttonUrl">
                </no-data>
            </div>
        <!--</scroller>-->
        <div class="confirm-button" v-if="isEdit">
            <div @click="cancel"><span>取消</span></div>
            <div @click="deleteConfirm"><span>删除</span></div>
        </div>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common.less";
    .ui-page-head{
        position: relative;
        height: 3.56rem;
        background: url("images/collection-banner.jpg") center no-repeat;
        background-size: 100% 100%;
    }
    .addBottom{
        padding-bottom: .88rem;
    }
    .editBar{
        height: 0.88rem;
        width:100%;
        background: @color-f4;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding:0 0.3rem;
        span{
            line-height: 0.88rem;
            &:first-child{
                float: left;
                font-size: @f-22;
            }
            &:last-child{
                font-size: @f-24;
                float: right;
            }
        }
    }
    .collectWarp{
        width: 100%;
        overflow: hidden;
        .collectItem{
            .del-radio{
                left: .3rem;
                top: 1rem;
            }
        }
    }
</style>
<script type="text/ecmascript-6">
    import collocationMode from '../../collocation/collocationMode.vue'
    import {Scroller} from 'vux';
    import noData from '../../../components/noDatablock/noDatablock.vue';
    import CheckBox from '../../../components/checkBox/checkBox.vue'

    export default{
        data () {
            return{
                list: [],
                scrollHeight: '',
                isEdit: false,
                deleteIds: [],
                icon: require('./images/collectIcon.png'),
                message: '您还没有收藏',
                buttonText: '去逛逛',
                buttonUrl: '/sceneList',
                height: window.innerHeight + 'px',
            }
        },
        updated () {
//            this.$nextTick(() => {
//                if(this.$refs.scroller) this.$refs.scroller.reset();
//            });
        },
        watch:{
            isEdit () {
                let self = this;
                if(this.isEdit == true){
                    self.goTarget = ''
                }else {
                    this.goTarget = function (e) {
                        self.pushView('/collocationDetail?cId=' + e.target.getAttribute('c-id'))
                    }
                }
            },
//            list () {
//                this.$nextTick(() => {
//                    console.log('0000')
//                    this.$refs.scroller.reset();
//            });
//            }
        },
        mounted () {
            this.getData();
        },
        computed:{
            editText () {
                if(this.isEdit == true) return '完成'
                else return '编辑'
            }
        },
        methods:{
            getData () {
                let self = this;
                this.postQuery(false,
                                CTX_URL+"/index/member/collocationCollect/1",
                                '',function(response){
                                        if(response.status === 1) {
                                            if(response.page.list === undefined){
                                                return
                                            }else{
                                                self.list = response.page.list
                    //                            response.page.list.forEach(function(term){
                    //                                let item = {
                    //                                    name: term.name,
                    //                                    englishName: term.englishName,
                    //                                    img: IMG_URL + term.photo,
                    //                                    id:term.id
                    //                                };
                    //                                self.list.push(item);
                    //                            })
                                            }
                                        }

                                    })
            },
            edit () {
                this.isEdit = ! this.isEdit;
            },
            deleteSelect (itemId) {
                let self = this;
                let deleteIds = self.deleteIds;
                let selfId =itemId;

                if(deleteIds.length == 0 || !deleteIds.includes(selfId) ){
                    deleteIds.push(selfId);
                }else if(deleteIds.includes(selfId)) {
                    deleteIds.splice(deleteIds.findIndex((n) => n === selfId),1)
                }
            },
            cancel () {
                this.deleteIds =[];
                this.isEdit = false;

            },
            deleteConfirm () {
                let self = this;
                if(self.deleteIds.length === 0){
                    self.tip('您没有选中任何搭配！');
                    return
                }
                const delurl = CTX_URL+"/index/member/collocationCollectList";
                const parma={"collocationIds":self.deleteIds};

                this.postQuery(true,
                                delurl,
                                parma,
                                function(response){
                                    if(response.status === 1){
//                                        self.isEdit = false;

                                        let selfList=[];let hash ={};
                                        self.deleteIds.forEach(function(item){
                                            hash[item] = true
                                        });
                                        self.list.forEach(function(val){
                                            if(!hash[val.id]){
                                                selfList.push(val)
                                            }
                                        });
                                        self.list = selfList ;

                                        if (selfList.length === 0) {
                                            self.isEdit = false;
                                        }

//                                        self.$nextTick(() => {
//                                                self.$refs.scroller.reset();
//                                        });
//                                        if(self.$refs.scroller) self.$refs.scroller.reset({
//                                            top: 0
//                                        });
                                    }
                                })
            },
            goTarget (e) {
                this.pushView('/collocationDetail?cId=' + e.target.getAttribute('c-id'))
            }


        },
        components:{
            Scroller,
            collocationMode,
            CheckBox,
            noData
        }
    }


</script>
