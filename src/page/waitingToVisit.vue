<template>
  <div>
    <div class="head_sl">
      <div @click="allStatusBtn" class="head_pro_btn">
        {{valueStatus}}
        <i v-bind:class="{arrow_d:isArrow ,arrow_t:!isArrow}"></i>
      </div>
      <ul class="head_list" v-show="allStatus">
        <li @click="allbtn">全部</li>
        <li @click="pendingBtn">待审核</li>
        <li @click="verifyPassBtn">审核通过</li>
        <li @click="verifyFailBtn">未通过 <span style="color: #9d9ea0;">(无法参观)</span></li>
        <li @click="appraiseBtn">已评价</li>
        <li @click="cancelBtn">已取消</li>
      </ul>
    </div>
    <!--按需加载-->
    <div style="clear: both;padding-top: 0.86rem;">
      <yd-infinitescroll :on-infinite="getAllVisit" ref="infinitescrollDemo">
        <yd-list theme="1" slot="list">
          <div v-for="item in list">
            <div class="cation_head" @click="skipLink(item.vid,item.status)">
              <!--<router-link :to="{path:'/applicationDetails/'+item.vid,params:{vid:item.vid,status:item.status}}">-->
              <div class="cation_img">
                <img :src="imgurl+item.coverImgUrl" alt="">
              </div>
              <div class="cation_con">
                <div class="cation_tit">
                  <p>{{item.title}}</p>
                </div>
                <div class="budget_area">
                  预算:{{item.budget}}万元/ 面积:{{item.proSize}}平方米 / 已开工{{DateDiff(nowTimes, item.startDate || startDate)}}天
                </div>
                <div class="visit_hours ">参观时间 {{item.startTime}}</div>
              </div>
              <!--</router-link>-->
            </div>
            <div>
              <div class="contact_con icon_v" v-if="item.status==0">
                <span class="icon_pend">待审核</span>
                <span class="cancel_btn appointment_can" @click="cancelVisit(item.vid)">取消预约</span>
              </div>
              <div class="contact_con" v-if="item.status==1">
                <span class="icon_t">审核通过</span>
                <span class="cancel_btn" @click="cancelVisit(item.vid)">取消预约</span>
                <div @click="evaluateBtn(item.pid,item.vid)">
                  <yd-button class="contact_btn appraise_btn appraise_btn_s" size="small" type="hollow">评价</yd-button>
                </div>
                <span class="contact_btn contact_btn_p"><a :href="'tel:'+item.phone">联系Ta</a></span>
              </div>
              <div class="contact_con icon_v" v-if="item.status==2">
                <span>未通过</span>
                <span class="cancel_btn" style="color: #6198d4;border:0.01rem solid #6198d4;"
                      @click="applyAgain(item.pid)">重新申请</span>
              </div>
              <div class="contact_con icon_p" v-if="item.status==3">
                <span>已评价</span>
                <!--evaluateBtn(item.pid,item.vid) -->
                <div @click="myRatBtn(item.pid,item.vid)">
                  <yd-button class="contact_btn appraise_btn appraise_btn_sh" size="small" type="hollow">
                    我的评价
                  </yd-button>
                </div>
              </div>
              <div class="contact_con icon_p" v-if="item.status==4">
                <span>已取消</span>
              </div>
            </div>
            <div class="main"></div>
          </div>
        </yd-list>
        <!-- 数据全部加载完毕显示 -->
        <span slot="doneTip"></span>
        <!-- 加载中提示，不指定，将显示默认加载中图标 -->
        <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
      </yd-infinitescroll>
    </div>

    <!--评价的弹窗-->
    <div>
      <yd-popup v-model="commentModel" v-show="commentModel" position="center" width="90%" class="appraise_con">
        <div class="construct_t con_ct">
          <span class="close_d" @click="sureClose"></span>
          <p class="construct_title">施工工艺</p>
          <yd-cell-item class="construct_item">
            <yd-rate slot="left" v-model="rateNum" activeColor="#6198d4"></yd-rate>
            <!--<span slot="right">值是: {{rateNum}}</span>-->
          </yd-cell-item>
        </div>
        <div class="construct_t">
          <p class="construct_title">师傅态度</p>
          <div class="attitude_m" v-model="mannerLevel">
            <span v-bind:class="{ ardour_m:isard ,ardour_mt:!isard}" @click="ardour_m">热情</span>
            <span v-bind:class="{ friendly_m:isfriend,friendly_mt:!isfriend}" @click="friendly_m">友善</span>
            <span v-bind:class="{ same_as:isas,same_ast:!isas}" @click="sameAs">一般</span>
          </div>
        </div>
        <div class="text_area">
          <textarea placeholder="写几句评价吧!" maxlength="100" v-model="textArea"></textarea>
        </div>
        <p style="text-align: center;">
          <yd-button-group>
            <yd-button class="button_sure" type="primary" @click.native="proEvaluateBtn">确定</yd-button>
          </yd-button-group>
        </p>
      </yd-popup>
    </div>

    <!--获取评价的弹窗-->
    <div>
      <yd-popup v-model="myRating" v-show="myRating" position="center" width="90%" class="appraise_con">
        <div class="construct_t con_ct">
          <span class="close_d" @click="backClose"></span>
          <p class="construct_title">施工工艺</p>
          <yd-cell-item class="construct_item">
            <yd-rate slot="left" v-model="rateNumMy" activeColor="#6198d4"></yd-rate>
            <!--<span slot="right">值是: {{rateNumMy}}</span>-->
          </yd-cell-item>
        </div>
        <div class="construct_t">
          <p class="construct_title">师傅态度</p>
          <div class="attitude_m" v-model="mannerLevelMy">
            <span v-bind:class="{ ardour_m:isard ,ardour_mt:!isard}">热情</span>
            <span v-bind:class="{ friendly_m:isfriend,friendly_mt:!isfriend}">友善</span>
            <span v-bind:class="{ same_as:isas,same_ast:!isas}">一般</span>
          </div>
        </div>
        <div class="text_area area_bgc">
          <textarea placeholder="哎呦,不错哦！" maxlength="100" v-model="textAreaMy" readonly></textarea>
        </div>
        <p style="text-align: center;">
          <yd-button-group>
            <!--@click="myRating = false"-->
            <yd-button class="backBtn" type="hollow" @click.native="backClose">返回
            </yd-button>
          </yd-button-group>
        </p>
      </yd-popup>
    </div>
  </div>
