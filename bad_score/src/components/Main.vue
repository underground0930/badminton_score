<template>
  <div class="hello">
    <h1 class="mainTitle">スコアシート</h1>
    <score :player="this.$store.state.players[0]" />
    <score :player="this.$store.state.players[1]" />
    <score :player="this.$store.state.players[2]" />
    <score :player="this.$store.state.players[3]" />
  </div>
</template>

<script>
import Score from './Score'
export default {
  name: 'Main',
  props: {
    msg: String,
  },
  components: {
    Score,
  },
  data() {
    return {}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mainTitle {
  text-align: center;
}
</style>
