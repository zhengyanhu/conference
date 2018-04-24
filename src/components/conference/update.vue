<template lang="html">
  <div id="app" class="flex column">
  <m-header :classObj1="classObj1" :classObj="classObj" :title="title" v-on:navBtn="navBtn"></m-header>
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
                  <p :class="{'selectOnImg':confCategory === 1}" value="1" class="ct-item f-g1" @click="selectOption($event)">小型会议</p>
                  <p :class="{'selectOnImg':confCategory === 2}" value="2" class="ct-item f-g1" @click="selectOption($event)">宣导型会议</p>
                  <p :class="{'selectOnImg':confCategory === 3}" value="3" class="ct-item f-g1" @click="selectOption($event)">重要会议</p>
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
  <div id="btns" class="flex">
      <div @click="update()" class="btn f-g1">修改</div>
      <div @click="del()" style="background-color:#4997E8" class="btn f-g1">删除</div>
  </div>
  </div>
</template>

<script>
//import {datePicker} from '../../common/js/datePicker'
import MHeader from '../m-header/header'
console.log(MHeader);
export default {
    created() {
        // if(new Date().getHours() >= 12) {
        //     this.pm = true;
        //     this.startTime = "14:00";
        //     this.endTime = "17:30";
        // }else{
        //     this.am = true;
        //     this.startTime = "09:30";
        //     this.endTime = "11:00";
        // }
        let item = JSON.parse(localStorage.getItem("ListItemStor"));
        this.item = item;
        this.date = item.startTime;
        this.startTime = item.endTime.split("-")[0];
        this.endTime = item.endTime.split("-")[1];
        this.name = item.name;
        this.confCategory = item.confCategory;
    },
    data() {
        return {
            title:"会议预定",
            classObj:{
                'fa':true,
                'fa-chevron-left':true,
                'fa-2x':true
            },
            classObj1:{},
            name:"",
            confCategory:"1",
            date:new Date().getFullYear()+'-'+(new Date().getMonth()+1<10?'0'+(new Date().getMonth()+1):new Date().getMonth()+1)+'-'+new Date().getDate(),
            startTime:'09:30',
            endTime:'11:30',
            defaultTime:new Date().getHours() + ":" + new Date().getMinutes(),
            am: false,
            pm:false,
            confCategory:"",
            item:{}

        }
    },
    methods:{
        update: function() {
            let json = this.item;
            let startTime = this.date + " " + this.startTime;
            let endTime = this.date + " " + this.endTime;
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
            var params = json;
            console.log(params)
            var me = this;
            this.$http({
                method:'post',
                contentType: 'application/json',
                url:'adhoc/updateAdhoc',
                data:params
            }).then(function(result){
                console.log(result);

                if(result.data.code == "0"){
                    me.$router.push({path:'/list'});
                }else if(result.data.code == 503){
                    window.location.href="login.html";
                }               
            }).catch(function (error) {
                alert("修改失败")
                console.log(error);
            })
        },
        del:function() {
            var me = this;
             this.$http.get('adhoc/del/'+this.$route.params.id).then(function(json){
                 console.log(json)
                 if(json.data.code == "0"){
                    me.$router.push({path:'/list'});
                 }else if(json.data.code == 503){
                    window.location.href="login.html";
                 }else{
                    alert(json.data.message);
                 }

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
        navBtn: function(type) {
            if(type === "left") {
                this.$router.push({path:'/list'});
            } else {
                console.log('233')
            }
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
.btn
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
                padding-right:.8rem;
        .startTime
            margin-top:1rem;
            padding-left: .8rem;
            height:2rem;
            line-height:2rem;
            border-bottom:$border-weight solid $color-border;
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
