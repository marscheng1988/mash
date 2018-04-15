/**
 * Created by 项磊 on 2016/6/23.
 * 图片裁剪插件 CutImg
 * 依赖 zepto.js 和 exif.js
 */
;(function($, window){

    // 插件定义
    $.fn.CutImg = function (option) {
        var $body = $('body');

        var input = this[0];

        var triggerType = 'click';
        if('ontouchend' in document){
            triggerType = 'tap';
        }

        // 默认参数，可被重写
        var defaults = {
            src: '',    //图片的src
            cutHeight: '',     //剪裁后图片的高度
            cutWidth : '',     //剪裁后图片的宽度
            maxSize: '',
            compressionRatio: '',
            callback: function(canvas){   //确认剪裁后的方法

            },
            beforeCut: function(){
                return true;
            }
        };

        // 插件配置
        var options = $.extend({}, defaults, option);

        var img,    //图片
            fileType,
            fileSize,
            cancelBtn,  //取消按钮
            cutBtn,     //裁剪按钮
            cut,        //裁剪窗口
            cutPage,    //裁剪页面
            rotateLeftBtn,      //左旋按钮（逆时针）
            rotateRightBtn,      //右旋按钮（顺时针）

            //cutHWRatio = options.cutHeight/options.cutWidth,
            cutHWRatio,
            keepOriginalRatio,

            minZoom = 1,    //图片最小的缩放比例（与裁剪框尺寸的比例）
            maxZoom = 3,    //图片最大的缩放比例（与裁剪框尺寸的比例）
            zoom = 1,       //初始化时图片的缩放比例

            dZoom = 0.5,    //放大超过最大比例或者低于最低比例dZoom时，触发回弹效果

            margin = 30,    //裁剪框与窗口的边距
            rotate = 0,      //图片旋转角度

            //图片原始的高度，宽度，高宽比
            naturalHeight,
            naturalWidth,
            imgHWRatio,

            //页脚的高度
            footerHeight  = 50,

            //裁剪框离 窗口顶部、窗口左边 的距离
            marginTop = 0,
            marginLeft = 0,

            //裁剪框的高度、宽度
            startHeight = 0,
            startWidth = 0,

            //窗口的高度、宽度
            windowHeight = $(window).height(),
            windowWidth = $(window).width(),

            //图片的初始高度、宽度
            imgStartHeight ,
            imgStartWidth ,

            //图片旋转后，top和left会发生一定量位移的偏转，计算时要top要加上、left要减去这个偏移量
            startDisplacement,

            //两个手指触摸时接触屏幕的位置
            position1, position2,

            //两个触摸点的距离
            d = 0,

            //图片超过最大缩放系数或者小于最小缩放系数的前一个状态的位置情况
            suitableLeft,
            suitableTop,
            suitableZoom,

            //两个触摸点的中间位置,作为缩放的中心
            zoomCenter,

            //单手手指滑动时的位置
            movePoint,

            //拍摄时相机的旋转角度（ios设备和数码相机等设备才有）
            orientation;

        /**处理图片的方向问题
         * @param {string} img 图片的base64
         * @param {int} dir exif获取的方向信息
         * @param {function} next 回调方法，返回校正方向后的base64
         * */
        var _getImgData = function(img,dir,callback){
            var image = new Image();

            image.onload = function(){
                var degree = 0,
                    drawWidth,
                    drawHeight,
                    width,
                    height;

                drawWidth = this.naturalWidth;
                drawHeight = this.naturalHeight;

                ////以下改变一下图片大小
                //var maxSide = Math.max(drawWidth, drawHeight);
                //if (maxSide > 1024) {
                //    var minSide = Math.min(drawWidth, drawHeight);
                //    minSide = minSide / maxSide * 1024;
                //    maxSide = 1024;
                //    if (drawWidth > drawHeight) {
                //        drawWidth = maxSide;
                //        drawHeight = minSide;
                //    } else {
                //        drawWidth = minSide;
                //        drawHeight = maxSide;
                //    }
                //}

                var canvas = document.createElement('canvas');
                canvas.width = width = drawWidth;
                canvas.height = height = drawHeight;
                var context = canvas.getContext('2d');
                //判断图片方向，重置canvas大小，确定旋转角度，iphone默认的是home键在右方的横屏拍摄方式
                switch(dir){
                    //iphone横屏拍摄，此时home键在左侧
                    case 3:
                        degree = 180;
                        drawWidth = -width;
                        drawHeight = -height;
                        break;
                    //iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
                    case 6:
                        canvas.width = height;
                        canvas.height = width;
                        degree = 90;
                        drawWidth = width;
                        drawHeight = -height;
                        break;
                    //iphone竖屏拍摄，此时home键在上方
                    case 8:
                        canvas.width = height;
                        canvas.height = width;
                        degree = 270;
                        drawWidth = -width;
                        drawHeight = height;
                        break;
                }
                //使用canvas旋转校正
                //console.log( dir + ': drawWidth=' + drawWidth + ',drawHeight=' + drawHeight);
                //alert(dir);
                context.rotate(degree*Math.PI/180);
                context.drawImage(this, 0, 0, drawWidth, drawHeight);

                //返回校正图片
                callback(canvas.toDataURL(fileType));
                $(canvas).remove();
            };
            image.src = img;
        };

        /**input选择触发的事件*/
        var _change = function () {
            var file = input.files[0];
            var picType =input.value;

            if(!/\.(jpg|png|JPG|PNG|JPEG|jpeg)$/.test(picType)){
                $.tip("文件格式必须为jpg和png");
                return false;
            }
            fileSize = file.size;


            fileType = file.type;

            zoom = 1;
            rotate = 0;

            _createElements();
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e){

                var imgData = this.result;

                EXIF.getData(file, function(){
                    EXIF.getAllTags(this);
                    orientation = EXIF.getTag(this, 'Orientation');
                    _getImgData(imgData, orientation, function(base64Data){
                        img[0].onload = function(e){
                            _setSize();
                            _bindEvent();
                        };

                        img[0].src = base64Data;
                    });
                });
            };
        };

        /**初始化函数*/
        var _init = function(){
            if(typeof FileReader==='undefined'){
                input.setAttribute('disabled','disabled');
                alert("抱歉，你的浏览器不支持 FileReader")
            }else{
                if(options.beforeCut){
                    input.onclick = options.beforeCut;
                }
                input.addEventListener('change', _change, false);
            }
        };

        /**生成元素**/
        var _createElements = function(){
            if($('body > .img-cut-page').length > 0){
                $('body > .img-cut-page').remove();
            }

            var cutPageHtml = '<div class="img-cut-page">' +
                '<div class="top border"></div>' +
                '<div class="left border"></div>' +
                '<div class="right border"></div>' +
                '<div class="bottom border"></div>' +
                '<img id="img" src="" class="img">' +
                '<div id="cut"></div>' +
                '<div class="footer">' +
                '<div class="cancel-btn">取消</div>' +
                '<div class="rotate-left"></div>' +
                '<div class="rotate-right"></div>' +
                '<div class="cut-btn">选取</div>' +
                '</div>' +
                '</div>';
            $body.append(cutPageHtml);

            cutPage = $('body > .img-cut-page');
            img = $('body > .img-cut-page > #img');
            cancelBtn = $('body > .img-cut-page > .footer > .cancel-btn');
            cutBtn = $('body > .img-cut-page > .footer > .cut-btn');
            cut = $('body > .img-cut-page > #cut');
            rotateLeftBtn = $('body > .img-cut-page > .footer > .rotate-left');
            rotateRightBtn = $('body > .img-cut-page > .footer > .rotate-right');

        };

        var _setCutHWRatio = function(){
            var imgEl = img[0];
            keepOriginalRatio = true;
            if(rotate === 0 || rotate === 180){
                cutHWRatio = imgEl.naturalHeight/imgEl.naturalWidth;
            }else{
                cutHWRatio = imgEl.naturalWidth/imgEl.naturalHeight;
            }
            if(!option.cutWidth && !option.cutHeight){
                options.cutWidth = imgEl.naturalWidth;
                options.cutHeight = imgEl.naturalHeight;
            }else if(!option.cutWidth && option.cutHeight){
                options.cutHeight = option.cutHeight;
                options.cutWidth = option.cutHeight/cutHWRatio;
            }else if(option.cutWidth && !option.cutHeight){
                options.cutWidth = option.cutWidth;
                options.cutHeight = option.cutWidth*cutHWRatio;
            }else{
                keepOriginalRatio = false;
                cutHWRatio = options.cutHeight/options.cutWidth
            }
        };

        /**设置尺寸*/
        var _setSize= function(){

            _setCutHWRatio();

            /*计算在两种情况下，裁剪框在窗口中的位置（根据原始图片的宽高比例）*/
            if(cutHWRatio*windowWidth >=windowHeight - footerHeight ){
                startHeight = windowHeight-footerHeight - 2*margin;
                startWidth = startHeight/cutHWRatio;
                marginLeft = (windowWidth-startWidth)/2;
                marginTop = margin;
            }else{
                startWidth = windowWidth - 2*margin;
                startHeight = startWidth*cutHWRatio;
                marginTop = (windowHeight-cutHWRatio*windowWidth-footerHeight)/2;
                marginLeft = margin;
            }

            var imageEl = img[0];
            if(rotate === 0 || rotate === 180 ){
                /*获取图片的原始高度、宽度*/
                naturalHeight = imageEl.naturalHeight;
                naturalWidth = imageEl.naturalWidth;

                imgHWRatio = naturalHeight/naturalWidth;  //计算图片的高宽比

            }else if(rotate === 90 || rotate === 270 ){
                /*获取图片的原始高度、宽度*/
                naturalHeight = imageEl.naturalWidth;
                naturalWidth = imageEl.naturalHeight;

                imgHWRatio = naturalHeight/naturalWidth;  //计算图片的高宽比
            }

            //alert('naturalHeight=' + naturalHeight + ',naturalWidth=' + naturalWidth);

            /*计算图片的初始高度、宽度*/
            if(imgHWRatio > cutHWRatio){
                imgStartWidth = startWidth;
                imgStartHeight = imgStartWidth*imgHWRatio;

            }else {
                imgStartHeight = startHeight;
                imgStartWidth = imgStartHeight/imgHWRatio;
            }

            if(rotate !== 0 && rotate !== 90 && rotate !== 180 && rotate !== 270){
                rotate = 0;
            }

            /*设置图片的位置和尺寸*/
            if(rotate === 0 || rotate === 180 ){
                img.attr('width', zoom*imgStartWidth);
                img.attr('height', zoom*imgStartHeight);
                startDisplacement = 0;
            }else if(rotate === 90 || rotate === 270 ){
                img.attr('width', zoom*imgStartHeight);
                img.attr('height', zoom*imgStartWidth);
                startDisplacement = (imgStartHeight-imgStartWidth)/2;
            }
            img.css({
                top: marginTop + (startHeight < imgStartHeight ?(startHeight-imgStartHeight)/2: 0) + zoom*startDisplacement + 'px',
                left: marginLeft + (startWidth < imgStartWidth ?(startWidth-imgStartWidth)/2: 0) - zoom*startDisplacement + 'px'
            });

            /*设置裁剪框的位置和尺寸*/
            cut.css({
                width: startWidth + 'px',
                height: startHeight + 'px',
                top: marginTop + 'px',
                left: marginLeft + 'px'
            });

            /*设置透明边框的宽高*/
            $('body > .img-cut-page > .border.top').css({
                height: marginTop + 'px',
                top: 0,
                left: marginLeft + 'px',
                width: windowWidth - 2*marginLeft + 'px'
            });
            $('body > .img-cut-page > .border.bottom').css({
                height: windowHeight - startHeight - marginTop - footerHeight,
                bottom: footerHeight + 'px',
                left: marginLeft + 'px',
                width: windowWidth - 2*marginLeft + 'px'
            });
            $('body > .img-cut-page > .border.left').css({
                height: windowHeight-footerHeight + 'px',
                left: 0,
                width: marginLeft + 'px'
            });
            $('body > .img-cut-page > .border.right').css({
                height: windowHeight-footerHeight + 'px',
                right: 0,
                width: marginLeft + 'px'
            });
        };

        /**绑定事件**/
        var _bindEvent = function () {
            var events = ['touchstart', 'touchmove', 'touchend'];
            events.forEach(function(event){
                $('body > .img-cut-page')[0].addEventListener(event,_touchFunction, false);
            });

            $(window).resize(function(){
                _setSize();
                _turnBack();
            });

            cancelBtn.on(triggerType, _cancelCut);
            cutBtn.on(triggerType, _cutImg);
            rotateLeftBtn.on(triggerType, _rotate);
            rotateRightBtn.on(triggerType, _rotate);
        };

        /**触屏监听事件**/
        var _touchFunction = function(e) {
            if(e.type === 'touchstart'){
                e.preventDefault();
            }else if(e.type === 'touchmove'){
                e.preventDefault();

                /*两个手指滑动*/
                if(e.targetTouches.length >= 2 || e.touches.length >= 2){
                    movePoint = '';
                    var p1, p2;

                    if(e.targetTouches.length >= 2){
                        p1 = e.targetTouches[0];
                        position1 = [p1.pageX, p1.pageY];

                        p2 = e.targetTouches[1];
                        position2 = [p2.pageX, p2.pageY];
                    }else {
                        p1 = e.touches[0];
                        position1 = [p1.pageX, p1.pageY];

                        p2 = e.touches[1];
                        position2 = [p2.pageX, p2.pageY];
                    }

                    var zoomCenter2 = {x: (p1.pageX + p2.pageX)/2, y:(p1.pageY + p2.pageY)/2 };

                    zoomCenter = zoomCenter2;

                    //根据 a*a + b*b = c*c 计算出两个触摸点的距离（勾股定理）
                    var d1 = Math.sqrt((position1[0]-position2[0])*(position1[0]-position2[0]) + (position1[1]-position2[1])*(position1[1]-position2[1]));

                    if(d === 0){    //当两个触摸点的距离为0时
                        d = d1;
                        zoomCenter = zoomCenter2;
                        return;
                    }

                    var left = img.css('left').replace('px','')-0;
                    var top = img.css('top').replace('px','')-0;

                    /*计算出新的缩放系数*/
                    var newZoom = zoom + (d1-d)*2/startWidth;
                    if(newZoom > maxZoom || newZoom < minZoom){
                        newZoom = zoom + (d1-d)/4*2/startWidth;

                        if(!suitableLeft){
                            suitableLeft = left - 0;
                            suitableTop = top - 0;
                            suitableZoom = zoom - 0;
                        }
                    }else{
                        suitableLeft = '';
                        suitableTop = '';
                        suitableZoom = '';
                    }

                    if(newZoom > maxZoom + dZoom || newZoom < minZoom - dZoom){  //当缩放系数超过规定范围后
                        //d = 0;
                        //zoom = newZoom;
                        //zoomCenter = '';
                        //_turnBack();
                        return;
                    }

                    /*计算图片的left和top，并保证zoomCenter这个点在裁剪框的相对位置保持不变*/
                    left = zoomCenter.x -(-left + zoomCenter.x)*newZoom/zoom;
                    top = zoomCenter.y -(-top + zoomCenter.y)*newZoom/zoom;

                    var width = 0, height = 0;
                    if(rotate === 0 || rotate === 180 ){
                        width = newZoom*imgStartWidth;
                        height = newZoom*imgStartHeight;
                    }else if(rotate === 90 || rotate === 270){
                        width = newZoom*imgStartHeight;
                        height = newZoom*imgStartWidth;
                    }

                    img.css({
                        left: left + 'px',
                        top: top + 'px',
                        width: Math.round( width) + 'px',
                        height: Math.round( height) + 'px'
                    });

                    /*更新缩放系数，两个手指的距离*/
                    zoom = newZoom;
                    d = d1;

                }else if(e.targetTouches.length === 1 ){ //单个手指滑动
                    if(e.changedTouches[0].pageX < 0 || e.changedTouches[0].pageX > windowWidth || e.changedTouches[0].pageY < 0 || e.changedTouches[0].pageY > windowHeight - footerHeight){
                        movePoint = '';
                        _turnBack();
                        return;
                    }
                    if( d === 0){
                        var p = e.targetTouches[0],
                            nowPoint = {
                                x: p.pageX,
                                y: p.pageY
                            };
                        if(movePoint){

                            var left = img.css('left').replace('px','')-0;
                            var top = img.css('top').replace('px','')-0;

                            var dx = nowPoint.x-movePoint.x,
                                dy = nowPoint.y-movePoint.y;

                            /*当图片的滑动使裁剪框里面出现空白内容的时候，图片的滑动速度变为正常速度的3分之一*/
                            if(startWidth + marginLeft - zoom*startDisplacement > left + zoom*imgStartWidth && left < marginLeft - zoom*startDisplacement){
                                dx = dx/3;
                            }
                            if(left > marginLeft - zoom*startDisplacement && left + zoom*imgStartWidth > marginLeft - zoom*startDisplacement + startWidth){
                                dx = dx/3;
                            }
                            if(startHeight + marginTop + zoom*startDisplacement > top + zoom*imgStartHeight && top < marginTop + zoom*startDisplacement){
                                dy = dy/3;
                            }
                            if( top > marginTop + zoom*startDisplacement && top + zoom*imgStartHeight > marginTop + zoom*startDisplacement + startHeight){
                                dy = dy/3;
                            }

                            img.css({
                                left: left + dx + 'px',
                                top: top + dy + 'px'
                            });

                        }
                        movePoint = nowPoint;
                    }
                    d = 0;
                }
            }else if(e.type === 'touchend' ) {
                movePoint = '';
                _turnBack();
            }
        };

        /**取消裁剪*/
        var _cancelCut= function(event){
            cutPage.hide();
        };

        /**旋转*/
        var _rotate = function(event){

            var animateCallback = function(){
                _setSize();
                _turnBack();
            };

            if($(this).hasClass('rotate-left')){
                if(rotate - 90 < 0){
                    img.css('transform', 'rotate(360deg)');
                }
                rotate = rotate - 90 < 0 ? rotate + 360 - 90 : rotate - 90;
            }else {
                if(rotate + 90 >= 360){
                    img.css('transform', 'rotate(-90deg)');
                }
                rotate = rotate + 90 >= 360 ? rotate - 360 + 90 : rotate + 90;
            }

            //img.animate({
            //    'transform': 'rotate(' + (rotate ) + 'deg)'
            //}, 200, 'linear', animateCallback);

            img.css({
                'transform': 'rotate(' + (rotate ) + 'deg)',
                '-webkit-transform': 'rotate(' + (rotate ) + 'deg)'
            });
            setTimeout(animateCallback, 200);
        };

        /**
         * 当滑动结束时，图片滑动到合适的位置：
         * */
        var _turnBack = function(){
            var width = zoom*imgStartWidth,
                height = zoom*imgStartHeight,
                left = img.css('left').replace('px','') - 0,
                top = img.css('top').replace('px','') - 0,
                displacement = zoom*startDisplacement;

            var dLeft = 0, dRight = 0, dTop = 0, dBottom = 0;

            var styles = {};

            if(zoom > maxZoom || zoom < minZoom){
                zoom = suitableZoom;

                if(rotate === 0 || rotate === 180 ){
                    styles.width = zoom*imgStartWidth + 'px';
                    styles.height = zoom*imgStartHeight + 'px';
                }else if(rotate === 90 || rotate === 270){
                    styles.width = zoom*imgStartHeight + 'px';
                    styles.height = zoom*imgStartWidth + 'px';
                }

                //styles.width = zoom*imgStartWidth + 'px';
                //styles.height = zoom*imgStartHeight + 'px';

                styles.left = suitableLeft + 'px';
                styles.top = suitableTop + 'px';

                img.animate(styles, 300, 'swing');

            }else {
                if(marginLeft - displacement  < left ){
                    dLeft = left - (marginLeft -displacement);
                }
                if( marginLeft - displacement - left + startWidth > width){
                    dRight = marginLeft - displacement + startWidth - width - left;
                }

                if(marginTop + displacement < top){
                    dTop = top - (marginTop + displacement);
                }else if(marginTop + displacement - top + startHeight > height){
                    dBottom = marginTop + displacement + startHeight - height - top;
                }

                if(dLeft > 0 && dRight === 0){
                    styles.left = marginLeft - zoom*startDisplacement;

                }else if(dLeft === 0 && dRight > 0){
                    styles.left = startWidth + marginLeft - zoom*startDisplacement - zoom*imgStartWidth;
                }

                if(dTop > 0 && dBottom === 0){
                    styles.top = marginTop + zoom*startDisplacement;

                }else if(dTop === 0 && dBottom > 0){
                    styles.top = startHeight + marginTop + zoom*startDisplacement - zoom*imgStartHeight;

                }

                if( styles.left || styles.top || styles.width){
                    img.animate(styles, 300, 'swing');
                }
            }

            d = 0;
            zoomCenter = '';
            suitableLeft = '';
            suitableTop = '';
            suitableZoom = '';
        };

        /**裁剪图片*/
        var _cutImg = function(event){
            //设置裁剪框的宽度和高度
            var html = '<canvas id="myCanvas"></canvas>';

            cutPage.append(html);

            var myCanvas = document.getElementById("myCanvas");

            if(options.maxSize && options.maxSize < fileSize){
                var radio = Math.pow(fileSize/options.maxSize, 2/3);

                var maxCutWidth,
                    maxCutHeight,
                    imgEl = img[0];

                if(rotate === 0 || rotate === 180){
                    maxCutWidth = imgEl.naturalWidth/radio;
                    maxCutHeight = imgEl.naturalHeight/radio;
                }else{
                    maxCutWidth = imgEl.naturalHeight/radio;
                    maxCutHeight = imgEl.naturalWidth/radio;
                }

                if(options.cutWidth > maxCutWidth || options.cutHeight > maxCutHeight){
                    options.cutWidth = maxCutWidth;
                    options.cutHeight = maxCutHeight;
                }
            }

            $(myCanvas).attr('width', options.cutWidth);
            $(myCanvas).attr('height', options.cutHeight);

            var ctx = myCanvas.getContext('2d');

            var width = zoom*imgStartWidth,
                height = zoom*imgStartHeight,
                left = img.css('left').replace('px','')- 0,
                top = img.css('top').replace('px','')-0,
                displacement = zoom*startDisplacement;

            var imgX, imgY,
                dWidth, dHeight,
                canvasX, canvasY,
                canvasImgWidth, canvasImgHeight;

            if(rotate === 0){

                var pLeft = (marginLeft - displacement - left)/width;
                    pTop = (marginTop + displacement - top)/height,
                    pCutW = startWidth/width,
                    pCutH = startHeight/height;

                imgX = (0*1 + 0*pCutW  + 1*pLeft)*naturalWidth;
                imgY = (0*1 + 0*pCutH  + 1*pTop)*naturalHeight;

                dWidth = pCutW*naturalWidth;
                dHeight = pCutH*naturalHeight;

                canvasX = 0;
                canvasY = 0;

                canvasImgWidth = options.cutWidth;
                canvasImgHeight = options.cutHeight;

                ctx.translate(options.cutWidth*0 ,options.cutHeight*0);

            }else if(rotate === 90){

                var pLeft = (marginLeft - displacement - left)/width,
                    pTop = (marginTop + displacement - top)/height,
                    pCutW = startWidth/width,
                    pCutH = startHeight/height;

                imgX = (0*1 + 0*pCutH  + 1*pTop)*naturalHeight;
                imgY = (1*1 + (-1)*pCutW  + (-1)*pLeft)*naturalWidth;

                dWidth = pCutH*naturalHeight;
                dHeight = pCutW*naturalWidth;

                canvasX = 0;
                canvasY = 0;

                canvasImgWidth = options.cutHeight;
                canvasImgHeight = options.cutWidth;

                ctx.translate(options.cutWidth*1 , options.cutHeight*0);//把当前画布的原点移到该坐标点

            }else if(rotate === 180){

                var pLeft = (marginLeft - displacement - left)/width,
                    pTop = (marginTop + displacement - top)/height,
                    pCutW = startWidth/width,
                    pCutH = startWidth/height;

                imgX = (1*1 + (-1)*pCutW  + (-1)*pLeft)*naturalWidth;
                imgY = (1*1 + (-1)*pCutH  + (-1)*pTop)*naturalHeight;

                dWidth = pCutW*naturalWidth;
                dHeight = pCutH*naturalHeight;

                canvasX = 0;
                canvasY = 0;

                canvasImgWidth = options.cutWidth;
                canvasImgHeight = options.cutHeight;

                ctx.translate(options.cutWidth*1 , options.cutHeight*1);//把当前画布的原点移到该坐标点

            }else if(rotate === 270){

                var pLeft = (marginLeft - displacement - left)/width,
                    pTop = (marginTop + displacement - top)/height,
                    pCutW = startWidth/width,
                    pCutH = startHeight/height;

                imgX = (1*1 + (-1)*pCutH  + (-1)*pTop)*naturalHeight;
                imgY = (0*1 + (0)*pCutW  + 1*pLeft)*naturalWidth;

                dWidth = pCutH*naturalHeight;
                dHeight = pCutW*naturalWidth;

                canvasX = 0;
                canvasY = 0;

                canvasImgWidth = options.cutHeight;
                canvasImgHeight = options.cutWidth;

                ctx.translate(options.cutHeight*0 , options.cutHeight*1);//把当前画布的原点移到该坐标点
            }

            ctx.rotate(rotate * Math.PI / 180);//旋转

            //alert('imgX=' + imgX + ',imgY=' +imgY + ',dWidth=' + dWidth + ',dHeight=' + dHeight);

            if(imgX < 0){
                imgX = 0;
            }
            if(imgY < 0){
                imgY = 0;
            }

            if(canvasX < 0){
                canvasX = 0;
            }
            if(canvasY < 0){
                canvasY = 0;
            }


            ctx.drawImage(img[0], imgX, imgY,dWidth , dHeight, canvasX, canvasY, canvasImgWidth, canvasImgHeight);

            ctx.save();

            options.callback(myCanvas.toDataURL(fileType, options.compressionRatio || 0.92));

            _cancelCut();

            // dataURL 的格式为 “data:image/png;base64,****”,逗号之前都是一些说明性的文字，我们只需要逗号之后的就行了
            //data = data.split(',')[1];
            //data = window.atob(data);
            //var ia = new Uint8Array(data.length);
            //for (var i = 0; i < data.length; i++) {
            //    ia[i] = data.charCodeAt(i);
            //};
            //
            //// canvas.toDataURL 返回的默认格式就是 image/png
            //var blob = new Blob([ia], {type:"image/png"});
            //
            //var fd = new FormData();
            //
            //fd.append('file', blob);
            //$.ajax({
            //    url:"your.server.com",
            //    type:"POST",
            //    data:fd,
            //    success:function(){}
            //});
        };

        //启用插件
        _init();

        // 链式调用
        return this;
    };
    // 插件结束
})($, window);
