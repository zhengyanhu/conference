<template lang="html">
    <li class="list bc-fff" @click="toDetailPage()">
        <div class="line flex">
            <div class="tit">
                <span class="fa fa-tags fa-lg font-color"></span>
                <span class="font-color1">主题</span>
            </div>
            <div class="">
                <span>{{ item.name }}</span>
            </div>
        </div>
        <div class="line flex">
            <div class="tit">
                <span class="fa fa-address-card fa-lg font-color"></span>
                <span class="font-color1 tit">预定人</span>
            </div>
            <div class="">
                <span>{{ item.createBy }}</span>
            </div>

        </div>
        <div class="line flex">
            <div class="tit">
                <span class="fa fa-calendar-check-o fa-lg font-color"></span>
                <span class="font-color1 tit">时间</span>
            </div>
            <div class="">
                <span style="color:#0076ff">{{item.startTime+" - "+item.endTime}}</span>
            </div>

        </div>
        <div class="line flex">
            <div class="tit">
                <span class="fa fa-phone fa-lg font-color"></span>
                <span class="font-color1 tit">会议号</span>
            </div>
            <div class="">
                <span>{{ item.accessCode }}</span>
            </div>

        </div>
    </li>
</template>

<script>
export default {
    props:{
        item:{
            type:Object,
            default:''
        },
        url:{
            type:String,
            default:''
        }
    },
    methods:{
        toDetailPage: function() {
            var id = this.item.id;
            //console.log(this.url)
            localStorage.setItem("ListItemStor",JSON.stringify(this.item));
            this.$router.push({path:this.url+id});
        }
    }
}
</script>

<style lang="css">
.font-color{
    color:#0076ff;
    font-size: 1.2rem;
}
.font-color1{
    color: #666666;
}
.line{
    padding: .5rem;
}
.bc-color{
    background:#F6F6F6;
}
.bc-fff{
    background: #fff;
}
.Page{
    width: 100%;
    height: 100%;
}
.tit{
    width: 7rem;
}
.list{
    margin-top: .8rem;
}
</style>
