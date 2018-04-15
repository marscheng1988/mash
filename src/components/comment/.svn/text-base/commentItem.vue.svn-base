<template>
    <div class="comment-item">
        <div class="top">
            <div class="head-img" :style="'background-image: url(' + imgUrl + item.member.gravatar + ')'"></div>
            <div class="name">{{item.member.nickname}}</div>
            <div class="time">{{time}}</div>
            <div class="stars">
                <div :class="{star: true, selected: score >= 1}"></div>
                <div :class="{star: true, selected: score >= 2}"></div>
                <div :class="{star: true, selected: score >= 3}"></div>
                <div :class="{star: true, selected: score >= 4}"></div>
                <div :class="{star: true, selected: score >= 5}"></div>
            </div>
        </div>
        <div class="contnet">
            <img class="icon" src="../../components/comment/images/icon.png">
            <div class="comment-info">
                <span v-for="judge of item.orderJudgeSummaryList">{{judge.summary.name}}</span>
            </div>
            <div class="img-list">
                <div class="img" v-for="img of item.orderJudgePhotoList" v-lazy:backgroud-image="imgUrl + img.photoUrl"></div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    
    export default{
        props: [
            'item'
        ],
        data(){
            return {
                time: '2017-05-05 10:32:07',
                imgUrl: IMG_URL,
                score: this.item?(this.item.goodsLevel-0) : 0,
            }
        },
        methods: {

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
    .comment-item{
        position: relative;
        width: 6.1rem;
        margin-left: .3rem;
        .border-1px-bottom();
        >.top{
            position: relative;
            height: 1rem;
            width: 6.1rem;

            >.head-img{
                position: absolute;
                top: .3rem;
                left: 0;
                height: .64rem;
                width: .64rem;
                background: @color-ff center no-repeat;
                background-size: 100%;
                border-radius: .64rem;
            }
            >.name{
                position: absolute;
                top: .34rem;
                left: .86rem;
                font-size: .2rem;
                line-height: .22rem;
            }
            >.time{
                position: absolute;
                right: .3rem;
                top: .34rem;
                font-size: .18rem;
                color: @color-99;
                line-height: .22rem;
            }
            .stars{
                position: absolute;
                top: .63rem;
                left: .86rem;
                height: .2rem;
                width: 4rem;
                line-height: .2rem;
                >.star{
                    position: relative;
                    display: inline-block;
                    height: .2rem;
                    width: .2rem;
                    background: url("images/star-2.png") center no-repeat;
                    background-size: 100%;
                    &.selected{
                        background: url("images/star-1.png") center no-repeat;
                        background-size: 100%;
                    }
                }
            }
        }
        .contnet{
            position: relative;
            margin-left: .86rem;
            width: 5.1rem;
            padding: .1rem 0;
            >.icon{
                position: absolute;
                left: 0;
                top: .1rem;
                height: .25rem;
                width: .25rem;
            }
            >.comment-info{
                position: relative;
                font-size: .2rem;
                color: @color-99;
                line-height: .24rem;
                text-indent: .4rem;
                span{
                    font-size: .2rem;
                    color: @color-99;
                    line-height: .24rem;
                    text-indent: .4rem;
                }
            }
            >.img-list{
                position: relative;
                padding: .2rem 0;
                >.img{
                    position: relative;
                    display: inline-block;
                    height: 1.4rem;
                    width: 1.4rem;
                    margin: 0 .1rem .1rem 0;
                    background: @color-ff center no-repeat;
                    background-size: cover;
                }
            }
        }
    }
</style>