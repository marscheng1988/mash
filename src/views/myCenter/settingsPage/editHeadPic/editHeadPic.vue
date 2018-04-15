<template>
    <div>
        <div class="ui-page-head" >
            <p>个人设置</p>
        </div>
        <div class="settingarea">
            <ul>
                <li @click="editNickname">昵称</li>
                <li >
                    <label >照片</label>
                    <imgUpload ></imgUpload>
                </li>
                <li >密码管理</li>
            </ul>
        </div>
        <div v-show="editShow" class="editPanel" id="nicknameEdit">
            <input type="text"  maxlength="16" v-model="nickName" placeholder="昵称最多16个字"/>
            <div class="confirm-button">
                <div @click="cancel"><span>取消</span></div>
                <div @click="saveNickname"><span>保存</span></div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../../assets/css/common.less";
    .settingarea li{
        position: relative;
        height: 0.96rem;
        padding: 0 1.2rem 0 0.3rem;
        font-size: @f-24;
        line-height: 0.96rem;
        text-align: left;
        background: @color-ff;
        .border-1px-bottom();
        &:active{
            background: @color-e4;
        }
        &:after{
            content: "";
            position: absolute;
            right: 0.32rem;
            top: 50%;
            margin-top: -0.06rem;
            height: 0.12rem;
            width: 0.12rem;
            border-bottom: 1px solid #999;
            border-left: 1px solid #999;
            -webkit-transform: rotate(-135deg);
            transform: rotate(-135deg);
        }
    }
    .editPanel{
        position: absolute;
        left: 0;
        top: 0;
        width:100%;
        height:100%;
        background:#f4f4f4;
        input{
            margin:0.3rem 0;
            width: 100%;
            height: 0.88rem;
            font-size: @f-24;
            background:@color-ff;
            box-sizing: border-box;
            padding:0.02rem 10px;
            line-height:0.48rem;
            &#signArea{
                height: 2.5rem;
            }
        }
    }

</style>
<script type="text/ecmascript-6">
    import axios from 'axios';
    import router from '../../../router';
    import Constants from '../../../static/constants';
//    import imgUpload from './imgUpload.vue';
    import imgUpload from '../../../../components/imgUpload/imgUpload.vue';
    export default{
        data(){
            return{
                editShow:false,
                nickName:this.find("nickname")
            }
        },
        mounted (){
//            if(this.editShow === false){
//                location.href =location.href.split('#')[0]
//            }
        },
        components : {
            'imgUpload':imgUpload
        },
        methods:{
            editNickname () {
                let $me = this;
                $me.editShow =true;
                var currentUrl =location.href;
                var state = {url:currentUrl,index:1};
                window.history.pushState(state,"",currentUrl+"#编辑");
                window.onpopstate = function() {
                    $me.editShow =false
                };
            },
            cancel () {
                this.$root.confirm("是否放弃对昵称的修改？",function (type) {
                    if(type === "1") {
                        history.go(-1);
                        this.editShow =false
                    }else{
                        console.log(this)
                    }
                },"继续编辑,放弃");

            },
            saveNickname () {
//                console.log(showLoading)
//                showLoading();
                if(this.nickName === '') {
                    this.$root.tip("昵称不能为空");
                    return
                }
                if(this.nickName === this.find("nickname")){
                    this.editShow =false;
                    history.go(-1);
                    return
                }
                const memberID = this.find("memberID");
                const nickname = this.nickName;
//                console.log(this.$root.$children[0])
//               postQuery(true,CTX_URL + '/index/member/info',{
//                    "id":memberID,
//                    "nickname":nickname
//                },function(response){
//                    if(response.data.status === 1) {
//                            this.editShow =false
//                        }
//                })

                let qs = require('qs');
                axios.post(CTX_URL + '/index/member/info', qs.stringify({
                    "id":memberID,
                    "nickname":nickname
                }))
                    .then((response) => {
//                          根据返回的值做校验
                        if(response.data.status === 21) {
                            this.$root.confirm("您还没有登录，现在登录？",function (type) {
                                if(type === "0") {
                                    history.go(-1)
                                }else {
                                    let currentUrl =location.hash.split("#").join("");
                                    this.save("signPageLocation",currentUrl);
                                    this.$root.pushView("/signIn")
                                }
                            })
                        }
                        if(response.data.status === 1) {
                            this.editShow =false;
                            this.save("nickname",nickname)
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })

            }
        }
    }
</script>
