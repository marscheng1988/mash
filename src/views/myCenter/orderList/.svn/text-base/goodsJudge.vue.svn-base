<template>
    <div class="page">
        <div class="ui-page-head" >
            <p>评价</p>
        </div>
        <div class="itemBlock" v-for="(item,index) in orderData.experienceProduceList" :key="item.id">
            <section class="goods-list">
                <div class="item">
                    <div class="img"><img :src="imgUrl + item.produce.goods.icon "/></div>
                    <div class="title">
                        <p class="name">{{item.goodsTitle}}</p>
                        <p class="type">{{item.produceName}}</p>
                    </div>
                </div>
            </section>
                <section class="lable">
                    <h2>评价一下宝贝吧，评价分享还有好礼相送哦！<span>更多标签 </span></h2>
                    <c-lable :item="item" :produceIndex="index" ref="lableSelect"></c-lable>
                </section>
                <section class="addImg">
                    <div class="add-pic" @click="upImgLoad(index)">
                        <image-upload class="image-upload" :width="100" :height="100" :callback ="sendPic" ></image-upload>

                    </div>
                        <img v-for="item in imgUp" :src="item"/>
                    <div class="text" v-if="imgUp.length == 0"> 添加图片评论</div>
                </section>
                <section class="judge">
                    <div class="production">
                        <p >商品评价</p>
                        <c-star :produceIndex="index" ref="starSelect"></c-star>

                        <!--<div class="star">-->
                            <!--<span @click="changeStarIndex(1,index)" :class="{active: starIndex[index] >= 1}"></span>-->
                            <!--<span @click="changeStarIndex(2,index)" :class="{active: starIndex[index] >= 2}"></span>-->
                            <!--<span @click="changeStarIndex(3,index)" :class="{active: starIndex[index] >= 3}"></span>-->
                            <!--<span @click="changeStarIndex(4,index)" :class="{active: starIndex[index] >= 4}"></span>-->
                            <!--<span @click="changeStarIndex(5,index)" :class="{active: starIndex[index] >= 5}"></span>-->
                        <!--</div>-->
                    </div>
                </section>
        </div>

        <div class="comfirm-button" @click="submitJudge">
            提交
        </div>

    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common.less";
    .page{
        overflow: hidden;
        padding-bottom: .8rem;
        background: @color-f4;
    }
    .itemBlock{
        overflow: hidden;
        margin-top:.2rem;
    }
    .goods-list{
        position: relative;
        background: @color-ff;
        padding:.2rem;
        >.item{
            position: relative;
            height: 1.4rem;
            .border-1px-bottom();
            &:last-child{
                border:none;
            }
            >.img{
                position: absolute;
                height: 1.4rem;
                width: 1.4rem;
                .bg-img;
                top: 0;
                left: 0.3rem;
                img{
                    width: 100%;
                    height:100%;
                }
            }
            >.title{
                position: absolute;
                padding: .3rem 0.5rem 0.1rem 2.2rem;
                line-height: 0.4rem;
                >.name{
                    margin-bottom: 0.15rem;
                    font-size: @f-24;
                    line-height: 0.4rem;
                    color: @color-33;
                    &.disable{
                        color: @color-cc;
                    }
                }
                >.type{
                    font-size: @f-20;
                    line-height: 0.4rem;
                    color: @color-99;
                    &.disable{
                        color: @color-cc;
                    }
                }
            }
        }
    }
    .lable{
        padding:0 .3rem;
        background: @color-ff;
        overflow: hidden;
        h2{
            position: relative;
            line-height:.8rem;
            font-size: @f-20;
            color: @color-33;
            span{
                float: right;
                color: @color-99;
                font-size: @f-20;
                padding-right: .3rem;
            }
            &:after{
                content: "";
                position: absolute;
                right: 0;
                top: 50%;
                margin-top: -0.06rem;
                height: 0.12rem;
                width: 0.12rem;
                .border-1px-bottom();
                border-left: 1px solid @color-e4;
                -webkit-transform: rotate(-135deg);
                transform: rotate(-135deg);
            }
        }
    }
    .addImg{
        position: relative;
        overflow: hidden;
        background: #fff;
        min-height:1.4rem;
        padding: .1rem;
        .border-1px-bottom();
        > .add-pic{
            float: left;
            margin: .1rem;
            height: 1.1rem;
            width: 1.1rem;
            display: block;
            overflow: hidden;
            .image-upload{
                width: 100%;
                height:100%;
                background: url("images/uploadIcon.png") center no-repeat;
                background-size: 100% 100%;
            }

        }
        img{
            float: left;
            margin: .1rem;
            height: 1.1rem;
            width: 1.1rem;
        }
        .text{
            position: absolute;
            left:1.5rem;
            top:.6rem;
            line-height:.4rem;
            font-size: @f-20;
            color: #999;
        }
    }
    .judge{
        margin-top: .2rem;
        .border-1px-bottom();
        >div{
            position: relative;
            height: .86rem;
            padding: 0 .2rem;
            line-height: .86rem;
            .border-1px-top();
            background: #fff;
            > p{
                height: .86rem;
                font-size: @f-26;
                color: @color-33;
            }
            .star{
                position: absolute;
                top: 0;
                right: .3rem;
            }
        }
        &.production{
            margin-top:0;
            >div{
                border:none;
            }

        }
    }
    .comfirm-button{
        position: fixed;
        bottom: 0;
        left: 0;
        height: .8rem;
        width: 100%;
        margin: .7rem auto 0;
        background-color: @color-33;
        line-height:.8rem;
        text-align: center;
        font-size: @f-26;
        color: @color-ff;
    }

