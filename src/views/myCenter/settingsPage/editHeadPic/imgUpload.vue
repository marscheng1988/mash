<template>
    <div class="imgLoader">
        <div class="button">
            <input type="file" id="upload" hidden accept="image" @change="upload">
            <label  for="upload"></label>
        </div>
        <div class="img-cut-page" v-if="showCutPanel">
            <div class="top border" :style="borderTopStyle"></div>
            <div class="left border" :style="borderLeftStyle"></div>
            <div class="right border" :style="borderRightStyle"></div>
            <div class="bottom border" :style="borderBottomStyle"></div>
            <img id="img" :src="ImageData" :style="previewImgStyle" class="img">
            <div id="cut" :style="cutWarpStyle"></div>
            <div class="footer" :style = "{height:footerHeight + 'px'}">
                <div class="cancel-btn" @click="cancel">取消</div>
                <div class="rotate-left" @click="rotateLeft"></div>
                <div class="rotate-right" @click="rotateRight"></div>
                <div class="cut-btn" @click="confirm">选取</div>
            </div>
        </div>
    </div>
</template>

<script >
    import Exif from 'exif-js'

    export default {
        data () {
            return {
                ImageData : '',         //储存图片数据
                picValue : '',          //图片对象
                showCutPanel:false,     //显示裁剪面板

                previewImgStyle : '',   //预览图片的样式
                cutWarpStyle : '',      //裁剪框的样式
                borderTopStyle : '',    //透明上边框样式
                borderLeftStyle : '',   //透明左边框样式
                borderBottomStyle : '', //透明下边框样式
                borderRightStyle : '',  //透明右边框样式

                minZoom : 1,    //图片最小的缩放比例（与裁剪框尺寸的比例）
                maxZoom : 3,    //图片最大的缩放比例（与裁剪框尺寸的比例）
                zoom : 1,       //初始化时图片的缩放比例
                dZoom : 0.5,    //放大超过最大比例或者低于最低比例dZoom时，触发回弹效果

                margin : 30,    //裁剪框与窗口的边距
                rotate : 0,      //图片旋转角度

                //裁剪框的高度、宽度
                cutStartHeight : 0,
                cutStartWidth : 0,
                cutWarpRatio: this.cutWarpH/this.cutWarpW,
                cutLeft:'',
                cutTop:'',

                //窗口的高度、宽度
                windowHeight :window.innerHeight,
                windowWidth : window.innerWidth,

                //页脚的高度
                footerHeight : 50,

                //图片原始的高度，宽度，高宽比
                naturalHeight : '',
                naturalWidth : '',
                imgHWRatio : '',

                //图片的初始高度、宽度
                imgStartHeight : '',
                imgStartWidth : '',
                imgTop : 0,
                imgTop : 0,

                //图片旋转后，top和left会发生一定量位移的偏转，计算时要top要加上、left要减去这个偏移量
                startDisplacement : '',

                //两个手指触摸时接触屏幕的位置
                position1 : '',
                position2 : '',

                //两个触摸点的距离
                d : 0,

                //图片超过最大缩放系数或者小于最小缩放系数的前一个状态的位置情况
                suitableLeft : '',
                suitableTop : '',
                suitableZoom : '',

                //两个触摸点的中间位置,作为缩放的中心
                zoomCenter : '',

                //单手手指滑动时的位置
                movePoint : '',

                //拍摄时相机的旋转角度（ios设备和数码相机等设备才有）
                orientation : '',
                img:'',
                canvas : document.createElement("canvas")
            }
        },
        props:{
            cutWarpH:{
                type:Number,
                require:false
            },
            cutWarpW:{
                type:Number,
                require:false
            },
        },
        computed:{

        },
        watch :{
            ImageData () {
                let self=this;
                if(this.ImageData != '')
                    setTimeout(() => {
                    self.img = document.getElementById('img');
                    this.setPreImgSize ();
                },10)
            }
        },
        mounted () {

        },
        updated () {

        },
        methods: {
            showCut () {

            },
            rotateLeft () {
                let self = this;
//                self.rotate = self.rotate < 270 ?self.rotate+90 :0;
//                self.img.style.webkitTransform = "rotate("+this.rotate+"deg)";
                let canvas = document.createElement("canvas");
                this.setPreImgSize ();
                this.rotateImg(this.img,'left',canvas);

                console.log(canvas.toDataURL('image/webp',0.3));

            },
            rotateRight () {
                let self = this;
//                let canvas = document.createElement("canvas");
//                self.rotate -= 90;
                self.rotate = self.rotate < 90 ?270:self.rotate-90 ;
                self.img.style.webkitTransform = "rotate("+ this.rotate +"deg)";
                this.rotateImg(this.img,'right');
                this.setPreImgSize ();
            },
            cancel () {
                this.ImageData = '';
                this.showCutPanel = false
            },
            confirm () {
                this.$parent.headImg = this.ImageData;
                this.$emit('confirm');
                this.ImageData = ''
            },
            upload (e) {
                let files = e.target.files || e.dataTransfer.files;
                let typeVal = e.target.value;
                if (!files.length) return;

                this.showCutPanel = true;
                this.picValue = files[0];
                if(!/\.(jpg|png|JPG|PNG|JPEG|jpeg)$/.test(typeVal)){
                    this.tip("文件格式必须为jpg和png");
                    return
                }
                this.imgPreview(this.picValue);
            },
            setPreImgSize () {
                let self = this;
                let warpProportion = self.windowWidth/(self.windowHeight -self.footerHeight);

//                if(self.rotate == 0 || self.rotate == 180){
                    self.naturalHeight = self.img.naturalHeight;
                    self.naturalWidth = self.img.naturalWidth;
//                }else {
//                    self.naturalWidth = self.img.naturalHeight;
//                    self.naturalHeight = self.img.naturalWidth;
//                }

                let imgProportion =self.naturalWidth/self.naturalHeight;

                if(self.naturalWidth < self.windowWidth && self.naturalHeight < (self.windowHeight - self.footerHeight)){
                    self.imgStartHeight = self.naturalHeight;
                    self.imgStartWidth = self.naturalWidth;

                    self.imgTop = (window.innerHeight - self.footerHeight - self.imgStartHeight)/2;
                    self.imgLeft = (window.innerWidth - self.imgStartWidth)/2;

                }else{

                    if(imgProportion > warpProportion) {
                        self.imgStartHeight = window.innerWidth/imgProportion;
                        self.imgStartWidth = window.innerWidth;

                        console.log(self.imgStartHeight)
                        console.log(self.imgStartWidth)

                        self.imgTop = (window.innerHeight - self.footerHeight - self.imgStartHeight)/2;
                        self.imgLeft = 0;
                    }else {

                        self.imgStartHeight = self.windowHeight -self.footerHeight;
                        self.imgStartWidth = self.imgStartHeight*imgProportion;
                        self.imgLeft = (window.innerWidth - self.imgStartWidth)/2;
                        self.imgTop = 0;
                    }
                }

                //计算裁剪框的宽高和位置
                if(self.cutWarpH != undefined && self.cutWarpW != undefined ){
                    self.cutStartHeight = self.cutWarpRatio*self.windowWidth;
                    self.cutStartWidth = self.windowWidth;
                    self.cutLeft = 0 ;
                    self.cutTop = (self.windowHeight -self.footerHeight - self.cutStartHeight)/2
                }else {
                    self.cutStartHeight = self.imgStartHeight;
                    self.cutStartWidth = self.imgStartWidth;
                    self.cutLeft = self.imgLeft ;
                    self.cutTop = self.imgTop
                }

                //设置预览图片的大小
                self.previewImgStyle = 'height:' + self.imgStartHeight + 'px;left:' + self.imgLeft + 'px;width:' + self.imgStartWidth +'px;top:' + self.imgTop + 'px';
                //设置裁剪框的大小
                self.cutWarpStyle = 'height:' + self.cutStartHeight + 'px;left:' + self.cutLeft + 'px;width:' +self.cutStartWidth + 'px;top:' + self.cutTop +'px';
                //设置透明边框的大小
                self.borderLeftStyle =  'width:'+ self.cutLeft + 'px;height:' + (self.windowHeight - self.footerHeight)  + 'px;left:0;top:0';
                self.borderRightStyle = 'width:' + self.cutLeft + 'px;height:' +  (self.windowWidth - self.footerHeight) + 'px;right:0;bottom:' + self.footerHeight +'px';
                self.borderTopStyle =  'width:' +(self.windowWidth - 2*self.cutLeft)+ 'px;height:' + self.cutTop + 'px;left:0;top:0';
                self.borderBottomStyle = 'width:' +(self.windowWidth - 2*self.cutLeft)+ 'px;height:' + self.cutTop + 'px;left:0;bottom:' + self.footerHeight +'px';
            },
            imgPreview (file) {
                let self = this;
                //去获取拍照时的信息，解决拍出来的照片旋转问题
                Exif.getData(file, function(){
                    self.Orientation = Exif.getTag(this, 'Orientation');
                });

                // 看支持不支持FileReader
                if (!file || !window.FileReader) return;
                if (/^image/.test(file.type)) {
                    // 创建一个reader
                    let reader = new FileReader();
                    // 将图片将转成 base64 格式
                    reader.readAsDataURL(file);
                    // 读取成功后的回调
                    reader.onload = async function () {
                        let result = this.result;
                        let img = new Image();
                        img.src = result;
                        //判断图片是否大于100K,是就直接上传，反之压缩图片
//                        if (this.result.length <= (100 * 1024)) {
//                            self.ImageData = this.result;
//                        }else {
                            img.onload = function () {
//                                console.log(img.width)
//                                let data = self.compress(img,self.Orientation);
                                self.ImageData = img.src;
                            }
//                        }
                    }
                }
            },
            rotateImg (img, direction,canvas) {
                let self = this;
                //最小与最大旋转方向，图片旋转4次后回到原方向
                const min_step = 0;
                const max_step = 3;
                if (img == null)return;
                //img的高度和宽度不能在img元素隐藏后获取，否则会出错
                let height = img.height;
                let width = img.width;
                let step = 2;
                if (step == null) {
                    step = min_step;
                }
                if (direction == 'right') {
                    step++;
                    //旋转到原位置，即超过最大值
                    step > max_step && (step = min_step);
//                    self.rotate -= 90;
//                    self.img.style.webkitTransform = "rotate("+ this.rotate +"deg)"
                } else {
                    step--;
                    step < min_step && (step = max_step);

//                    self.rotate += 90;
//                    self.img.style.webkitTransform = "rotate("+this.rotate+"deg)"
                }
                //旋转角度以弧度值为参数
                let degree = step * 90 * Math.PI / 180;
                let ctx = this.canvas.getContext('2d');
                switch (step) {
                    case 0:
                        this.canvas.width = width;
                        this.canvas.height = height;
                        ctx.drawImage(img, 0, 0);

                        break;
                    case 1:
                        this.canvas.width = height;
                        this.canvas.height = width;
                        ctx.rotate(degree);
                        ctx.drawImage(img, 0, -height);
                        break;
                    case 2:
                        this.canvas.width = width;
                        this.canvas.height = height;
                        ctx.rotate(degree);
                        ctx.drawImage(img, -width, -height);
                        break;
                    case 3:
                        this.canvas.width = height;
                        this.canvas.height = width;
                        ctx.rotate(degree);
                        ctx.drawImage(img, -width, 0);
                        break;
                }
            },
            compress(img,Orientation) {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext('2d');
                //瓦片canvas
                let tCanvas = document.createElement("canvas");
                let tctx = tCanvas.getContext("2d");
                let initSize = img.src.length;
                let width = img.width;
                let height = img.height;
//                console.log(img)
//                console.log(width)
//                console.log(height)
                //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
                let ratio;
                if ((ratio = width * height / 4000000) > 1) {
//                    console.log("大于400万像素")
                    ratio = Math.sqrt(ratio);
                    width /= ratio;
                    height /= ratio;
                } else {
                    ratio = 1;
                }
                canvas.width = width;
                canvas.height = height;
//                console.log(canvas)
                //        铺底色
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                //如果图片像素大于100万则使用瓦片绘制
                let count;

                if ((count = width * height / 1000000) > 1) {
                    console.log("超过100W像素");
                    count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片

                    //计算每块瓦片的宽和高

                    let nw = ~~(width / count);
                    let nh = ~~(height / count);
                    tCanvas.width = nw;
                    tCanvas.height = nh;
                    for (let i = 0; i < count; i++) {
                        for (let j = 0; j < count; j++) {
                            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                        }
                    }
                } else {
                    ctx.drawImage(img, 0, 0, width, height);
//                    console.log(canvas.toDataURL('image/jpeg', 0.1))
                }
                //修复ios上传图片的时候 被旋转的问题
                if(Orientation != "" && Orientation != 1){
                    switch(Orientation){
                        case 6://需要顺时针（向左）90度旋转
                            this.rotateImg(img,'left',canvas);
                            break;
                        case 8://需要逆时针（向右）90度旋转
                            this.rotateImg(img,'right',canvas);
                            break;
                        case 3://需要180度旋转
                            this.rotateImg(img,'right',canvas);//转两次
                            this.rotateImg(img,'right',canvas);
                            break;
                    }
                }
                //进行最小压缩
                let ndata = canvas.toDataURL('image/jpeg', 0.1);
//                console.log('压缩前：' + initSize);
//                console.log('压缩后：' + ndata.length);
//                console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
                tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
                return ndata;
            },
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    *{
        margin: 0;
        padding: 0;
    }
    .imgLoader{
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height:100%;
        .button{
            height:100%;
            width: 100%;
            label{
                display: block;
                height: 100%;
            }
        }

    }
    .img-cut-page {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #000000;
        z-index: 999;
        .border {
            position: absolute;
            background: rgba(0, 0, 0, 0.6);
            height: 0;
            width: 0;
            z-index: 1000;
            color: #ffffff;
        }
        .img {
            position: absolute;
            left: 0;
            top: 0;
            pointer-events: none;
            z-index: 999;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
            border: 1px solid #00BBFF;
        }
        #cut {
            position: absolute;
            left: 0;
            top: 0;
            box-shadow: 0 0 0 1px #999999;
            z-index: 1000;
        }
        #myCanvas {
            position: absolute;
            left: 10px;
            bottom: 10px;
            box-shadow: 0 0 0 1px #999999;
        }
        .footer {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 50px;
            background: rgba(66, 66, 66, 0.7);
            z-index: 1000;
            .cancel-btn {
                position: absolute;
                font-size: 14px;
                width: 22.5%;
                height: 100%;
                line-height: 50px;
                left: 5%;
                color: #FFFFFF;
            }
            .cut-btn {
                position: absolute;
                font-size: 14px;
                width: 22.5%;
                height: 100%;
                line-height: 50px;
                text-align: right;
                right: 5%;
                color: #FFFFFF;
                top: 0;
            }
            .rotate-left {
                position: absolute;
                font-size: 14px;
                height: 26px;
                line-height: 50px;
                text-align: center;
                width: 26px;
                top: 14px;
                right: 52%;
                color: #FFFFFF;
                transform: scaleX(-1);
                -webkit-transform: scaleX(-1);
                &::before {
                    position: absolute;
                    content: '';
                    top: 0px;
                    right: 0;
                    height: 20px;
                    width: 20px;
                    border-radius: 30px;
                    border: 3px solid #FFFFFF;
                    border-top: 3px solid transparent;
                    transform: rotate(45deg);
                }
                &::after {
                    position: absolute;
                    content: '';
                    height: 0;
                    top: -6px;
                    right: 0;
                    width: 0;
                    background: transparent;
                    border-bottom: 7px solid #FFFFFF;
                    border-left: 7px solid transparent;
                    border-top: 7px solid transparent;
                    border-right: 7px solid transparent;
                    transform: rotate(90deg);
                }
            }
            .rotate-right {
                position: absolute;
                font-size: 14px;
                height: 26px;
                line-height: 50px;
                text-align: center;
                width: 26px;
                top: 14px;
                left: 52%;
                color: #FFFFFF;
                &::before {
                    position: absolute;
                    content: '';
                    top: 0px;
                    right: 0;
                    height: 20px;
                    width: 20px;
                    border-radius: 30px;
                    border: 3px solid #FFFFFF;
                    border-top: 3px solid transparent;
                    transform: rotate(45deg);
                }
                &::after {
                    position: absolute;
                    content: '';
                    height: 0;
                    top: -6px;
                    right: 0;
                    width: 0;
                    background: transparent;
                    border-bottom: 7px solid #FFFFFF;
                    border-left: 7px solid transparent;
                    border-top: 7px solid transparent;
                    border-right: 7px solid transparent;
                    transform: rotate(90deg);
                }
            }
        }
    }

</style>
