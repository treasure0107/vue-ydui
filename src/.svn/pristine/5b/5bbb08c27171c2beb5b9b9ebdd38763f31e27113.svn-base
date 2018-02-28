<template>
  <div class="proTitle">
    <div class="proTitle-head"></div>
    <span class="determine"  @click="submit">确定</span>
    <div class="proTitle-show">
      <ul class="proTitle-con">
        <li @click="select" v-for="(item,ind) in list" :key="ind" :data-pid="item.pid">{{item.title}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        list:[],
        pidAll:[],
        title:"授权项目标题"
      }
    },
    created () {
      this.proTitle();
      document.title=this.title;
    },
    methods: {
      submit(){
        $(".proTitle-con li").each((i,val) =>{
          if($(val).hasClass("active")){
            this.pidAll.push($(val).data("pid"));
          }
        });
        if(this.pidAll.length>=1){
          this.pidAll=this.pidAll.join(",");
          this.$router.push({name:'aEdit',params:{pidAll:this.pidAll}});
        }
      },
      select(e){
        if($(e.target).hasClass("active")){
          $(e.target).removeClass("active");
        }else{
          $(e.target).addClass("active");
        }
      },
      proTitle() {
        this.$http.post(this.$api.apihost+'project/getProTitleList',{uid:localStorage.uid},{emulateJSON:true}).then(function (response) {
          if(response.body.obj !=""){
            const _list = response.body.obj.titleList;
            this.list = [...this.list, ..._list];
          }
        });
      },
    }
  }
</script>
<style scoped>
  .proTitle{
    position:relative;
    background-color: #fff;
  }
  .determine{
    font-size:0.28rem;
    font-family: "PingFang Medium",'Droid Sans Fallback', sans-serif;
    color: rgb(97, 152, 212);
    position:absolute;
    top:0.22rem;
    right:0.39rem;
  }
  .proTitle-head{
    height:0.8rem;
    border-bottom:0.01rem solid #e7effb;
  }
  .proTitle-show{
    padding-left:0.5rem;
  }
  .proTitle-show li{
    font-size:0.28rem;
    font-family: "PingFang Medium",'Droid Sans Fallback', sans-serif;
    color:#333;
    height:1.06rem;
    line-height: 1.06rem;
    overflow: hidden;
    border-bottom:0.01rem solid #e5e8ee;
  }
  .proTitle-show li{
    background:none;
    background-size:0.33rem 0.22rem;
  }
  .proTitle-show li.active{
    background: url(../images/space/project_selected.svg) 6.18rem center no-repeat;
    background-size:0.33rem 0.22rem;
  }
</style>

