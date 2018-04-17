<template lang="html">
  <div id="app" class="flex column">
  <m-header :classObj1="classObj1" :classObj="classObj" :title="title"></m-header>
  <main class="f-g1" id="main">
      <section class="conference">
          <div class="option-conference flex">
              <p class="name">会议名称：</p>
              <input type="text" v-model="name" placeholder="填写会议主题" value="">
          </div>
      </section>
      <section class="conference">
          <p style="margin-top:.3rem" class="name">会议类型</p>
          <div class="option-conference">
              <div class="flex conference-type ">
                  <p value="1" class="ct-item f-g1 selectOnImg" @click="selectOption($event)">小型会议</p>
                  <p value="2" class="ct-item f-g1" @click="selectOption($event)">宣导型会议</p>
                  <p value="3" class="ct-item f-g1" @click="selectOption($event)">重要会议</p>
              </div>
          </div>
      </section>
      <section class="conference">
          <p style="margin-top:.3rem" class="name">会议类别</p>
          <div class="option-conference">
              <div class="flex hylb">
                  <p style="margin-right:5rem;" class="ct-item1 f-g1 selectOnImg">视频会议</p>
                  <p style="opacity:0" class="ct-item1 f-g1 selectOnImg">语音会议</p>
              </div>
          </div>
      </section>
      <!-- <section class="conference">
          <p style="margin-top:.3rem" class="name">支持类型</p>
          <div class="option-conference">
              <div class="flex hylb">
                  <p style="margin-right:5rem;" class="ct-item1 f-g1 selectOnImg">录制</p>
                  <p class="ct-item1 f-g1 selectOnImg">直播</p>
              </div>
          </div>
      </section> -->
      <section class="conference">
          <div class="option-conference flex">
              <p class="name">会议日期：</p>
              <p class="f-g1">
                  <DatePicker :value="date" @on-change="dateChange" type="date" placeholder="Select date" style="width: 100%"></DatePicker>
               </p>
              <span class="fa fa-chevron-right chevron"></span>
          </div>
      </section>
      <section class="conference">
          <p style="margin-top:.3rem" class="name">起止时间</p>
          <div class="option-conference column">
              <div class="f-g1">
                  <div class="flex apm">
                      <p v-if="am" style="margin-right:.5rem" class="ms f-g1 selectOnImg" @click="selectOption1('am',$event)">上午</p>
                      <p v-else="am" style="margin-right:.5rem" class="ms f-g1" @click="selectOption1('am',$event)">上午</p>
                      <p v-if="pm" class="ms f-g1 selectOnImg" @click="selectOption1('pm',$event)">下午</p>
                      <p v-else="pm" class="ms f-g1" @click="selectOption1('pm',$event)">下午</p>
                  </div>
              </div>
              <div class="f-g1 setime">
                  <div class="column">
                      <div class="flex startTime">
                          <p class="name">开始时间</p>
                          <div class="f-g1 time">
                              <time-picker :value="startTime" @on-change="startTimeChange" format="HH:mm" :steps="[1, 15]" confirm placeholder="" style="width: 100%"></time-picker>
                          </div>
                          <span class="fa fa-chevron-right chevron"></span>
                      </div>
                      <div class="flex endTime">
                          <p class="name">结束时间</p>
                          <div class="f-g1 time">
                              <time-picker :value="endTime" @on-change="endTimeChange" format="HH:mm" :steps="[1, 15]" confirm placeholder="" style="width: 100%"></time-picker>
                          </div>
                          <span class="fa fa-chevron-right chevron"></span>
                      </div>
                  </div>
              </div>
          </div>

      </section>
  </main>
  <div>
      <div @click="request()" id="reservationBtn">立即预定</div>
  </div>
  </div>
</template>

