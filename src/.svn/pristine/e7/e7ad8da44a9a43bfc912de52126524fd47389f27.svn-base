<template>
  <div>
    <div class="header_pro">
      <div class="account_search_con">
        <input type="text" placeholder="输入项目标题或关键字" class="searchName" v-model="searchContent">
        <svg x="0px" y="0px" viewBox="0 0 36 36" style="enable-background:new 0 0 36 36;" xml:space="preserve" class="account_search" @click="searchName">
<g>
	<path class="st011" d="M35.5,33.3l-7.9-7.9c2.2-2.7,3.5-6.1,3.5-9.8C31.1,7,24.1,0,15.5,0S0,7,0,15.5c0,8.6,7,15.5,15.5,15.5
		c3.7,0,7.1-1.3,9.8-3.5l7.9,7.9c0.6,0.6,1.6,0.6,2.3,0C36.2,34.9,36.2,33.9,35.5,33.3L35.5,33.3z M3.3,15.5
		c0-6.8,5.5-12.3,12.3-12.3c6.8,0,12.3,5.5,12.3,12.3c0,3.2-1.2,6.2-3.3,8.4c-0.1,0.1-0.3,0.2-0.4,0.3c-0.1,0.1-0.2,0.2-0.3,0.4
		c-2.2,2-5.1,3.3-8.4,3.3C8.8,27.8,3.3,22.3,3.3,15.5L3.3,15.5z"/>
