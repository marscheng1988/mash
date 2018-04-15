/**
 * 依赖zepto.js
 */

/**
 * zf工具类
 * @AuthorHTL 杨晓辉
 * @DateTime  2016-09-09T16:06:59+0800
 * @version   1.0.0
 * @param     {[Object]}                 $      [zepto]
 * @param     {[Object]}                 window [window]
 */
(function($,w){

	/**检测类**/
	/**
	 * isNull 非空检测
	 * @AuthorHTL 杨晓辉
	 * @DateTime  2016-09-09T16:34:30+0800
	 * @version   1.0.0
	 * @param     {[string]}                 val 	[检测值]
	 * @return    {Boolean}                    		[true 为空，false为非空]
	 */
	function isNull(val){
		if(typeof(this.val)=="function")
			val = this.val()
		if(val==null||val.length<=0)
			return true;
		return false;
	}
	$.fn.isNull=isNull;
	$.isNull=isNull;
	w.isNull=isNull;

	/**
	 * 数字检测
	 * @AuthorHTL 杨晓辉
	 * @DateTime  2016-09-09T16:55:14+0800
	 * @version   1.0.0
	 * @param     {[type]}                 val [description]
	 * @return    {Boolean}                    [description]
	 */
	function isNumber(val){
		if(typeof(this.val)=="function")
			val = this.val()
		if(!isNull(val)&&(/^[0-9]*$/.test(val)||/^\-[1-9][0-9]*$/.test(val)))
        	return true;
        return false;
	}
	$.fn.isNumber=isNumber;
	$.isNumber=isNumber;
	w.isNumber=isNumber;

	/**
	 * 整数检测
	 * @AuthorHTL 杨晓辉
	 * @DateTime  2016-09-09T16:48:22+0800
	 * @version   1.0.0
	 * @param     {[string]}                 val 	[检测值]
	 * @return    {Boolean}                			[true 是，false否]
	 */
	function isInteger(val){
		if(typeof(this.val)=="function")
			val = this.val()
		if(!isNull(val)&&(/^\+?[1-9][0-9]*$/.test(val)||/^\-[1-9][0-9]*$/.test(val)))
        	return true;
		return false;
	}
	$.fn.isInteger=isInteger;
	$.isInteger=isInteger;
	w.isInteger=isInteger;

	/**
	 * 浮点数检测
	 * @AuthorHTL 杨晓辉
	 * @DateTime  2016-09-09T16:48:22+0800
	 * @version   1.0.0
	 * @param     {[string]}                 val 	[检测值]
	 * @return    {Boolean}                			[true 是，false否]
	 */
	function isFloat(val){
		if(typeof(this.val)=="function")
			val = this.val()
		if(!isNull(val)&&/^(-?\d+)(\.\d+)?$/.test(val))
        	return true;
		return false;
	}
	$.fn.isFloat=isFloat;
	$.isFloat=isFloat;
	w.isFloat=isFloat;

	/**
	 * 货币格式检测
	 * @AuthorHTL 杨晓辉
	 * @DateTime  2016-09-09T16:48:22+0800
	 * @version   1.0.0
	 * @param     {[string]}                 val 	[检测值]
	 * @return    {Boolean}                			[true 是，false否]
	 */
	function isMoney(val){
		if(typeof(this.val)=="function")
			val = this.val()
		if(!isNull(val)&&(/^\d+.?\d{0,2}$/.test(val)))
        	return true;
		return false;
	}
	$.fn.isMoney=isMoney;
	$.isMoney=isMoney;
	w.isMoney=isMoney;

	/**
	 * 电话号码格式检测 11位数字，以1开头
	 * @AuthorHTL 杨晓辉
	 * @DateTime  2016-09-09T16:48:22+0800
	 * @version   1.0.0
	 * @param     {[string]}                 val 	[检测值]
	 * @return    {Boolean}                			[true 是，false否]
	 */
	function isPhone(val){
		if(typeof(this.val)=="function")
			val = this.val()
		if(!isNull(val)&& /^1\d{10}$/.test(val))
        	return true;
		return false;
	}
	$.fn.isPhone=isPhone;
	$.isPhone=isPhone;
	w.isPhone=isPhone;

	/**
	 * eamil格式检测
	 * @AuthorHTL 杨晓辉
	 * @DateTime  2016-09-09T16:48:22+0800
	 * @version   1.0.0
	 * @param     {[string]}                 val 	[检测值]
	 * @return    {Boolean}                			[true 是，false否]
	 */
	function isEmail(val){
		if(typeof(this.val)=="function")
			val = this.val()
		if(!isNull(val)&&/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(val))
        	return true;
		return false;
	}
	$.fn.isEmail=isEmail;
	$.isEmail=isEmail;
	w.isEmail=isEmail;
	
	/**
	 * 字符长度检测
	 * @AuthorHTL 杨晓辉
	 * @DateTime  2016-09-09T16:48:22+0800
	 * @version   1.0.0
	 * @param     {[string]}                 lengthNum 	[要求长度]
	 * @param     {[string]}                 val 		[检测值]
	 * @return    {Boolean}                				[true 是，false否]
	 */
	function isLength(minlength,maxlength,val){
		if(typeof(this.val)=="function")
			val = this.val()
//		val=val+"";
		if(!isNull(val)&&val.length>=minlength&&val.length<=maxlength)
        	return true;
		return false;
	}
	$.fn.isLength=isLength;
	$.isLength=isLength;
	w.isLength=isLength;
	
	/**
	 * 简单密码监测
	 * @AuthorHTL 程浩
	 * @DateTime  2016-09-09T16:48:22+0800
	 * @version   1.0.0
	 * @param     {[string]}                 val 		[检测值]
	 * @return    {Boolean}                				[true 是，false否]
	 */
	function isSimple(val){
		if(typeof(this.val)=="function")
			val = this.val()
		if(val==123456||val==1234567||val==12345678)
			return true
		return false
	}
	$.fn.isSimple=isSimple;
	$.isSimple=isSimple;
	w.isSimple=isSimple;

	/**
	 * 空格监测
	 * @AuthorHTL 程浩
	 * @version   1.0.0
	 * @param     {[string]}                 val 		[检测值]
	 * @return    {Boolean}                				[true 是，false否]
	 */
	function isSpace(val){
		if(typeof(this.val)=="function")
			val = this.val()
		var reg =/\s/;
		return reg.test(val);
	}
	$.fn.isSpace=isSpace;
	$.isSpace=isSpace;
	w.isSpace=isSpace;
	/**字符串处理**/
	

	/**时间处理**/

	/**
	 * 获取时间戳
	 * @AuthorHTL 杨晓辉
	 * @DateTime  2016-09-23T09:43:38+0800
	 * @version   2.0.0
	 * @return    {[type]}                 [description]
	 */
	Date.prototype.Timestamp=function(timestamp){
		if(timestamp!=null)
			return new Date(timestamp);
		return Date.parse(new Date());
	}

	/**
	 * 扩展Date,让date支持格式化时间
	 * @AuthorHTL 杨晓辉
	 * @DateTime  2016-09-23T09:55:49+0800
	 * @version   2.0.0
	 * @param     {[type]}                 fmt       [支持参数 yyyy-MM-dd hh:mm:ss，yyyy-M-d h:m:s]
	 * @param     {[type]}                 timestamp [description]
	 * 调用：
     * var time1 = new Date().Format("yyyy-MM-dd");
     * var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");
     */
	Date.prototype.Format = function (fmt,timestamp) {
		var date=this;
		if(timestamp!=null)
			date=new Date(timestamp);
	    var o = {
	        "M+": date.getMonth() + 1, //月份
	        "d+": date.getDate(), //日
	        "h+": date.getHours(), //小时
	        "m+": date.getMinutes(), //分
	        "s+": date.getSeconds(), //秒
	        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
	        "S": date.getMilliseconds() //毫秒
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	}

	/**
	 * 取时间差值，date2-date1返回毫秒数
	 * @AuthorHTL 杨晓辉
	 * @DateTime  2016-09-23T10:02:51+0800
	 * @version   2.0.0
	 * @param     {[type]}                 date1 [description]
	 * @param     {[type]}                 date2 [description]
	 */
	Date.prototype.IMSUB=function(date1,date2){
		var timestamp1 = new Date(date1.replace(/-/g,'/')).getTime();
		var timestamp2 = new Date(date2.replace(/-/g,'/')).getTime();
		return timestamp2-timestamp1;
	}

	/**
	 * 时间转天数、小时数、分钟数、秒数
	 * 返回对象 obj.day、obj.hours、obj.minutes、obj.seconds
	 * @AuthorHTL 杨晓辉
	 * @DateTime  2016-09-23T17:53:44+0800
	 * @version   2.0.0
	 * @param     {[type]}                 fmt [description]
	 */
	Date.prototype.Decode=function(timestamp){
		var days=Math.floor(timestamp/(24*3600*1000));
		var leave1=timestamp%(24*3600*1000)
		var hours=Math.floor(leave1/(3600*1000))
		var leave2=leave1%(3600*1000)
		var minutes=Math.floor(leave2/(60*1000))
		var leave3=leave2%(60*1000)
		var seconds=Math.round(leave3/1000)
		var o={
			"day":days,
			"hours":hours,
			"minutes":minutes,
			"seconds":seconds
		}
		return o;
	}

    /**
	 * 金额格式化
	 * 调用：fmoney("12345.675910", 3)，返回12,345.676
     */
    function fmoney(s, n)
    {
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(),
            r = s.split(".")[1];
        t = "";
        for(i = 0; i < l.length; i ++ )
        {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    }
    $.fn.fmoney=fmoney;
    $.fmoney=fmoney;
    w.fmoney=fmoney;
})(window.Zepto,window);