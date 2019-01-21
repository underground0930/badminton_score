<template>
  <div id="app">
    <v-app>
    <div class="wrapper">
      <!-- <v-icon class="infoBtn" large>info</v-icon> -->
      <h1 class="mainTitle">バドミントンスコアシート</h1>
      <router-view />
      <footer class="footer">
        <small>
          Copyright © 2019 htmlgo.site All rights reserved.
        </small>
        </footer>
    </div>
    </v-app>
  </div>
</template>

<script>
import './assets/css/reset.css'

export default {
  name: 'app',
  components: {},
}
</script>

<style scoped lang="scss">
/* 全体 */
.wrapper {
  padding: 20px 30px;
  border: 5px solid #007c3e;
}
.mainTitle {
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 30px;
  text-align: center;
}
.infoBtn {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
.footer {
  padding: 30px 0 0;
  text-align: center;
}
</style>
