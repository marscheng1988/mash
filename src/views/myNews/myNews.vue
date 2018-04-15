<template>
    <div class="ui-page">
        <scroller lock-x
                  scrollbarY
                  @on-scroll ="onScroll"
                  ref="scroller">
                <div class="newsWarp">
                    <div class="newsBar" @click="showSysMessage">
                        <div class="news-Icon">
                            <img :src="sysUrl"/>
                            </div>
                        <div class="news-content">
                            <h2 :class="{active:news.readFlag == 0}">系统消息</h2>
                            <h4 v-if="news">{{news.message.summary}}</h4>
                        </div>
                        <div class="news-time">
                            <span>{{updateDate}}</span>
                        </div>
                    </div>
                    <div class="newsBar" @click="showService">
                        <div class="news-Icon">
                            <img :src="mesUrl "/>
                        </div>
                        <div class="news-content">
                            <h2>客服</h2>
                            <!--<h4>今天的货发了吗，怎么还不发货？</h4>-->
                        </div>
                        <!--<div class="news-time">-->
                            <!--<span>7-20</span>-->
                        <!--</div>-->
                    </div>

                </div>
        </scroller>
    </div>
</template>
<script type="text/ecmascript-6">

//    window.onload=function(){
//        let oScript = document.createElement('script');
//        oScript.src = "https://qiyukf.com/script/3ff3dab7b19cbe99627bf07fcf1122ba.js";
//        document.getElementsByTagName('body')[0].appendChild(oScript);
//    }

    import { Scroller,Spinner} from 'vux';

    export default{
        data(){
            return {
                news:'',
                sysUrl: require('./images/message.png'),
                mesUrl: require('./images/servive.png'),
                updateDate:'',
                memberData:'',

            }
        },
        methods: {
            loadMore () {

            },
            onScroll () {

            },
            showSysMessage () {
                this.pushView('/sysMessage')
            },
            showService () {
                let self = this;
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
                        {"key":"age","label":"年龄","value":self.memberData.memberDTO.age}
                    ])
                });
                location.href = ysf.url()


            },
            //加载连接客服所需资源
            loadJS () {
                let oScript = document.createElement('script');
                oScript.src = "https://qiyukf.com/script/3ff3dab7b19cbe99627bf07fcf1122ba.js";
                document.getElementsByTagName('body')[0].appendChild(oScript);
            }

        },
        mounted () {
            let self = this;
            this.getQuery(false,
                            CTX_URL + '/index/member/message/1',
                            data => {
                                if(data.page.list){
                                    self.news = data.page.list[0];
                                    self.updateDate = data.page.list[0].updateDate.substring(5,10)
                                }

                        });

            self.getQuery(false,CTX_URL + '/index/member/info',response => {
                self.memberData = response.data;
            });

            this.loadJS();
        },
        components:{
            Scroller
        }
    }
</script>
<style  scoped lang="less" rel="stylesheet/less">
    @import "../../assets/css/common.less";
    .ui-page{
        background: @color-f4;
    }
    .newsWarp{
        background: #fff;
        margin-bottom: 10px;
        .newsBar{
            height: 1.2rem;
            width: 100%;
            border-bottom:1px solid @color-f4;
            &:last-child{
                border:none;
            }
            .news-Icon{
                width: 1.04rem;
                height: 100%;
                float: left;
                img{
                    height: .64rem;
                    width: .64rem;
                    margin: .28rem .2rem;
                    border-radius: 50%;
                }
            }
            .news-content{
                float: left;
                width: 4.3rem;
                height: 100%;
                box-sizing: border-box;
                padding: .3rem 0;
                h2{
                    position: relative;
                    width: 4.3rem;
                    height: .26rem;
                    font-size: @f-24;
                    margin-bottom: .14rem;
                    &.active::after{
                        position: absolute;
                        content:'';
                        top:0;
                        left: 1rem;
                        width: 0;
                        height:0;
                        border:.05rem solid red;
                        -webkit-border-radius:100%;
                        border-radius:100%;
                    }
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
                float: left;
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
        }
    }
</style>
