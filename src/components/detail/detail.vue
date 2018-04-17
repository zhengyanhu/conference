<template lang="html">
    <div class="Page flex column">
        <header class="header">
            <div class="head">
                <div @click="back()" class="btn-leftA"></div>
                <h1 class="title">{{ headStyle.title }}</h1>
                <div class="btn-rightA"></div>
            </div>
        </header>
        <main class="f-g1">
            <ul id="list"  v-for="item in items">
                <list :item="item"></list>
            </ul>
        </main>
        <div @click="deleteItem()" id="delete">删除会议</div>
    </div>

</template>
<script>
import list from '../list-page/list'
export default {
    created() {
        //console.log(this.$route.params.id)
        this.items.push(JSON.parse(localStorage.getItem("ListItemStor")));
    },
    data() {
        return {
            headStyle: {
              title: '会议详情'
          },
          items:[]
        }
    },
    methods:{
        back: function(){
            window.history.back();
        },
        deleteItem: function() {
           //console.log(this.$route.params.id)
           var me = this;
            this.$http.get('http://192.168.5.56:8090/adhoc/del/'+this.$route.params.id).then(function(json){
                console.log(json)
                if(json.data.code == "0"){
                    me.$router.push({path:'/infoDetail'});
                }else{
                    alert(json.data.message);
                }

            })

        }
    },
    components:{
        list
    }
}
</script>

<style scoped lang="css">
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
    background-image: url('../../images/back.png')
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
#delete{
    height:2.5rem;
    background-color:#0076ff;
    margin:0 auto;
    color:#fff;
    line-height:2.5rem;
    text-align:center;
    width: 100%;
}

</style>