<script>
//import {datePicker} from '../../common/js/datePicker'
import MHeader from '../m-header/header'
export default {
    created() {
        if(new Date().getHours() >= 12) {
            this.pm = true;
            this.startTime = "14:00";
            this.endTime = "17:30";
        }else{
            this.am = true;
            this.startTime = "09:30";
            this.endTime = "11:00";
        }
    },
    data() {
        return {
            title:"会议预定",
            classObj:{},
            classObj1:{},
            name:"test",
            confCategory:"1",
            date:new Date().getFullYear()+'-'+(new Date().getMonth()+1<10?'0'+(new Date().getMonth()+1):new Date().getMonth()+1)+'-'+new Date().getDate(),
            startTime:'09:30',
            endTime:'11:30',
            defaultTime:new Date().getHours() + ":" + new Date().getMinutes(),
            am: false,
            pm:false
        }
    },
    methods:{
        request: function() {
            let json = {};
            let startTime = this.date + " " + this.startTime;
            let endTime = this.date + " " + this.endTime;
            console.log(endTime)
            json.startTime = new Date(startTime.replace("-","/")).getTime();
            json.endTime = new Date(endTime.replace("-","/")).getTime();
            json.confCategory = this.confCategory;
            json.duration = (new Date(json.endTime).getTime() - new Date(json.startTime).getTime()) / 1000 / 60;
            json.confMediaType = "VIP";
            json.name = this.name;
            if(json.duration < 0){
                alert("开始时间不可以大于结束时间");
                return;
            }
            //var params = JSON.stringify(json);
            var params = json;
            console.log(params)
            var me = this;
            this.$http({
                method:'post',
                contentType: 'application/json',
                url:'adhoc/addAdhoc',
                data:params
            }).then(function(result){
                me.$router.push({path:'/list'});
            }).catch(function (error) {
                console.log(error);
            })
        },
        selectOption: function(ev){
            let el = ev.target.parentNode.children;
            for(let i = 0; i < el.length; i++){
                el[i].className = "ct-item f-g1";
            }
            console.log(ev.target.attributes.value.value)
            this.confCategory = ev.target.attributes.value.value
            ev.target.className = "ct-item f-g1 selectOnImg"
        },
        selectOption1: function(type,ev){
            if(type == "am") {
                this.startTime = "09:30";
                this.endTime = "11:00";
            }else{
                this.startTime = "14:00";
                this.endTime = "17:30";
            }
            let el = ev.target.parentNode.children;
            for(let i = 0; i < el.length; i++){
                el[i].className = "ms f-g1";
            }
            ev.target.className = "ms f-g1 selectOnImg"
        },
        startTimeChange: function(stime) {
            this.startTime = stime;
        },
        endTimeChange: function(etime) {
            this.endTime = etime
        },
        dateChange:function(date) {
            this.date = date;
        }
    },
    components:{
        MHeader
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/index"
#app
    width:100%;
    height:100%;
#reservationBtn
    height:2.5rem
    background:#0076ff;
    margin:0 auto;
    color:#fff;
    line-height:2.5rem;
    text-align:center;
#main
    overflow:scroll
.conference
    padding: 0 1rem 0 1rem;
    .name
        min-width:5em;
        color:#666666;
    .option-conference
        border-bottom: $border-weight solid $color-border;
        padding:.8rem 0 .8rem 0;
        .chevron
            display:inline-block;
            color:#0076ff;
            margin-top:.5rem;
        #date
            text-align:right;
            padding-right:.8rem;
            color:#0076FF;
            margin-top:0.4rem;
        input
            flex-grow:1;
            font-size:1rem;
        .apm
            width:100%;
            height:3rem;
            border:$border-weight solid $color-border;
            align-items:center;
            justify-content:space-around;
            padding:0 .5rem 0 .5rem;
            .ms
                height:2rem;
                line-height:2rem;
                // border:$border-weight solid $color-border;
                background-color: $color-border;
                text-align:center;
                color:#0076FF;
        .setime
            border:$border-weight solid $color-border;
            margin-top:1rem;
            padding-right:1rem;
            padding-left:.3rem;
            .time
                text-align:right;
                color:#0076ff;
        .startTime
            margin-top:1rem;
            padding-left: .8rem;
            height:2rem;
            line-height:2rem;
        .endTime
            margin-top:.5rem;
            margin-bottom:.5rem;
            height:2rem;
            line-height:2rem;
            padding-left: 0.8rem;
        .conference-type
            justify-content:space-around;
            .ct-item
                // border:$border-weight solid $color-border;
                background-color:$color-border;
                flex-basis:0;
                -webkit-flex-basis:0;
                text-align: center;
                min-height:2rem;
                margin-right:1rem;
                line-height:2rem;
                color:#0076FF;
        .hylb
            width:100%;
            height:3rem;
            align-items:center;
            justify-content:space-around;
            padding: 0 1rem 0 1rem
            .ct-item1
                height:2rem;
                line-height:2rem;
                // border:$border-weight solid $color-border;
                text-align:center;
                color:#0076FF;
        .selectOnImg
            background-image:url('../../images/select.png');
            background-size: 100% 100%;
            background-position:center;
            background-repeat:no-repeat;
    .push
        background-repeat:no-repeat;
        background-position: 100% center;
        background-image:url('../../images/push.png')
</style>
