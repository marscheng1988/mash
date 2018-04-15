<style scoped lang="less" rel="stylesheet/less">
    .swiperItem{
        width: 100%;
        height:100%;
        display: flex;
        align-items:center;
        img{
            width: 100%;
            height:auto;
        }

    }

</style>
<template>
    <div>
        <swiper
                auto
                :aspect-ratio="1"
                :height="height"
                :loop="true"
                :duration="500"
                :dots-class="dotClass"
                dots-position="center">
            <swiper-item class = "swiperItem" v-for="(item, index) in getList" :key="index"><img :src="item.img"></swiper-item>
        </swiper>
    </div>
</template>

<script type="text/ecmascript-6">

    import axios from 'axios';
    import { Swiper,SwiperItem} from 'vux'
    export default {
        name: 'banner',
        props: [
            'height',
            'dataList',
            'dotClass'
        ],
        components:{
            Swiper,
            SwiperItem
        },
        data: function(){
            return {
                list: this.dataList || [],
                IMGUrl:IMG_URL,
            }
        },
        computed: {
            getList: function(){
                if(this.dataList && this.dataList.length > 0){
                    return this.dataList;
                }
                return this.list;
            }
        },
    }
</script>
