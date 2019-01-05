<template>
  <table>
    <tr>
      <th>{{player.name}}</th>
      <td>{{player.serve}}</td>
      <td v-for="score in player.score" :key=score>{{score}}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'Score',
  data() {
    return {}
  },
  props: ['player'],
}
</script>

<style scoped>
</style>
