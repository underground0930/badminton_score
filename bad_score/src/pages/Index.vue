<template>
  <div class="wrapper">
    <h1 class="mainTitle">バドミントンスコアシート</h1>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    msg: String,
  },
  components: {},
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped lang="scss">
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

/* header */
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 20px;
}
.header__names {
  border-top: 1px solid #000;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
}
.header__name {
  border-bottom: 1px solid #000;
  padding: 5px;
  font-size: 14px;
}
.header__winGames {
  border: 1px solid #000;
  padding: 5px;
  margin: 0 20px 0;
  font-weight: bold;
}

/* score */
.score__section {
  margin: 0 0 20px;
}
.score__title {
  margin: 0 0 10px;
}
.score__child {
  position: relative;
  display: flex;
  border-top: 1px solid #000;
}
.score__head {
  position: absolute;
  left: 0;
  top: 0;
  width: 7em;
  background: #fff;
}
.score__body {
  padding-left: 7em;
  overflow-x: scroll;
}
</style>