</g>
</svg>
      </div>
    </div>
    <div style="padding-top: 1.4rem;">
      <!-- <yd-layout> -->
        <yd-tab :change="changeTitle">
          <yd-tab-panel :label="allPro" tabkey="1" :active="allInfo">
            <yd-infinitescroll :on-infinite="getAllProByUser" ref="infinitescrollDemo">
              <yd-list theme="1" slot="list">
                <div class="main_pro" v-for="item in list">
                  <router-link :to="'/detailInSpace/'+item.pid">
                    <!--左边图片-->
                    <div class="img_fl" v-bind:style="{backgroundImage:'url('+imgurl+item.coverImgUrl+')'}"></div>
                    <!--中间的项目内容-->
                    <div class="pro_content">
                      <div class="pro_tit">{{item.title}}</div>
                      <div class="pro_area">
                        预算:{{parseInt(item.budget) || 0}}万元/ 面积:{{item.proSize}}平方米 / 已开工{{DateDiff(nowtime, item.startDate)}}天
                      </div>
                      <div class="pro_icon">
                        <span>粉丝：1000</span> | <span>可预约</span> | <span @click.prevent="editLink(item.pid)">编辑</span>
                      </div>
                    </div>
                    <!--<div :style="{backgroundImage:'url('+userNews.logoUrl+')'}"></div>-->
                    <!--<div class="code_img" @click="codeImg(imgurl+item.coverImgUrl,item.title,item.budget,item.proSize,DateDiff(nowtime, item.startDate))">-->
                    <div class="code_img" @click.prevent="codeImg(item)">
                      <!--hollow-->
                      <!--<yd-button type="hollow" class="codeButton"></yd-button>-->

                    </div>
                  </router-link>
                </div>
              </yd-list>
              <span slot="doneTip"></span>
              <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
            </yd-infinitescroll>
          </yd-tab-panel>
          <yd-tab-panel :label="allow" tabkey="2" :active="allVisit">
            <yd-infinitescroll :on-infinite="getBookable" ref="infinitescrollDemoTwo">
              <yd-list theme="1" slot="list">
                <div class="main_pro" v-for="item in ableList">
                  <router-link :to="'/detailInSpace/'+item.pid">
                    <!--左边图片-->
                    <div class="img_fl" v-bind:style="{backgroundImage:'url('+imgurl+item.coverImgUrl+')'}"></div>
                    <!--中间的项目内容-->
                    <div class="pro_content">
                      <div class="pro_tit">{{item.title}}</div>
                      <div class="pro_area">
                        预算:{{item.budget}}万元/ 面积:{{item.proSize}}平方米/ 已开工{{DateDiff(nowtime, item.startDate)}}天
                      </div>
                      <div class="pro_icon">
                        <span>粉丝：1000</span> | <span>可预约</span> | <span @click.prevent="editLink(item.pid)">编辑</span>
                      </div>
                    </div>
                    <!--<div :style="{backgroundImage:'url('+userNews.logoUrl+')'}"></div>-->
                    <div class="code_img" @click.prevent="codeImg(item)"></div>
                  </router-link>
                </div>
              </yd-list>
              <span slot="doneTip"></span>
              <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
            </yd-infinitescroll>
          </yd-tab-panel>
          <yd-tab-panel :label="disagree" tabkey="3" :active="evaluate">
            <div>
              <yd-infinitescroll :on-infinite="getNotBookable" ref="infinitescrollDemoTree">
                <yd-list theme="1" slot="list">

                  <div class="main_pro" v-for="item in ableNotList">
                    <router-link :to="'/detailInSpace/'+item.pid">
                      <!--左边图片-->
                      <div class="img_fl" v-bind:style="{backgroundImage:'url('+imgurl+item.coverImgUrl+')'}"></div>
                      <!--中间的项目内容-->
                      <div class="pro_content">
                        <div class="pro_tit">{{item.title}}</div>
                        <div class="pro_area">
                          预算:{{parseInt(item.budget) || 0}}万元/ 面积:{{item.proSize}}平方米/ 已开工{{DateDiff(nowtime, item.startDate)}}天
                        </div>
                        <div class="pro_icon">
                          <span>粉丝：1000</span> | <span>可预约</span> |
                          <!--'/edProject/:pid/:rid',-->
                          <!--<router-link :to="{name:'detailInSpace',params:{siteId:item.pid,rid:item.rid}}">-->
                          <span @click.prevent="editLink(item.pid)">编辑</span>
                          <!--</router-link>-->
                        </div>
                      </div>
                      <!--<div :style="{backgroundImage:'url('+userNews.logoUrl+')'}"></div>-->
                      <div class="code_img" @click.prevent="codeImg(item)"></div>
                    </router-link>
                  </div>

                </yd-list>
                <span slot="doneTip"></span>
                <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
              </yd-infinitescroll>
            </div>
          </yd-tab-panel>
        </yd-tab>
      <!-- </yd-layout> -->
    </div>

    <!--评价的弹窗-->
    <div>
      <yd-popup v-model="codeModel" v-show="codeModel" position="center" width="90%">
        <div style="width: 100%;margin-top: 0.2rem; position: relative">
          <div class="main_pro">
            <!--<div :style="{backgroundImage:'url('+userNews.logoUrl+')'}"></div>-->
            <div class="img_fl" v-bind:style="{backgroundImage:'url('+imgurl+datas.coverImgUrl+')'}"></div>
            <!--中间的项目内容-->
            <div class="pro_content">
              <div class="pro_tit">{{datas.title}}</div>
              <div class="pro_area" style="margin-top: 0.2rem;">
                预算:{{datas.budget}}万/ 面积:{{datas.proSize}}平米/已开工{{DateDiff(nowtime, datas.startDate)}}天
              </div>
            </div>
            <span class="btn_close" @click="closeBtn"></span>
          </div>
          <div id="qrcode" style="width: 200px;height: 200px;margin: 1rem auto 0;"></div>
          <p class="chat_code_keep">扫描二维码查看该项目或长按图片保存</p>
          <!--<span class="keep_btn" @click="keepBtn">保存二维码 </span>-->
        </div>
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
        allPro:'全部',
        allow:'可预约',
        disagree:'不可预约',
        allInfo: true,
        evaluate: false,
        allVisit: false,
        codeModel: false,
        startDate: "2018-8-16",
        searchContent: "",
        list: [],
        imgurl: apicom.imghost,
        page: 0,
        pageSize: 10,
        pageNum: 1,
        allCount: 0,  //全部的数量
        ableList: [],
        nowtime: '',
        pageY: 0,
        pageSizeY: 10,
        pageNumY: 1,
        allCountY: 0,  //可预约全部的数量
        ableNotList: [],
        pageN: 0,
        pageSizeN: 10,
        pageNumN: 1,
        allCountN: 0,//不可预约全部的数量
        datas: {
          startDate: "2018-8-16"
        }
      };
    },
    created() {
      this.getNum();
      var date = Date.parse(new Date());
      this.nowtime = date; 
    },
    methods: {
      searchName() {
        console.log("目前没有接口")
      },
      editLink(pid) {  //点击编辑跳转
//        alert(pid)
      },
      codeImg(item) {
        this.datas = item;
        $("#qrcode").html("");
        var qrcode = new QRCode(document.getElementById("qrcode"), {
          width: 200,
          height: 200
        });
        // qrcode.makeCode("http://192.168.1.240/predone/#/detailInSpace/"+item.pid);
        qrcode.makeCode("http://www.onlineblm.com/yy/#/detailInSpace/" + item.pid);
        this.codeModel = true;
      },
      closeBtn() {
        this.codeModel = false;
      },
      changeTitle(label, tabkey) {
        document.title = this.titleval = label;
        if (tabkey == 1) {
          this.list = [];
          this.page=0;
            this.pageSize=10;
            this.pageNum=1;
          this.getAllProByUser();  //请求全部数据
        }
        if (tabkey == 2) {
           this.ableList = [];
            this.pageY=0;
            this.pageSizeY=10;
            this.pageNumY=1;
          this.getBookable();  //请求可预约数据
        }
        if (tabkey == 3) {
          this.ableNotList = [];
          this.pageN=0;
            this.pageSizeN=10;
            this.pageNumN=1;
          this.getNotBookable();  //请求不可预约数据
        }
      },

      getNum(){
        const postUrl = apicom.apihost + 'project/getProCountByUser';
        this.$http.post(postUrl, {
            uid: localStorage.uid
          }, {emulateJSON: true}).then((res) => {
            const alls=res.body.obj;
            this.allPro="全部("+alls.allPro+")";
            this.allow="可预约("+alls.allow+")";//接受预约
            this.disagree="不可预约("+alls.disagree+")";
        }, err => {
            console.log(err);
          })
      },
      //全部
      getAllProByUser() {
        if (localStorage.uid) {  
          const postUrl = apicom.apihost + 'project/getProByUser';
          this.$http.post(postUrl, {
            uid: localStorage.uid,
            startRow: this.page,
            rowCount: this.pageSize,
            allowVisit: ""
          }, {emulateJSON: true}).then(res => {
            console.log(res.body.obj);
            if (res.body.obj !== "") {
              const proList = res.body.obj.projectList;
              this.list = [...this.list, ...proList];
              const count = res.body.obj.count;
              const pagecount = Math.ceil(count / this.pageSize);
              if (proList.length < this.pageSize || this.pagenum == pagecount) {
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
        }
      },
      //可以预约
      getBookable() {
       
        const postUrl = apicom.apihost + 'project/getProByUser';
        //请求数据
        this.$http.post(postUrl, {
          uid: localStorage.uid,
          startRow: this.pageY,
          rowCount: this.pageSizeY,
          allowVisit: 1
        }, {emulateJSON: true}).then(res => {
          console.log(res.body.obj);
          if (res.body.obj !== "") {
            this.allCountY = res.body.obj.count;
            const projectList = res.body.obj.projectList;
            this.ableList = [...this.ableList, ...projectList];
            const count = res.body.obj.count;
            const pageCountY = Math.ceil(count / this.pageSizeY);
            if (projectList.length < this.pageSizeY || this.pageNumY == pageCountY) {
              /* 所有数据加载完毕 */
              this.$refs.infinitescrollDemoTwo.$emit('ydui.infinitescroll.loadedDone');
              return;
            }
            /* 单次请求数据完毕 */
            this.$refs.infinitescrollDemoTwo.$emit('ydui.infinitescroll.finishLoad');
            this.pageNumY++;
            this.pageY += this.pageSizeY;
          }
        }, err => {
          console.log(err);
        })
      },
      //不可以预约
      getNotBookable() {
        
        const postUrl = apicom.apihost + 'project/getProByUser';
        //请求数据
        this.$http.post(postUrl, {
          uid: localStorage.uid,
          startRow: this.pageN,
          rowCount: this.pageSizeN,
          allowVisit: 0
        }, {emulateJSON: true}).then(res => {
          console.log(res.body.obj);
          if (res.body.obj !== "") {
            this.allCountN = res.body.obj.count;
            const projectList = res.body.obj.projectList;
            this.ableNotList = [...this.ableNotList, ...projectList];
            const count = res.body.obj.count;
            const pageCountN = Math.ceil(count / this.pageSizeN);
            if (projectList.length < this.pageSizeN || this.pageNumN == pageCountN) {
              /* 所有数据加载完毕 */
              this.$refs.infinitescrollDemoTree.$emit('ydui.infinitescroll.loadedDone');
              return;
            }
            /* 单次请求数据完毕 */
            this.$refs.infinitescrollDemoTree.$emit('ydui.infinitescroll.finishLoad');
            this.pageNumN++;
            this.pageN += this.pageSizeN;
          }
        }, err => {
          console.log(err);
        })
      },
      //计算天数差的函数，通用
      //计算天数差的函数
      DateDiff(sDate1, sDate2) {//sDate1是时间戳，sDate2是2006-12-18格式
        var aDate, oDate1, oDate2, iDays
        oDate1 = sDate1
        // aDate  =  sDate2.split("-")
        var arr = sDate2.split(/[- : \/]/);
        oDate2 = new Date(arr[0], arr[1] - 1, arr[2]);
        // oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
        iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)    //把相差的毫秒数转换为天数
        return iDays
      },
    }
  }
</script>

<style type="text/css">
  /*----------弹窗按钮的样式------------*/
  .btn_close {
    margin-left: 0.1rem;
    position: absolute;
    top: 0.1rem;
    right: 0.26rem;
    width: 0.5rem;
    height: 0.5rem;
    background-image: url("../images/visit/close_img.svg");
    background-repeat: no-repeat;
    background-size: cover;
  }

  .chat_code_keep {
    font-size: 0.26rem;
    color: #333;
    width: 100%;
    text-align: center;
    margin-top: 0.4rem;
    padding-bottom: 0.4rem;
    border-bottom: 0.01rem solid #e5e8ee;
  }

  /*.keep_btn {*/
  /*display: inline-block;*/
  /*width: 1.46rem;*/
  /*height: 0.52rem;*/
  /*line-height:0.52rem;*/
  /*font-size: 0.24rem;*/
  /*border: 0.01rem solid #6198d4;*/
  /*color: #6198d4;*/
  /*text-align: center;*/
  /*font-family: 'PingFang Regular', 'Droid Sans Fallback', sans-serif;*/
  /*margin: 0.3rem 0.3rem 0.3rem 0;*/
  /*float:right;*/
  /*border-radius: 0.06rem;*/
  /*}*/

  ::-webkit-input-placeholder { /* WebKit browsers */
    color: #d4d4d4;
    font-family: 'PingFang Medium', 'Droid Sans Fallback', sans-serif;
  }

  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #d4d4d4;
    font-family: 'PingFang Medium', 'Droid Sans Fallback', sans-serif;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #d4d4d4;
    font-family: 'PingFang Medium', 'Droid Sans Fallback', sans-serif;
  }

  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #d4d4d4;
    font-family: 'PingFang Medium', 'Droid Sans Fallback', sans-serif;
  }

  .header_pro {
    width: 100%;
    position: fixed;
    top: 0;
  }

  .account_search_con {
    margin: 0.2rem 0.3rem;
    position: relative;
  }

  .searchName {
    outline: none;
    border: none;
    width: 100%;
    height: 0.88rem;
    padding-left: 0.46rem;
    padding-right: 0.46rem;
    background-color: #fff;
    margin-top: 0.18rem;
    font-size: 0.28rem;
    color: #333;
    font-family: 'PingFang Medium', 'Droid Sans Fallback', sans-serif;
  }

  .search_res {
    display: block;
    width: 100%;
    height: 0.46rem;
    line-height: 0.46rem;
    padding-left: 0.46rem;
    font-size: 0.22rem;
    color: #b6b6b6;
  }

  .account_search {
    width: 0.36rem;
    position: absolute;
    right: 0.46rem;
    top: 0.46rem;
  }

  .st011 {
    width: 0.36rem;
    fill-rule: evenodd;
    clip-rule: evenodd;
    fill: #909090;
  }

  .account_search {
    width: 0.36rem;
    position: absolute;
    right: 0.46rem;
    top: 0.46rem;
  }

  /*-----------------项目内容-----------------*/
  .main_pro {
    width: 100%;
    padding-top: 0.42rem;
    /*padding-left: 0.3rem;*/
    /*padding-right: 0.5rem;*/
    padding-bottom: 0.42rem;
    background-color: #fff;
    border-bottom: 0.01rem solid #e5e8ee;
    overflow: hidden;
    clear: both;
  }

  .img_fl {
    display: block;
    width: 1.2rem;
    height: 1.2rem;
    background-repeat: no-repeat;
    background-size: cover;
    float: left;
    margin-right: 0.2rem;
    margin-left: 0.3rem;
  }

  .pro_content {
    float: left;
    overflow: hidden;
    display: block;
    width: 4rem;
  }

  .pro_tit {
    font-size: 0.32rem;
    color: #333;
    font-family: 'PingFang Medium', 'Droid Sans Fallback', sans-serif;
  }

  .pro_area {
    font-size: 0.22rem;
    color: #333;
    font-family: 'PingFang Medium', 'Droid Sans Fallback', sans-serif;
    padding-top: 0.1rem;
  }

  .pro_icon {
    font-size: 0.22rem;
    color: #bababa;
    font-family: 'PingFang Medium', 'Droid Sans Fallback', sans-serif;
    padding-top: 0.1rem;
  }

  .pro_icon span:first-child {
    margin-right: 0.1rem;
  }

  .pro_icon span:nth-child(2) {
    margin: 0 0.1rem;
  }

  .pro_icon span:last-child {
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    color: #6198d4;
  }

  .code_img {
    width: 0.5rem;
    height: 0.5rem;
    float: right;
    margin-right: 0.5rem;
    margin-top: 0.3rem;
    background-image: url("../images/visit/code_t.svg");
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
<!--<div class="main_pro">-->
<!--&lt;!&ndash;左边图片&ndash;&gt;-->
<!--<div class="img_fl" v-bind:style="{}"></div>-->
<!--&lt;!&ndash;中间的项目内容&ndash;&gt;-->
<!--<div class="pro_content">-->
<!--<div class="pro_tit">170平方现代中式风格装修记</div>-->
<!--<div class="pro_area">预算: 60万 / 面积:100平米  / 已开工10天</div>-->
<!--<div class="pro_icon">-->
<!--<span>粉丝：1000</span> | <span>可预约</span> | <span>编辑</span>-->
<!--</div>-->
<!--</div>-->
<!--&lt;!&ndash;<div :style="{backgroundImage:'url('+userNews.logoUrl+')'}"></div>&ndash;&gt;-->
<!--<div class="code_img"></div>-->
<!--</div>-->
