<template lang="html">
  <div class="Page flex column">
      <m-header :classObj1="classObj1" :classObj="classObj" :title="title" v-on:navBtn="navBtn"></m-header>
      <main class="f-g1 bc-color">

          <div v-if="notData" style="text-align:center">
              暂无数据...
          </div>
          <ul v-else id="list"  v-for="item in items">
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
            url:'/update/',
            notData:false
        }
    },
    methods: {
        back: function() {

        },
        _getList: function() {
            let that = this;
            this.$http.get('adhoc/list').then(function(result){
                console.log(result.data.code)
                if(result.data.code == 503) {
                    window.location.href="login.html";        
                }else if( result.data.result.list.length === 0) {

                    that.notData = true;
                } else {
                    that.notData = false;
                    that.items = result.data.result.list;

                }

            }).catch(function(error){

            });
        },
        navBtn: function(type) {
            if(type === "left") {
                this.$router.push({path:'/add'});
            } else {
                console.log('right')
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
