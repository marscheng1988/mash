<template>
    <div class="c-mode" >
        <collocation-title
            :en="item.englishName"
            :ch="item.name"
        ></collocation-title>
        <img class="c-img" v-lazy="imgUrl + item.photo" @click="clickFun" :c-id="item.id">
        <slot></slot>
    </div>
</template>
<script type="text/ecmascript-6">
    import CollocationTitle from '../../views/collocation/collocationTitle.vue'

    export default{
        props: [
            'item',
            'clickCallback'
        ],
        data(){
            return {
                imgUrl: IMG_URL
            }
        },
        methods: {
            clickFun: function(e){
                if(this.$props.clickCallback) this.$props.clickCallback(e);
            },
        },
        created(){

        },
        computed: {

        },
        components:{
            CollocationTitle
        }
    }
</script>
<style scoped lang="less">
    /*@import "../../assets/css/common.less";*/
    .c-mode{
        position: relative;
        .c-img{
            position: relative;
            height: 7.5rem;
            width: 100%;
        }
    }
</style>
