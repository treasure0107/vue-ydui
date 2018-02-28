<template>
  <div>
    <div class="content">
      <div class="content_title">
        <div class="main_title">哇，您太有眼光了</div>
        <div class="tit">
          《{{proDate.title}}》在业主评价中获得<span class="active">{{proDate.score}}分</span>，好评率<span
          class="active">{{proDate.likeCount}}%</span>
        </div>
      </div>
      <div class="con_main">
        <yd-cell-group>
          <div class="icon_lab">
            <label slot="left" class="icon_font">手机号码</label>
            <input class="yd_input" slot="right" required :showSuccessIcon="false"
                   :showErrorIcon="false" type="number"
                   regex="mobile" placeholder="填写您的手机号码" v-model="phoneNum">
          </div>
          <yd-cell-item>
            <span slot="left" class="re-area">所在区域</span>
            <input slot="right" readonly type="text" @click.stop="showAddress = true"
                   v-model="modelAddress" placeholder="选择所在省市区">
            <img slot="right" src="../images/visit/arrow_right.svg" type="img" class="arrow_icon">
          </yd-cell-item>
          <yd-cityselect v-model="showAddress" :done="result2" :items="district">
          </yd-cityselect>
          <yd-cell-item>
            <span slot="left" class="reProject-date">参观时间</span>
            <yd-datetime class="date_input" type="datetime" startDate="2012-03-16 15:13"
                         endDate="2019-10-21 22:21" v-model="startTimes" slot="right">
            </yd-datetime>
            <img slot="right" src="../images/visit/arrow_right.svg" type="img" class="arrow_icon">
          </yd-cell-item>
          <div class="icon_lab">
            <label slot="left" class="icon_font">装修预算</label>
            <input class="yd_input" slot="right" required :showSuccessIcon="false"
                   :showErrorIcon="false" type="number" placeholder="填写您的装修预算" v-model="decorateBudget">
            <span class="unit_t unit_s">万元</span>
          </div>
          <div class="icon_lab">
            <label slot="left" class="icon_font">项目面积</label>
            <input class="yd_input" slot="right" required :showSuccessIcon="false"
                   :showErrorIcon="false" type="number" placeholder="填写您的项目面积" v-model="decorateSize">
            <span class="unit_t">平方米</span>
          </div>
          <yd-cell-item>
            <span slot="left" class="reProject-date">装修日期</span>
            <yd-datetime type="date" startDate="2009-10-21" endDate="2029-10-21"
                         v-model="decorateDate" slot="right"></yd-datetime>
            <img slot="right" src="../images/visit/arrow_right.svg" type="img" class="arrow_icon">
          </yd-cell-item>
        </yd-cell-group>
      </div>
      <div class="distancePos">
        <svg x="0px" y="0px" viewBox="0 0 14 17" style="enable-background:new 0 0 14 17;" xml:space="preserve" class="navigation_svg">
           <g>
	             <path class="st0" d="M6.7,0.1c-3.6,0-6.5,2.9-6.5,6.5s4.3,9.7,6.5,9.7c2.2,0,6.5-6.1,6.5-9.7S10.3,0.1,6.7,0.1L6.7,0.1z M6.7,9.9
		                 C5,9.9,3.5,8.4,3.5,6.6s1.5-3.3,3.3-3.3c1.8,0,3.3,1.5,3.3,3.3C10,8.4,8.5,9.9,6.7,9.9L6.7,9.9z"/>
           </g>
        </svg>
        该现场距离您 {{proDate.distance}}
      </div>
      <button type="button" class="btn-blocks" @click="sureapply">申请免费参观</button>
    </div>
  </div>
</template>
<style>
  .arrow_icon {
    width: 0.14rem;
    height: 0.2rem;
  }
  .con_main {
    padding-left: 0.5rem;
    background-color: #fff;
  }
  /*----------------------------区域(时间)的样式----------------------------*/
  .m-cell-box .cell-item{
    height:0.88rem;
    line-height: 0.88rem;
    background-color: #fff;
    padding-left:0;
  }
  .con_main .re-area,.reProject-date{
    font-family: "PingFang Medium",'Droid Sans Fallback', sans-serif;
    font-size: 0.28rem;
    color: #333;
    margin-left:-0.07rem !important;
  }
  .m-cell:after{
    border-bottom:0 !important;
  }
  .cell-right{
    min-height:0.88rem !important;
    padding-right:0.5rem !important;
  }
  .con_main .cell-right input{
    font-size: 0.28rem !important;
    color: #d4d4d4 !important;
    height:0.88rem !important;
  }
  .content .m-cell-box{
    margin-bottom:0;
    background-color: #fff;
  }
  .m-cell-box .cell-right .datetime-input{
    font-family: "PingFang Medium",'Droid Sans Fallback', sans-serif;
    font-size: 0.28rem;
    color: #d4d4d4;
    height:0.88rem;
    line-height: 0.88rem;
    width:5.02rem !important;
    padding-left:0.4rem !important;
  }
  /*-------------------------------区域(时间)组件的样式结束---------------------------------------------*/
  .con_main input{
    font-family: "PingFang Medium",'Droid Sans Fallback', sans-serif;
    font-size: 0.28rem;
    color:#d4d4d4;
    width:4.56rem !important;
    padding-left:0.4rem !important;
    border:none;
  }
  .content_title {
    padding: 0.32rem 0.5rem;
  }

  .content_title .main_title {
    font-size: 0.42rem;
    font-family: 'PingFang Heavy';
    color: #333;
    padding-bottom: 0.2rem;
  }

  .tit {
    font-size: 0.28rem;
    color: #333;
    font-family: 'PingFang Regular';
    margin-right: 1.6rem;
    line-height: 0.429rem;
  }

  .yd_input {
    font-size: 0.28rem;
    color: #d4d4d4;
    font-family: 'PingFang Medium';
    border: 0;
  }

  .active {
    color: #ff6464;
    padding-left: 0.1rem;
  }

  .distancePos {
    font-size: 0.22rem;
    color: #9D9EA0;
    height: 1.2rem;
    line-height: 1rem;
    margin-left: 0.4rem;
    font-family: 'PingFang Medium';
  }

  .navigation_svg {
    width: 0.22rem;
    vertical-align: middle;
  }

  .st0 {
    fill-rule: evenodd;
    clip-rule: evenodd;
    fill: #6198D4;
  }

  .btn-blocks {
    width: 90% !important;
        display: block;
        border:0;
    height: 0.92rem;
    font-size: 0.32rem;
    color: #fff;
    border-radius: 0.04rem;
    background-color: #6198D4;
    box-shadow: 4px 6.928px 13px 0px rgba(69, 101, 146, 0.3);
    margin: 0 auto;
    font-family: 'PingFang Bold';
  }

  .icon_font {
    font-size: 0.28rem;
    color: #333;
    font-family: 'PingFang Medium';
  }

  .icon_lab {
    height: 0.88rem;
    line-height: 0.88rem;
    background-color: #fff;
    border-bottom: 1px solid #d9d9d9;
  }

  .yd_input::-webkit-input-placeholder {
    font-size: 0.28rem;
    color: #d4d4d4;
    font-family: 'PingFang Medium';
  }
  .unit_t {
    font-size: 0.28rem;
    color: #b0b0b0;
    font-family: 'PingFang Medium';
  }
  .unit_s{
    padding-left:0.25rem;
  }
