<template>
    <div class="select-mode">
        <div class="title">{{name}}</div>
        <div v-for="(item, i) of list" @click="chooseItem" :dataindex="i" :class="{item: true, selected: i === index}">{{item.name}}</div>
        <input v-if="hasInput" type="text" class="select-input" :placeholder="placeholder" v-model="value">
    </div>
</template>
<script type="text/ecmascript-6">

    export default{
        props: [
            'name',
            'list',
            'dataIndex',
            'hasInput',
            'placeholder',
            'inputValue',
        ],
        data(){
            return {
                index: this.dataIndex-0 || 0,
                params: null,
                value: this.inputValue || ''
            }
        },
        methods: {
            chooseItem(e){
                let index = e.target.getAttribute('dataindex') - 0;
                this.index = index;
                this.params = this.list[this.index];
            }
        },
        created(){
            this.params = this.list[this.index];
        },
        computed: {

        },
        components:{
            
        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/css/common.less";
    .select-mode{
        position: relative;
        background: @color-ff;
        padding: .3rem .3rem 0 .3rem;
        .border-1px-bottom();
        >.title{
            position: relative;
            line-height: .26rem;
            font-size: .24rem;
            color: @color-33;
            padding-bottom: .28rem;
        }
        >.item{
            display: inline-block;
            border: 1px solid @color-33;
            font-size: .2rem;
            color: @color-33;
            background: @color-ff;
            margin: 0 .38rem .3rem 0;
            height: .38rem;
            line-height: .38rem;
            min-width: .64rem;
            padding: 0 .3rem;
            text-align: center;
            &.selected{
                color: @color-ff;
                background: @color-33;
            }
        }
        .select-input{
            position: relative;
            width: 5.8rem;
            height: .6rem;
            line-height: .6rem;
            box-sizing: border-box;
            padding: 0 .3rem;
            color: @color-33;
            font-size: .24rem;
            background: @color-f4;
            margin-bottom: .3rem;
        }
    }
</style>