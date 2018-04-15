<template>
    <div class="ui-page">
        <div class="tab-bar">
            <div class="left">
                <span @click="arrivedBtn" :class="{active:arriveStates}">已到货</span>
                <span @click="notArrivedBtn" :class="{active:!arriveStates}">未到货</span>
            </div>
            <div class="edit" :class="{disableClick:list.length ==0}" @click="edit">{{editText}}</div>
        </div>
        <scroller lock-x
                  scrollbarY
                  class = "scrollBlock"
                  :height="scrollHeight"
                  ref="scroller">
            <div>
                <div class="goodsItem" v-for = "item in list" :key="item.id" @click="itemSelect(item.id)" >
                    <div class="del-sign" v-if="isEdit">
                        <check-box class="del-radio" :selected="deleteIds.includes(item.id)"></check-box>
                    </div>

                    <div class="img"><img :src="imgUrl + item.produce.goods.icon"/></div>
                    <div class="text" >
                        <h2>{{item.produce.goods.title}}</h2>
                        <h3>{{item.produce.name}}</h3>
                        <h4>￥{{item.produce.priceBuy}}</h4>
                    </div>
                    <div class="remindAgain" v-if="arriveStates " @click.stop="remindAgain(item.id)">再次提醒</div>
                </div>
                <nodata v-if="list.length ==0" :icon="icon"
                        class = "nodata"
                        :message="message"
                        :buttonText = "buttonText"
                        :buttonUrl="buttonUrl">
                </nodata>
            </div>
        </scroller>
        <div class="confirm-block" v-if="isEdit">
            <div class="select" @click="selectAll">
                <div class="del-sign" >
                    <check-box class="del-radio all" :selected="isSelectAll" ></check-box>
                </div>
                <p >全选</p>
            </div>
            <div class="delete" @click="deleteConfirm">删除</div>
        </div>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common.less";
    .ui-page{
        background: @color-f4;
    }
    .disableClick{
        color:@color-99;
    }

    .tab-bar{
        height:.88rem;
        width:100%;
        color:@color-33;
        background: #fff;
        .left{
            float: left;
            width: 5.5rem;
            height:100%;
            border-right:.01rem solid @color-e4;
            span{
                width:50%;
                line-height:.88rem;
                text-align: center;
                float: left;
                font-size:.24rem;
                color:@color-99;
                &.active{
                    color:@color-33;
                }
            }
        }
        .edit{
            float: right;
            width:.88rem;
            text-align: center;
            line-height:.88rem;
            font-size:.24rem;
        }
    }
    .scrollBlock >div >div{
        margin-top:.2rem
    }
    .goodsItem{
        position: relative;
        height: 1.85rem;
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
        .border-1px-bottom();
        background: #fff;
        .img{
            float: left;
            width: 1.85rem;
            height: 1.85rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .text{
            float: left;
            height: 1.85rem;
            box-sizing: border-box;
            padding:.2rem ;
            h2{
                font-size:@f-22;
                line-height: .4rem;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: @color-33;
            }
            h3{
                font-size:@f-16;
                line-height: .4rem;
                color: @color-99;
                margin-bottom:.2rem;
            }
            h4{
                font-size:@f-20;
                color: @color-66;
            }
        }
        .remindAgain{
            position: absolute;
            right: .3rem;
            bottom:.3rem;
            width:1.2rem;
            height:.4rem;
            text-align: center;
            line-height: .4rem;
            font-size:@f-20;
            border:.01rem solid @color-33;
            z-index: 99;
        }
    }
    .nodata{
        margin-top: 3.5rem;
    }
    .confirm-block{
        position: fixed;
        bottom:0;
        left:0;
        height: .98rem;
        width: 100%;
        .border-1px-top();
        .select{
            float: left;
            width: 2rem;
            height:.98rem;

            p{
                float: left;
                line-height:.98rem;
                font-size: @f-26;
            }
        }
        .delete{
            position: absolute;
            right:0;
            bottom: 0;
            width:3.2rem;
            line-height:.98rem;
            font-size: @f-30;
            text-align: center;
            background: red;
            color: #fff;
        }
    }

    .del-sign{
        height:100%;
        width: .8rem;
        position: relative;
        float: left;
        .del-radio{
            top:.625rem;
            left:.1rem;
        }
        .all{
            top:.19rem;
            left:.1rem;
        }
    }
</style>
<script type="text/ecmascript-6">
    import {Scroller} from 'vux';
    import noData from '../../../components/noDatablock/noDatablock.vue';
    import CheckBox from '../../../components/checkBox/checkBox.vue'

    export default{
        data () {
            return{
                list:[],
                arrivedList:[
//                    {
//                        produce:{
//                            isBuy:"1",
//                            id:"0a48fbb32ec2430d9144a0349f26626e",
//                            goods:Object,
//                            code:"G216122800022",
//                            isExperience:"1",
//                            isForeBuy:"1",
//                            isForeexperience:"1",
//                            isNewRecord:false,
//                            name:"VVS2",
//                            priceBuy:0.01,
//                            scaleDiscount:0.89,
//                            scaleExperience:0.88,
//                            styleType:"1",
//                            remindFlag:"1",
//                        },
//                    }

                ],
                notArrivedList:[],
                deleteIds:[],

                isEdit:false,
                isSelectAll:false,
                noData:false,
                arriveStates:true,

                icon:require('./images/remind.png'),
                message:'您还没有提醒',
                buttonText:'去逛逛',
                buttonUrl:'/sceneList',
                imgUrl:IMG_URL,

            }
        },
        updated () {
            this.$nextTick(() => {
                if(this.$refs.scroller) this.$refs.scroller.reset();
            });
        },
        watch:{
            list () {
                if(this.arriveStates){
                    this.arrivedList = this.list;
                }else {
                    this.notArrivedList = this.list;
                }
            }
        },
        mounted () {
            let self = this;
            this.getQuery(true,CTX_URL + '/index/member/stockAddRemindList',function (response) {
                if(response.data != undefined){
                    response.data.forEach((term) => {
                        if(term.remindFlag == 0){
                            self.notArrivedList.push(term)
                        }else{
                            self.arrivedList.push(term)

                        }
                    })
                }

            });

            this.list = this.arrivedList
        },
        computed:{
            editText () {
                if(this.isEdit == true) return '完成';
                else return '编辑';

            },
            scrollHeight () {
                if(this.isEdit == true)
                    return '-' + window.innerWidth/6.4*1.86;
                else
                    return '-' + window.innerWidth/6.4*0.98
            }
        },
        methods:{
            edit () {
                if(this.list.length ==0) return;
                this.isEdit = ! this.isEdit;
            },
            selectAll () {
                this.isSelectAll = ! this.isSelectAll;
                if (!this.isSelectAll) {
                    this.deleteIds = []
                } else {
                    let allIds =[];
                    this.list.forEach((term) => {
                        allIds.push(term.id)
                    });
                    this.deleteIds = allIds
                }
            },

            arrivedBtn () {
                if (this.isEdit) return;
                this.list = this.arrivedList;
                this.arriveStates = true;
                this.deleteIds = []
            },

            notArrivedBtn () {
                if (this.isEdit) return;
                this.list = this.notArrivedList;
                this.arriveStates = false;
                this.deleteIds = []
            },

            itemSelect (selfId) {
                let self = this;
                let deleteIds = self.deleteIds;
                if (self.isEdit == false) {
                    console.log("还没有跳转地址")
//                    this.pushView('/collocationDetail?cId=' + itemId)
                } else {
                    self.isSelectAll = false;
                    if (deleteIds.length == 0 || !deleteIds.includes(selfId) ) {
                        deleteIds.push(selfId);
                    }
                    else if (deleteIds.includes(selfId)) {
                        deleteIds.splice(deleteIds.findIndex((n) => n === selfId),1)
                    }
                    if (deleteIds.length == self.list.length) self.isSelectAll = true;
                }

            },
            deleteConfirm () {
                let self = this;
                if (self.deleteIds == '') {
//                    self.isEdit = false;
                    self.tip('您没有选中任何删除项');
                    return
                }

                if (self.$refs.scroller) self.$refs.scroller.reset({
                    top: 0
                });

                let delurl = CTX_URL+"/index/member/stockAddRemind/delete";
                let parma={"stockAddRemindIds":self.deleteIds};

                this.postQuery(true,
                                delurl,
                                parma,
                                function(response){
                                    if(response.status === 1){
//                                        self.isEdit = false;

                                        //删除list的数据
                                        let selfList=[];let hash ={};
                                        self.deleteIds.forEach(function(item){
                                            hash[item] = true
                                        });

                                        self.list.forEach(function(val){
                                            if(!hash[val.id]){
                                                selfList.push(val)
                                            }
                                        });
                                        self.list = selfList;

                                        if(self.$refs.scroller) self.$refs.scroller.reset({
                                            top: 0
                                        });

                                    }
                                })
            },
            remindAgain (targetId) {
                let self = this;
                if(this.isEdit) return;
                this.putQuery(true,
                                CTX_URL + '/index/member/stockAddRemind/again',
                                {stockAddRemindId:targetId},
                                function (response) {
                                    if(response.status == 1){
                                        self.tip('设置再次提醒成功！')
                                    }
                                });

            }

        },
        components:{
            Scroller,
            'nodata': noData,
            CheckBox
        }
    }


</script>
