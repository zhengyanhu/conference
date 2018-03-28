<template lang="html">
  <div class="Page flex column">
      <m-header :classObj1="classObj1" :classObj="classObj" :title="title" v-on:navBtn="navBtn"></m-header>
      <main class="f-g1 bc-color">
          <ul id="list"  v-for="item in items">
              <list :url="url" :item="item"></list>
          </ul>
      </main>
  </div>
</template>

<script>
import MHeader from '../m-header/header'
import list from '../list-page/list'
export default {
    created() {
        this._getList();
    },
    data() {
        return {
            title: '会议信息',
            classObj: {
                'fa':true,
                'fa-plus':true,
                'fa-2x':true
            },
            classObj1:{},
            items:[],
            url:'/detail/'
        }
    },
    methods: {
        back: function() {

        },
        _getList: function() {
            let that = this;
            this.$http.get('http://192.168.5.13:8080/adhoc/list').then(function(result){
                console.log(result.data.result.list)
                that.items = result.data.result.list;
            }).catch(function(error){

            });
        },
        navBtn: function(type) {
            if(type === "left") {
                this.$router.push({path:'/home'});
                console.log('2')
            } else {
                console.log('233')
            }
        }
    },
    components:{
        MHeader,
        list
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
