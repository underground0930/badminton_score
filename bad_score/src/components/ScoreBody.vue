<template>
  <table>
    <tr>
      <td :class="`cell ${item.index}`" v-for="item in scores[game][player]" :key="item.index" @click="setScore({ game, player, index:item.index })">
        {{item.num}}
      </td>
    </tr>
  </table>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'ScoreBody',
  data() {
    return {}
  },
  props: ['game', 'player'],
  computed: {
    ...mapState(['scores']),
  },
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
  height: 2.5em;
}
td {
  text-align: center;
  vertical-align: middle;
}

.cell {
  width: 2em;
}
</style>
