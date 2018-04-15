<template>
    <div class="page">
                <div class="newsWarp" v-if="newsData && newsData.length != 0">
                    <div class="newsBar" v-for="item in newsData" :key="item.id" :data-key = "item.id">
                        <div class="shade" @touchstart="touchstart" @touchmove ="touchmove" @touchend="touchend" @click="clickBar" :data-flag="1"></div>
                        <div class="news-content">
                            <h2 >{{item.message.title}}</h2>
                            <h4>{{item.message.summary}}</h4>
                        </div>
                        <div class="news-time">
                            <span>{{item.updateDate.substring(5,10)}}</span>
                        </div>
                        <div class="delete" @click="deleteNew(item.id)">删除</div>
                    </div>
                </div>
                <no-data v-else :icon="mesUrl"
                         :message="message"
                         :warpHeight="height">
                </no-data>
    </div>
</template>
<script type="text/ecmascript-6">
    import noData from '../../components/noDatablock/noDatablock.vue';

    export default{
        data(){
            return {
                sysUrl: require('./images/servive.png'),
                mesUrl: require('./images/message.png'),
                isNew: true,
                startX: 0,
                startY:0,
                moveX: 0,
                moveY:0,
                firstP:0,
                deleteState:false,

                message:'您还没有消息',
                height:window.innerHeight + 'px',

                newsData:[
//                    {
//                        createDate:"2017-05-15 11:03:21",
//                        id:"a424a3bcffc44818873s3d89cc",
//                        isNewRecord:false,
//                        message:{
//                            content:"恭喜您获得了10积分，积分获取来源：订单评价",
//                            id:"1",
//                            isNewRecord:false,
//                            publishType:"3",
//                            status:"2",
//                            summary:"订单评价赠送了10积分",
//                            title:"积分入账",
//                        },
//                        readFlag:"0",
//                        updateDate:"2017-05-15 11:03:21"
//                    },
//                    {
//                        createDate:"2017-05-15 11:03:21",
//                        id:"a4da3bcffc44818d03fa923d89cc",
//                        isNewRecord:false,
//                        message:{
//                            content:"恭喜您获得了10积分，积分获取来源：订单评价",
//                            id:"2",
//                            isNewRecord:false,
//                            publishType:"3",
//                            status:"2",
//                            summary:"订单评价赠送了10积分",
//                            title:"积分入账",
//                        },
//                        readFlag:"0",
//                        updateDate:"2017-05-15 11:03:21"
//                    },
//                    {
//                        createDate:"2017-05-15 11:03:21",
//                        id:"a42scffcf18873403fa923d89cc",
//                        isNewRecord:false,
//                        message:{
//                            content:"恭喜您获得了10积分，积分获取来源：订单评价",
//                            id:"3",
//                            isNewRecord:false,
//                            publishType:"3",
//                            status:"2",
//                            summary:"订单评价赠送了10积分",
//                            title:"积分入账",
//                        },
//                        readFlag:"0",
//                        updateDate:"2017-05-15 11:03:21"
//                    },
//                    {
//                        createDate:"2017-05-15 11:03:21",
//                        id:"a424a3bs44s818873403fa923d89cc",
//                        isNewRecord:false,
//                        message:{
//                            content:"恭喜您获得了10积分，积分获取来源：订单评价",
//                            id:"4",
//                            isNewRecord:false,
//                            publishType:"3",
//                            status:"2",
//                            summary:"订单评价赠送了10积分",
//                            title:"积分入账",
//                        },
//                        readFlag:"0",
//                        updateDate:"2017-05-15 11:03:21"
//                    }
                ],
                elementWidth: 1.3*window.innerWidth/6.4
            }
        },
        mounted () {
            let self = this;
            this.getQuery(false,
                            CTX_URL + '/index/member/message/1',
                            data => {
                                self.newsData = data.page.list;
                            })
        },
        computed: {
            moveDistanceX () {
                if(this.moveX != 0){
                    return this.moveX - this.startX
                }
            },
            moveDistanceY () {
                if(this.moveY != 0){
                    return this.moveY - this.startY
                }
            }
        },
        methods: {
            touchstart (e) {

                let s =e.targetTouches;
                let target = e.target;
                let bars = target.parentNode.parentNode.childNodes;
                for (let item of bars) {
                    if (target.parentNode.getAttribute("data-key") !== item.getAttribute("data-key")) {
                        item.style.webkitTransform = 'translateX(0)'
                    }
                }

                this.startX = s[0].pageX;
                this.startY = s[0].pageY;
            },
            touchmove (e) {
                let m =e.targetTouches;
                let target = e.target;
                this.moveX = m[0].pageX;
                this.moveY = m[0].pageY;
                if (Math.abs(this.moveDistanceY) < Math.abs(this.moveDistanceX) && Math.abs(this.moveDistanceY) < 30) {
                    if(this.deleteState){
                        if(this.moveDistanceX > 0 && this.moveDistanceX < this.elementWidth){
                            target.parentNode.style.webkitTransform = "translate("+ this.moveDistance +"px)";
                        }else if(this.moveDistanceX < 0 ){
                            target.parentNode.style.webkitTransform = "translate("+ -this.elementWidth +"px)";
                        }else if(this.moveDistanceX > this.elementWidth){
                            target.parentNode.style.webkitTransform = 'translateX(0)'
                        }
                    }else{
                        if(this.moveDistanceX > 0 ){
                            target.parentNode.style.webkitTransform = 'translateX(0)'
                        }else if(this.moveDistanceX < 0  && this.moveDistanceX > -this.elementWidth){
                            target.parentNode.style.webkitTransform = "translate("+ this.moveDistance +"px)";
                        }else if(this.moveDistanceX < -this.elementWidth){
                            target.parentNode.style.webkitTransform = "translate("+ -this.elementWidth +"px)";
                        }
                    }
                }

            },
            touchend (e) {
                let m =e.targetTouches;
                let target = e.target;

                if (Math.abs(this.moveDistanceY) < Math.abs(this.moveDistanceX) && Math.abs(this.moveDistanceY) < 30) {
                    if(this.moveDistanceX < 0 && this.moveDistanceX > -30){
                        target.parentNode.style.webkitTransform = 'translateX(0)';
                        this.deleteState = false;


                    }else if(this.moveDistanceX < -30){
                        target.parentNode.style.webkitTransform = "translate("+ -this.elementWidth +"px)";
                        this.deleteState = true;
                    }
                }

                this.startX = 0;
                this.moveX = 0;
                this.startY = 0;
                this.moveY = 0;
            },
            clickBar (e) {
                let f = e.target.getAttribute("data-key");
                let target = e.target;

                if(this.deleteState){
                    target.parentNode.style.webkitTransform = 'translateX(0)';
                }

            },
            deleteNew (targetID) {
                let self = this;
                this.postQuery(true,CTX_URL + '/index/member/message/delete',{'messageIds[]':targetID},data =>{
                    if(data.status == 1) {
                        self.newsData.forEach((item,index,arr) => {
                             if(item.id == targetID)
                             arr.splice(index,1)
                        });
                    }
                })
            },
            loadMore () {

            },
            onScroll () {

            }
        },

        components:{
            noData

        }
    }