</template>
<script>
  import {Tab, TabPanel} from 'vue-ydui/dist/lib.rem/tab';
  import apicom from '../config/api.js'

  export default {
    data() {
      return {
        isArrow: true,
        startDate: "2018-8-16",
        active: true,
        commentModel: false,
        myRating: false,
        isard: false,
        isfriend: true,
        isas: true,
        haveData: true,
        nodata: '暂时没有数据！',
        rateNum: 5,
        rateNumMy: 5,
        list: [],
        status: 5,
        imgurl: apicom.imghost,
        nowTimes: '',
        page: 0,
        pageSize: 10,
        pagenum: 1,
        textArea: '',
        textAreaMy: '',
        mannerLevel: 3,
        mannerLevelMy: 3,
        pid: '',
        vids: '',
        valueStatus: '全部',
        allStatus: false,
        visitUid: localStorage.uid
      };
    },
    created() {
      this.getAllVisit(5);   //全部
      this.ardour_m;
      this.friendly_m;
      this.sameAs;
      var date = Date.parse(new Date());
      this.nowTimes = date;
    },
    methods: {
      skipLink(vid, itemStatus) {
        this.$router.push({name: "applicationDetails", params: {vid: vid}});
        localStorage.status = itemStatus;
      },

      evaluateBtn(pid, vid) {
        this.textArea = '';
        this.isard = false;
        this.isfriend = true;
        this.isas = true;
        this.commentModel = true;
        this.pid = pid;
        this.vids = vid;
      },
      //全部
      getAllVisit() {
        var jsonVal;
        if (this.status == 5) {
          jsonVal = {
            uid: localStorage.uid,
            startRow: this.page,
            rowCount: this.pageSize
          }
        } else {
          jsonVal = {
            uid: localStorage.uid,
            startRow: this.page,
            rowCount: this.pageSize,
            status: this.status
          }
        }
        //拼接url
        const postUrl = apicom.apihost + 'visit/getVisitByWait';
        //请求数据
        this.$http.post(postUrl, jsonVal, {emulateJSON: true}).then(res => {
          if (res.body.obj !== "") {
            const visitList = res.body.obj.visitList;
            this.list = [...this.list, ...visitList];
            const count = res.body.obj.count;
            const pagecount = Math.ceil(count / this.pageSize);
            if (visitList.length < this.pageSize || this.pagenum == pagecount) {
              /* 所有数据加载完毕 */
              this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
              return;
            }
            /* 单次请求数据完毕 */
            this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
            this.pagenum++;
            this.page += this.pageSize;
          }
        }, err => {
          console.log(err);
        })
      },
      allbtn() {
        this.list = [];
        this.page = 0;
        this.pageSize = 10;
        this.pagenum = 1;
        this.status = 5;
        this.valueStatus = "全部";
        this.getAllVisit();
        this.allStatus = false;
      },
      pendingBtn() {
        this.list = [];
        this.page = 0;
        this.pageSize = 10;
        this.pagenum = 1;
        this.status = 0;
        this.valueStatus = "待审核";
        this.getAllVisit();
        this.allStatus = false;

      },
      verifyPassBtn() {
        this.list = [];
        this.page = 0;
        this.pageSize = 10;
        this.pagenum = 1;
        this.status = 1;
        this.valueStatus = "审核通过";
        this.getAllVisit();
        this.allStatus = false;

      },
      verifyFailBtn() {
        this.list = [];
        this.page = 0;
        this.pageSize = 10;
        this.pagenum = 1;
        this.status = 2;
        this.valueStatus = "未通过";
        this.getAllVisit();
        this.allStatus = false;

      },
      appraiseBtn() {
        this.list = [];
        this.page = 0;
        this.pageSize = 10;
        this.pagenum = 1;
        this.status = 3;
        this.valueStatus = "已评价";
        this.getAllVisit();
        this.allStatus = false;

      },
      cancelBtn() {
        this.list = [];
        this.page = 0;
        this.pageSize = 10;
        this.pagenum = 1;
        this.status = 4;
        this.valueStatus = "已取消";
        this.getAllVisit();
        this.allStatus = false;
      },
      allStatusBtn() {
        if (this.allStatus == true) {
          this.isArrow = true;
          this.allStatus = false;
        } else {
          this.isArrow = false;
          this.allStatus = true;

        }
      },
      applyAgain(pid) {  //重新申请
        this.$router.push({name: 'freeVisit', params: {visitUid: this.visitUid, pid: pid}})
      },
      //    取消预约
      cancelVisit(vid) {
        const canUrl = apicom.apihost + 'visit/cancelVisit';
        this.$http.post(canUrl, {
          uid: localStorage.uid,
          vid: vid
        }, {emulateJSON: true}).then(res => {
//          console.log(res);
//          this.$router.go(0);  //刷新页面
          this.getAllVisit();   //全部
        }, err => {
          console.log(err);
        })
      },
//      评价
      ardour_m() {
        this.isard = !this.isard;
        this.isfriend = true;
        this.isas = true;
        if (this.isard) {
          this.mannerLevel = 3;
        } else {
          this.mannerLevel = 3;
        }
      },
      friendly_m() {
        if (this.isfriend) {
          this.mannerLevel = 2;
        } else {
          this.mannerLevel = 3;
        }
        this.isfriend = !this.isfriend
        this.isard = true;
        this.isas = true;
      },
      sameAs() {
        this.isas = !this.isas
        this.isard = true;
        this.isfriend = true;
        if (!this.isas) {
          this.mannerLevel = 1;
        } else {
          this.mannerLevel = 3;
        }
      },
//      backCloseBtn() {  //点击返回关闭我的评价弹窗
//        this.myRating = false;
//      },
      myRatBtn(pid, vid) {  //我的评价(查询评价详情)
        this.$http.post(apicom.apihost + 'visit/getEvaluateInfo', {
          uid: localStorage.uid,  //用户id
          pid: pid,  //项目id
        }, {emulateJSON: true}).then(res => {
          console.log(res.body);
          if (res.body.code != '0000') {
            console.log(res.body.msg)
//            alert(res.body.msg)
          }
//          constructLevel 施工工艺评分  mannerLevel 态度评分        content 评价内容
//          this.rateNumMy=constructLevel
//          if(mannerLevelMy==3){
//            this.isard = false;
//            this.isfriend = true;
//            this.isas = true;
//          }
//          if(mannerLevelMy==2){
//            this.isard = true;
//            this.isfriend = false;
//            this.isas = true;
//          }
//          if(mannerLevelMy==1){
//            this.isard = true;
//            this.isfriend = true;
//            this.isas = false;
//          }
//          this.textAreaMy = 'content ';

        }, err => {
          console.log(err);
        });
        this.myRating = true;

      },
      sureClose() {
        this.commentModel = false
      },
      backClose() {
        this.myRating = false
      },
      proEvaluateBtn() {
        if (this.textArea == "") {
          alert("请您写几句评价吧!");
          return false;
        }
        const postUrl = apicom.apihost + 'visit/proEvaluate';
        this.$http.post(postUrl, {
          pid: this.pid,                    //项目id
          vid: this.vids,                     //参观预约ID
          constructLevel: this.rateNum,    //施工工艺评分
          mannerLevel: this.mannerLevel,  //态度评分
          content: this.textArea,        //评价内容
          uid: localStorage.uid                   //评价人ID
        }, {emulateJSON: true}).then(res => {
          this.commentModel = false;
          this.getPendingEvaluation();  //待评价
        }, err => {
          console.log(err);
        })
      },
      //计算天数差的函数，通用
      DateDiff(sDate1, sDate2) {//sDate1是时间戳，sDate2是2006-12-18格式
        var aDate, oDate1, oDate2, iDays;
        oDate1 = sDate1;
        aDate = sDate2.split("-");
        oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
        iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);    //把相差的毫秒数转换为天数
        return iDays
      }
    }
  }
