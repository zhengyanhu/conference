<template lang="html">
  <div class="Page flex column">
      <header class="header">
          <div class="head">
              <div @click="back()" class="btn-leftA"><span style="font-size:1.6rem;" class="fa fa-plus fa-2x"></span></div>
              <h1 class="title">{{ headStyle.title }}</h1>
              <div class="btn-rightA"></div>
          </div>
      </header>
      <main class="f-g1 bc-color">
          <ul id="list"  v-for="item in items">
              <list :url="url" :item="item"></list>
          </ul>
      </main>
  </div>
</template>

<script>
import list from '../list-page/list'
export default {
  created() {
      this._getList();
  },
  data() {
    return {
      headStyle: {
        title: '会议信息'

      },
      items:[],
      url:'/detail/'
    }
  },
  methods: {
    back: function() {
        this.$router.push({path:'/home'});
    },
    _getList: function() {
        let that = this;
        this.$http.get('http://192.168.5.13:8080/adhoc/list').then(function(result){
            console.log(result.data.result.list)
            that.items = result.data.result.list;
        }).catch(function(error){

        });
    }
  },
  components:{
    list
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
    padding-top:.8rem;
    //background-image: url('../../images/back.png')
}
.btn-left{
    min-width:4em;
    min-height:2em;

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
