<template>

  <el-container direction="vertical">
    <!--<div >-->

    <web-header></web-header>

    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>

    <web-footer></web-footer>

    <!--</div>-->
  </el-container>

</template>

<script>
  import webHeader from "./components/layout/webHeader"
  import webFooter from "./components/layout/webFooter"

  export default {
    name: "bumu",
    components: {
      webHeader,
      webFooter
    }
  }
</script>

<style scoped>

</style>
