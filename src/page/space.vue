<template>
  <div class="space">
    <div class="space-head" :style="{backgroundImage:'url('+myoverimg+')'}">
      <form id= "uploadBac">
        <input type="file" accept="image/*" @change="spaBac"    name="file" multiple/>
      </form>
      <div class="space-con">
        <router-link to="/infosOfme" class="space-face" :style="'background:url('+face+') center center no-repeat;background-size:cover;'"></router-link>
        <router-link to="" class="space-name">{{name}}</router-link>
      </div>
    </div>
    <div class="space-body">
      <router-link to="/reProject" class="space-release"></router-link>
      <yd-infinitescroll :on-infinite="loadList" ref="infinitescrollDemo">
        <yd-list theme="1" slot="list">
            <div class="space-show" v-for="item in list" @click="location" :data-pid="item.pid">
              <h1 class="space-proName"><router-link :to="{path:'/detailInSpace/'+item.pid}" class="space-faceName" :style="'background:url('+comimg+item.coverImgUrl+'?w=68&h=68) center center no-repeat;background-size:cover;'"></router-link><router-link :to="{path:'/detailInSpace/'+item.pid}" class="space-faceDesc">{{item.title}}</router-link></h1>
              <ul class="space-sall">
                <li v-for="val in item.recordList">
                  <h2 class="space-time">{{val.createTime}}</h2>
                  <div class="space-proTrack" v-if="val.recordImgList.length>=4">
                    <!--<div class="space-image">-->
                      <!--<span v-for="vale in val.recordImgList" :style="'background:url('+comimg+vale.imgUrl+') center center no-repeat;background-size:cover;'"></span>-->
                    <!--</div>-->
                    <yd-lightbox class="space-image">
                      <yd-lightbox-img v-for="(vale,ind) in val.recordImgList" v-show="ind==4?false:true" :key="ind" :src="comimg+vale.imgUrl+'?w=100&h=100'"></yd-lightbox-img>
                    </yd-lightbox>
                    <router-link :to="{path:'/detailInSpace/'+item.pid}" class="space-record">{{val.content}}</router-link>
                  </div>
                  <div class="space-proTrack" v-else-if="val.recordImgList.length>=1">
                    <!--<div class="space-image space-imgOne" :style="'background:url('+comimg+val.recordImgList[0].imgUrl+') center center no-repeat;background-size:cover;'">-->
                    <!--</div>-->
                    <yd-lightbox class="space-image space-imgOne">
                      <yd-lightbox-img v-for="(vale,ind) in val.recordImgList" v-show="ind==0?true:false" :key="ind" :src="comimg+vale.imgUrl+'?w=204&h=143'"></yd-lightbox-img>
                    </yd-lightbox>
                    <router-link :to="{path:'/detailInSpace/'+item.pid}" class="space-record">{{val.content}}</router-link>
                  </div>
                  <div class="space-proTrack" v-else>{{val.content}}</div>
                </li>
              </ul>
              <h3 class="space-shrink" @click="slidup" v-if="item.recordList.length>1">展开</h3>
              <h3 class="space-shrink" @click="slidup" v-else style="display:none;">展开</h3>
            </div>
        </yd-list>
        <!-- 数据全部加载完毕显示 -->
        <span slot="doneTip"></span>
        <!-- 加载中提示，不指定，将显示默认加载中图标 -->
        <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
      </yd-infinitescroll>
    </div>
  </div>
</template>
<script>
    export default {
      data(){
        return{
          comimg:this.$api.imghost,
          arrDown:require("../images/space/arrow-down.svg"),
          arrUp:require("../images/space/arrow-top.svg"),
          backImg:"",
          back: {
            backgroundImage: "url(" + require("../images/space/space_banner.jpg") + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            backgroundPosition: "center",
          },
          page: 0,
          pageSize: 10,
          pagenum: 0,
          list: [],
          name:"",
          face:"",
          myoverimg:require('../../static/img/myoverimg.jpg')
        }
      },
      created () {
        this.name=localStorage.nickname;
        this.face= localStorage.headimgurl;
        if (localStorage.coverImgUrls) {
            this.myoverimg=localStorage.coverImgUrls
        }
        // this.geidis()
        this.loadList();
      },
      methods: {
        loadList() {
          this.$http.post(this.$api.apihost+'project/getRecordByUser',{uid:localStorage.uid,startRow:this.page,rowCount:this.pageSize},{emulateJSON:true}).then(function (response) {
              if(response.body.obj !=""){
                const _list = response.body.obj.proList;
                this.list = [...this.list, ..._list];
                let count=response.body.obj.count;
                let pagecount=Math.ceil(count/this.pageSize);
                if (_list.length < this.pageSize || this.page == pagecount) {
                  /* 所有数据加载完毕 */
                  this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
                  return;
                }
                /* 单次请求数据完毕 */
                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
                this.pagenum++;
                this.page+=this.pageSize;
              }
            });
          },
        slidup(e){
          if($(e.target).siblings(".space-sall").find("li").length>1){
            if($(e.target).siblings(".space-sall ").find("li:nth-child(2)").css("display")=="none"){
              $(e.target).siblings(".space-sall ").find("li:not(:first-child)").slideDown(200);
              $(e.target).text("收起").css({"background":"url("+this.arrUp+") 3.5rem center no-repeat","background-size":"0.2rem 0.13rem"});
            }else{
              $(e.target).siblings(".space-sall ").find("li:not(:first-child)").slideUp(200);
              $(e.target).text("展开").css({"background":"url("+this.arrDown+") 3.5rem center no-repeat","background-size":"0.2rem 0.13rem"});
            }
          }
        },
        spaBac(){
          var formData = new FormData($("#uploadBac" )[0]);
          $.ajax({
            url: this.$api.upimgurl,
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success:(data)=> {
              if(data.indexOf("MD5:")!= -1){
                let imgUrl=$.trim(data.substring(data.indexOf("MD5:") + 4, data.indexOf("</h1>")));
                // this.picUrlval.push(imgUrl);
                let coimg=this.$api.imghost+imgUrl;
                this.$http.post(this.$api.apihost+'user/updateCoverImgUrl',{
                  uid:localStorage.uid,
                  coverImgUrlFollow:'',
                  coverImgUrl:imgUrl
                },{emulateJSON:true}).then((res)=>{
                  this.myoverimg=coimg;
                  localStorage.coverImgUrls=this.myoverimg;
                },(err)=>{
                });
              }
            },
            error: (returndata)=> {
              alert(returndata);
            }
          });
        },
        reProject(){
          this.$router.push({ path: '/reProject'})
        },
        location(e){
//          var pid=$(e.target).data("pid");
//          alert(pid)
        }
      }
    }