</style>
<script type="text/babel">
  import District from 'ydui-district/dist/jd_province_city_area_id';
  import {DateTime} from 'vue-ydui/dist/lib.rem/datetime';
  import apicom from '../config/api.js'
  export default {
    data() {
      return {
        showAddress: false,
        titleval:"预约参观",
        modelAddress: '',
        district: District,
        startTimes: '2017-08-09 09:00',
        endTimes: "",
        decorateDate: '',
        phoneNum: '',
        decorateBudget: '',
        decorateSize: '',
        detailDate: '',
        proDate: '',
        // haveData: true,
        phoneMobile: ""
      }
    },
    created() {
      //this.getUserInfo();
      document.title=this.titleval
      var dates = Date.parse(new Date());
      dates=parseInt(dates);
      let nowTs=new Date(dates).Format("yyyy-MM-dd hh:mm");
      this.startTimes=nowTs;
      this.decorateDate=nowTs;
      this.getProInfo();
      this.getLastVisitInfo();
    },
    methods: {
      getLastVisitInfo() {
        //visit/getLastVisitInfo
        this.$http.post(apicom.apihost + 'visit/getLastVisitInfo', {
          uid: localStorage.uid
        }, {emulateJSON: true}).then(res => {
          if (res.body.obj == "") {
            // this.haveData = false;
          } else {
            // this.haveData = true;
            const visitInfo = res.body.obj;
            this.phoneNum = visitInfo.mobile;     //参观人手机号
            this.startTime = visitInfo.startTime;   //参观开始时间
            this.decorateDate = visitInfo.decorateDate;    //装修日期
            this.decorateBudget = visitInfo.decorateBudget;  //装修预算
            this.decorateSize = visitInfo.decorateSize;    //装修项目面积
            this.modelAddress = visitInfo.province + " " + visitInfo.city + " " + visitInfo.area; //所在地址
          }
        }, err => {
          console.log(err);
        });
      },
      result2(ret) {
        this.modelAddress = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
      },
      plustime(startTime) {
        let data1 = startTime;
        var arr = data1.split(/[- : \/]/);
        var data2 = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4]).getTime();
        let diftime = 60 * 60 * 1000;
        data2 = data2 + diftime;
        const data3 = new Date(data2).Format("yyyy-MM-dd hh:mm");
        return data3;
      },
      getProInfo() {
        this.$http.post(apicom.apihost + 'project/getProInfo', {
          pid: this.$route.params.pid,  //项目Id
          uid:localStorage.uid
        }, {emulateJSON: true}).then(res => {
          this.proDate = res.body.obj;
        }, err => {
          console.log(err);
        });
      },
      sureapply() {
        //拼接url
        const startTime = this.startTimes;
        const endTime = this.plustime(startTime);
        const arr = this.modelAddress.split(" ");
        const provance = arr[0];
        const city = arr[1];
        const area = arr[2];
        const uid = this.$route.params.visitUid;
        const pid = this.$route.params.pid;
        const postUrl = apicom.apihost + 'visit/applyVisit';
        if (this.phoneNum == "") {
          alert("请填写手机号码");
          return false;
        } else if (provance == "" || city == "" || area == "") {
          alert("请选择地区");
          return false;
        }
        this.$http.post(postUrl, {
          uid: uid,   //用户id
          visitUid: localStorage.uid,  //参观人用户id
          pid: pid,  //项目id
          mobile: this.phoneNum,  //参观人手机号
          province: provance,    //所在地址-省
          city: city,   //所在地址-市
          area: area,  //所在地址-区
          startTime: startTime,  //参观开始时间
          endTime: endTime,  //参观结束时间
          decorateBudget: this.decorateBudget,  //装修预算
          decorateDate: this.decorateDate,     //装修日期
          decorateSize: this.decorateSize,    //装修项目面积
        }, {emulateJSON: true}).then(res => {
          const vid = res.body.obj.vid;
          //跳转 vid
          this.$router.push({name: "applicationDetails", params: {vid: vid}})
        }, err => {
          console.log(err);
        })
      },
    }

  }

</script>

