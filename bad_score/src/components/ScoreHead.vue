<template>
  <table>
    <tr>
      <th class="name">{{player.name}}</th>
      <td class="serve">{{player.serve}}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'ScoreHead',
  data() {
    return {}
  },
  props: ['player'],
}
</script>

<style scoped lang="scss">
table {
  border-left: 1px solid #000;
  table-layout: fixed;
  width: 100%;
}
th,
td {
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  width: 10px;
  height: 2em;
  vertical-align: middle;
}
td {
  text-align: center;
}
.name {
  width: 6em;
  height: 2em;
  font-size: 14px;
}
.serve {
  width: 1em;
  font-weight: bold;
}
.cell {
  width: 1em;
}
</style>
