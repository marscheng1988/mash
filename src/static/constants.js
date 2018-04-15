const Status = {
    SUCCESS:1,
    ERROR:0,
    MEMBER_NOTEXIST:4,
    PARAMETER_ERROR:22,
    API_ERROR_TIME:23,
    SMS_REQUEST_ERROR:25,
    NOTFIND:404,
    SYSERROR:500,
    PARAMETER_ISNULL:16,
    NOT_LOGIN:21,
    USERCODE_ERROR:201,
    USERCODE_EXIST:202,
    SMSCODE_ERROR:203,
    REPWD_ERROR:204,
    REPWD_LENGTH_ERROR:205,
    USERCODE_NOT_EXIST:206,
    OLD_PASSWORD_ERROR:207,
    EDIT_PASSWORD_SUCCESS:208,
    ATTENTIONI_IS_NO : 209,
    IDCARD_UPLOAD_NULL:210,
    IDCARD_COMPLETE:211,
    IDCARD_FORMAT_ERROR:212,
    MOBILE_EXIST:213,
    ACCOUNTS_FREEZE:214,
    ACCOUNTS_LIMIT:215,
    NEW_PASSWORD_EXIST:216,
    OPENID_ERROR:217,
    SUBSCRIBE_CANCEL_ERROR:218,
    WECHATRECORD_SAVE_ERROR:219,
    SUBSCRIBE_REGISTER_ERROR:220,
    VALIDATECODE_ERROR:221,
    VALIDATECODE_NULL:222,
    NICKNAME_EXIST:223,
    NICKNAME_SPECIAL_WORD:224,
    SIGN_SPECIAL_WORD:225,
    INVITECODE_ERROR:230,
    INVITECODE_UNMATCH:231,
    INVITECODE_IS_NULL: 232,
    OUT_OF_STOCK: 241,		//库存不足
    HIRE_DATE_DIFFERENT:261,	//租期不同的产品不能一起下单
    SERVICELEVEL_ISNULL:262,
    DELIVERYLEVEL_ISNULL:263,
    ORDER_JUDGE_DISABLE:264,
    HIRESTARTDATE_NOT_VAILD:265,	//订单起租时间小于当前时间即已过期
    SAME_ORDER_ERROR: 267,		//订单重复提交
    COLLOCATIONCOLLECT_OUT_SIZE:331,  //收藏超出上限
    TODAY_ALREADY_SIGN: 341,    //今天已签到
    POINTGOODS_OFF_SHELVE:351,  //积分商城商品已下架
    POINTGOODS_OUT_STOCK:352,   //积分商城商品库存不足
    POINT_OUT:353,              //积分不足
    ORDER_OUT_DATE:503,         //订单超期
    REMIND_ALREADY_EXIST: 601,/**已有到货提醒**/
    PAY_ERROR: 4000,    //支付错误
};
export default{
    install: function(Vue, options){
        Vue.prototype.tipStatus = function(status){
            status=parseInt(status);
            switch(status){
                case Status.NOTFIND:
                    this.$root.tip("您访问的地址被程序猿吃掉了!0_0!", "", "no")
                    break;
                case Status.SYSERROR:
                    this.$root.tip("哇！系统出错了,妈咪妈咪哄召唤攻城师！！", "", "no")
                    break;
                case Status.PARAMETER_ERROR:
                    this.$root.tip("请求参数错误! ", "", "no")
                    break;
                case Status.API_ERROR_TIME:
                    this.$root.tip("请求时间过短! ", "", "no")
                    break;
                case Status.SMS_REQUEST_ERROR:
                    this.$root.tip("请求验证码失败! ", "", "no")
                    break;
                case Status.SUCCESS:
                    this.$root.tip("操作成功!", "", "no")
                    break;
                case Status.ERROR:
                    this.$root.tip("操作失败!", "", "no")
                    break;
                case Status.PARAMETER_ISNULL:
                    this.$root.tip("必填项不能为空!", "", "no")
                    break;
                case Status.SMSCODE_ERROR:
                    this.$root.tip("验证码错误!", "", "no")
                    break;
                case Status.USERCODE_ERROR:
                    this.$root.tip("用户名或密码不正确!", "", "no")
                    break;
                case Status.USERCODE_EXIST:
                    this.$root.tip("用户名已存在,请登录!", "", "no")
                    break;
                case Status.REPWD_ERROR:
                    this.$root.tip("两次密码输入不一致!", "", "no")
                    break;
                case Status.REPWD_LENGTH_ERROR:
                    this.$root.tip("密码长度为6~16位且不能过于简单!", "", "no")
                    break;
                case Status.NOT_LOGIN:
                    this.$root.tip("没有登陆", "", "no")
                    this.$root.confirm("您还没有登陆，现在登陆？",function (type) {
                        if(type === "0", "", "no") {
                            history.go(-1)
                        }else {
                            this.$root.pushView("/signIn", "", "no")
                        }
                    });
                    break;
                case Status.USERCODE_NOT_EXIST:
                    this.$root.tip("您的手机号还未注册!", "", "no")
                    break;
                case Status.OLD_PASSWORD_ERROR:
                    this.$root.tip("原密码输入错误!", "", "no")
                    break;
                case Status.ATTENTIONI_IS_NO:
                    this.$root.tip("不存在关注的人物!", "", "no")
                    break;
                case Status.EDIT_PASSWORD_SUCCESS:
                    this.$root.tip("密码修改成功,请重新登录!", "", "no")
                    break;
                case Status.IDCARD_UPLOAD_NULL:
                    this.$root.tip("请上传您的身份证正反面照片!", "", "no")
                    break;
                case Status.IDCARD_COMPLETE:
                    this.$root.tip("您的身份信息已提交过！", "", "no")
                    break;
                case Status.IDCARD_FORMAT_ERROR:
                    this.$root.tip("您的身份号码格式不正确！", "", "no")
                    break;
                case Status.MOBILE_EXIST:
                    this.$root.tip("该手机号已绑定！", "", "no")
                    break;
                case Status.ACCOUNTS_FREEZE:
                    this.$root.tip("该账户已被冻结,请联系客服！", "", "no")
                    break;
                case Status.ACCOUNTS_LIMIT:
                    this.$root.tip("该账户已被限制登陆,请联系客服！", "", "no")
                    break;
                case Status.NEW_PASSWORD_EXIST:
                    this.$root.tip("新旧密码不能一致！", "", "no")
                    break;
                case Status.OPENID_ERROR:
                    this.$root.tip("用户微信Openid异常！", "", "no")
                    break;
                case Status.SUBSCRIBE_CANCEL_ERROR:
                    this.$root.tip("用户微信退订未能获取到订阅记录!", "", "no")
                    break;
                case Status.WECHATRECORD_SAVE_ERROR:
                    this.$root.tip("保存用户聊天记录未能获取到用户!", "", "no")
                    break;
                case Status.SUBSCRIBE_REGISTER_ERROR:
                    this.$root.tip("用户订阅注册未能获取到用户的OpenId！", "", "no")
                    break;
                case Status.VALIDATECODE_NULL:
                    this.$root.tip("验证码不能为空！", "", "no")
                    break;
                case Status.NICKNAME_EXIST:
                    this.$root.tip("该昵称已存在！", "", "no")
                    break;
                case Status.NICKNAME_SPECIAL_WORD:
                    this.$root.tip("昵称不能包含特殊字符！", "", "no")
                    break;
                case Status.SIGN_SPECIAL_WORD:
                    this.$root.tip("签名不能包含特殊字符！", "", "no")
                    break;
                case Status.VALIDATECODE_ERROR:
                    this.$root.tip("验证码错误！", "", "no")
                    break;
                case Status.INVITECODE_ERROR:
                    this.$root.tip("该邀请码不存在或不在活动时间内！", "", "no")
                    break;
                case Status.INVITECODE_UNMATCH:
                    this.$root.tip("该邀请码不适合当前活动！", "", "no")
                    break;
                case Status.INVITECODE_IS_NULL:  //232
                    this.$root.tip("邀请码不得为空！", "", "no")
                    break;
                case Status.HIRE_DATE_DIFFERENT:  //261
                    this.$root.tip("订单中产品租期不同！", "", "no")
                    break;
                case Status.SERVICELEVEL_ISNULL:  //262
                    this.$root.tip("订单评价服务等级为空！", "", "no")
                    break;
                case Status.DELIVERYLEVEL_ISNULL:  //263
                    this.$root.tip("订单评价快递等级为空！", "", "no")
                    break;
                case Status.ORDER_JUDGE_DISABLE:  //264
                    this.$root.tip("订单已评价或评价关闭！", "", "no")
                    break;
                case Status.HIRESTARTDATE_NOT_VAILD:	//265
                    this.$root.tip("起租日期不正确！", "", "no")
                    break;
                case Status.SAME_ORDER_ERROR:	//267
                    this.$root.tip("请勿重复提交相同订单！", "", "no")
                    break;
                case Status.COLLOCATIONCOLLECT_OUT_SIZE:  //331
                    this.$root.tip("收藏超出上限！", "", "no")
                    break;
                case Status.TODAY_ALREADY_SIGN:  //341
                    this.$root.tip("今天已签到！", "", "no")
                    break;
                case Status.POINTGOODS_OFF_SHELVE:  //351
                    this.$root.tip("积分商品已下架！", "", "no")
                    break;
                case Status.POINTGOODS_OUT_STOCK:  //352
                    this.$root.tip("积分商品无库存！", "", "no")
                    break;
                case Status.POINT_OUT:  //353
                    this.$root.tip("积分不足！", "", "no")
                    break;
                case Status.ORDER_OUT_DATE:  //503
                    this.$root.tip("订单超期!", "", "no")
                    break;
                case Status.REMIND_ALREADY_EXIST:  //601
                    this.$root.tip("您已设置到货提醒!")
                    break;
                case Status.PAY_ERROR:  //4000
                    this.$root.tip("支付错误!")
                    break;
                default:
                    this.$root.tip("错误码：" + status, "", "no")
                    break;
            }
        }
    }
}
