<template>
  <div class="aEdit">
    <div class="aEdit-head" v-show="aeHead">
      <h1>{{proInfo.title}}</h1>
      <h2>预算: <label class="budget">{{proInfo.budget}}</label>万 / 面积: <label class="area">{{proInfo.proSize}}</label>万 / 已开工<label class="day">{{DateDiff(nowtime,proInfo.startDate)}}</label>天</h2>
    </div>
    <div class="aEdit-body">
      <ul class="aEdit-record">
        <li @click="show" class="aEdit-item active">增加记录</li>
        <li @click="show" class="aEdit-item active">编辑记录</li>
        <li @click="show" class="aEdit-item active">编辑是否公开浏览</li>
        <li @click="show" class="aEdit-item active">删除记录</li>
      </ul>
    </div>
    <div class="aEdit-info">
      <h1><span>编辑项目信息</span><i class="more" @click="more"></i></h1>
      <ul class="aEdit-deInfo">
        <li @click="show" class="aEdit-item">项目地址</li>
        <li @click="show" class="aEdit-item">预算</li>
        <li @click="show" class="aEdit-item">面积</li>
        <li @click="show" class="aEdit-item">开工日期</li>
        <li @click="show" class="aEdit-item">是否需要提供预约</li>
      </ul>
    </div>
    <button class="reProject-send" @click="releasepro">确定</button>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        arrowDown:require("../images/space/arrow-down.svg"),
        arrowTop:require("../images/space/arrow-top.svg"),
        proInfo:{
          startDate:"2018-1-1"
        },
        nowtime:"",
        pidAll:[],
        aeHead:false,
        title:"权限编辑"
      }
    },
    created() {
      this.nowtime=Date.parse(new Date());
      this.getPid();
      document.title=this.title;
    },
    methods: {
      getPid(){
        this.pidAll=this.$route.params.pidAll.split(",");
        if(this.pidAll.length>1){
          this.aeHead=false;
        }else{
          this.aeHead=true;
          this.getProInfo();
        }
      },
      getProInfo() {
        this.$http.post(this.$api.apihost+'project/getProInfo',{pid:this.$route.params.pidAll},{emulateJSON:true}).then   (function (response) {
          if(response.body.obj !=""){
            this.proInfo= response.body.obj;
          }
        });
      },
      show(e){
        if($(e.target).css("background-image") == "none"){
          $(e.target).addClass("active");
        }else{
          $(e.target).removeClass("active");
        }
      },
      more(e){
        if($(".aEdit-deInfo").css("display") == "none"){
          $(e.target).css({"background":"url("+this.arrowDown+") center center no-repeat","background-size":"0.2rem 0.13rem"});
          $(e.target).parent().siblings().slideDown();
        }else{
          $(e.target).css({"background":"url("+this.arrowTop+") center center no-repeat","background-size":"0.2rem 0.13rem"});
          $(e.target).parent().siblings().slideUp();
        }
      },
      releasepro(){
        let  addRecord,editRecord,editOpenStatus,delRecord,editAddr,editBudget,editProSize,editStartDate;
        let pid={};
          pid.list=this.pidAll;
        let pidStr=JSON.stringify(pid);
        $(".aEdit .aEdit-item").each(function(i,val){
          switch($(val).text()){
            case "增加记录":$(val).css("background-image")!= "none"?addRecord=1:addRecord=0;break;
            case "编辑记录":$(val).css("background-image")!= "none"?editRecord=1:editRecord=0;break;
            case "编辑是否公开浏览":$(val).css("background-image")!= "none"?editOpenStatus=1:editOpenStatus=0;break;
            case "删除记录":$(val).css("background-image")!= "none"?delRecord=1:delRecord=0;break;
            case "项目地址":$(val).css("background-image")!= "none"?editAddr=1:editAddr=0;break;
            case "预算":$(val).css("background-image")!= "none"?editBudget=1:editBudget=0;break;
            case "面积":$(val).css("background-image")!= "none"?editProSize=1:editProSize=0;break;
            case "开工日期":$(val).css("background-image")!= "none"?editStartDate=1:editStartDate=0;break;
          }
        });
        this.$http.post(this.$api.apihost+'user/proAuthorize',{pid:pidStr,suid:localStorage.suid,uid:localStorage.uid,addRecord,editRecord,editOpenStatus,delRecord,editAddr,editBudget,editProSize,editStartDate},{emulateJSON:true}).then(function(response){
          // alert(response);
          this.$router.push({name:'aSubCount'});
        });
      },
      //计算天数差的函数
        DateDiff(sDate1,  sDate2){//sDate1是时间戳，sDate2是2006-12-18格式
            var  aDate,  oDate1,  oDate2,  iDays
           oDate1=sDate1
           // aDate  =  sDate2.split("-")
           var arr = sDate2.split(/[- : \/]/);
            oDate2 = new Date(arr[0], arr[1]-1, arr[2]);
           // oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
           iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
           return  iDays
        },
    }
  }
