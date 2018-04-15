<template>
    <div class="page">
        <div>
            <div class="ui-page-head" >
                <p>售后</p>
            </div>
            <div class="itemBlock" v-if="!afterServiceSubmit">
                <section class="goods-list">
                    <div class="item">
                        <div class="img"><img :src="IMG_URL"/></div>
                        <div class="title">
                            <p class="name">{{goodsData.goodsTitle}}</p>
                            <p class="type">{{goodsData.produceName}}</p>
                        </div>
                    </div>
                </section>
                <section class="applyServive right-arrow" >
                    <div class="title">申请服务 *</div>
                    <select name="applyServive"  v-model="selected" >
                        <option :value = "0"></option>
                        <option v-for="item in options" :value="item.value">{{item.text}}</option>
                    </select>
                </section>
                <section class="textarea">
                    <textarea placeholder="请输入售后说明" maxlength="100" v-model="reasonExplain"></textarea>
                </section>
                <section class="addImg">
                    <label class="add-pic" >
                        <image-upload class="image-upload" :width="100" :height="100" :callback ="sendPic"></image-upload>
                    </label>
                        <img v-for="item in imgUp" :src="item"/>
                    <div class="text" v-if="imgUp.length == 0"> 商品损坏或错发，请上传问题商品图片</div>
                </section>
                <div class="confirm-button" >
                    <div ><span>联系客服</span></div>
                    <div @click="submit"><span>提交</span></div>
                </div>
            </div>
            <div class="statusPage" v-else>
                <div class="submitSuccess">
                    <h1>申请提交成功</h1>
                    <div class="applyItem">
                        <span>申请类型</span>
                        <span v-if="afterServieReasonType==1">收货时货品已损坏</span>
                        <span v-if="afterServieReasonType==2">发错货品</span>
                        <span v-if="afterServieReasonType==3">不喜欢</span>
                        <span v-if="afterServieReasonType==4">其他</span>
                    </div>
                    <!--<div class="applyItem">-->
                        <!--<span>申请原因:</span>-->
                        <!--<span>商品有缺陷</span>-->
                    <!--</div>-->
                    <div class="applyItem">
                        <span>备注</span>
                        <span>收到快递时，有质量问题</span>
                    </div>
                </div>
                <div class="acceptance">
                    <h1>平台受理</h1>
                    <div class="applyItem">
                        <h3>售后申请已经受理，收货后将尽快为您处理</h3>
                        <p>请先确认收货，再联系物流进行货品归还</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common.less";
    .page{
        background: @color-f4;
        height: 100%;
    }
    .itemBlock{
        overflow: hidden;
        margin-top:.2rem;
    }
    .goods-list{
        position: relative;
        background: @color-ff;
        padding:.2rem;
        .border-1px-bottom();
        >.item{
            position: relative;
            height: 1.4rem;
//            .border-1px-bottom();
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
    .textarea{
        position: relative;
        height: 1rem;
        background: #fff;
        >textarea{
            height:100%;
            width: 100%;
            font-size: @f-24;
            color: @color-33;
            line-height: .3rem;
            padding:.2rem .3rem 0 .3rem;
            word-break: break-all;
            &::-webkit-input-placeholder{
                color: @color-99;
            }

        }
    }
    .addImg{
        position: relative;
        overflow: hidden;
        background: #fff;
        height:1.4rem;
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
    .applyServive{
        position: relative;
        height: .88rem;
        width: 100%;
        text-indent: .3rem;
        background: #fff;
        .border-1px-bottom();
        &.right-arrow::after{
            right: .3rem;
        }
        > .title{
            width: 50%;
            float: left;
            line-height: .88rem;
            font-size: @f-24;
            color: @color-33;
        }
        > select{
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            line-height: .88rem;
            font-size: @f-24;
            color: @color-99;
            direction: rtl;
            padding-right: .5rem;
            background: transparent;
            > option {
                font-size: @f-24;
                color: @color-33;
                direction: ltr;
            }
        }
        /*>span{
            position: absolute;
            right: 0.5rem;
            bottom: 0.5625rem;
            height: 0.2rem;
            width: 0.2rem;
            font-size: @f-20;
            .border-1px-bottom();
            border-left: 1px solid @color-e4;
            transform: rotate(-45deg);
        }*/
    }
    .statusPage{
        width: 100%;
        height: 100%;
        padding:.2rem;
        box-sizing: border-box;
        .submitSuccess,.acceptance{
            background: #fff;
            margin-bottom:.2rem;
            padding:0 .2rem .2rem .2rem;

        }
        h1{
            line-height:1rem;
            margin-bottom: .2rem;
            font-size: @f-30;
            color: @color-33;
            border-bottom:1px solid @color-e4;
        }
        .applyItem{
            line-height:.6rem;
            color: @color-33;
            position: relative;
            overflow: hidden;
            span:first-child{
                font-size: @f-20;
                float: left;
                width:1.5rem;
                color: @color-99;
            }
            span:last-child{
                font-size: @f-24;
                float: left;
                width:3.3rem;
            }
            h3{
                line-height:.6rem;
                font-size: @f-24;
                color: @color-33;
            }
            p{
                font-size: @f-24;
                color: @color-99;
            }
        }
    }
</style>
<script type="text/ecmascript-6">
    import imgUpload from '../../../components/imgUpload/imgUpload.vue';
    import cLable from './lable-select.vue';
    export default{
        data(){
            return{
                index:'',
                goodsData:'',
                afterServiceSubmit:false,
                afterServieReasonType:'',
                IMG_URL:'',
                imgUp:[],
                orderId:'',
                reasonExplain:'',
                selected:'0',
                photos:'',
                options: [
                    { text: '收货时货品已损坏', value: '1' },
                    { text: '发错货品', value: '2' },
                    { text: '不喜欢', value: '3' },
                    { text: '其他', value: '4' }
                ]

            }
        },
        mounted () {
            let self = this;
            this.goodsData = this.find('afterServiceGoods');
            this.IMG_URL = IMG_URL + this.goodsData.produce.goods.icon;

            this.orderId = this.find('afterServiceOrderId');

            this.getQuery(true,
                            CTX_URL + '/index/member/serviceOrder/experienceOrder?orderId='
                                + self.orderId + '&orderProduceId='
                                +self.goodsData.id,
                            function (response) {
                                if(response.data !== undefined){
                                    self.afterServiceSubmit = true;
                                    let type = response.data.reasonType;
                                    self.afterServieReasonType = type;
                                }else{
                                    self.afterServiceSubmit = false
                                }
                            })

        },
        methods:{

            sendPic (imgUrl) {
//                console.log(this.upImgLoad)
                if(this.imgUp.includes(imgUrl))
                    this.tip('图片不能相同');
                else
                    this.imgUp.push(imgUrl)
            },
            submit(){
                let self = this;
                let param={
                    orderId:self.orderId,
                    orderProduceId:self.goodsData.id,
                    reasonType:self.selected,
                };

                if(self.reasonExplain != ''){
                    param['reasonExplain'] = self.reasonExplain
                }

                if(this.imgUp.length !==0){
                    param['photos'] = this.imgUp.join("$")
                }
//                console.log(param)
                this.postQuery(true,
                                CTX_URL + '/index/member/serviceOrder/experienceOrder',
                                param,
                                function (response) {
//                                    console.log(response)
                                    if(response.status == 1){
                                        self.tip('提交成功！');
                                        self.backToView()
                                    }

                                })
            }
        },
        components:{
            'image-upload':imgUpload,
            cLable
        }
    }
</script>
