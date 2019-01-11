<template>
  <div class="wrapper">
    <h1 class="mainTitle">バドミントンスコアシート</h1>
    <!-- header -->
    <header class="header">
      <div class="header__names">
        <div class="header__name">
          {{this.$store.state.players[0].team}}・{{this.$store.state.players[0].name}}
        </div>
        <div class="header__name">
          {{this.$store.state.players[1].team}}・{{this.$store.state.players[1].name}}
        </div>
      </div>
      <div class="header__winGames">1</div>
        <div class="header__results">
          <div class="header__result">
            <span>{{this.$store.state.totalScore[0][0]}}</span> - <span>{{this.$store.state.totalScore[0][1]}}</span>
          </div>
          <div class="header__result">
            <span>{{this.$store.state.totalScore[1][0]}}</span> - <span>{{this.$store.state.totalScore[1][1]}}</span>
          </div>
          <div class="header__result">
            <span>{{this.$store.state.totalScore[2][0]}}</span> - <span>{{this.$store.state.totalScore[2][1]}}</span>
          </div>
        </div>
      <div class="header__winGames">2</div>
      <div class="header__names">
        <div class="header__name">
          {{this.$store.state.players[2].team}}・{{this.$store.state.players[2].name}}
        </div>
        <div class="header__name">
          {{this.$store.state.players[3].team}}・{{this.$store.state.players[3].name}}
        </div>
      </div>
    </header>
    <!--/ header -->
    <!-- score -->
    <div class="score">
      <section class="score__section">
        <h2 class="score__title">■1ゲーム目</h2>
        <div class="score__child">
          <div class="score__head">
            <ScoreHead v-for="i in 4" :key="(i-1)" :game="0" :player="(i-1)" />
          </div>
          <div class="score__body">
            <ScoreBody v-for="i in 4" :key="(i-1)" :game="0" :player="(i-1)" />
          </div>
        </div>
      </section>
      <section class="score__section">
        <h2 class="score__title">■2ゲーム目</h2>
        <div class="score__child">
          <div class="score__head">
            <ScoreHead v-for="i in 4" :key="(i-1)" :game="1" :player="(i-1)" />
          </div>
          <div class="score__body">
            <ScoreBody v-for="i in 4" :key="(i-1)" :game="1" :player="(i-1)" />
          </div>
        </div>
      </section>
      <section class="score__section">
        <h2 class="score__title">■3ゲーム目</h2>
        <div class="score__child">
          <div class="score__head">
            <ScoreHead v-for="i in 4" :key="(i-1)" :game="2" :player="(i-1)" />
          </div>
          <div class="score__body">
            <ScoreBody v-for="i in 4" :key="(i-1)" :game="2" :player="(i-1)" />
          </div>
        </div>
      </section>
    </div>
    <!--/ score -->
  </div>
</template>

<script>
import ScoreHead from '../components/ScoreHead'
import ScoreBody from '../components/ScoreBody'

export default {
  name: 'Main',
  props: {
    msg: String,
  },
  components: {
    ScoreHead,
    ScoreBody,
  },
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
