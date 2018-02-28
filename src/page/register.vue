<template>
  <div class="login_main">
    <div class="main">
      <div class="m-cell">
        <div class="cell-item">
          <!--<div class="cell-left">手机号：</div>-->
          <div class="cell-right">
            <input type="text" pattern="[0-9]*" class="cell-input" placeholder="输入用户名" autocomplete="off"/>
          </div>
        </div>
        <div class="cell-item">
          <div class="cell-right">
            <input type="text" pattern="[0-9]*" class="cell-input" placeholder="输入手机号" autocomplete="off"/>
          </div>
        </div>
        <div class="cell-item">
          <div class="cell-right">
            <input type="text" pattern="[0-9]*" class="cell-input" placeholder="输入密码" autocomplete="off"/>
          </div>
        </div>
        <div class="cell-item">
          <div class="cell-right">
            <input type="text" pattern="[0-9]*" class="cell-input" placeholder="输入验证码" autocomplete="off"/>
            <a href="javascript:void(0);" class="msg_code">获取短信验证码</a>
          </div>
        </div>
      </div>
      <button type="button" class="btn-block btn-primary">注册</button>
      <div class="skip_btn">
        <a href="javascript:void(0);">
          <svg x="0px" y="0px"viewBox="0 0 36 36" style="enable-background:new 0 0 36 36;" xml:space="preserve" class="login_w">
<g>
	<path class="stw" d="M18,36C8.1,36,0,27.9,0,18S8.1,0,18,0c9.9,0,18,8.1,18,18S27.9,36,18,36L18,36z M14.6,8.7c-4.4,0-8,3-8,6.8
		c0,2.2,1.2,4,3.2,5.4L9,23.3l2.8-1.4c1,0.2,1.8,0.4,2.8,0.4c0.3,0,0.5,0,0.7,0c-0.2-0.5-0.2-1.1-0.2-1.7c0-3.5,3-6.3,6.8-6.3
		c0.3,0,0.5,0,0.8,0C22,11.1,18.5,8.7,14.6,8.7L14.6,8.7z M22.4,14.7c-3.8,0-6.8,2.6-6.8,5.8c0,3.2,3,5.8,6.8,5.8
		c0.8,0,1.6-0.2,2.4-0.4l2.2,1.2l-0.6-2c1.6-1.2,2.8-2.8,2.8-4.6C29.2,17.3,26,14.7,22.4,14.7L22.4,14.7z M24.6,19.5
		c-0.4,0-0.8-0.4-0.8-0.8c0-0.4,0.4-0.8,0.8-0.8c0.6,0,1,0.4,1,0.8C25.6,19.1,25.2,19.5,24.6,19.5L24.6,19.5z M20.2,19.5
		c-0.4,0-0.8-0.4-0.8-0.8c0-0.4,0.4-0.8,0.8-0.8c0.6,0,1,0.4,1,0.8C21.2,19.1,20.8,19.5,20.2,19.5L20.2,19.5z M17.6,14.1
		c-0.6,0-1.2-0.4-1.2-1c0-0.6,0.6-1,1.2-1c0.6,0,1,0.4,1,1C18.6,13.7,18.2,14.1,17.6,14.1L17.6,14.1z M12,14.1c-0.6,0-1.2-0.4-1.2-1
		c0-0.6,0.6-1,1.2-1c0.6,0,1,0.4,1,1C13,13.7,12.6,14.1,12,14.1L12,14.1z"/>
</g>
</svg>
          微信注册
        </a>
        <a href="javascript:void(0);">登录</a>
      </div>
    </div>

  </div>
</template>

<style scoped>
  .login_main {
    width: 100%;
    height: 100%;
    font-family: "PingFang SC";
  }

  .main {
    width: 7.5rem;
    margin: 0 auto;
    padding-top: 0.3rem;
  }

  .cell-item:not(:last-child):after {
    margin-left: 0;
  }

  .cell-item input {
    width: 100%;
    font-size: 0.28rem;
    color: rgb(212, 212, 212);
    height: 1.06rem;
    line-height: 1.06rem;
    padding-left: 0.3rem;
    font-family: 'PingFang Medium';

  }

  .btn-block {
    width: 6.4rem;
    height: 0.92rem;
    border-radius: 0.06rem;
    background-color: #6198D4;
    box-shadow: 4px 6.928px 13px 0px rgba(69, 101, 146, 0.3);
    margin: 1.04rem auto 0;
    font-family: 'PingFang Bold';
  }

  .skip_btn {
    font-size: 0.3rem;
    color: rgb(183, 183, 183);
    line-height: 0.933rem;
    font-family: 'PingFang Medium';
    position: relative;
    top: 0.8rem;
  }

  .skip_btn a:first-child {
    margin-left: 0.6rem;
  }

  .skip_btn a:last-child {
    position: absolute;
    right: 0.6rem;
    color: #6198D4;
  }

  .msg_code {
    display: inline-block;
    font-size: 0.28rem;
    font-family: 'PingFang Medium';
    color: #6198D4;
    padding: 0.05rem 0.2rem;
    border-left: 0.01rem solid #6198D4;
  }

  .login_w {
    width: 0.44rem;
    vertical-align: middle;
  }

  .stw {
    fill-rule: evenodd;
    clip-rule: evenodd;
    fill: #59BB5C;
  }
  .m-cell:after{
    border-bottom:0;
  }
  .cell-item:not(:last-child):after{
    border-bottom:1px solid #e5e8ee;
  }
</style>

<script>
  //    import common from '../';
  //
  //    export default {
  //        data() {
  //            return {};
  //        },
  //        created() {
  //
  //        },
  //        methods: {}
  //    }
</script>

