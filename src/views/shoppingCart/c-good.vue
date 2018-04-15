<template>
    <div class="good-item">
        <div class="top-content">
            <img v-if="item.goods.photo" class="img" :src="imgUrl + item.goods.photo">
            <div class="title">{{item.goods.title}}</div>
            <div class="price">￥{{price?price.toFixed(2):''}}</div>

            <check-box v-if="!hideRadio" class="radio"
                       :selected="selected"
                       @change="triggerItem"
            >
            </check-box>

            <!--<div v-if="!hideRadio" @click="triggerItem" :class="selected?'radio selected': 'radio'"></div>-->
        </div>
        <div class="mid-content">
            <div v-if="getStyleType && styleType === '2' && !buy" class="error-info">奢华定制版珠宝需要单独定制，请您先体验常规材质的珠宝！</div>
            <div v-if="getStyleType" class="title">款式</div>
            <div @click="setStyleType1" v-if="getStyleType" :class="{produce: true, selected: styleType==='1'?true: false}">精华服饰版</div>
            <div @click="setStyleType2" v-if="getStyleType" :class="{produce: true, selected: styleType==='2'?true: false}">奢华定制版</div>
            <div class="title">尺码</div>
            <div @click="chooseProduce" v-for="produce in item.goods.produceList" v-if="!hasStyleType || (produce.styleType === styleType?true: false)"
                 :class="produceId === produce.id?'selected produce':'produce'"
                 :data-price="produce.priceBuy"
                 :data-name="produce.name"
                 :data-id="produce.id"
                 :data-stock="produce.stockSell"
                 :data-isExperience="produce.isExperience"
                 :data-isBuy="produce.isBuy"
                 :data-isForeexperience="produce.isForeexperience"
                 :data-styleType="produce.styleType"
            >{{produce.name}}</div>
        </div>
        <div class="bottom-content">
            <div class="title">数量</div>
            <div @click="add" class="add"></div>
            <div class="num">{{num}}</div>
            <div @click="reduce" class="reduce"></div>
        </div>
        <div class="item-line" v-if="!isEnd"></div>
    </div>
