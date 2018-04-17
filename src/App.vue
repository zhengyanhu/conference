<template>
<div id="app">
    <router-view></router-view>
</div>
</template>

<script>

export default {
  name: 'App',
  data(){
      return {
          transitionName:'slide'
      }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "./common/stylus/index"
*{
    margin: 0;
    padding: 0;
    box-sizing:border-box;
}
html,body{
    height:100%;
    max-width:420px;
    margin: 0 auto;
    font-size: $font;
    background-color:$color-border;
    overflow: hidden;
}
ul{
    list-style:none;
}
input{
    outline:none;
    border: 0px;
}
.flex{
    display:$flex;
}
.column{
    display:$flex;
    flex-direction:$column;
}
.f-g1{
    flex-grow:$fg1;
}
.ivu-input {
    border:none;
}
.ivu-icon-ios-clock-outline:before {
    content:"";
}
.ivu-icon-ios-calendar-outline:before {
    content:"";
}
.ivu-input-icon-normal+.ivu-input{
    color:$fontColor;
    font-size:1rem;
    text-align:right;
    padding-right:.5rem;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  height:100%;
  width:100%;
  background-color:#fff;
}
#content{
    /*overflow: scroll;*/
}
</style>
