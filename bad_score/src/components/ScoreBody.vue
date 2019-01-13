<template>
  <table>
    <tr>
      <td class="cell" v-for="(cell,index) in this.$store.state.scores[game][player]" :key="index" @click="setScore({ game, player, index })">
        {{cell.num}}
      </td>
    </tr>
  </table>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ScoreBody',
  data() {
    return {}
  },
  props: ['game', 'player'],
  methods: {
    ...mapActions(['setScore']),
  },
}
</script>

<style scoped lang="scss">
table {
  table-layout: fixed;
  width: 100%;
}
th,
td {
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  height: 2em;
}
td {
  text-align: center;
  vertical-align: middle;
}

.cell {
  width: 1.5em;
}
</style>
