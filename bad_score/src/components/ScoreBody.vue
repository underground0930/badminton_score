<template>
  <table>
    <tr>
      <td class="cell" v-for="(cell,index) in score" :key="index">
        <div class="cell_div" v-text="cell.num" @click="cell.input = true"></div>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'ScoreBody',
  data() {
    return {}
  },
  props: ['score'],
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
  width: 10px;
  height: 2em;
}
td {
  text-align: center;
}

.cell {
  width: 1.3em;
}
</style>
