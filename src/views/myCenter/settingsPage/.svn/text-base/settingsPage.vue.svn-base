<template>
    <div class="ui-page">
        <div class="ui-page-head" >
            <p>个人设置</p>
        </div>
        <div class="settingarea">
            <ul>
                <li @click="editNickname">昵称<span class="nameDisplay">{{nickName}}</span></li>
                <li >
                    头像
                    <span class="headPicDisplay"><img :src ="headImg"/></span>
                    <image-upload class="image-upload" :width="100" :height="100" :callback ="sendPic"></image-upload>
                </li>
                <li @click="modifyPassword">密码管理</li>
            </ul>
        </div>
        <transition name="slideRight">
            <div v-show="editShow" class="editPanel">
                <input type="text" v-model="inputNickName" maxlength="16" :value="nickName" placeholder="昵称最多16个字"/>
                <div class="confirm-button">
                    <div @click="cancel"><span>取消</span></div>
                    <div @click="saveNickname"><span>保存</span></div>
                </div>
            </div>
        </transition>

        <div class="confirm-button single loginOut">
            <div @click="loginOut"><span>退出当前账户</span></div>
        </div>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common.less";
    .ui-page{
        background: @color-f4;
    }

    .settingarea li{
        position: relative;
        height: 0.96rem;
        padding: 0 1.2rem 0 0.3rem;
        font-size: @f-26;
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
            border-bottom: 1.5px solid @color-e4;
            border-left: 1.5px solid @color-e4;
            -webkit-transform: rotate(-135deg);
            transform: rotate(-135deg);
        }
        .upload-block{
            float: left;
        }
        .nameDisplay{
            position: absolute;
            font-size: @f-26;
            line-height: 0.96rem;
            right:.6rem;
            top:0;
        }
        .headPicDisplay{
            position: absolute;
            height:.96rem;
            width:.96rem;
            right:.6rem;
            top:0;
            img{
                margin: .21rem 0 0 .42rem;
                width:.54rem;
                height:.54rem;
                border-radius: .54rem;
            }
        }
        .image-upload{
            position: absolute;
            top:0;
            left:0;
            z-index: 9;
            width:100%;
            height:100%;
        }
    }
    .slideRight-enter-active {
        animation: slideIn .3s ease-out;
    }
    .slideRight-leave-active {
        animation: slideOut .3s ease-out;
    }
    @keyframes slideIn {
        from {
            /*opacity: 0;*/
            transform: translateX(100%);
        }
        to {
            /*opacity: 1;*/
            transform: translateX(0);
        }
    }
    @keyframes slideOut {
        from {
            /*opacity: 1;*/
            transform: translateX(0);
        }
        to {
            /*opacity: 0;*/
            transform: translateX(100%);
        }
    }
    .editPanel{
        position: absolute;
        left: 0;
        top: 0;
        width:100%;
        height:100%;
        background:#f4f4f4;
        z-index: 99;
        input{
            margin: 0;
            width: 100%;
            height: 0.88rem;
            font-size: @f-24;
            background:@color-ff;
            box-sizing: border-box;
            padding:30px;
            &#signArea{
                height: 2.5rem;
            }
        }
    }
    .loginOut{
        position: absolute;
        width: 90%;
        left: 5%;
        bottom: 0.2rem;
        z-index: 0;
    }
</style>
<script type="text/ecmascript-6">
    import axios from 'axios';
    import imgUpload from '../../../components/imgUpload/imgUpload.vue';
    export default{
        data(){
            return{
                editShow:false,
                nickName:'' ,
                headImg:'',
                memberID:'',
                inputNickName:''
            }
        },
        components : {
            'image-upload':imgUpload
        },
        created () {
            let self = this;

            this.memberID = this.find('memberData').memberDTO.id;
            this.headImg = IMG_URL + this.find('memberData').memberDTO.gravatar;

            if( self.find('memberData').memberDTO.nickname == undefined){
                self.nickName = self.find('memberData').memberDTO.usercode.substring(0,3)
                                + "****" + self.find('memberData').memberDTO.usercode.substring(7,11);
            }else{
                self.nickName = self.find('memberData').memberDTO.nickname;
            }

            this.inputNickName = this.nickName
        },
        mounted (){
//            if(this.editShow === false){
//                location.href =location.href.split('#')[0]
//            }

        },
        methods:{
            editNickname () {
                let self = this;
                self.editShow =true;
                let currentUrl =location.href;
                let state = {url:currentUrl,index:1};
                window.history.pushState(state,"",currentUrl+"#编辑");
                window.onpopstate = function() {
                    self.editShow =false;
                    document.activeElement.blur();
                };
            },

            modifyPassword () {
                this.pushView("/myCenter/settingsPage/modifyPassword")
            },

            cancel () {
//                this.$root.confirm("是否放弃修改？",function (type) {
//                    if(type === "1") {
                        this.backToView();
                        this.editShow =false;
//                    }else{
//                        console.log(this)
//                    }
//                },"继续编辑,放弃");
            },

            saveNickname () {
                if(this.nickName === '') {
                    this.$root.tip("昵称不能为空");
                    return
                }
                if(this.inputNickName === this.find("nickname")){
                    this.editShow =false;
                    history.go(-1);
                    return
                }

                let self = this;
                self.postQuery(true,
                                CTX_URL + '/index/member/info',
                                {
                                    "id":self.memberID,
                                    "nickname":self.inputNickName
                                },
                                function(response){
                                    if(response.status === 1) {
                                        self.tip("修改成功",function(){
                                            self.editShow =false;
                                        });
                                        self.nickName = self.inputNickName;
                                        self.save("nickname",self.nickName)
                                     }
                                })
            },

            loginOut () {
                const root = this.$root;
                let self= this;
                self.getQuery(true,
                            CTX_URL + '/index/logout',
                            function(data){
                                if(data.status === 1){
                                    self.$store.commit('loginOut');
                                    root.pushView('/')
                                }
                            })
            },
            sendPic (imgUrl) {
                let self= this;
//                console.log(imgUrl)
                this.postQuery(true,
                                CTX_URL + '/index/member/info',
                                {
                                    id:self.memberID,
                                    gravatar:imgUrl
                                },
                                (response) => {
                                    if(response.status == 1){
                                        self.headImg = imgUrl;
                                        self.tip('头像修改成功')
                                    }
                                })

            }

        }
    }
</script>
