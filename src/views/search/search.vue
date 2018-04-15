<template>
    <div>
            <div class="ui-page" >

                <scroller lock-x
                          scrollbarY
                          :bounce="false"
                          :height="getHeight"
                          @on-pullup-loading="loadMore"
                          ref="scroller">
                    <div>
                        <div  class="search-head">
                            <div class="search-input head-input">
                                <span class="search-icon " ></span>
                                <form @submit="searchSubmit" action="javascript:return true;">
                                    <input type="search"
                                           placeholder="请输入搜索内容"
                                           @focus="focusFun"
                                           @blur="blurFun"
                                           v-model="inputContent"
                                           autocomplete="off"
                                           maxlength="49" />
                                </form>
                            </div>
                            <span class="head-cancel" @click="cancel"> 取消</span>
                        </div>
                        <!--搜索面板-->
                        <div class="searchPanel" v-if="searchPanelShow">
                            <div class="searchHisrory" v-if="history.length !== 0" >
                                <div class="title">
                                    <p>历史搜索</p>
                                    <span @click="deleteHistory"></span>
                                </div>
                                <div class="historyWarp">
                                    <div v-for="item in history" @click="clickSearch">{{item}}</div>
                                </div>
                            </div>
                            <div class="hotSearch" v-if="hotSearch.length !== 0 " >
                                <div class="title">
                                    <p>热门搜索</p>
                                </div>
                                <div class="historyWarp" >
                                    <div v-for="item in hotSearch" @click="clickSearch">{{item}}</div>
                                </div>
                            </div>
                        </div>
                        <!--智能提示面板-->
                        <div class="searchHit" v-else-if="remindShow">
                            <div v-for="item in remindData"  @click="clickSearch">{{item}}</div>
                        </div>
                        <!--搜索结果面板-->
                        <div class="searchResult" v-else-if="resultPanelShow">
                            <div class="filter-tab" v-show="!noDataView">
                                <div class="tab-container">
                                    <div class="item" >
                                        <span class="active" @click="salesSort">销量</span>
                                    </div>
                                    <div class="item" @click="openFilter">
                                        <span>筛选</span>
                                    </div>
                                </div>
                            </div>
                            <!--搜索结果-->
                            <div class="no-result"  v-show="noDataView"><i></i>&nbsp;&nbsp;没有找到任何相似单品</div>
                            <div class="result-warp" id="result-warp" >
                                <div v-if="!noDataView">
                                    <collocationMode v-for="item in searchResultList" :item="item" :clickCallback="goTarget" :key="item.id">

                                    </collocationMode>
                                </div>
                                <recommend :list="recommendList" v-if="noDataView"></recommend>
                            </div>
                        </div>
                    </div>
                </scroller>
            </div>
        <!--筛选面板-->
        <searchFilter
                :list="filterSceneList"
                :colorList="filterColorList"
                :itemSceneClick="addSceneId"
                :itemColorClick="addColorId"
                :itemPriceClick="addPrice"
                :itemSortClick="salesSort"
                :confirmClick="filterSubmit"
                :selectedSceneIds = "selectedSceneIds"
                :selectedColourName = "selectedColourName"
                :openColorSelector = "openColorSelector"
                :openPriceSelector = "openPriceSelector"
                :closeSelector = "closeSelector"
                :priceMapName="priceMapName"
                :hideCallBack="closeSelector"
                ref="chooseScenePage"
        ></searchFilter>

        <div class="selector-outer" v-show="showSelector">
            <selector
                    :closeSelector="closeSelector"
                    ref="selector"
            ></selector>
        </div>

    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/css/common.less";
    .ui-page{
        background: @color-f4;
        -webkit-overflow-scrolling: touch
    }
    .search-head{
        position: relative;
        height: 0.88rem;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0.12rem 0;
        .border-1px-bottom();
        background: #FFFFFF;
        .head-cancel{
            position: absolute;
            right: 0;
            top:50%;
            display: block;
            height: 0.88rem;
            width: 1rem;
            margin-top: -0.44rem;
            line-height: 0.88rem;
            font-size: @f-26;
            color: @color-33;
            text-align: center;
        }
        .search-input{
            display: table;
            height: 0.64rem;
            width: 5.04rem;
            margin: 0 5%;
            -webkit-border-radius:  0.64rem;
            border-radius:  0.64rem;
            background: @color-f4;
            > .search-icon{
                position: relative;
                display: table-cell;
                float: left;
                height: 0.64rem;
                width: 0.64rem;
                background-image: url("./images/search@2x.png");
                background-size: 60%;
                background-position: 50%;
                background-repeat: no-repeat;
            }
            input{
                position: relative;
                display: table-cell;
                height: 0.64rem;
                font-size: @f-24;
                z-index: 2;
                float: left;
                padding: 0;
                margin: 0;
                border: none;
                width: 75%;
                background: transparent;
                color: @color-33;
                line-height:0.24rem;
                &::-webkit-input-placeholder{
                    line-height:0.32rem;
                }
            }
        }
    }
    .searchHit{
        position: fixed;
        top: .88rem;
        left: 0;
        width: 100%;
        z-index: 99;
        overflow: hidden;
        > div{
            width: 100%;
            height: 0.8rem;
            line-height: 0.8rem;
            font-size: @f-24;
            .border-1px-bottom();
            text-indent: 0.1rem;
            background: #fff;
        }
    }
    .searchPanel{
        position: relative;
        .style-table{
            position: relative;
            width: 100%;
            height: 5rem;
            padding: 0.37rem 0.35rem ;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            >.item{
                float: left;
                height: 2.15rem;
                width: 1.1rem;
                margin: 0 0.4rem;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                padding: 0.25rem 0;
                >span{
                    display: block;
                    width: 1.1rem;
                    height: 1.1rem;
                    background-position: center;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    border-radius:0.4rem;
                    box-sizing: border-box;
                    border:0.1rem solid #fff;
                    -webkit-box-shadow:2px 2px 4px #999;
                    box-shadow:2px 2px 4px #999;
                }
                >div{
                    line-height: 0.8rem;
                    color: @color-33;
                    font-size: @f-24;
                    text-align: center;
                }
            }
        }
        .searchHisrory,.hotSearch{
            background: @color-ff;
            margin-top:0.2rem;
            padding: 0 0.3rem;
            .title{
                position: relative;
                height: 1rem;
                > p{
                    font-size: @f-24;
                    color: @color-99;
                    line-height: 1rem;
                }
                >span{
                    position: absolute;
                    display: block;
                    width: 0.44rem;
                    height: 0.44rem;
                    right: 0;
                    top: 0.38rem;
                    background: url("images/clean.png") center no-repeat;
                    background-size:60%;
                }
            }
            .historyWarp{
                overflow: hidden;
                padding-bottom: 0.3rem;
                > div{
                    float: left;
                    height: 0.56rem;
                    max-width: 2rem;
                    line-height: 0.56rem;
                    color: @color-33;
                    font-size: @f-24;
                    background-color: @color-f4;
                    border-radius: 0.28rem;
                    margin: 0.12rem 0.15rem;
                    text-align: center;
                    padding: 0 0.3rem;

                }
            }
        }
        .searchHisrory{
            margin-top:0;
        }
    }
    .no-result{
        height:1.2rem;
        line-height:1.2rem;
        text-align: center;
        font-size: @f-26;
        color: @color-99;
        background: #FFFFFF;
        margin-bottom: 0.2rem;
        i{
            display: inline-block;
            width: .35rem;
            height:.35rem;
            background-image:url("images/noData.png");
            background-repeat: no-repeat;
            background-position: 0 0;
            background-size:.3rem .3rem;
            vertical-align: middle;
        }
    }
    .searchResult{
        .filter-tab{
            height: .88rem;
            margin-bottom:.2rem;
            .tab-container{
                position: relative;
                height: .88rem;
                width: 100%;
                .border-1px-bottom();
                background: #fff;
                z-index: 9;
                .box-flex;
                .item{
                    flex: 1;
                    text-align: center;
                    font-size: 16px;
                    line-height: .88rem;
                    color:#333;
                    /*&.active{*/
                        /*color: #333;*/
                        /*span{*/
                            /*color: #333;*/
                        /*}*/
                    /*}*/
                    >span{
                        padding: 0 5px;
                        &.active{
                            color: #333;
                        }
                    }
                }
            }

        }
        .result-warp{
            width: 100%;
            background: @color-f4;
            overflow: hidden;

            .scene{
                position: relative;
                background: @color-ff;
                //height: 938/64rem;
            }
            .title-1{
                position: relative;
                height: 1.28rem;
                width: 100%;
                text-align: center;
                line-height: 1.28rem;
                font-size: @f-32;
                color: @color-33;
                &::before{
                    content: '';
                    position: relative;
                    width: .36rem;
                    height: 1px;
                    background: @color-99;
                    margin: 0 .2rem;
                    display: inline-block;
                    vertical-align: middle;
                }
                &::after{
                    content: '';
                    position: relative;
                    width: .36rem;
                    height: 1px;
                    background: @color-99;
                    margin: 0 .2rem;
                    display: inline-block;
                    vertical-align: middle;
                }
            }
            .pic-mode-1{
                position: relative;
                height: 7rem;
                background: @color-f8;
                >img{
                    position: absolute;
                    height: 100%;
                    width: 60%;
                }
                >.pic-list{
                    position: absolute;
                    width: 1.8rem;
                    right: 1.1rem;
                    top: 80/64rem;
                    >img{
                        position: relative;
                        height: 1.8rem;
                        width: 1.8rem;
                    }
                }
            }
            .scene-info{
                position: relative;
                height: .88rem;
                width: 100%;
                >.recommend-num{
                    position: relative;
                    height: .88rem;
                    line-height: .88rem;
                    padding-left: .3rem;
                    font-size: @f-24;
                    color: @color-33;
                    >.star{
                        display: inline-block;
                        vertical-align: middle;
                        height: .24rem;
                        width: .24rem;
                        /*background: url("images/collection-icon.png") center no-repeat;*/
                        background-size: 100%;
                        &.selected{
                            /*background: url("images/collection-icon-selected.png") center no-repeat;*/
                            background-size: 100%;
                        }
                        &:first-child{
                            margin-left: .1rem;
                        }
                    }
                }

                >.sales-volume{
                    position: absolute;
                    right: .3rem;
                    height: 100%;
                    line-height: .88rem;
                    top: 0;
                    font-size: @f-24;
                    color: @color-33;
                }
            }
        }
    }
    .selector-outer{
        position: absolute;
        width: 4.8rem;
        height: 100%;
        top: 0;
        right: 0;
        z-index: 9999;
    }

