<template>
    <div class="xfBox">
        <ul>
            <li @click="goBack"><span class="back"></span></li>
            <router-link tag="li" to="/"><span class="home"></span></router-link>
            <router-link tag="li" to="shoppingCart?from=xuanfu"><span class="cart"></span></router-link>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        methods: {
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style rel="stylesheet" lang="less" scoped>
    .xfBox {
        position: fixed;
        right: 0;
        bottom: 1.5rem;
        background-color: rgba(0, 0, 0, .6);
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
        ul {
            list-style: none;
            li {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 0.7rem;
                height: 0.7rem;
                border-bottom: 1px solid #a1a1a1;
                span.back {
                    width: 33px;
                    height: 26px;
                    background: url("back.png") no-repeat center;
                    background-size: 80% 80%;
                }
                span.home {
                    width: 33px;
                    height: 29px;
                    background: url("home.png") no-repeat center;
                    background-size: 73% 73%;
                }
                span.cart {
                    width: 39px;
                    height: 35px;
                    background: url("cart.png") no-repeat center;
                    background-size: 65% 65%;
                }
            }
            li:last-child {
                border-bottom: 0;
            }
        }
    }
</style>