</script>
<style  scoped lang="less" rel="stylesheet/less">
    @import "../../assets/css/common.less";
    .page{
        background: @color-f4;
        height:100%;
    }
    .newsWarp{
        background: #fff;
        margin-bottom: 10px;
        overflow: hidden;
        .newsBar{
            position: relative;
            height: 1.2rem;
            width: 100%;
            border-bottom:1px solid @color-f4;
            transform: translateX(0);
            transition: transform 0.2s ease;

            &:last-child{
                border:none;
            }
            .shade{
                position: absolute;
                width: 100%;
                height: 100%;
                top:0;
                left:0;
                z-index: 99;
            }
            .news-content{
                float: left;
                width: 4.3rem;
                height: 100%;
                box-sizing: border-box;
                padding: .3rem;
                h2{
                    position: relative;
                    width: 4.3rem;
                    height: .26rem;
                    font-size: @f-26;
                    margin-bottom: .14rem;
                }
                h4{
                    width: 4.3rem;
                    line-height: .26rem;
                    font-size: @f-20;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: @color-99;
                }
            }
            .news-time{
                float: right;
                width: 1.06rem;
                height: 100%;
                box-sizing: border-box;
                padding: .36rem 0 .26rem;
                position: relative;
                span{
                    display: block;
                    width: 1.06rem;
                    line-height: @f-24;
                    text-align: center;
                    color: #999;
                    font-size: @f-20;
                    margin-bottom: .12rem;
                }
            }
            .delete{
                position: absolute;
                left: 100%;
                width:1.3rem;
                height: 1.2rem;
                background: @color-error;
                color: #fff;
                line-height:1.2rem;
                text-align: center;
            }
        }
    }
</style>
