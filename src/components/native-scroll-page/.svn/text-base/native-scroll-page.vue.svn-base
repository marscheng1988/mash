
<!--window滚动组件，传入
    'url':请求地址,
    'questMethod'：请求方法（可选，默认get）,
    'param'：参数（可选）,
    'scrollFunc'：滚动中触发的方法（可选）,
    'questCallback'：请求完成之后的回调（可选）
    在引用组件里的computed里面，需要监听请求后的dataArr
    computed:{
        dataArr () {
            return this.$refs.scrollWarp.dataArr
        }
    },

-->
<template>
    <div class="native-scroll">
        <slot></slot>
        <footer class="load-more" v-if="!scrollable && !toBottom">
            <span>加载中……</span>
        </footer>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    .main{
        height:auto;
    }
    .load-more{
        text-align: center;
        font-size: .24rem;
        color: #999;
    }
</style>
<script type="text/ecmascript-6">
    export default{
        props:['url','questMethod','param','scrollFunc','questCallback'],
        data () {
            return{
                scrollable:true,
                total:parseFloat(window.innerHeight) + parseFloat(window.scrollY),
                winHeight:document.body.clientHeight,
                gopage:1,
                maxPage:1,
                toBottom:false,
                scrollY:0,
                dataArr:[],

                timeData:{},  // 有时间数据，会有单独的data属性

            }
        },
        watch:{
            url (){
                this.dataArr=[];
                this.gopage = 1;
                window.scrollTo(0,0);
                this.questMethods()
            },
            param (){
                this.dataArr=[];
                this.gopage = 1;
                window.scrollTo(0,0);
                this.questMethods()
            }
        },
//        created () {
//            this.questMethods()
//        },
        mounted () {
            document.getElementsByTagName('html')[0].style.height = "auto";
            document.getElementsByTagName('body')[0].style.height = "auto";
            document.getElementsByTagName('body')[0].style.background = "#f4f4f4";

            this.$root.$el.style.height = "auto";
            this.$nextTick(() => {
                window.addEventListener('scroll', this.scrollFunction, false);
            });
        },
        methods:{
            questMethods () {
                let self = this;
                if(self.questMethod == 'get' || self.questMethod == undefined){
                    this.getQuery(true,self.url + self.gopage + self.param,function(response){
                        if(response.data !== undefined){
                            self.timeData = response.data;
                        }
//                        console.log(response)
                        if(response.page.count != 0){
                            self.maxPage = Math.ceil(response.page.count/response.page.pageSize);
                            response.page.list.forEach(function(item){
                                self.dataArr.push(item)
                            });
                            self.scrollable = true;
                        }else{
                            self.maxPage = 0
                        }

                        if(self.questCallback) self.questCallback();
                    });
                }

            },
            // 超过滚动获取数据方法
            scrollFunction () {
                let self = this;
                self.scrollY = window.scrollY;
                if(self.scrollFunc) self.scrollFunc();
                if (this.scrollable) {
                    let totalheight = parseFloat(window.innerHeight) + parseFloat(window.scrollY);
                    if (document.body.clientHeight <= totalheight + 200) {

                        self.scrollable = false;
                        self.gopage += 1;
                        if(self.gopage > self.maxPage){
                            self.toBottom = true;
                            return;
                        }
                        self.questMethods()
                    }
                }
            },
            beforeDestroy () {
                document.getElementsByTagName('html')[0].style.height = "100%";
                document.getElementsByTagName('body')[0].style.height = "100%";
                document.getElementsByTagName('body')[0].style.background = "#fff";
                this.$root.$el.style.height = "100%";

                window.removeEventListener('scroll', this.scrollSencelist, false);
            },
        },

    }
</script>
