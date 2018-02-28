<template>
  <div class="login_main">
    <div class="main">

      <yd-cell-group class="cell_item">
        <yd-cell-item>
          <yd-input class="cell_item_input" slot="right" v-model="input8" required :showSuccessIcon="false"
                    :showErrorIcon="false" regex="mobile" placeholder="输入新密码"></yd-input>
        </yd-cell-item>

      </yd-cell-group>

      <yd-cell-group class="cell_item">
        <yd-cell-item>
          <yd-input class="cell_item_input" slot="right" v-model="input8" required :showSuccessIcon="false"
                    :showErrorIcon="false" regex="mobile" placeholder="确认密码"></yd-input>
        </yd-cell-item>
      </yd-cell-group>
      <button type="button" class="btn-block btn-primary">确定</button>

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
  .m-cell:after{
    border-bottom: 0rem;
  }
    .cell_item {
    border-top: 0.01rem solid #e5e8ee;
    border-bottom: 0.01rem solid #e5e8ee;
  }

  .cell_item .cell_item_input {
    width: 100%;
    font-size: 0.28rem;
    color: #D4D4D4;
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
    margin: 0.64rem auto 0;
    font-family: 'PingFang Bold';
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