</script>
<style scoped>
  .aEdit-head{
    padding-left:0.5rem;
  }
  .aEdit-head h1{
    font-family: "PingFang Heavy",'Droid Sans Fallback', sans-serif;
    font-size: 0.4rem;
    color:#333;
    width:4.29rem;
    line-height: 1.1;
    padding-top:0.38rem;
    padding-bottom:0.2rem;
  }
  .aEdit-head h2{
    font-family: "PingFang Light",'Droid Sans Fallback', sans-serif;
    font-size: 0.22rem;
    color: rgb(176, 176, 176);
    padding-bottom:0.4rem;
  }
  .aEdit-record li:last-child{
    border:0;
  }
  .aEdit-record .aEdit-back{
    display:block;
  }
  .aEdit-body,.aEdit-info{
    padding-left:0.5rem;
    background-color: #fff;
  }
  .aEdit-info{
    border-top:0.19rem solid #f4f8ff;
  }
  .aEdit-info h1{
    font-size:0.28rem;
    font-family: "PingFang Medium",'Droid Sans Fallback', sans-serif;
    color:#333;
    height:0.87rem;
    line-height: 0.87rem;
    overflow: hidden;
    font-weight:normal;
    border-bottom:0.01rem solid #e5e8ee;

  }
  .aEdit-info span{
    float:left;
  }
  .aEdit-info .more{
    float:right;
    width:1.14rem;
    height:100%;
    background: url(../images/space/arrow-top.svg) center center no-repeat;
    background-size: 0.2rem 0.13rem;
  }
  .aEdit-deInfo{
    display:none;
  }
  .aEdit-record li,.aEdit-deInfo li{
    font-size:0.28rem;
    font-family: "PingFang Medium",'Droid Sans Fallback', sans-serif;
    color:#333;
    height:0.87rem;
    line-height: 0.87rem;
    overflow: hidden;
    border-bottom:0.01rem solid #e5e8ee;
    background-image: none;
    background-position: 6.18rem center;
    background-repeat: no-repeat;
    background-size:0.33rem 0.22rem;
  }
  .aEdit-record li.active,.aEdit-deInfo li.active{
    background-image: url(../images/space/project_selected.svg);
  }
  /*.aEdit-name{*/
    /*float:left;*/
  /*}*/
  /*.aEdit-back{*/
    /*float:right;*/
    /*width:0.33rem;*/
    /*height:100%;*/
    /*float:right;*/
    /*margin-right:0.49rem;*/
    /*background: url(../images/space/project_selected.svg) center center no-repeat;*/
    /*background-size:0.33rem 0.22rem;*/
    /*display:none;*/
  /*}*/
  .reProject-send{
    font-family: "PingFang Bold",'Droid Sans Fallback', sans-serif;
    font-size:0.32rem;
    color:#fff;
    width:6.4rem;
    text-align: center;
    height:0.92rem;
    line-height: 0.92rem;
    margin-top:0.56rem;
    margin-bottom:0.34rem;
    background-color: #6198d4;
    border-radius:0.05rem;
    border:none;
    outline: none;
    margin-left:0.5rem;
  }
</style>



