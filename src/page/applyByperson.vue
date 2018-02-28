
<template>
    <div class="apply">
      <div class="apply-head">
        <div class="apply-h-lf" :style="{backgroundImage: 'url(' + vistinfo.logoUrl + '?w=98&h=98)'}"></div>
        <div class="apply-h-md">
          <h1 class="apply-h-name">{{vistinfo.visitNickName}}</h1>
        </div>
        <div class="apply-h-rt"></div>
      </div>
      <div class="apply-body">
        <ul class="apply-show">
          <li class="apply-item"><label>手机号码</label><span>{{vistinfo.mobile}}</span></li>
          <li class="apply-item"><label>所在区域</label><span>{{vistinfo.area}}</span></li>
          <li class="apply-item"><label>参观时间</label><span>{{vistinfo.startTime}}</span></li>
        </ul>
        <ul class="apply-deco">
          <li class="apply-item"><label>装修预算</label><span>{{vistinfo.decorateBudget}}万</span></li>
          <li class="apply-item"><label>项目面积</label><span>{{vistinfo.decorateSize}}平方米</span></li>
          <li class="apply-item"><label>装修时间</label><span>{{vistinfo.decorateDate}}</span></li>
        </ul>
      </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            vistinfo:{},
            vid:'',
            uid:''
        }
    },
    created () {
        this.vid=this.$route.params.vid;
        this.uid=this.$route.params.uid;
        this.getVisitInfo()
    },
    methods: {
        getVisitInfo(){
            this.$http.post(this.$api.apihost+'visit/getVisitInfo',{
                vid:this.vid,
                uid:this.uid
            },{emulateJSON:true}).then(function(res){
                console.log(res.body);
                const vistinfo=res.body.obj;
                this.vistinfo=vistinfo;
            },function(res){
                console.log(res.body);
            });
        }
    }
}
</script>
<style scoped>
  .apply-head{
    padding:0.26rem 0.5rem 0.26rem 0.5rem;
    background-color: #fff;
      margin-top:0.2rem;
    margin-bottom:0.18rem;
  }
  .apply-head:after{
    content:"";
    display:block;
    clear:both;
  }
  .apply-h-lf{
    float:left;
    width:0.98rem;
    height:0.98rem;
    background-repeat: no-repeat;
    border-radius: 50%;
    background-size: 100%;
  }
  .apply-h-name{
    float:left;
    font-family: "PingFang bold",'Droid Sans Fallback', sans-serif;
    font-size: 0.36rem;
    color:#333;
    margin-left:0.24rem;
    padding-top:0.2rem;
  }
  .apply-h-rt{
    float:right;
    width: 0.76rem;
    height:0.98rem;
    /*padding-right:0.32rem;*/
    background: url(../images/vueimg/erweima.svg) left center no-repeat,url(../images/visit/arrow_right.svg) right center no-repeat;
    background-size: 0.44rem 0.44rem,0.14rem 0.2rem;
  }
  .apply-body ul{
    padding-left:0.5rem;
    background-color: #fff;
  }
  .apply-item{
    height:0.88rem;
    line-height: 0.88rem;
    border-bottom:0.01rem solid #e5e8ee;
  }
  .apply-item label{
    font-family: "PingFang Medium",'Droid Sans Fallback', sans-serif;
    font-size: 0.28rem;
    color:#333;
    margin-right:0.5rem;
  }
  .apply-item span{
    font-family: "PingFang Medium",'Droid Sans Fallback', sans-serif;
    font-size: 0.28rem;
    color:#9d9ea0;
  }
  .apply-deco{
    margin-top:0.18rem;
  }
  .apply-show li:last-child,.apply-deco li:last-child{
    border:0;
  }
</style>