</style>
<script type="text/ecmascript-6">
    import router from '../../router';
    import {Scroller} from 'vux'
    import recommend from '../../components/recommend/recommend.vue';
    import searchFilter from '../../views/search/searchFilter.vue';
    import collocationMode from '../collocation/collocationMode.vue';
    import selector from '../../components/address-select/select.vue';

    export default{
        data () {
            return{
//                height: -window.innerWidth/6.4*.88 + '',
                remindShow:false,
                searchPanelShow:true,
                resultPanelShow: false,
                inputContent:'',

                remindData:[],
                history:[],
                hotSearch: [],
                recommendList:[],

                searchResultList:[],
                filterSceneList: this.find('filterSceneList'),
                filterColorList: this.find('filterColorList'),
                selectedSceneIds:[],
                selectedColourId:'',
                selectedColourName:'',
                priceMapList:[
                    {name: '0-500'},
                    {name: '501-1000'},
                    {name: '1001-2000'},
                ],
                priceMap: {},
                priceMapName:'',

                sort:'',
                noDataView:false,
                isFocus:false,
                imgUrl:IMG_URL,
                showSelector: false,
                foldName:''
            }
        },
        updated () {
            this.$nextTick(() => {
                if(this.$refs.scroller) this.$refs.scroller.reset();
            });
        },
        created () {
            //创建之初，把地址栏的query值填入到搜索栏中
            let self = this;
            if(this.$route.query.searchKeyWord !== undefined){
                this.inputContent = this.$route.query.searchKeyWord;
                this.doSearch ({keyWord:self.inputContent})
            }
        },
        computed: {
            getHeight () {
                return this.height;
            },
            getSearchParam () {
                return {
                    keyWord:this.$route.query.searchKeyWord,
                    sceneIds:this.selectedSceneIds,
                    colourSystems:this.selectedColourId,
                    priceMap:this.priceMap,
                    sort:this.sort
                };
            },
            getSelecortList () {
                let list = [];
                if(this.selectDataType === 'scene'){
                    list = this.filterSceneList;
                }
                else if(this.selectDataType === 'color'){
                    list = this.filterColorList;
                }
                return list;
            }
        },
        watch: {
            '$route': function () {
                //路由变化的时候，填入query值
                if(this.$route.query.searchKeyWord !== undefined){
                    this.inputContent = this.$route.query.searchKeyWord
                }
                else{
                    this.searchPanelShow = true
                }
                this.showSelector = false;
                this.$refs.chooseScenePage.hidePage();
            },
            inputContent () {
                //监控输入框变化，发送查询指令
                let self = this;
                let val = self.inputContent;
                let space = new RegExp(/\s+/g);
//                console.log(this.isFocus)
                if (this.isFocus === true) {
                    if(val === '') {
                        self.searchPanelShow = true;
                    } else {
                        //去掉输入框前后空格
                        if (space.test(val)) {
                            self.inputContent = val.replace(/(^\s*)|(\s*$)/g, "")
                        } else {
                            self.inputContent =  val
                        }
                        self.sendKeyWord();
                    }
                }

            },



        },
        mounted () {
            let self = this;
            this.history =this.find("searchKeyWord");

            //历史记录大于10条的时候，去掉最后那一条
            if( this.history.length > 10 )
                this.history.splice(-1);

            //请求热门搜索数据
            self.getQuery(false,
                                CTX_URL + "/index/search/hotWords",
                                function(response){
                                    if(response.data != undefined ) {
                                        response.data.forEach(function(item){
                                            self.hotSearch.push(item.label)
                                        })
                                    }
                                })

        },
        methods: {
            focusFun () {
                this.isFocus = true;
                if(this.inputContent !== ''){
                    this.sendKeyWord()
                }
            },
            blurFun () {
                this.isFocus = false;
            },
            //搜索取消
            cancel () {
                this.$root.pushView('/')
            },

            //删除搜索历史
            deleteHistory () {
                let self = this;
                this.confirm("确定清空历史记录？",function(index){
                    if(index ==="1"){
                        this.remove("searchKeyWord");
                        self.history = '';
                    }
                });
            },
            //发送关键词查询提示词
            sendKeyWord () {
                let self = this;
                let url =CTX_URL + "/index/hotWord";
                let param = {hotWord:self.inputContent};
                let keyWordCookie = this.find("searchKeyWord");

                self.remindShow = true;
                self.searchPanelShow = false;
                //每次查询之前，清空之前的提示数据
                self.remindData=[];
                self.postQuery(false,url,param,function(response){
                    if (response.data === undefined ) {
                        //没有查询到结果的时候，用历史记录填充
                        if(keyWordCookie != ''){
                            if(keyWordCookie.length < 10){
                                self.remindData = keyWordCookie
                            } else {
                                remindData.forEach(function(item){
                                    if(!self.remindData.includes(item))
                                        self.remindData.push(item)
                                })
                            }
                        } else {
                            self.remindShow = false;
                            self.searchPanelShow = true;
                        }
                    }
                    else if (response.data.length < 10) {
                        //结果长度小于10，先填充匹配的结果，再填充历史记录
                        response.data.forEach(function(item){
                            if (!self.remindData.includes(item.name))
                                self.remindData.push(item.name)
                        });
                        if (keyWordCookie.length > (10 - response.data.length)){
                            for (let i = 0; i < (10 - response.data.length); i++){
                                if (!self.remindData.includes(keyWordCookie[i]))
                                    self.remindData.push(keyWordCookie[i])
                            }
                        }
                        else if(keyWordCookie !='' && keyWordCookie.length <= (10 - response.data.length)){
                            keyWordCookie.forEach(function(item){
                                if(!self.remindData.includes(item))
                                    self.remindData.push(item)
                            })
                        }
                    } else {
                        //结果大于10，取前10条
                        for ( let i = 0; i < 10; i++ ){
                            self.remindData.push(response.data[i].name)
                        }
                    }

                })
            },
            //提交搜索
            searchSubmit (e) {
                e.preventDefault();
                let keyWord = this.inputContent;
                e.currentTarget.children[0].blur();
                this.selectedSceneIds=[];
                this.selectedColourId='';
                this.priceMap={};
                if(this.inputContent !==''){
                    this.doSearch ({
                        keyWord:keyWord
                    })
                }

            },
            //点击热词搜索
            clickSearch (e) {
                let keyWord = e.target.innerHTML;
                this.selectedSceneIds=[];
                this.selectedColourId='';
                this.priceMap={};
                this.doSearch ({
                    keyWord:keyWord
                })
            },

            doSearch ( param ) {
                let self = this;
                self.remindShow = false;
                self.searchPanelShow = false;
                self.resultPanelShow = true;
                self.isFocus = false;
                let url =CTX_URL + "/index/collocation/keyWord/1";
                self.pushView('/search', {searchKeyWord: param.keyWord});
                self.addSearchRecord("searchKeyWord", param.keyWord);
                self.searchResultList =[];
                self.postQuery(true,url,param,function(response){
//                    console.log(response)
                    if(response.page.count === 0) {
                        self.noDataView = true;
                        self.requestRecommendData();
                    } else {
                        self.noDataView = false;
                        self.searchResultList = response.page.list
                    }
                });
            },
            filterSubmit () {
                this.doSearch (this.getSearchParam);
                this.$refs.chooseScenePage.hidePage();
            },
            addSearchRecord (cookieName,value) {
                var historyCookie = this.find(cookieName);
                if(historyCookie === ""){
                    let recoad = [];
                    recoad.push(value);
                    this.save(cookieName,recoad);
                    return;
                }else {
                    if(historyCookie.includes(value)) return;
                    historyCookie.splice(0,0,value);
                    this.save(cookieName,historyCookie);
                    this.history = historyCookie;
                }

            },
            requestRecommendData () {
                let self = this;
                self.$root.getQuery(false,
                                    CTX_URL + '/index/collocation/recommend',
                                    function(response){
                                        if(response.status === 1){
                                            self.recommendList = response.data;
                                        }
                                    })
            },
            openFilter () {
                let self = this;

                if(!this.filterSceneList){
                    this.getQuery(true,
                                    CTX_URL + '/index/scene/sceneList',
                                    function(data){
                                        if(data.status === 1){
                                            self.save('filterSceneList', data.data);
                                            self.filterSceneList = data.data;
                                        }
                                    })
                }
                if(!this.filterColorList){
                    this.$root.getQuery(true,
                                        CTX_URL + '/index/search/colourSystem',
                                        function(data){
                                            if(data.status === 1){
                                                let list = [];
                                                for(let color of data.data){
                                                    color.name = color.label;
                                                }
                                                self.save('filterColorList', data.data);
                                                self.filterColorList = data.data;
                                            }
                                        })
                }
                this.$refs.chooseScenePage.showPage();
            },
            addSceneId (sceneId,name) {

                if(this.foldName != name){
                    this.selectedSceneIds = [];
                }
//                let sceneId = e.currentTarget.getAttribute('scene-id');
                let sceneArr = this.selectedSceneIds;
                if(sceneArr.length == 0 || !sceneArr.includes(sceneId) ){
                    sceneArr.push(sceneId);
                }
                else if(sceneArr.includes(sceneId)) {
                    sceneArr.splice(sceneArr.findIndex((n) => n === sceneId),1)
                }
                this.foldName = name
            },
            closeSelector () {
                this.showSelector = false;
            },
            openColorSelector () {
                this.showSelector = true;
                this.$refs.selector.show({
                    list: this.filterColorList,
                    index: this.getColorIndex(),
                    callback: this.addColorId
                })
            },
            getColorIndex () {
                let i = 0;
                for(let color of this.filterColorList){
                    if(color.id === this.selectedColourId){
                        return i;
                    }
                    i++;
                }
                return 0;
            },
            addColorId (data, index){
                this.selectedColourId = data.id;
                this.selectedColourName = data.name;
            },
            openPriceSelector () {
                this.showSelector = true;
                this.$refs.selector.show({
                    list: this.priceMapList,
                    index: this.getPriceMapIndex(),
                    callback: this.addPrice
                })
            },
            getPriceMapIndex () {
                let i = 0;
                for(let price of this.priceMapList){
                    if(price.name === this.priceMapName){
                        return i;
                    }
                    i++;
                }
                return 0;
            },
            addPrice (data, index){
                this.priceMapName = data.name;
                let priceMap = {
                    lowerPrice :  data.name.split('-')[0],
                    higherPrice :  data.name.split('-')[1]
                };
                this.priceMap = priceMap;
            },
            salesSort (){
                this.sort =  this.sort === 1 ? '' : 1
                this.doSearch (this.getSearchParam);
            },
            goTarget (e) {
                this.pushView('/collocationDetail?cId=' + e.target.getAttribute('c-id'))
            },
            loadMore () {

            },

        },
        components:{
            Scroller,
            recommend,
            searchFilter,
            collocationMode,
            selector,
        }
    }
</script>