</script>
<style>
.overimg{
        width: 100%;
        height: 100%;
        opacity: 0;
    }
  .space-head {
    width:7.5rem;
    height:2.88rem;
    position:relative;
    background-position:center;
    background-repeat:no-repeat;
    background-size: cover;
  }
  .space-sall{
    padding-left:0.44rem;
  }
  .space-sall li:not(:first-child){
    display:none;
  }
  .space-con{
    position:absolute;
    left:0.48rem;
    bottom:-0.28rem;
  }
  .space-face{
    display:inline-block;
    width:1.42rem;
    height:1.42rem;
    /*border:0.03rem solid #fff;*/
    vertical-align: middle;
    margin-right:0.15rem;
  }
  .space-name{
    font-family: "PingFang Medium",'Droid Sans Fallback', sans-serif;
    color:#fff;
    text-shadow: 0 3px 8px rgba(120, 115, 112, 0.52);
  }
  .space-body{
    /*padding-left:0.44rem;*/
    background-color: #fff;
  }
  .space-release{
    display:inline-block;
    margin-left:0.48rem;
    width:1.2rem;
    height:1rem;
    margin-top:0.71rem;
    background:url(../images/space/release.svg) center center no-repeat;
    background-size:100% 100%;
  }
  .st0{fill:#EBEEF4;}
  .st1{fill:#A6AFC1;}
  .space-proName{
    margin-top:0.6rem;
    padding-bottom:0.3rem;
    margin-left:0.44rem;
    border-bottom:0.01rem solid #e5e8ee;
  }
  .space-faceName{
    display:inline-block;
    width:0.68rem;
    height:0.68rem;
    border-radius:50%;
    background:url(../images/space/space_face.jpg) center center no-repeat;
    background-size:cover;
    vertical-align: middle;
    margin-right:0.1rem;
  }
  .space-show{
    border-bottom:0.19rem solid #f4f8ff;
    background-color: #fff;
  }
  .space-show li{
    padding-bottom:0.45rem;
    border-bottom:0.01rem solid #e5e8ee;
  }
  .space-faceDesc{
    font-family: "PingFang Bold", 'Droid Sans Fallback', sans-serif;
    color:#333;
  }
  .space-time{
    font-family: "PingFang Medium",'Droid Sans Fallback', sans-serif;
    color:#9d9ea0;
    padding:0.3rem 0 0.2rem;
  }
  .space-proTrack:after{
    content:"";
    display:block;
    clear:both;
  }
  .space-proTrack{
    font-family: "PingFang Regular",'Droid Sans Fallback', sans-serif;
    color:#333;
    padding-right:0.44rem;
  }
  .space-image{
    float:left;
    width:2.04rem;
    margin-right:0.37rem;
  }
  /*.space-image span{*/
    /*float:left;*/
    /*width:1rem;*/
    /*height:1rem;*/
    /*margin-right:0.04rem;*/
    /*margin-bottom:0.04rem;*/
    /*background: url(../images/space/space01.jpg) center center no-repeat;*/
    /*background-size: cover;*/
  /*}*/
  /*.space-image span:nth-child(2n){*/
    /*margin-right:0;*/
  /*}*/
  /*.space-image span:nth-child(3),.space-image span:nth-child(4){*/
    /*margin-bottom:0;*/
  /*}*/
  .space-image img{
    float:left;
    width:1rem;
    height:1rem;
    margin-right:0.04rem;
    margin-bottom:0.04rem;
  }
  .space-image img:nth-child(2n){
    margin-right:0;
  }
  .space-image img:nth-child(2)~img{
      margin-bottom:0;
  }
  .space-proTrack .space-record{
    font-family: "PingFang Regular",'Droid Sans Fallback', sans-serif;
    color:#333;
    float:left;
    width:4.1rem;
    /*line-height:0.2rem;*/
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
    margin-top:-0.05rem;
  }
  .space-imgOne.space-image{
    height:1.43rem;
  }
  .space-imgOne.space-image img{
      width:100%;
    height:100%;
  }
  .space-show .space-imgOne .space-record{
    -webkit-line-clamp: 4;
  }
  .space-shrink{
    font-family: "PingFang Regular",'Droid Sans Fallback', sans-serif;
    font-size:0.24rem;
    height:0.84rem;
    line-height:0.84rem;
    text-indent:2.92rem;
    color:#6198d4;
    background: url(../images/space/arrow-down.svg) 3.5rem center no-repeat;
    background-size: 0.2rem 0.13rem;
  }
  #uploadBac{
    position:absolute;
    width:100%;
    height:100%;
  }
  #uploadBac input{
    width:100%;
    height:100%;
    opacity: 0;
  }
</style>
