/**
 * 依赖zepto.js
 */

/**
 * 自定义控件相关
 * @AuthorHTL 杨晓辉
 * @DateTime  2016-08-25T15:04:29+0800
 * @version   1.0.0
 */
(function($,w){

	/**
	 * 确认提示
	 * @AuthorHTL 杨晓辉
	 * @DateTime  2016-09-10T10:09:14+0800
	 * @version   1.0.0
	 * 依赖 		  components/notification/notification.css
	 * @param     {string}                 tipStr      	[提示文字, 如果有换行的可以用 || 隔开]
	 * @param     {function}               callBack 	[回调]
	 * @param     {string}                 title 		[标题]
	 * @param     {string}                 btnStr 		[按钮文字]
	 */
	function alertX(tipStr,callBack, title, btnStr){

		if($('#notification').length > 0){
			console.log('有弹框正在显示中...');
			return;
		}
		var titleHtml = '',
			contentHtml = '',
			btnHtml = '';

		if(title){
			titleHtml = '<div class="n-title">' + title + '</div>';
		}
		if(tipStr){
			var strArray = tipStr.split('||');
			contentHtml = '<div class="content">';
			for(var i = 0; i < strArray.length; i++){
				if(strArray[i]){
					contentHtml += '<div class="n-info">' + strArray[i] + '</div>';
				}
			}
			contentHtml += '</div>';
		}else{
			contentHtml = '<div class="content"><div class="n-info">确定？</div></div>';
		}

		if(!btnStr){
			btnStr = '确定';
		}
		btnHtml = '<div class="n-btn-group">'
			+'<button class="n-btn btn-1">' + btnStr + '</button>'
			+'</div>';

		var notification = '<div id="notification">'
			+'<div class="n-body">' + titleHtml + contentHtml + btnHtml
			+'</div>'
			+'</div>';

		$('body').append(notification);

		$('#notification .n-btn-group .n-btn.btn-1').on('tap', function(){
			if(callBack){
				callBack();
			}
			$('#notification').remove();
		})
	}
	$.alertX=alertX;

	/**
	 * 是否提示
	 * @AuthorHTL 杨晓辉
	 * @DateTime  2016-09-10T10:16:33+0800
	 * @version   1.0.0
	 * 依赖 		  components/notification/notification.css
	 * @param     {string}                 tipStr          [提示内容, 如果有换行的可以用 || 隔开]
	 * @param     {function}               successCallBack [确定回调]
	 * @param     {function}               cancelCallBack  [取消回调]
	 * @param     {string}                 title 		   [标题]
	 * @param     {string}                 btnStr 		   [按钮文字,两个按钮文字用||分隔 ,例：取消||确定（左边的按钮绑定cancelCallBack，）]
	 */
	function confirmX(tipStr,successCallBack,cancelCallBack, title, btnStr){

		if($('#notification').length > 0){
			console.log('有弹框正在显示中...');
			return;
		}
		var titleHtml = '',
			contentHtml = '',
			btnHtml = '';

		if(title){
			titleHtml = '<div class="n-title">' + title + '</div>';
		}
		if(tipStr){
			var strArray = tipStr.split('||');
			contentHtml = '<div class="content">';
			for(var i = 0; i < strArray.length; i++){
				if(strArray[i]){
					contentHtml += '<div class="n-info">' + strArray[i] + '</div>';
				}
			}
			contentHtml += '</div>';
		}else{
			contentHtml = '<div class="content"><div class="n-info">确定？</div></div>';
		}

		if(!btnStr){
			btnStr = '取消||确定';
		}
		var btnStrArray = btnStr.split('||');
		btnHtml = '<div class="n-btn-group">'
			+'<button class="n-btn btn-1">' + btnStrArray[0] + '</button>'
			+'<button class="n-btn btn-2">' + btnStrArray[1] + '</button>'
			+'</div>';

		var notification = '<div id="notification">'
			+'<div class="n-body">' + titleHtml + contentHtml + btnHtml
			+'</div>'
			+'</div>';

		$('body').append(notification);

		$('#notification .n-btn-group .n-btn.btn-1').on('tap', function(){
			if(cancelCallBack){
				cancelCallBack();
			}
			$('#notification').remove();
		});

		$('#notification .n-btn-group .n-btn.btn-2').on('tap', function(){
			if(successCallBack){
				successCallBack();
			}
			$('#notification').remove();
		})
	}
	$.confirmX=confirmX;

	/**
	 * 提示功能
	 * 显示提示，3秒后自动消失，包含遮罩
	 * @AuthorHTL 杨晓辉
	 * @DateTime  2016-09-10T11:03:42+0800
	 * @version   2.0.0
	 * 依赖 		  components/notification/notification.css
	 * @param     {[string]}                 tipStr   [提示文字]
	 * @param     {[string]}               icontype [图标样式，正确为：right，错误为：wrong]
	 */
	function tip(tipStr,icontype,callBack){
		var tipDOM="<div id=\"tipPanel\" class=\"tipPanel\" >"+
					"<div class=\"mask\"></div>"+
					"<div class=\"black-tip\" >"+
						"<span class=\"tipText\" id=\"tip-text\">"+tipStr+"</span>"+
					"</div>"+
				"</div>";
		$("body").append(tipDOM);
		if(icontype){
			$(".tipText").before("<i class=\"iconfont "+icontype+"\" id=\"tip-icon\"></i>")
		}
		setTimeout(function(){
			$("body #tipPanel").remove();
			if(typeof callBack === 'function') callBack();
		},2000);
	}
	$.tip=tip;

	/**
	 * 扩展输入框，让输入框包含clear功能，$("#inputId").inputX()
	 * @AuthorHTL 杨晓辉
	 * @DateTime  2016-09-10T11:06:40+0800
	 * @version   2.0.0
	 * 依赖 		  baseConfig/common.css
	 * @return    {[type]}                 [description]
	 */
	function inputX(){
		//$(this)为当前输入框对象
		//获取输入框位置，在输入框尾部追加悬浮clear操作按钮
		//按钮绑定tap事件，清空   输入框内容
		var $this = $(this),
			clearBtnHtml = '<div class="input-clear-btn" hidden></div>',
			parent = $this.parent();
		parent.append(clearBtnHtml);
		var clearBtn = $('.input-clear-btn', parent);
		$this.on('focus input', function(){
			if($this.val()){
				clearBtn.show();
			}else{
				clearBtn.hide();
			}
		});
		$this.on('blur', function(){
			clearBtn.hide();
		});
		clearBtn.on('tap', function(){
			$this.val('');
			$this.focus();
		});

	}
	$.fn.inputX=inputX;

	/**
	 * 拍照选择面板控件
	 * @AuthorHTL 杨晓辉
	 * @DateTime  2016-09-10T10:40:20+0800
	 * @version   1.0.0
	 */
	function PhotoPanel(){
		//构造panel做相关初始化
		this.panel="<div></div>"
	}
	PhotoPanel.prototype.show=function(){
		//显示panel，通过this.panel的方式访问
	}
	PhotoPanel.prototype.hide=function(){
		//关闭panel，通过this.panel的方式访问
	}
	$.PhotoPanel=new PhotoPanel();
	
	/**
	 * [图片加载器，图片的真实地址需配置为data-src]
	 * @AuthorHTL 杨晓辉
	 * @DateTime  2016-10-25T15:23:00+0800
	 * @version   2.0.0
	 * @param     {[type]}                 imgObj   [图片对象，JS原生对象]
	 * @param     {[type]}                 callBack [图片下载成功回调]
	 */
	function ImgLoading(imgObj,callBack){
		var src=imgObj.getAttribute("data-src");
		var img=new Image();
		img.src=src;
		img.onload=function(){
			imgObj.setAttribute("src",src);
			if(callBack!=null)
				callBack();
		}
	}
	w.ImgLoading=ImgLoading;
	
})(window.Zepto,window);
