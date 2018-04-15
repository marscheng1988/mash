<template>
    <div class="page">
        <div class="ui-page-head">
            <p>添加收货地址</p>
        </div>
        <div class="newAddress-content">
            <div class="item">
                <label>收货人</label>
                <input type="text" name="" v-model="name" placeholder="请输入收货人姓名" maxlength="10"/>
            </div>
            <div class="item">
                <label>联系方式</label>
                <input type="text" name="" v-model="receiveTel" placeholder="请输入收货人联系方式" maxlength="12"/>
            </div>
            <div class="item addressInput" @click="showSelector">
                <label>所在地区</label>
                <input type="text" :value="area" placeholder="选择所在地区" readonly />
            </div>
            <div class="item">
                <label>详细地址</label>
                <textarea v-model="addressDetail" id="addressDetail" placeholder="详细地址" maxlength="30"></textarea>
            </div>
            <div class="setDefault">
                <!--<i class="iconfont" :class="{ selected : defaultFlag === '1'}" @click="setDefault"></i>-->
                <check-box class="checkBox"
                           :selected="defaultFlag === '1'"
                           @change="setDefault"
                >
                </check-box>
                <span >设为默认地址</span>
            </div>
        </div>
        <div class="confirm-button single" v-if="isNew" @click="saveAddress">保存</div>
        <div class="confirm-button" v-else>
            <div @click="deleteAddress"><span>删除</span></div>
            <div @click="saveAddress"><span>保存</span></div>
        </div>
        <addressSelector v-if="selectorShow">

        </addressSelector>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common.less";
    .page{
        background: @color-f4;
        height: 100%;
    }
    .newAddress-content{
        overflow: hidden;
        .item{
            position: relative;
            height: 0.88rem;
            width: 5.8rem;
            padding: 0 0.3rem;
            .border-1px-bottom();
            background: @color-ff;
            label{
                float: left;
                display: inline-block;
                width: 1.4rem;
                height: 0.88rem;
                /*line-height:0.88rem;*/
                display: flex;
                align-items:center;
                text-align: left;
                font-size: @f-24;
                box-sizing: border-box;
            }
            input,textarea{
                float: right;
                height: 0.58rem;
                width: 4.2rem;
                line-height: 0.58rem;
                text-align: right;
                color: #999;
                font-size: @f-24;
                margin: 0.15rem 0;
                padding-left: 0.3rem;
                box-sizing: border-box;
                -webkit-appearance:none;
                -webkit-tap-highlight-color:@color-ff;
                &::-webkit-input-placeholder{
                    color: #999;
                }
            }
            input{
                margin: 0.2rem 0;
                line-height: 0.48rem;
                height: 0.48rem;
            }
            /*&.addressInput{
                &:after{
                    content: "";
                    position: absolute;
                    right: 0.3rem;
                    top: 50%;
                    margin-top: -0.06rem;
                    height: 0.12rem;
                    width: 0.1rem;
                    border-bottom: 1px solid @color-99;
                    border-left: 1px solid @color-99;
                    -webkit-transform: rotate(-135deg);
                    transform: rotate(-135deg);
                }
            }*/
        }
        .setDefault{
            position: relative;
            height: 0.88rem;
            width: 100%;
            padding: 0 0.3rem;
            line-height:.8rem;
            .border-1px-bottom();
            color: @color-33;
            box-sizing: border-box;
            background: @color-ff;
            span{
                font-size: @f-22;
            }
            .checkBox{
                right:.15rem;
                top:.12rem;
            }
        }
    }
    .confirm-button{
        position: absolute;
    }
