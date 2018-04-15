<template>
    <div v-show="open">
        <div class="addressShadow" v-show="open"></div>
        <div class="addressPage">
            <section>
                <div class="addressMark"><a class="markProvince"></a><a class="markCity"></a><a class="markArea"></a></div>
                <div class="addressScroll">
                    <div class="provinceWrapper" >
                        <ul>
                            <li>&nbsp;</li>
                            <li v-for="item in list">{{item.name}}</li>
                            <li>&nbsp;</li>
                            <li>&nbsp;</li>
                            <li>&nbsp;</li>
                        </ul>
                    </div>

                </div>
            </section>
            <footer class="addressFooter">
                <span class="addressCancel" @click="confirmFun">确定</span>
                <span class="addressConfirm" @click="hidePanel">取消</span>
            </footer>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import router from '../../router';
    import IScroll from './iscroll-probe.js';
    export default {
        props:[

        ],
        data () {
            return{
                open: false,
                list: [{name: '红色'},{name: '白色'},{name: '蓝色'}],
                index: 0,
                callback: null,
            }
        },
        computed:{

        },
        watch :{

        },
        created () {
            this.requestData();
        },
        updated () {

        },
        mounted () {
            console.log(document.querySelector(".provinceWrapper"))
        },
        methods:{
            show: function(data){
                this.list = data.list;
                this.callback = data.callback;
                this.index = data.index || 0;
                this.requestData();
                this.open = true;
            },
            setColor (target,index) {
                for(let i = 0;i<target.length;i++){
                    target[i].style.color = "#999"
                }
                target[index +1].style.color = "#333";
            },
            hidePanel () {
                this.open = false;
                this.$parent.closeSelector()
            },
            requestData () {
                let self = this;
                setTimeout(function(){

                    let provinceScroll = new IScroll(".provinceWrapper",{snap:"li",vScrollbar:false});

                    provinceScroll.scrollTo(0,-self.index*40);

                    provinceScroll.on("scrollEnd",function(){
                        self.index = (this.y/40)*(-1);
                        self.setColor(this.scroller.children,self.index)
                    });
                },1000)
            },
            confirmFun () {
                if(this.callback){
                    this.callback(this.list[this.index], this.index)
                }
                this.hidePanel ()
            }
        },


    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/css/common";
    .addressShadow {
        position: absolute;
        width: 100% ;
        height: 100% ;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
    }
    .addressPage {
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        overflow: hidden;
        font-size: 22px;
        margin-right: auto;
        vertical-align: middle;
        margin-left: auto;
        height: 260px;
        background: #FFFFFF;
        z-index: 9999999;
    }
    .addressMark {
        font-size: 18px;
        left: 0 ;
        width: 100% ;
        height: 36px;
        position: absolute;
        top: 140px;
        .border-1px-top-bottom();
        .markProvince {
            position: relative;
            margin-left: 76px;
            top: -2px;
        }
    }
    .addressScroll{
        background: #fff;
        width: 94% ;
        margin: 55px 3% 10px;
        height: 200px;
        text-align: center;
        line-height: 40px;
        touch-action: none;
        .provinceWrapper {
            position: absolute;
            top: 45px;
            bottom: 0;
            width: 80% ;
            margin-left: 10% ;
            margin-top: 15px;
            padding-right: 22px;
            padding-top: 40px;
            overflow: hidden;
            z-index: 1;
            ul{
                width: 100%;
                li{
                    color: #999;
                    font-size: 14px;
                    height: 40px;
                    width: 100%;
                    word-break: break-all;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    &:nth-child(2){
                        color: #333;
                    }
                }
            }
        }

        .provinceWrapper {
            left: 0;
        }
    }

    .addressHeader {
        width: 100% ;
        height: 50px;
        background: #79C12F;
        text-align: center;
        color: #fff;
        line-height: 50px;
        font-size: 20px;

    }

    .addressFooter {
        width: 100% ;
        background: #f4f4f4;
        height: 50px;
        top: 0px;
        position: absolute;
        span{
            display: block;
            color: #000;
            padding: 10px 15px;
            font-size: 14px;
            line-height: 30px;
        }
        .addressConfirm {
            float: left;
        }
        .addressCancel {
            float: right;
        }
    }

</style>
