import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// Router.beforeEach = ()=>{
//     console.log('beforeEach')
// }

const Index = resolve => {
    require.ensure(['../views/index/Index.vue'], () => {
        resolve(require('../views/index/Index.vue'));
    });
};
const SignIn = resolve => {
    require.ensure(['../views/signIn/SignIn.vue'], () => {
        resolve(require('../views/signIn/SignIn.vue'));
    });
};
const SignUp = resolve => {
    require.ensure(['../views/signUp/SignUp.vue'], () => {
        resolve(require('../views/signUp/SignUp.vue'));
    });
};
const SignUpPw = resolve => {
    require.ensure(['../views/signUp/SignUpPw.vue'], () => {
        resolve(require('../views/signUp/SignUpPw.vue'));
    });
};

const myCenter = resolve => {
    require.ensure(['../views/myCenter/myCenter.vue'], () => {
        resolve(require('../views/myCenter/myCenter.vue'));
    });
};
const settingsPage = resolve => {
    require.ensure(['../views/myCenter/settingsPage/settingsPage.vue'], () => {
        resolve(require('../views/myCenter/settingsPage/settingsPage.vue'));
    });
};
const modifyPassword = resolve => {
    require.ensure(['../views/myCenter/settingsPage/modifyPassword/modifyPassword.vue'], () => {
        resolve(require('../views/myCenter/settingsPage/modifyPassword/modifyPassword.vue'));
    });
};
const modifyPassword2 = resolve => {
    require.ensure(['../views/myCenter/settingsPage/modifyPassword/modifyPassword2.vue'], () => {
        resolve(require('../views/myCenter/settingsPage/modifyPassword/modifyPassword2.vue'));
    });
};
const SceneList = resolve => {
    require.ensure(['../views/scene/sceneList.vue'], () => {
        resolve(require('../views/scene/sceneList.vue'));
    });
};
const CollocationList = resolve => {
    require.ensure(['../views/collocation/collocationList.vue'], () => {
        resolve(require('../views/collocation/collocationList.vue'));
    });
};
const CollocationDetail = resolve => {
    require.ensure(['../views/collocation/CollocationDetail.vue'], () => {
        resolve(require('../views/collocation/CollocationDetail.vue'));
    });
};
const addressList = resolve => {
    require.ensure(['../views/myCenter/address/addressList.vue'], () => {
        resolve(require('../views/myCenter/address/addressList.vue'));
    });
};
const newAddress = resolve => {
    require.ensure(['../views/myCenter/address/newAddress.vue'], () => {
        resolve(require('../views/myCenter/address/newAddress.vue'));
    });
};
const chooseAddress = resolve => {
    require.ensure(['../views/myCenter/address/chooseAddress.vue'], () => {
        resolve(require('../views/myCenter/address/chooseAddress.vue'));
    });
};
const collection = resolve => {
    require.ensure(['../views/myCenter/collection/collection.vue'], () => {
        resolve(require('../views/myCenter/collection/collection.vue'));
    });
};
const search = resolve => {
    require.ensure(['../views/search/search.vue'], () => {
        resolve(require('../views/search/search.vue'));
    });
};
const addShoppingCart = resolve => {
    require.ensure(['../views/shoppingCart/addShoppingCart.vue'], () => {
        resolve(require('../views/shoppingCart/addShoppingCart.vue'));
    });
};
const shoppingCart = resolve => {
    require.ensure(['../views/shoppingCart/shoppingCart.vue'], () => {
        resolve(require('../views/shoppingCart/shoppingCart.vue'));
    });
};
const buyExperienceGood = resolve => {
    require.ensure(['../views/shoppingCart/buyExperienceGood.vue'], () => {
        resolve(require('../views/shoppingCart/buyExperienceGood.vue'));
    });
};
const buyOrderList = resolve => {
    require.ensure(['../views/myCenter/orderList/buyOrderList.vue'], () => {
        resolve(require('../views/myCenter/orderList/buyOrderList.vue'));
    });
};
const experienceOrderList = resolve => {
    require.ensure(['../views/myCenter/orderList/experienceOrderList.vue'], () => {
        resolve(require('../views/myCenter/orderList/experienceOrderList.vue'));
    });
};
const group = resolve => {
    require.ensure(['../views/good/group.vue'], () => {
        resolve(require('../views/good/group.vue'));
    });
};
const comment = resolve => {
    require.ensure(['../views/good/comment.vue'], () => {
        resolve(require('../views/good/comment.vue'));
    });
};
const coupon = resolve => {
    require.ensure(['../views/coupon/coupon.vue'], () => {
        resolve(require('../views/coupon/coupon.vue'));
    });
};
const myAccount = resolve => {
    require.ensure(['../views/myCenter/myAccount/myAccount.vue'], () => {
        resolve(require('../views/myCenter/myAccount/myAccount.vue'));
    });
};
const accountDetail = resolve => {
    require.ensure(['../views/myCenter/myAccount/accountDetail.vue'], () => {
        resolve(require('../views/myCenter/myAccount/accountDetail.vue'));
    });
};
const myIntegra = resolve => {
    require.ensure(['../views/myCenter/myIntegral/myIntegra.vue'], () => {
        resolve(require('../views/myCenter/myIntegral/myIntegra.vue'));
    });
};
const integralMall = resolve => {
    require.ensure(['../views/myCenter/myIntegral/integralMall.vue'], () => {
        resolve(require('../views/myCenter/myIntegral/integralMall.vue'));
    });
};
const exchangeDetail = resolve => {
    require.ensure(['../views/myCenter/myIntegral/exchangeDetail.vue'], () => {
        resolve(require('../views/myCenter/myIntegral/exchangeDetail.vue'));
    });
};
const exchangeIntegra = resolve => {
    require.ensure(['../views/myCenter/myIntegral/exchangeIntegra.vue'], () => {
        resolve(require('../views/myCenter/myIntegral/exchangeIntegra.vue'));
    });
};
const confirmOrder = resolve => {
    require.ensure(['../views/order/confirmOrder.vue'], () => {
        resolve(require('../views/order/confirmOrder.vue'));
    });
};
const appointOrder = resolve => {
    require.ensure(['../views/order/appointOrder.vue'], () => {
        resolve(require('../views/order/appointOrder.vue'));
    });
};
const buyOrder = resolve => {
    require.ensure(['../views/order/buyOrder.vue'], () => {
        resolve(require('../views/order/buyOrder.vue'));
    });
};
const chooseDate = resolve => {
    require.ensure(['../views/order/chooseDate.vue'], () => {
        resolve(require('../views/order/chooseDate.vue'));
    });
};
const invoice = resolve => {
    require.ensure(['../views/order/invoice.vue'], () => {
        resolve(require('../views/order/invoice.vue'));
    });
};
const pay = resolve => {
    require.ensure(['../views/order/pay.vue'], () => {
        resolve(require('../views/order/pay.vue'));
    });
};
const paySuccess = resolve => {
    require.ensure(['../views/order/paySuccess.vue'], () => {
        resolve(require('../views/order/paySuccess.vue'));
    });
};
const goodsArriveRemind = resolve => {
    require.ensure(['../views/myCenter/goodsArriveRemind/goodsArriveRemind.vue'], () => {
        resolve(require('../views/myCenter/goodsArriveRemind/goodsArriveRemind.vue'));
    });
};
const myNews = resolve => {
    require.ensure(['../views/myNews/myNews.vue'], () => {
        resolve(require('../views/myNews/myNews.vue'));
    });
};
const sysMessage = resolve => {
    require.ensure(['../views/myNews/sysMessage.vue'], () => {
        resolve(require('../views/myNews/sysMessage.vue'));
    });
};
const orderDetail = resolve => {
    require.ensure(['../views/myCenter/orderList/orderDetail.vue'], () => {
        resolve(require('../views/myCenter/orderList/orderDetail.vue'));
    });
};
const helpCenter = resolve => {
    require.ensure(['../views/myCenter/helpCenter/helpCenter.vue'], () => {
        resolve(require('../views/myCenter/helpCenter/helpCenter.vue'));
    });
};
const helpDetail = resolve => {
    require.ensure(['../views/myCenter/helpCenter/helpDetail.vue'], () => {
        resolve(require('../views/myCenter/helpCenter/helpDetail.vue'));
    });
};
const checkDelivery = resolve => {
    require.ensure(['../views/myCenter/orderList/checkDelivery.vue'], () => {
        resolve(require('../views/myCenter/orderList/checkDelivery.vue'));
    });
};
const goodsJudge = resolve => {
    require.ensure(['../views/myCenter/orderList/goodsJudge.vue'], () => {
        resolve(require('../views/myCenter/orderList/goodsJudge.vue'));
    });
};
const returnGoods = resolve => {
    require.ensure(['../views/myCenter/orderList/returnGoods.vue'], () => {
        resolve(require('../views/myCenter/orderList/returnGoods.vue'));
    });
};
const afterService = resolve => {
    require.ensure(['../views/myCenter/orderList/afterService.vue'], () => {
        resolve(require('../views/myCenter/orderList/afterService.vue'));
    });
};
const router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: '周范商城',
            component: Index,
            // beforeEnter:(to,from,next) => {
            //     console.log("beforeEnter");
            //     console.log(to);
            //     next()
            // },
        },
        {
            path: '/search',
            name: '搜索',
            component: search
        },
        /**
         * 个人中心
         */
        {
            path: '/myCenter',
            name: '个人中心',
            component: myCenter,
        },
        {
            path: '/myCenter/goodsArriveRemind',
            name: '到货提醒',
            component: goodsArriveRemind
        },
            {
                path: '/myCenter/buyOrderList',
                name: '购买订单列表',
                component: buyOrderList
            },
            {
                path: '/myCenter/experienceOrderList',
                name: '体验订单列表',
                component: experienceOrderList
            },
            {
                path: '/myCenter/orderDetail',
                name: '订单详情',
                component: orderDetail
            },
            {
                path: '/myCenter/settingsPage',
                name: '个人设置',
                component: settingsPage
            },
            {
                path: '/myCenter/helpCenter',
                name: '帮助中心',
                component: helpCenter
            },
            {
                path: '/myCenter/helpDetail',
                name: '帮助详情',
                component: helpDetail
            },
            {
                path: '/checkDelivery',
                name: '查看物流',
                component: checkDelivery
            },
            {
                path: '/goodsJudge',
                name: '评价',
                component: goodsJudge
            },
            {
                path: '/returnGoods',
                name: '预约归还',
                component: returnGoods
            },
            {
                path: '/afterService',
                name: '售后',
                component: afterService
            },
                {
                    path: '/myCenter/settingsPage/modifyPassword',
                    name: '修改密码',
                    component: modifyPassword
                },
                {
                    path: '/myCenter/settingsPage/modifyPassword2',
                    name: '修改密码',
                    component: modifyPassword2
                },
                //地址列表
                {
                    path: '/myCenter/addressList',
                    name: '地址列表',
                    component: addressList
                },
                {
                    path: '/myCenter/newAddress',
                    name: '编辑地址',
                    component: newAddress
                },
                {
                    path: '/myCenter/chooseAddress',
                    name: '选择地址',
                    component: chooseAddress
                },
                //收藏列表
                {
                    path: '/myCenter/collection',
                    name: '收藏列表',
                    component: collection
                },
                //我的账户
                {
                    path: '/myCenter/myAccount',
                    name: '我的账户',
                    component: myAccount
                },
                {
                    path: '/myCenter/accountDetail',
                    name: '账户明细',
                    component: accountDetail
                },
                //积分
                {
                    path: '/myCenter/integralMall',
                    name: '积分商城',
                    component: integralMall
                },
                {
                    path: '/myCenter/exchangeDetail',
                    name: '积分兑换详情',
                    component: exchangeDetail
                },
                {
                    path: '/myCenter/exchangeIntegra',
                    name: '积分兑换',
                    component: exchangeIntegra
                },
                {
                    path: '/myCenter/myIntegra',
                    name: '我的积分',
                    component: myIntegra
                },
                {
                    path: '/myNews',
                    name: '我的消息',
                    component: myNews
                },
                {
                    path: '/sysMessage',
                    name: '系统消息',
                    component: sysMessage
                },
        /**
         * 登陆注册
         */
        {
            path: '/signIn',
            name: '登陆',
            component: SignIn
        },
        {
            path: '/signUp',
            name: '注册',
            component: SignUp
        },
        {
            path: '/signUpPw',
            name: '设置密码',
            component: SignUpPw
        },


        /**
         * 场景搭配相关
         * */
        {
            path: '/sceneList',
            name: '场景分类',
            component: SceneList
        },
        {
            path: '/collocationList',
            name: '搭配列表',
            component: CollocationList
        },
        {
            path: '/collocationDetail',
            name: '搭配详情',
            component: CollocationDetail
        },
        {
            path: '/group',
            name: '商品详情',
            component: group
        },
        {
            path: '/comment',
            name: '评论',
            component: comment
        },

        /**
         * 购物车相关
         * */
        {
            path: '/addShoppingCart',
            name: '添加购物车',
            component: addShoppingCart
        },
        {
            path: '/shoppingCart',
            name: '购物车',
            component: shoppingCart
        },
        {
            path: '/buyExperienceGood',
            name: '购买体验商品',
            component: buyExperienceGood
        },

        /**
         * 优惠券
         * */
        {
            path: '/coupon',
            name: '优惠券',
            component: coupon
        },

        /**
         * 下单
         * */
        {
            path: '/confirmOrder',
            name: '确认订单',
            component: confirmOrder
        },
        {
            path: '/appointOrder',
            name: '确认订单',
            component: appointOrder
        },
        {
            path: '/buyOrder',
            name: '确认订单',
            component: buyOrder
        },
        {
            path: '/chooseDate',
            name: '选择时间',
            component: chooseDate
        },
        {
            path: '/invoice',
            name: '发票信息',
            component: invoice
        },
        {
            path: '/pay',
            name: '支付方式',
            component: pay
        },
        {
            path: '/paySuccess',
            name: '支付结果',
            component: paySuccess
        },
    ]
})

//router.beforeEach(function (to, from, next) {
//    next()
//})
export default router;
