<template>
    <div class="page">
        <div class="ui-page-head"><p>上门取货</p></div>
        <!--<div class="sub-bar" >-->
            <!--<span>订单号</span>-->
            <!--<span>23655566685</span>-->
        <!--</div>-->
        <div class="sub-bar" >
            <span>物流公司</span>
            <span>宅急送</span>
        </div>
        <div class="sub-bar doorService right-arrow " @click="showSelect">
            <span>上门时间</span>
            <span>{{doorServiceTime}} </span>
        </div>
        <!--<div class="sub-bar" >-->
            <!--<span>费用</span>-->
            <!--<span class="money">￥10&nbsp;<b>直接付给快递员</b></span>-->
        <!--</div>-->
        <div class="sub-bar">
            <label>备注</label>
            <input type="text"maxlength="12" v-model="remarks"/>
        </div>
        <div class="order-line"></div>
        <div class="sub-bar">
            <label>发货信息</label>
        </div>
        <!--<div class="address-info">-->
            <!--<div class="name">{{address.receiveName}}</div>-->
            <!--<div class="tel">{{address.receiveTel}}</div>-->
            <!--<div class="address-icon"></div>-->
            <!--<div class="address" >{{address.area.name}}{{ address.addressDetail}}</div>-->
            <!--<span class="right-arrow"></span>-->
        <!--</div>-->
        <c-address
            :address="address"
            :sendAddress=true
            ref="address"
        ></c-address>
        <div class="order-line"></div>
        <!--<div class="sub-bar">-->
            <!--<label>收货信息</label>-->
        <!--</div>-->
        <!--<div class="address-info">-->
            <!--<div class="name">{{address.receiveName}}</div>-->
            <!--<div class="tel orderDetail">{{address.receiveTel}}</div>-->
            <!--<div class="address-icon"></div>-->
            <!--<div class="address orderDetail" >{{address.area.name}}{{ address.addressDetail}}</div>-->
        <!--</div>-->
        <div class="sub-bar">
            <label>归还商品信息</label>
        </div>
        <div class="goodsItem" v-for="item in goodsList">
            <div class="img"><img src="./images/goods2.jpg"/></div>
            <div class="text" >
                <h2>{{item.goodsTitle}}</h2>
                <h3>{{item.produceName}}</h3>
                <h4>X {{item.num}}</h4>
            </div>
        </div>
        <div class="order-line"></div>

        <div class="confirm-button" @click="submitAppoint">立即预约</div>

        <c-timeSelect v-if="timeSelectShow"
                      ref="timeSlect">
        </c-timeSelect>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common.less";
    .sub-bar{
        height: 0.88rem;
        position: relative;
        padding: 0 0.3rem;
        font-size: @f-24;
        line-height: 0.88rem;
        text-align: left;
        .border-1px-bottom();
        background: #fff;
        &.doorService{
            padding: 0 0.6rem 0 .3rem;
        }
        span{
            font-size: @f-24;
            &:nth-child(2){
                float: right;
                color: @color-99;
            }
            b{
                font-size: @f-18;
                color: @color-99;
            }
            &.money{
                color: @color-66;
            }

        }
        label{
            float: left;
            display: inline-block;
            width: 1.4rem;
            height: 0.88rem;
            line-height:0.88rem;
            text-align: left;
            font-size: @f-24;
            box-sizing: border-box;
        }
        input{
            float: right;
            height: 0.5rem;
            width: 4.2rem;
            line-height: 0.5rem;
            text-align: right;
            color: #999;
            font-size: @f-24;
            margin: 0.15rem 0;
            padding-left: 0.3rem;
            box-sizing: border-box;
            -webkit-appearance:none;
            -webkit-tap-highlight-color:@color-ff;
            font-family:@PFSC;
            &::-webkit-input-placeholder{
                color: #999;
                font-family:@PFSC;
            }
        }
    }
    .address-info{
        position: relative;
        height: 1.5rem;
        width: 100%;
        background-color: #fff;
        >.name{
            position: absolute;
            top: .3rem;
            left: .3rem;
            line-height: .24rem;
            font-size: .24rem;
            font-family: @PFSC-R;
            color: @color-33;
        }
        >.tel{
            position: absolute;
            top: .3rem;
            right: .7rem;
            line-height: .24rem;
            font-family: @PFSC-R;
            color: @color-33;
            font-size: .24rem;
            &.orderDetail{
                right: .3rem;
            }
        }
        >.address-icon{
            position: absolute;
            bottom: .31rem;
            left: .3rem;
            height: .3rem;
            width: .3rem;
            background: url("images/address-icon.png") center no-repeat;
            background-size: contain;
        }
        >.address{
            position: absolute;
            line-height: .2rem;
            width: 4.9rem;
            left: .8rem;
            top: .98rem;
            font-size: .18rem;
            font-family: @PFSC-R;
            color: @color-33;
            &.orderDetail{
                width: 5.3rem;
            }
        }
    }
    .goodsItem{
        position: relative;
        padding:.2rem 0 .88rem .2rem;
        width: 100%;
        height:1.4rem;
        overflow: hidden;
        background-color: #fff;
        .border-1px-bottom();
        .img{
            float: left;
            width: 1.4rem;
            height: 1.4rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .text{
            float: left;
            width: 4.3rem;
            height: 1.4rem;
            box-sizing: border-box;
            padding-left:.2rem ;
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
                color: @color-33;
                b{
                    float: right;
                    font-size:@f-20;
                    color: @color-33;
                }
            }
        }
    }
    .order-line{
        position: relative;
        height: .2rem;
        width: 100%;
        background: @color-f4;
    }
    .right-arrow::after{
        right: .3rem !important;
    }
