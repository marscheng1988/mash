<template>
    <div class="confirm-footer">
        <div @click="cancelClick">{{cancelStr?cancelStr:'取消'}}</div>
        <div @click="confirmClick">{{confirmStr?confirmStr:'确定'}}</div>
    </div>
</template>
<script type="text/ecmascript-6">
    //import HeaderComponent from '../../views/'
    
    export default{
        props: [
            'confirmStr',
            'cancelStr',
            'confirm',
            'cancel',
        ],
        data(){
            return {
                
            }
        },
        methods: {
            cancelClick: function(e){
                if(this.$props.cancel) this.$props.cancel();
            },
            confirmClick: function(e){
                if(this.$props.confirm) this.$props.confirm();
            },
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
    .confirm-footer{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: .98rem;
        background: @color-33;
        .box-flex;
        &::after{
            content: '';
            position: absolute;
            left: 50%;
            top: 0;
            height: .58rem;
            width: 0;
            margin-top: .20rem;
            border-right: 1px dotted @color-99;
        }
        >div{
            position: relative;
            text-align: center;
            font-size: .3rem;
            line-height: .98rem;
            color: @color-ff;
            .box-flex-1;
        }
    }
</style>