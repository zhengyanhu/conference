<template lang="html">
    <header class="header">
        <div class="head">
            <div @click="back()" v-if="headStyle.btnLimg" :style="[headStyle.btnLimg]" class="btn-leftA"></div>
            <div v-else class="btn-left"></div>
            <h1 class="title">{{ headStyle.title }}</h1>
            <div @click="btnRight()" v-if="headStyle.btnRimg" :style="[headStyle.btnRimg]" class="btn-rightA"></div>
            <div v-else class="btn-right"></div>
        </div>
    </header>
</template>

<script>
export default {
  data() {
      return {
         headStyle:{
             title: '会议预定',
              btnLimg: {
                  backgroundImage: 'url(./images/back.png)'
              },
              btnRimg: {

              }
         }
      }
  },
  methods:{
      back:function(){

      }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.header{
    background-color: #0076FF;
    color:#fff;
    text-align: center;
    width: 100%;
}
.head{
    display: flex;
    justify-content: space-between;
}
.title{
    font-size: 1.1em;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: .72em 1em .72em;
}
.btn-leftA{
    min-width:4em;
    min-height:2em;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 40%;
}
.btn-left{
    min-width:4em;
    min-height:2em;
    backgroundImage: 'url(./images/back.png)'
}
.btn-right{
    min-width:4em;
    min-height:2em;

}
.btn-rightA{
    min-width:4em;
    min-height:2em;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 40%;

}
</style>