</style>
<script type="text/ecmascript-6">
    import imgUpload from '../../../components/imgUpload/imgUpload.vue';
    import cLable from './lable-select.vue';
    import cStar from './star-select.vue';
    export default{
        data(){
            return{
                orderData:'',
                imgUrl:IMG_URL,
                imgUp:[],
                orderId:'',
                imgUpIndex:0,
                lableSelected:[],
                param:{}

            }
        },
        mounted () {
            let self = this;

            // 请求订单数据
            this.orderId = this.$route.query.orderId;
            let urlD = CTX_URL + '/index/member/experienceOrder/detail?experienceOrderId=' + this.orderId;

            this.getQuery(false ,urlD, function (response) {
                self.orderData = response.data
            });

        },
        updated () {


        },
        methods:{
            changeStarIndex (star,index) {
                this.starIndex[index] = star;
//                console.log(this.starIndex[index])
                this.param['orderJudgeList['+index +'].goodsLevel'] = star;
            },

            upImgLoad(index){
                this.imgUpIndex = index;
            },

            sendPic (imgUrl) {
                let self = this;
                if(this.imgUp.includes(imgUrl))
                    this.tip('图片不能相同');
                else
                    this.imgUp.push(imgUrl);


            },

            submitJudge(){
                let self = this;
                let lableSelected = true;
                //检查标签数组是否为空
                self.lableSelected.forEach((item)=>{
                    if(lableSelected){
                        if(item.length == 0){
                            self.tip('请您至少选择一个标签');
                            lableSelected = false;
                        }
                    }

                });

                //如果有标签没选，不提交
                if(lableSelected == false){
                    return
                }

                this.lableSelected.forEach(function(term,index){
                    term.forEach(function(m,i){
                        self.param['orderJudgeList['+index +'].orderJudgeSummaryList['+i+'].summary.id'] = m
                    })
                });

                this.imgUp.forEach(function(term,index){
                    self.param['orderJudgeList['+ self.imgUpIndex +'].orderJudgePhotoList['+index+'].photoUrl'] = term
                });

                self.param.orderId = self.orderData.id;


//                this.postQuery(true,CTX_URL + '/index/member/orderJudge/experienceOrder',self.param,function(data){
//                    console.log(data)
//                    if(data.status == 1){
//                        self.tip('评价成功！');
//                        setTimeout(function(){
//                            self.backToView()
//                        },1000)
//                    }
//                })
//                console.log(self.param)
            }
        },
        components:{
            'image-upload':imgUpload,
            cLable,cStar
        }
    }
</script>
