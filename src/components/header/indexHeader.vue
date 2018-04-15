<template>
      <div class="header">
          <i class="search" @click="showSearch"><img src="../../assets/images/search.png"/></i>
          <img src="../../assets/images/weekfanLog.png"/>
          <i class="message " :class="{active:messageNew}" @click="showMessage"><img src="../../assets/images/message.png"/></i>
      </div>
</template>
<script>
    import router from '../../router';

    export default {
        data () {
            return {
                messageNew:false
            }
        },
        methods:{
          showMessage: function(){
              this.pushView('/myNews');
          },
          showSearch: function(e){
              this.pushView('/search');
          },
        },
        mounted () {
            let self = this;
            self.logGetQuery(true,CTX_URL + '/index/member/info',response => {
                if(response.data.messageCount != 0 ){
                    self.messageNew = true
                }
            })


        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/css/common.less";
    .header{
        height: 0.88rem;
        width: 100%;
        text-align: center;
        i{
            width: 1rem;
            height: 0.88rem;
            padding: 0.24rem .3rem;
            text-align: center;
            box-sizing: border-box;
            img{
                height: 0.4rem;
                width: 0.4rem;
                margin: 0;

            }
            &.search{
                float: left;
                /*font-size: 0.5rem;//icon基线不标准导致CSS补丁，撤换ICON后，删除补丁*/
                /*line-height: 0.95rem;//icon基线不标准导致CSS补丁，撤换ICON后，删除补丁*/
            }
            &.message{
                position: relative;
                float: right;
                &.active::before{
                    content: "";
                    position: absolute;
                    right:0.15rem;
                    top: 0.15rem;
                    width: 0.08rem;
                    height: 0.08rem;
                    border-radius: 50%;
                    background: red;
                }
            }
        }
        img{
            display: inline;
            width: 2.4rem;
            height: 0.3rem;
            margin-top:0.28rem;
        }
    }
</style>
