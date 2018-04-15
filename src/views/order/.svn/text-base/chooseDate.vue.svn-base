<template>
    <div>
        <div class="title">真实的收货地址，从您收到货开始计算</div>
        <div class="month" v-for="item of list">
            <div class="month-title">{{item.yearMonth}}</div>
            <div class="week-title">
                <div class="item">日</div>
                <div class="item">一</div>
                <div class="item">二</div>
                <div class="item">三</div>
                <div class="item">四</div>
                <div class="item">五</div>
                <div class="item">六</div>
            </div>
            <div @click="chooseDate" v-for="day of item.days" :date="day.value" :class="{
             day: true,
             disable: day.disable,
             selected: day.value === selectedDate

             }">{{day.num}}</div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    //import HeaderComponent from '../../views/'
    
    export default{
        props: [

        ],
        data(){
            return {
                list: [],
                selectedDate: ''
            }
        },
        methods: {
            getYearMonth(date){
                let d = new Date(date);
                return d.getFullYear() + '年' + (d.getMonth() + 1) + '月';
            },
            chooseDate(e){
                let el = e.currentTarget;

                if(el.className.indexOf('disable') === -1){
                    let date = el.getAttribute('date');
                    this.selectedDate = date;
                    this.save('chooseDate', date);
                    setTimeout(()=>{
                        this.backToView();
                    }, 300)

                }
            }
        },
        created(){
            let list = [];
            let dayM = 24*60*60*1000;
            let param = this.$route.query;
            if(!param.startDate){
                console.log('no startDate')
                return;
            }
            let startDate = new Date(param.startDate).getTime();
            let firstDay = new Date(param.startDate);

            firstDay.setDate(1);
            if(firstDay.getDay() > 0){
                firstDay = new Date(firstDay.setDate(-firstDay.getDay()));
            }

            let lastDate = '';
            let endDate = '';
            if(!param.endDate){
                lastDate = new Date(param.startDate);
                lastDate = new Date(lastDate.setDate(lastDate.getDate() + 180));
                endDate = lastDate.getTime();
            }else{
                lastDate = new Date(param.endDate);
                endDate = new Date(param.endDate).getTime();
            }

            lastDate.setDate(lastDate.getDate() + (6-lastDate.getDay()));

            let days = (lastDate.getTime() - firstDay.getTime())/(dayM);
            console.log(days);

            let yearMonth = this.getYearMonth(startDate);
            let monthList = [
                {
                    yearMonth: yearMonth,
                    days: []
                }
            ];
            let firstDayTime = firstDay.getTime();

            for(let i = 0; i < days; i++){
                let dayTime = firstDayTime + dayM*i;
                let day = new Date(dayTime);
                let dayYM = this.getYearMonth(dayTime);
                let value = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate();

                if(dayTime < startDate){
                    monthList[0].days.push({
                        num: day.getDate(),
                        disable: true,
                        value: value
                    })
                }else if(dayTime > endDate){
                    let len = monthList.length-1;
                    monthList[len].days.push({
                        num: day.getDate(),
                        disable: true,
                        value: value
                    });
                }else if( dayYM === yearMonth){

                    let len = monthList.length-1;
                    monthList[len].days.push({
                        num: day.getDate(),
                        disable: false,
                        value: value
                    });

                }else {

                    let add = day.getDay();
                    let lastAdd = (7 - add)%7;
                    let len = monthList.length-1;

                    if(lastAdd !== 0){
                        for(let i = 0; i < lastAdd; i++){
                            monthList[len].days.push({
                                num: '',
                                disable: true,
                                value: value
                            });
                        }
                    }

                    if(add !== 0){

                        monthList.push({
                            yearMonth: dayYM,
                            days: []
                        });

                        len++;

                        for(let i = 0; i < add; i++){
                            monthList[len].days.push({
                                num: '',
                                disable: true,
                                value: value
                            });
                        }

                        monthList[len].days.push({
                            num: day.getDate(),
                            disable: false,
                            value: value
                        });

                    }else{
                        monthList.push({
                            yearMonth: dayYM,
                            days: [{
                                num: day.getDate(),
                                disable: false,
                                value: value
                            }]
                        })
                    }

                    yearMonth = dayYM;
                }
            }
            this.list = monthList;

        },
        computed: {

        },
        components:{
            
        }
    }
</script>
<style scoped lang="less">
    @import "../../assets/css/common.less";
    .title{
        position: relative;
        padding: .3rem .3rem 0 .3rem;
        color: @color-99;
        font-size: .2rem;
        line-height: .24rem;
    }
    .month{
        position: relative;
        padding-bottom: .25rem;
        .border-1px-bottom();
        >.month-title{
            position: relative;
            padding: .5rem 0 .25rem;
            text-align: center;
            font-size: .25rem;
            color: @color-33;
        }
        >.week-title{
            height: .7rem;
            line-height: .7rem;
            .box-flex;
            >.item{
                line-height: .7rem;
                font-size: .24rem;
                color: @color-33;
                text-align: center;
                .box-flex-1;
            }
        }
        >.day{
            display: inline-block;
            width: .91rem;
            line-height: .7rem;
            font-size: .24rem;
            color: #4ca0fc;
            text-align: center;
            &.disable{
                color: @color-e4;
            }
            &.selected{
                color: @color-ff;
                background: #4ca0fc;
            }
        }
    }


</style>