</script>

<style type="text/css">
  .head_sl {
    width: 100%;
    background-color: #fff;
    border-bottom: 0.01rem solid #e5e8ee;
    font-size: 0.26rem;
    position: fixed;
    z-index: 999;
    background-color: #fff;
  }

  /*.head_sl input {*/
  /*width: 100%;*/
  /*height: 0.8rem;*/
  /*line-height: 0.8rem;*/
  /*padding-left: 0.3rem;*/
  /*font-size: 0.26rem;*/
  /*color: #6198D4;*/
  /*border: 0;*/
  /*border-bottom: 1px solid #e5e8ee;*/
  /*font-family: 'PingFang Bold', 'Droid Sans Fallback', sans-serif;*/
  /*}*/
  .head_pro_btn {
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    padding-left: 0.3rem;
    font-size: 0.26rem;
    color: #6198D4;
    border: 0;
    border-bottom: 1px solid #e5e8ee;
    font-family: 'PingFang Bold', 'Droid Sans Fallback', sans-serif;
    position: relative;
    vertical-align: middle;
  }

  .arrow_d {
    position: absolute;
    width: 0.6rem;
    height: 100%;
    background: url(../images/space/arrow-down.svg) center center no-repeat;
    background-size: 0.2rem 0.13rem;
    vertical-align: middle;
  }

  .arrow_t {
    position: absolute;
    width: 0.6rem;
    height: 100%;
    background: url(../images/space/arrow-top.svg) center center no-repeat;
    background-size: 0.2rem 0.13rem;

  }

  /*.head_sl input::after{*/
  /*content:" ";*/
  /*display: inline-block;*/
  /*width: 0.1rem;*/
  /*height: 0.1rem;*/
  /*background-image: url("../images/visit/arrow_right.svg");*/
  /*background-repeat: no-repeat;*/
  /*background-size: cover;*/
  /*}*/
  .head_list {
    width: 100%;
    /*position: fixed;*/
    /*z-index: 999;*/
    /*background-color: #fff;*/
  }

  .head_list li {
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    padding-left: 0.3rem;
    font-family: 'PingFang Bold', 'Droid Sans Fallback', sans-serif;
    border-bottom: 1px solid #e5e8ee;
    color: #333;
  }

  .head_sl select {
    width: 100%;
    height: 100%;
    font-size: 0.26rem;
    color: #6198D4;
    border: 0;
    padding-left: 0.3rem;
    font-family: 'PingFang Bold', 'Droid Sans Fallback', sans-serif;
  }

  .head_sl select option {
    color: #333;
    width: 100%;
    height: 100%;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    background-color: #fff;
    border-bottom: 1px solid red;
    font-family: 'PingFang Bold', 'Droid Sans Fallback', sans-serif;
  }

  .icon_v {
    font-size: 0.24rem;
    color: #ff5757;
  }

  .icon_t {
    font-size: 0.24rem;
    color: #3dbf59;
  }

  .icon_pend {
    font-size: 0.24rem;
    color: #6198d4;
  }

  .icon_p {
    font-size: 0.24rem;
    color: #9d9ea0;
  }

  .main {
    width: 100%;
    height: 0.22rem;
    background-color: #f4f8ff;
  }

  .nodata {
    text-align: center;
    padding: 0.5rem 0;
  }

  .cation_head {
    padding-top: 0.46rem;
    background-color: #fff;
    overflow: hidden;
    padding-bottom: 0.46rem;
    border-bottom: 1px solid #e5e8ee;
  }

  /*左边的图片*/
  .cation_img, .visit_pic {
    width: 1.8rem;
    height: 1.8rem;
    background-color: #666;
    float: left;
    margin-left: 0.46rem;
    border-radius: 0.06rem;
  }

  .cation_img {
    margin-right: 0;
  }

  .cation_img img, .visit_pic img {
    width: 100%;
    height: 100%;
  }

  .cation_con {
    width: 4.4rem;
    float: left;
    margin-left: 0.46rem;
  }

  .cation_tit p {
    font-size: 0.32rem;
    font-family: 'PingFang Medium', 'Droid Sans Fallback', sans-serif;
    color: #333;
  }

  .budget_area, .visit_hours {
    font-size: 0.22rem;
    font-family: 'PingFang Regular', 'Droid Sans Fallback', sans-serif;
    color: #333;
  }

  .budget_area {
    padding-top: 0.32rem;
  }

  .visit_hours {
    padding-top: 0.26rem;
  }

  .contact_con {
    height: 0.88rem;
    background-color: #fff;
    position: relative;
  }

  .contact_con span {
    position: absolute;
    top: 0.16rem;
    width: 1.46rem;
    height: 0.56rem;
    line-height: 0.56rem;
    text-align: center;
    font-size: 0.24rem;
    font-family: 'PingFang Regular', 'Droid Sans Fallback', sans-serif;
    border-radius: 0.04rem;
  }

  .cancel_btn {
    right: 0.3rem;
    border: 0.01rem solid #ccc;
    color: #9d9ea0;
  }

  .contact_btn {
    right: 0.3rem;
    border: 0.01rem solid #6198d4;
    color: #6198d4;
  }

  .appointment_can {
    right: 0.3rem;
  }

  .tab-nav .tab-nav-item a {
    font-size: 0.26rem;
    color: #bababa;
    font-family: 'PingFang Medium', 'Droid Sans Fallback', sans-serif;
  }

  .tab-nav-item:not(:last-child):after {
    border-right: 1px solid #e5e8ee;
  }

  .tab-nav .tab-active a {
    color: #6198d4;
  }

  .tab-nav-item.tab-active:before {
    background-color: #6198d4;
  }

  .tab-nav-item.tab-active a {
    color: #6198d4 !important;
  }

  /*--弹窗--*/
  .btn {
    padding: 0;
  }

  .contact_con .appraise_btn {
    position: absolute;
    top: 0.16rem;
    width: 1.46rem;
    height: 0.52rem;
    line-height: 0.52rem;
    text-align: center;
    font-size: 0.24rem;
    font-family: 'PingFang Regular', 'Droid Sans Fallback', sans-serif;
    border-radius: 0.04rem;
    /*right: 0.3rem;*/
    border: 0.01rem solid #6198d4;
    color: #6198d4;
    padding: 0 !important;
  }

  .appraise_btn_s {
    right: 1.9rem;
  }

  .appraise_btn_sh {
    right: 0.3rem;
  }

  .contact_con .appraise_btn_sh {
    height: 0.52rem;
    line-height: 0.52rem;
  }

  .contact_con .contact_btn_p {
    height: 0.54rem;
    line-height: 0.54rem;
    right: 3.6rem;
  }

  .tab-nav li.tab-nav-item a {
    font-size: 0.26rem;
    color: #bababa;
    font-family: 'PingFang Medium', 'Droid Sans Fallback', sans-serif;
  }

  .construct_t {
    padding-top: 0.56rem;
    padding-left: 0.46rem;

  }

  .con_ct {
    position: relative;
  }

  .construct_title {
    font-size: 0.28rem;
    color: #333;
    font-family: 'PingFang Medium', 'Droid Sans Fallback', sans-serif;
  }

  .close_d {
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    background-image: url("../images/visit/close_img.svg");
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
  }

  .construct_item {
    padding-left: 0;
  }

  .button_sure {
    display: inline-block;
    width: 5.6rem;
    height: 0.92rem;
    font-size: 0.32rem;
    background-color: #6198d4;
    font-family: 'PingFang Bold', 'Droid Sans Fallback', sans-serif;
    margin-top: 0.7rem;
    margin-bottom: 0.7rem;
    border-radius: 0.06rem;
    color: #fff;
  }

  .backBtn {
    display: inline-block;
    width: 5.6rem;
    height: 0.92rem;
    font-size: 0.32rem;
    background-color: #fff;
    font-family: 'PingFang Bold', 'Droid Sans Fallback', sans-serif;
    margin-top: 0.7rem;
    margin-bottom: 0.7rem;
    border-radius: 0.06rem;
    color: #9d9ea0;
  }

  .attitude_m {
    font-size: 0.28rem;
    color: #a5a5a7;
    font-family: 'PingFang Medium', 'Droid Sans Fallback', sans-serif;
    margin-top: 0.3rem;
    margin-bottom: 0.56rem;
    position: relative;
  }

  .ardour_m, .ardour_mt {
    margin-left: 0.6rem;
  }

  .friendly_m, .friendly_mt {
    margin: 0 1.34rem;
  }

  .text_area {
    margin: 0 0.46rem;
  }

  .text_area textarea {
    width: 100%;
    height: 3.4rem;
    border: 0.01rem solid #e5e8ee;
    font-size: 0.28rem;
    color: #333;
    font-family: 'PingFang Medium';
  }

  .area_bgc textarea {
    background-color: #f4f8ff;
  }

  .ardour_m::before {
    position: absolute;
    left: 0.01rem;
    top: -0.06rem;
    content: url(../images/visit/hollowg.svg);
    width: 0.5rem;
  }

  .ardour_mt::before {
    position: absolute;
    left: 0.01rem;
    top: -0.06rem;
    content: url(../images/visit/solidg.svg);
    width: 0.5rem;
  }

  .friendly_m::before {
    position: absolute;
    left: 2.02rem;
    top: -0.06rem;
    content: url(../images/visit/hollows.svg);
    width: 0.5rem;
  }

  .friendly_mt::before {
    position: absolute;
    left: 2.02rem;
    top: -0.06rem;
    content: url(../images/visit/solids.svg);
    width: 0.5rem;
  }

  .same_as::before {
    position: absolute;
    left: 4rem;
    top: -0.06rem;
    content: url(../images/visit/hollowd.svg);
    width: 0.5rem;
  }

  .same_ast::before {
    position: absolute;
    left: 4rem;
    top: -0.06rem;
    content: url(../images/visit/solidd.svg);
    width: 0.5rem;
  }

</style>