</template>
<script type="text/ecmascript-6">
    //import HeaderComponent from '../../views/'
    import CheckBox from '../../components/checkBox/checkBox.vue'

    export default{
        props: [
            'item',
            'isEnd',
            'hideRadio',
            'isBuy',
            'initProNum',
        ],
        data(){
            return {
                imgUrl: IMG_URL,
                selected: true,
                buy: this.isBuy || false,
                name: '',
                produceId: '',
                price: 0,
                stockSell: 0,
                num: 1,
                initNum: 1,
                initProduceId: '',
                hasStyleType: false,
                styleType: '1',
                selectedStyleType: '',
            }
        },
        methods: {
            /**初始化数据*/
            initGood: function(data){
                let flag = false;
                this.hasStyleType = false;
                this.styleType = '1';
                this.selectedStyleType = '';

                if(!this.buy){
                    /**体验*/
                    if(data.produceId){
                        for(let produce of data.produceList){

                            if(produce.id === data.produceId ){
                                this.price = produce.priceBuy;
                                if(produce.styleType){
                                    this.hasStyleType = true;
                                }
                                if(produce.stockSell && produce.stockSell > 0){
                                    this.produceId = produce.id;
                                    this.price = produce.priceBuy;
                                    this.stockSell = produce.stockSell;
                                    this.name = produce.name;
                                    this.num = data.num;
                                    this.selectedStyleType = produce.styleType;
                                    flag = true;
                                    break;
                                }

                            }
                        }
                    }else{
                        for(let produce of data.produceList){
                            if(this.price === 0){
                                this.price = produce.priceBuy;
                            }
                            if(produce.styleType){
                                this.hasStyleType = true;
                            }
                            if(produce.stockSell && produce.stockSell > 0 && produce.isExperience === '1' && produce.styleType !== '2'){
                                this.produceId = produce.id;
                                this.price = produce.priceBuy;
                                this.stockSell = produce.stockSell;
                                this.num = 1;
                                this.selectedStyleType = produce.styleType;
                                flag = true;
                                break;
                            }
                        }
                    }
                    this.selected = true;

                }else {
                    /**体验转购买*/
                    for(let produce of data.produceList){

                        if(produce.id === data.produceId ){
                            this.price = produce.priceBuy;
                            if(produce.styleType){
                                this.hasStyleType = true;
                            }
                            if(produce.stockSell){
                                this.produceId = produce.id;
                                this.price = produce.priceBuy;
                                this.stockSell = produce.stockSell;
                                this.name = produce.name;
                                this.num = data.num;
                                this.initNum = data.initProNum;
                                this.initProduceId = data.initProduceId;

                                this.selectedStyleType = produce.styleType;
                                break;
                            }
                        }
                    }
                    this.selected = true;
                }
            },
            triggerItem: function(){
                if(this.selected === false && this.stockSell <= 0 && this.stockSell){
                    //this.save('appointOrder',{
                    //    'experienceProduceList[0].produce.id' : this.produceId,
                    //    'experienceProduceList[0].num': this.num
                    //})
                    //this.pushView('/appointOrder');
                }else {

                }
                this.selected = !this.selected;

            },
            chooseProduce: function(e){
                if(!this.selected) return;

                let produceId = e.currentTarget.getAttribute('data-id'),
                    price = e.currentTarget.getAttribute('data-price')-0,
                    name = e.currentTarget.getAttribute('data-name'),
                    stockSell = e.currentTarget.getAttribute('data-stock')-0,
                    isExperience = e.currentTarget.getAttribute('data-isExperience'),
                    isBuy = e.currentTarget.getAttribute('data-isBuy'),
                    styleType = e.currentTarget.getAttribute('data-styleType'),
                    isForeexperience = e.currentTarget.getAttribute('data-isForeexperience');

                if(produceId === this.produceId) return;

                if(!this.buy){
                    //体验
                    if(!styleType){
                        this.hasStyleType = false;
                    }
                    if(styleType === '2'){
                        this.tip('奢华定制版珠宝需要单独定制，请您先体验常规材质的珠宝！')
                        return;
                    }

                    if(isExperience !== '1'){
                        this.tip('该产品不支持体验');
                        return;
                    }

                    if(stockSell < 1 && isForeexperience === '1') {
                        this.confirm(`
                    <p class="notification-p">由于平台单量过大，当前选择商品已无库存，请您选择到过提醒或预约体验。</p>
                    <p class="notification-p">到货提醒：商品到货后会以短信形式通知您！</p>
                    <p class="notification-p">预约体验：预约后将为您保留最新到货的库存，预约周期为45天！</p>
                    `, index => {
                            if(index === '0'){
                                this.setRemind(produceId);
                            }else if(index === '1'){
                                this.save('appointOrder', {
                                    'experienceProduceList[0].produce.id': produceId,
                                    'experienceProduceList[0].num': 1,
                                })
                                this.save('chooseDate', '');
                                this.pushView('/appointOrder');
                            }
                        },'到货提醒,预约体验', null, true)
                        return;
                    };

                    this.produceId = produceId;
                    this.price = price;
                    this.stockSell = stockSell;
                    this.num = 1;
                    this.selectedStyleType = styleType;
                }else {
                    //体验转购买
                    if(isBuy !== '1'){
                        this.tip('该产品不支持购买');
                        return;
                    }

                    if(produceId !== this.initProduceId){
                        if(1 > stockSell){
                            this.tip('库存不足!');
                            return;
                        }
                        this.num = 1;
                    }else {
                        this.num = this.initNum;
                    }

                    this.produceId = produceId;
                    this.name = name;
                    this.price = price;
                    this.stockSell = stockSell;
                    this.selectedStyleType = styleType;
                }
            },
            setRemind: function(produceId){
                this.postQuery(true, CTX_URL + '/index/member/stockAddRemind', { produceId: produceId}, data=>{
                    if(data.status === 1){
                        this.tip('到货提醒设置成功!')
                    }
                })
            },
            add: function(){
                if(!this.selected) return;
                if(!this.produceId) return;

                if(this.buy && this.produceId === this.initProduceId){
                    this.tip('数量不能修改！');
                    return;
                }

                if(this.num === this.stockSell){
                    this.tip('不能再多了哦！')
                    return;
                }
                this.num++;
            },
            reduce: function(){
                if(!this.selected) return;
                if(!this.produceId) return;
                if(this.buy && this.produceId === this.initProduceId){
                    this.tip('数量不能修改！');
                    return;
                }
                if(this.num === 1){
                    this.$root.tip('不能再少了哦！')
                    return;
                }
                this.num--;
            },
            setStyleType1: function(){
                if(this.styleType === '2'){
                    this.styleType = '1';
                }

            },
            setStyleType2: function(){
                if(this.styleType === '1'){
                    this.styleType = '2';
                }
            }
        },
        created(){
            this.initGood(this.$props.item.goods);
        },
        computed: {
            getStyleType: function(){
                return this.hasStyleType;
            }
        },
        components:{
            CheckBox,
        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/css/common.less";
    .good-item{
        position: relative;
        .border-1px-bottom();
        .top-content{
            position: relative;
            height: 2.1rem;
            width: 5.8rem;
            margin-left: .3rem;
            .border-1px-bottom();
            .img{
                position: absolute;
                height: 1.4rem;
                width: 1.4rem;
                top: .3rem;
                left: 0;
            }
            .title{
                position: absolute;
                top: .7rem;
                left: 1.7rem;
                width: 3rem;
                height: .26rem;
                line-height: .26rem;
                font-size: .24rem;
                color: @color-33;
                font-family: @PFSC;
                .ellipsis;
            }
            .price{
                position: absolute;
                width: 2rem;
                bottom: .82rem;
                left: 1.7rem;
                color: @color-33;
                /*font-family: @PFSC;*/
                font-size: .2rem;
                line-height: .2rem;
                .ellipsis;
            }
            .radio{
                top: .75rem;
                right: -.15rem;
            }
        }
        .mid-content{
            position: relative;
            width: 5.8rem;
            margin-left: .3rem;
            .border-1px-bottom();
            padding:  0 0 .1rem 0;
            .error-info{
                position: absolute;
                top: 1.52rem;
                font-size: .18rem;
                line-height: .20rem;
                color: @color-error;
            }
            .title{
                position: relative;
                height: .26rem;
                padding: .4rem 0 .3rem 0;
                line-height: .26rem;
                color: @color-33;
                font-size: .24rem;
                font-family: @PFSC;
            }
            .produce{
                position: relative;
                display: inline-block;
                text-align: center;
                height: .38rem;
                line-height: .38rem;
                border: 1px solid @color-33;
                color: @color-33;
                margin: 0 .3rem .3rem 0;
                min-width: .7rem;
                padding: 0 .3rem;
                font-size: .2rem;
                &.selected{
                    border: 1px solid @color-33;
                    color: @color-ff;
                    background: @color-33;
                }
            }
        }
        .bottom-content{
            position: relative;
            width: 5.8rem;
            margin-left: .3rem;
            height: 1.12rem;
            .title{
                position: absolute;
                left: 0;
                top: .44rem;
                font-size: .24rem;
                line-height: .24rem;
                color: @color-33;
                font-family: @PFSC;
            }
            .reduce{
                position: absolute;
                height: .6rem;
                width: .6rem;
                top: .25rem;
                right: 1.45rem;
                background: url("images/reduce-icon.png") center no-repeat;
                background-size: 50%;
            }
            .num{
                position: absolute;
                height: .3rem;
                width: 1.3rem;
                top: .4rem;
                right: .3rem;
                text-align: center;
                font-size: .3rem;
                line-height: .3rem;
                color: @color-33;
            }
            .add{
                position: absolute;
                height: .6rem;
                width: .6rem;
                top: .25rem;
                right: -.15rem;
                background: url("images/add-icon.png") center no-repeat;
                background-size: 50%;
            }
        }
        .item-line{
            height: .2rem;
            width: 100%;
            .border-1px-top();
            background: @color-f4;
        }
    }
</style>