</style>
<script type="text/ecmascript-6">
    import cAddress from '../../../views/order/c-order-address.vue';
    import cTimeSelect from '../../../components/address-select/twoColumn.vue';
    export default{
        data(){
            return{
                address:'',
                goodsList:[],
                doorServiceTime:'',
                experienceOrderId:'',
                addressId:'',
                remarks:'',

                arrowShow:false,
                timeSelectShow:false,
                sendAddress:true
            }
        },
        computed :{
            pickUpStartTime () {
                return this.doorServiceTime.substring(0,10) + this.doorServiceTime.substring(11,16)
            },
            pickUpEndTime () {
                return this.doorServiceTime.substring(0,10) + this.doorServiceTime.substring(17,22)
            }
        },
        updated () {
//            this.doorServiceTime = this.$refs.timeSlect.selectValue
        },
        mounted (){
            let self = this;
            self.experienceOrderId = self.$route.query.orderId
            let returnAddress = self.find('returnGoods.address');
            let url = CTX_URL + '/index/member/confirmReturnOrder?experienceOrderId=' + this.experienceOrderId;

            this.getQuery(false,url,response =>{
                if(returnAddress){
                    self.address = self.find('returnGoods.address');
                }else {
                    if(response.data.address) {
                        self.address = response.data.address
                    }
                }


                response.data.experienceOrder.experienceProduceList.forEach((term) => {
                    if(term.decisionType != 2){
                        self.goodsList.push(term)
                    }
                });
                if(self.goodsList.length ==0){
                    self.tip('无需要归还商品');
                    setTimeout(function(){
                        self.backToView()
                    },2000)

                }

            });
//            this.$refs.timeSlect.creatScroll()
        },
        methods:{
            showSelect(){
                this.timeSelectShow = true
            },
            submitAppoint () {
                let self = this;

                self.addressId = self.address.area.id;
                if(self.doorServiceTime == ''){
                    this.tip('预约时间不能为空');
                    return
                }
                let url = CTX_URL + '/index/member/submitReturnOrder';
                let params = {
                    experienceOrderId:self.experienceOrderId,
                    addressId: self.addressId,
                    pickUpStartTime: self.pickUpStartTime,
                    pickUpEndTime: self.pickUpEndTime,
                    remarks: self.remarks
                };
                console.log(params)
                self.postQuery(true,url,params,response => {
//                    console.log(response)
                    if(response == 1){
                        self.backToView()
                    }
                })

            }
        },
        components:{
            cAddress,
            cTimeSelect
        }
    }
</script>
