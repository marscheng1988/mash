<template>
    <div class="c-footer">
        <div class="footerboxwarp">
            <div class="footerbox" @click="showService">
                <i class="kefu"></i>
                <span>客服</span>
            </div>
            <div class="footerbox" @click="collectFun">
                <i :class="{
                shoucang: true,
                collected: collected
                 }"></i>
                <span>{{collected?'已收藏': '收藏'}}</span>
            </div>
            <div class="footerbox" @click="showComment">
                <i class="pingjia"></i>
                <span>评价</span>
            </div>
            <div class="btn cart" @click="addShoppingCart">加入购物车</div>
            <div class="btn experience" @click="appointNow">立即体验</div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    //import HeaderComponent from '../../views/'

    export default{
        props: [
            'data',
            'collected', //是否已收藏
            'cId',  //搭配Id
            'commontType',  //评论类型
            'commontId',  //评论型参数Id
        ],
        data(){
            return {
                collectUrl: CTX_URL + '/index/member/collocationCollect',
                memberData:''
            }
        },
        methods: {
            addShoppingCart: function(){
                if (this.$route.query.from == 'group') {  // from group
                    this.pushView('/addShoppingCart',{groupId: this.$route.query.groupId})
                } else {  // from detail
                    this.pushView('/addShoppingCart',{cId: this.$route.query.cId})
                }
            },
            appointNow: function(){
                if (this.$route.query.from == 'group') {  // from group
                    this.pushView('/addShoppingCart', {groupId: this.$route.query.groupId, type: 'experience'})
                } else {  // from detail
                    this.pushView('/addShoppingCart',{cId: this.$route.query.cId, type: 'experience'})
                }
            },
            collectFun: function(){
                this.postQuery(true, this.collectUrl, {collocationId: this.$props.cId}, data=>{
                    if(data.status === 1){
                        if(this.$parent.collected === false){
                            this.tip('收藏成功！');
                        }else{
                            this.tip('已取消收藏！');
                        }
                        this.$parent.collected = !this.$parent.collected;
                    }
                },null,true)
            },
            showComment: function(){
                this.pushView('/comment',{id: this.commontId, type:this.commontType });
            },
            showService () {
                let self = this;

                self.getQuery(false,CTX_URL + '/index/member/info',response => {
                    self.memberData = response.data;
                    ysf.config({
                        uid:self.memberData.memberDTO.id,//用户ID
                        name:self.memberData.memberDTO.usercode,//用户帐号
                        email:self.memberData.memberDTO.email,//邮箱
                        mobile:self.memberData.memberDTO.mobile,//联系电话
                        data:JSON.stringify([
                            {"key":"name","label":"真实姓名","value":self.memberData.memberDTO.name},
                            {"key":"nickname","label":"昵称","value":self.memberData.memberDTO.nickname},
                            {"key":"sex","label":"性别","value":self.memberData.memberDTO.sex},
                            {"key":"level","label":"会员级别","value":self.memberData.memberDTO.level},//请使用levelPoint转换成会员等级
                            {"key":"point","label":"积分","value":self.memberData.memberDTO.point},
                            {"key":"birthday","label":"生日","value":self.memberData.memberDTO.birthday},
                            {"key":"age","label":"年龄","value":self.memberData.memberDTO.age},
                            {"key":"orderNo","label":"搭配ID","value":self.cId}
                        ])
                    });
                    if (self.commontType === 'collocation') {
                        ysf.product({
                            show : 0, // 1为打开， 其他参数为隐藏（包括非零元素）
                            title : self.data.name,
                            desc : self.data.description,
                            picture : 'http://oe7bp6qor.bkt.clouddn.com/' + self.data.photo,
                            note : '',
                            url : ''
                        });
                    }
                    else if (self.commontType === 'group') {
                        ysf.product({
                            show : 0, // 1为打开， 其他参数为隐藏（包括非零元素）
                            title : self.data.title,
                            desc : '',
                            picture : 'http://oe7bp6qor.bkt.clouddn.com/' + self.data.photo,
                            note : '',
                            url : ''
                        });
                    }

                    location.href = ysf.url()
                });

            },
            //加载连接客服所需资源
            loadJS () {
                let oScript = document.createElement('script');
                oScript.src = "https://qiyukf.com/script/3ff3dab7b19cbe99627bf07fcf1122ba.js";
                document.getElementsByTagName('body')[0].appendChild(oScript);
            },
        },
        mounted () {
            this.loadJS ();
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
    .c-footer{
        position: fixed;
        bottom: 0;
        height: 0.98rem;
        width: 100%;
        background: #504e4e;
        z-index:99;
        .footerboxwarp{
            height: 100%;
            width: 100%;
            .footerbox{
                float: left;
                height: 100%;
                text-align: center;
                overflow: hidden;
                color: @color-ff;
                width: .846rem;
                &:active{
                    background:@color-66
                }
                i{
                    display: block;
                    width: 100%;
                    height: 0.6rem;
                    box-sizing: border-box;
                    padding: 0.1rem;
                    background-size: 0.35rem 0.35rem;
                    background-repeat: no-repeat;
                    background-position: center;
                    &.kefu{
                        background-image:url("images/kefu.png") ;
                    }
                    &.shoucang{
                        background-image: url("images/shoucang.png");
                        &.collected{
                            background-image: url("images/yishoucang.png");
                        }
                    }
                    &.shoppingCart.active{
                        background-image: url("images/yishoucang.png");
                    }
                    &.pingjia{
                        background-image: url("images/pingjia.png");
                        background-size: .33rem;
                    }
                }
                span{
                    display: block;
                    width: 100%;
                    height: 0.37rem;
                    line-height: 0.28rem;
                    font-size: 0.2rem;
                }
            }
            .btn{
                float: left;
                width: 1.93rem;
                height: 100%;
                color: @color-ff;
                font-size: .26rem;
                line-height: .98rem;
                text-align: center;
                font-family: PingFangSC-Medium, sans-serif;
                &.cart{
                    background: #2f2e2e;
                    &:active{
                        background: darken(#2f2e2e, 10%);
                    }
                }
                &.experience{
                    background: #000000;
                    &:active{
                        background: darken(#2f2e2e, 10%);
                    }
                }

            }
        }
    }
</style>