</style>
<script>
    import axios from 'axios';
    import router from '../../../router';
    import addressSelector from '../../../components/address-select/address-select.vue';
    import { isNull, isPhone, isSpace} from '../../../static/validate';
    import CheckBox from '../../../components/checkBox/checkBox.vue'
    export default{
        data(){
            return{
                isNew:false,
                name:'',
                receiveTel:'',
                area:'',
                areaId:'',
                addressDetail:'',
                defaultFlag:'0',
                selectorShow:false,
                isSaved:true,
                isEdited:false,
                isWrap:false,
                initP: 0 ,
                initC: 0 ,
                initA : 0 ,
            }
        },
        computed :{

        },
        watch: {
            name () {
                this.isSaved =false;
            },
            receiveTel () {
                this.isSaved =false;
            },
            area () {
                this.isSaved =false;
            },
            defaultFlag () {
                this.isSaved =false;
            },
            addressDetail(){
                this.isSaved =false;
                let textArea = document.getElementById('addressDetail');
//                let lineHeight = window.getComputedStyle(textArea,null);
//                if(textArea.scrollHeight > textArea.offsetHeight){
//                    this.isWrap = true
//                }
                if(this.addressDetail.length >16){
                    this.isWrap = true
                }
            },
            isWrap () {
                if(this.isWrap == true){
                    let textArea = document.getElementById('addressDetail');
                    textArea.style.height = textArea.offsetHeight*1.5 + 'px';
                    textArea.style.lineHeight = textArea.offsetHeight/2.5 + 'px';
                    textArea.style.marginBottom = 0 +'px';
                    textArea.style.marginTop = 0 +'px';
                    textArea.style.paddingTop = textArea.offsetHeight/10 +'px';
//                    textArea.style.marginBottom = textArea.offsetHeight/10 +'px';
//                    textArea.style.marginTop = textArea.offsetHeight/10 +'px';
                    textArea.style.overflow = 'hidden'
                }
            }

        },
        created () {
            let editAddressId = this.$route.query.Id;
            let self = this;
            self.isNew = true;
            if(editAddressId !== undefined){
                self.isNew = false;
                self.getQuery(false,CTX_URL + "/index/member/address/"+editAddressId,function (response){
                    self.name = response.data.receiveName;
                    self.receiveTel = response.data.receiveTel;
                    self.areaId = response.data.area.id;
                    self.area = response.data.area.name;
                    self.addressDetail = response.data.addressDetail;
                    self.defaultFlag = response.data.defaultFlag;
                    setTimeout(function(){self.isSaved =true},100)
                } )
            }
        },
        updated () {
            if(this.addressDetail.length >16){
                this.isWrap = true
            }
        },
        mounted () {
//            console.log(this.addressDetail)

        },
        beforeDestroy () {
            if(this.find('editAddressId'))
                this.remove('editAddressId');

        },
        methods : {
            showSelector () {
                this.selectorShow = true
            },
            setDefault () {
                if(this.defaultFlag === '1')
                    this.defaultFlag = '0';
                else
                    this.defaultFlag = '1'
            },
            deleteAddress () {
                let editAddressId = this.find('editAddressId');
                let self = this;
                this.confirm('确定删除该收货地址？',function(index){
                    if(index === "1"){
                        self.deleteQuery(true,CTX_URL + '/index/member/address/' + editAddressId,function(response){
                            console.log(response)
                            if(response.status){
                                self.isSaved = true;
                                self.backToView();
                            }
                        })
                    }

                })
            },
            saveAddress () {
                if(isNull(this.name)){
                    this.tip("请输入收货人姓名");
                    return;
                }
                if(isSpace(this.name)){
                    this.tip("收货人姓名不能有空格");
                    return ;
                }
                if(isNull(this.receiveTel)){
                    this.tip("请输入收货人手机号");
                    return ;
                }
                if(!isPhone(this.receiveTel)){
                    this.tip("手机号码格式不正确");
                    return ;
                }
                if(isNull(this.areaId) && isNull(this.area)){
                    this.tip("请选择地址区域");
                    return ;
                }
                if(isNull(this.addressDetail)){
                    this.tip("请输入详细地址");
                    return ;
                }
                if(isSpace(this.addressDetail)){
                    this.tip("详细地址不能有空格");
                    return ;
                }
                let params = {
                    receiveName : this.name,
                    receiveTel :this.receiveTel,
                    'area.id' :this.areaId,
                    addressDetail :this.addressDetail,
                    defaultFlag :this.defaultFlag
                };
                if(this.isNew == false){
                    params.id = this.find('editAddressId');
                }
                let self = this;
                this.postQuery(false,CTX_URL + '/index/member/address',params,function(response){
                    console.log(response)
                    if(response.status === 1){
                        self.isSaved = true;
                        self.backToView();
                    }
                })
            }
        },
        components:{
            'addressSelector':addressSelector,
            CheckBox
        },
        beforeRouteLeave (to, from, next) {
            if(this.isSaved === true ){
                next()
            }else{
                this.confirm('直接离开，您所填写的信息将不被保存',function (index) {
                    if(index === '1'){
                        next()
                    }
                })
            }


        }
    }
</script>
