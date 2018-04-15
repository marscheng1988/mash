/**
 * isNull 非空检测
 * @AuthorHTL 杨晓辉
 * @DateTime  2016-09-09T16:34:30+0800
 * @version   1.0.0
 * @param     {[string]}                 val 	[检测值]
 * @return    {Boolean}                    		[true 为空，false为非空]
 */
const isNull = function(val){
    if(val==null||val.length<=0){
        return true;
    }
    return false;
};

/**
 * 数字检测
 * @AuthorHTL 杨晓辉
 * @DateTime  2016-09-09T16:55:14+0800
 * @version   1.0.0
 * @param     {[type]}                 val [description]
 * @return    {Boolean}                    [description]
 */
const isNumber = function (val){

    if(!isNull(val)&&(/^[0-9]*$/.test(val)||/^\-[1-9][0-9]*$/.test(val)))
        return true;
    return false;
};


/**
 * 整数检测
 * @AuthorHTL 杨晓辉
 * @DateTime  2016-09-09T16:48:22+0800
 * @version   1.0.0
 * @param     {[string]}                 val 	[检测值]
 * @return    {Boolean}                			[true 是，false否]
 */
const isInteger = function (val){
    if(!isNull(val)&&(/^\+?[1-9][0-9]*$/.test(val)||/^\-[1-9][0-9]*$/.test(val)))
        return true;
    return false;
};

/**
 * 浮点数检测
 * @AuthorHTL 杨晓辉
 * @DateTime  2016-09-09T16:48:22+0800
 * @version   1.0.0
 * @param     {[string]}                 val 	[检测值]
 * @return    {Boolean}                			[true 是，false否]
 */
const isFloat = function isFloat(val){
    if(!isNull(val)&&/^(-?\d+)(\.\d+)?$/.test(val))
        return true;
    return false;
};

/**
 * 货币格式检测
 * @AuthorHTL 杨晓辉
 * @DateTime  2016-09-09T16:48:22+0800
 * @version   1.0.0
 * @param     {[string]}                 val 	[检测值]
 * @return    {Boolean}                			[true 是，false否]
 */
const isMoney = function (val){
    if(!isNull(val)&&(/^\d+.?\d{0,2}$/.test(val)))
        return true;
    return false;
};

/**
 * 电话号码格式检测 11位数字，以1开头
 * @AuthorHTL 杨晓辉
 * @DateTime  2016-09-09T16:48:22+0800
 * @version   1.0.0
 * @param     {[string]}                 val 	[检测值]
 * @return    {Boolean}                			[true 是，false否]
 */
const isPhone = function (val){
    if(!isNull(val)&& /^1\d{10}$/.test(val))
        return true;
    return false;
};

/**
 * eamil格式检测
 * @AuthorHTL 杨晓辉
 * @DateTime  2016-09-09T16:48:22+0800
 * @version   1.0.0
 * @param     {[string]}                 val 	[检测值]
 * @return    {Boolean}                			[true 是，false否]
 */
const isEmail = function (val){
    if(!isNull(val)&&/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(val))
        return true;
    return false;
};

/**
 * 字符长度检测
 * @AuthorHTL 杨晓辉
 * @DateTime  2016-09-09T16:48:22+0800
 * @version   1.0.0
 * @param     {[string]}                 lengthNum 	[要求长度]
 * @param     {[string]}                 val 		[检测值]
 * @return    {Boolean}                				[true 是，false否]
 */
const isLength = function (minlength,maxlength,val){
    if(!isNull(val)&&val.length>=minlength&&val.length<=maxlength)
        return true;
    return false;
};

/**
 * 简单密码监测
 * @AuthorHTL 程浩
 * @DateTime  2016-09-09T16:48:22+0800
 * @version   1.0.0
 * @param     {[string]}                 val 		[检测值]
 * @return    {Boolean}                				[true 是，false否]
 */
const isSimple = function (val){
    if(val==123456||val==1234567||val==12345678)
        return true
    return false
};

/**
 * 空格监测
 * @AuthorHTL 程浩
 * @version   1.0.0
 * @param     {[string]}                 val 		[检测值]
 * @return    {Boolean}                				[true 是，false否]
 */
const isSpace = function (val){
    var reg =/\s/;
    return reg.test(val);
};

/**
 * 金额格式化
 * 调用：fmoney("12345.675910", 3)，返回12,345.676
 */
const fmoney = function(s, n) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    let l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    let t = "";
    for(let i = 0; i < l.length; i ++ )
    {
         t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}
export {isEmail, isFloat, isInteger, isLength, isMoney, isNull, isNumber, isPhone, isSimple, isSpace,fmoney}
