<template>
<div id="app">
  <transition :name="transitionName">
      <router-view></router-view>
  </transition>
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
    width:100%;
    font-size: $font;
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  height:100%;
  width:100%;
}
#content{
    /*overflow: scroll;*/
}
</style>
