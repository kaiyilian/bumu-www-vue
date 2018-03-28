<template>
  <el-header height="110px">

    <el-row>

      <el-col :span="8">
        <div class="grid-content bg-purple-dark">
          您好，欢迎光临不木官网！
        </div>
      </el-col>

      <el-col :span="8" :offset="8">

        <el-col :span="12">
          <div class="txt" v-on:click="goKeySass">
            K-Saas平台
          </div>
        </el-col>

        <el-col :span="12">

          <el-button type="primary" size="mini" v-on:click="goTrailApply">
            申请试用
          </el-button>

        </el-col>

      </el-col>

    </el-row>

    <el-row>

      <el-col :span="6" class="cpy_info">
        <div v-on:click="goIndex">
          <img class="cpy_logo" src="../../assets/image/logo.png"/>
          <div class="cpy_name">招才进宝</div>
        </div>
      </el-col>

      <el-col :span="18">
        <el-menu mode="horizontal" v-bind:default-active="cur_menu"
                 text-color="#333" active-text-color="rgb(240, 130, 0)"
                 v-bind:router="router">

          <el-menu-item index="index">首页</el-menu-item>
          <el-submenu index="product">
            <template slot="title">产品服务</template>
            <el-menu-item index="2-1">人事服务</el-menu-item>
            <el-menu-item index="2-2">灵活用工</el-menu-item>
            <el-menu-item index="2-3">综合福利</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">猎头RPO</template>
              <el-menu-item index="2-4-1">高级人才搜索</el-menu-item>
              <el-menu-item index="2-4-2">背景调查</el-menu-item>
              <el-menu-item index="2-4-3">RPO</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="news_center">新闻中心</el-menu-item>
          <el-menu-item index="entry">加入不木</el-menu-item>
          <el-menu-item index="contact_us">联系我们</el-menu-item>

        </el-menu>
      </el-col>

    </el-row>

  </el-header>
</template>

<script>

  export default {
    name: "web-header",
    data() {
      return {
        cur_menu: "entry",   //当前定位选中的menu
        router: true,        //是否开启导航路由
      }
    },
    methods: {

      //进入k-sass平台
      goKeySass() {
        alert("k-sass平台");
        store.commit('increment')

        console.log(store.state.count) // -> 1
      },

      //进入申请试用页面
      goTrailApply() {
        alert("申请试用页面")
      },

      //进入首页
      goIndex() {
        alert("跳转首页")
      }

    }
  }

</script>

<style scoped lang="scss">

  header {
    position: relative;
    width: 100%;
    /*line-height: 50px;*/
    text-align: center;
    z-index: 999;
    background-color: #fff;
    overflow: hidden;
    font-size: 18px;
    /*float: left;*/

    .el-row:first-child {
      position: relative;
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 12px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.10);

      .txt {
        position: relative;
        padding-left: 30px;
        cursor: pointer;

        &:before {
          content: "";
          position: absolute;
          width: 14px;
          height: 14px;
          top: 13px;
          left: 2px;
          background: url("../../assets/image/icon_head_ksaars.png") no-repeat;
          background-size: 100% 100%;
        }

      }

      .btn {
        position: relative;
        top: 4px;
      }

    }

    .el-row:nth-child(2n+2) {
      height: 61px;

      .cpy_info {
        height: 100%;

        & > div {
          display: flex;
          height: 100%;
          justify-content: center;
          align-items: center;

          .cpy_name {
            margin-left: 10px;
            font-weight: bold;
          }

        }
      }
    }

  }

  header .row {
    margin: 0;
    height: 70px;
    overflow: hidden;
  }

  header .row .cpy_info {
    margin: 10px 0;
    width: 200px;
    float: left;
  }

  header .row .cpy_info .cpy_logo {
    float: left;
    width: 50px;
    height: 50px;
  }

  header .row .cpy_info .cpy_name {
    font-weight: bold;
    font-size: 20px;
    margin-left: 10px;
  }

  header .row .navbar_container {
    width: 800px;
    float: left;
  }

  header .row .navbar-btn {
    cursor: pointer; /*width: 90px;*/
    padding: 0;
    margin: 8px 0;
  }

  header .row .navbar-btn.active {
    position: relative;
    /*color: rgb(240, 130, 0);*/
    /*border-bottom: 2px solid rgb(240, 130, 0);*/
  }

  header .row .navbar-btn.active:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 25%;
    width: 50%;
    height: 2px;
    background-color: rgb(240, 130, 0);
  }

  header .row .navbar-btn:hover {
    color: rgb(240, 130, 0);
  }

  header .row .cpy_phone {
    margin: 8px 0;
  }

  header .row .cpy_phone span {
    font-size: 12px;
    /*margin-left: 5px;*/
    color: rgb(240, 130, 0);
    /*display: inline;*/
    /*float: none;*/
    width: 160px;
    padding-left: 20px;
  }

  header .row .cpy_phone span:first-child:before {
    content: url("../../assets/image/icon_head_phone.png");
    position: absolute;
    width: 18px;
    height: 18px;
    left: 0px;
    top: 16px;
    line-height: 0;
  }


</style>
