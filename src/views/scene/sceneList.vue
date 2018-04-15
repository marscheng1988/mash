<style scoped lang="less">

</style>
<template>
    <div>
        <scroller lock-x
                  scrollbarY
                  :height="height"
                  ref="scroller">
            <div>
                <scene-item v-for="(item, $index) in list" :index="$index" :callbackFun="hideSceneInfo" :item="item" :key="$index" ref="scenes">

                </scene-item>
            </div>
        </scroller>
        <v-footer :classification="true" ref="footer"></v-footer>
    </div>
</template>
<script type="text/ecmascript-6">
    import SceneItem from '../../views/scene/sceneItem.vue';
    import {Scroller} from 'vux';
    import Footer from '../../components/footer/Footer.vue';

    export default{
        data(){
            return{
                msg:'hello vue',
                list: this.find('sceneList'),
                mountedItem: 0,
                height: -window.innerWidth/6.4*.98 + '',
            }
        },
        methods: {
            hideSceneInfo: function(){
                for(let scene of this.$refs.scenes){
                    scene.show = false;
                }
            }
        },
        created: function(){
            let self = this;
            if(!this.list){
                this.getQuery(true, CTX_URL + '/index/scene/sceneList', (data)=>{
                    if(data.status === 1){
                        this.save('sceneList', data.data);
                        this.list = data.data;
                    }
                })
            }
        },
        updated:function(){
            this.$nextTick(() => {
                this.$refs.scroller.reset();
            });
        },
        components:{
            'Scroller': Scroller,
            'SceneItem': SceneItem,
            'VFooter': Footer,
        }
    }
</script>
