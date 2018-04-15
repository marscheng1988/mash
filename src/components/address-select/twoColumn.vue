<template>
    <div class="selcetPage">
        <div class="addressShadow" @touchmove.prevent @click.prevent></div>
        <div class="addressPage" @touchmove.prevent @click.prevent>
            <section>
                <div class="addressMark" ><a class="markProvince"></a><a class="markCity"></a><a class="markArea"></a></div>
                <div class="addressScroll">
                    <div class="provinceWrapper" >
                        <ul>
                            <li>&nbsp;</li>
                            <li v-for="item in date">{{item}}</li>
                            <li>&nbsp;</li>
                            <li>&nbsp;</li>
                            <li>&nbsp;</li>
                        </ul>
                    </div>
                    <div class="cityWrapper">
                        <ul>
                            <li>&nbsp;</li>
                            <li v-for="item in timeSlot">{{item}}</li>
                            <li>&nbsp;</li>
                            <li>&nbsp;</li>
                            <li>&nbsp;</li>
                        </ul>
                    </div>
                </div>
            </section>
            <footer class="addressFooter">
                <span class="addressConfirm" @click="confirmArea">确定</span>
                <span class="addressCancel" @click="hidePanel">取消</span>
            </footer>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import router from '../../router';
    import IScroll from './iscroll-probe.js';
    export default {
        props:[

        ],
        data () {
            return{
                date: [],
                timeSlot: [
                    '13:30-18:00',
                    '09:00-12:00',
                    '18:30-21:00',
                ],
                selectedPro: '',
                selectedCity: '',
                indexP: 0 ,
                indexC: 0 ,
                init:true,
                initP: 0 ,
                initC: 0 ,
                selectValue:''
            }
        },
        created () {
            let date = new Date();
            let dateData = date.getFullYear() +'-'+ (date.getMonth() +1)+'-'+  date.getDate();
            this.date.push(dateData)
        },
        updated () {

        },
        mounted () {
            this.creatScroll()
        },
        methods:{
            setColor (target,index) {
                for(let i = 0;i<target.length;i++){
                    target[i].style.color = "#999"
                }
                target[index +1].style.color = "#333";
            },
            hidePanel () {
                this.$parent.timeSelectShow = false
            },
            confirmArea () {
                this.selectValue = this.date[this.indexP] +'  '+ this.timeSlot[this.indexC];
                this.$parent.doorServiceTime = this.selectValue;
                this.hidePanel ()
            },
            creatScroll () {
                let self = this;
                this.$nextTick(function(){
                    setTimeout(function(){

                        let provinceScroll = new IScroll(".provinceWrapper",{snap:"li",vScrollbar:false,snapSpeed:1000});
                        provinceScroll.on("scrollEnd",function(){
                            self.indexP = (this.y/40)*(-1);
                            self.setColor(this.scroller.children,self.indexP)

                        });

                        let cityScroll = new IScroll(".cityWrapper",{snap:"li",vScrollbar:false,fadeScrollbars:false,snapSpeed:1000});
                        cityScroll.on("scrollEnd",function(){
                            self.indexC = (this.y/40)*(-1);
                            self.setColor(this.scroller.children,self.indexC)

                        });

                    },1000)

                })
            }
        },


    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/css/common";
    .addressShadow {
        position: fixed;
        width: 100% ;
        height: 100% ;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
    }
    .addressPage {
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        overflow: hidden;
        font-size: 22px;
        margin-right: auto;
        vertical-align: middle;
        margin-left: auto;
        height: 320px;
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
        .markCity {
            position: relative;
            margin-left: 40px;
            top: -2px;
        }
        .markArea {
            position: relative;
            margin-left: 42px;
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
        .provinceWrapper,.cityWrapper,.areaWrapper {
            position: absolute;
            top: 45px;
            bottom: 60px;
            width: 80% ;
            margin-left: 10% ;
            margin-top: 15px;
            padding-top: 40px;
            padding-right: 22px;
            overflow: hidden;
            z-index: 1;
            ul{
                width: 40%;
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
        .cityWrapper {
            left: 40% ;
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
            float: right;
        }
        .addressCancel {
            float: left;
        }
    }
    .addressBottom{
        position: absolute;
        bottom: 0px;
        height: 30px;
        text-indent:10px;
        background: #f4f4f4;
        width: 100% ;
        font-size:.18rem;
        color:#999;
        line-height:30px
    }


</style>
