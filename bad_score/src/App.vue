<template>
  <div id="app">
    <v-app>
    <div class="wrapper">
      <h1 class="mainTitle">バドミントンスコアシート</h1>
      <router-view />
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
#app {
}
/* 全体 */
.wrapper {
  padding: 20px 30px;
  border: 5px solid #3cbe30;
}
.mainTitle {
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 30px;
  text-align: center;
}
</style>
