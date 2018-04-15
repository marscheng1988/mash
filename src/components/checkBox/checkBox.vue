<template>
    <div class="check-box-outer" @click="clickFun">
        <div :class="['check-box', {'checked': selected}]"></div>
    </div>
</template>
<script type="text/ecmascript-6">

    export default{
        props: [
            'selected'
        ],
        data(){
            return {
                
            }
        },
        methods: {
            clickFun: function(){
                this.$emit('change');
            }
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

    .check-box-outer{
        position: absolute;
        height: .6rem;
        width: .6rem;
        .check-box{
            position: absolute;
            width: .3rem;
            height: .3rem;
            left: .15rem;
            top: .15rem;
            background: url("images/check-box.png") center no-repeat;
            background-size: contain;
            &.checked{
                background: url("images/check-box-checked.png") center no-repeat;
                background-size: contain;
            }
        }

    }


</style>