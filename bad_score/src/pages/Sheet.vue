<template>
  <main>
    <!-- header -->
    <header class="header">
      <div class="header__names">
        <div class="header__name">
          <span v-if="players(0).team">{{players(0).team}}・</span>{{players(0).name}}
        </div>
        <div class="header__name" v-if="config.type === 1">
          <span v-if="players(2).team">{{players(2).team}}・</span>{{players(2).name}}
        </div>
      </div>
      <div class="header__winGames">1</div>
      <div class="header__results">
        <div class="header__result">
          <span>{{totalScore(0,0)}}</span> - <span>{{totalScore(0,1)}}</span>
        </div>
        <div class="header__result">
          <span>{{totalScore(1,0)}}</span> - <span>{{totalScore(1,1)}}</span>
        </div>
        <div class="header__result">
          <span>{{totalScore(2,0)}}</span> - <span>{{totalScore(2,1)}}</span>
        </div>
      </div>
      <div class="header__winGames">2</div>
      <div class="header__names">
        <div class="header__name">
          <span v-if="players(1).team">{{players(1).team}}・</span>{{players(1).name}}
        </div>
        <div class="header__name" v-if="config.type === 1">
          <span v-if="players(3).team">{{players(3).team}}・</span>{{players(3).name}}
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
            <ScoreHead :game="0" :player="0" />
            <ScoreHead :game="0" :player="2" v-if="config.type === 1" />
            <ScoreHead :game="0" :player="1" />
            <ScoreHead :game="0" :player="3" v-if="config.type === 1" />
          </div>
          <div class="score__body">
            <ScoreBody :game="0" :player="0" />
            <ScoreBody :game="0" :player="2" v-if="config.type === 1" />
            <ScoreBody :game="0" :player="1" />
            <ScoreBody :game="0" :player="3" v-if="config.type === 1" />
          </div>
        </div>
      </section>
      <section class="score__section">
        <h2 class="score__title">■2ゲーム目</h2>
        <div class="score__child">
          <div class="score__head">
            <ScoreHead :game="1" :player="0" />
            <ScoreHead :game="1" :player="2" v-if="config.type === 1" />
            <ScoreHead :game="1" :player="1" />
            <ScoreHead :game="1" :player="3" v-if="config.type === 1" />
          </div>
          <div class="score__body">
            <ScoreBody :game="1" :player="0" />
            <ScoreBody :game="1" :player="2" v-if="config.type === 1" />
            <ScoreBody :game="1" :player="1" />
            <ScoreBody :game="1" :player="3" v-if="config.type === 1" />
          </div>
        </div>
      </section>
      <section class="score__section">
        <h2 class="score__title">■3ゲーム目</h2>
        <div class="score__child">
          <div class="score__head">
            <ScoreHead :game="2" :player="0" />
            <ScoreHead :game="2" :player="2" v-if="config.type === 1" />
            <ScoreHead :game="2" :player="1" />
            <ScoreHead :game="2" :player="3" v-if="config.type === 1" />
          </div>
          <div class="score__body">
            <ScoreBody :game="2" :player="0" />
            <ScoreBody :game="2" :player="2" v-if="config.type === 1" />
            <ScoreBody :game="2" :player="1" />
            <ScoreBody :game="2" :player="3" v-if="config.type === 1" />
          </div>
        </div>
      </section>
    </div>
    <!--/ score -->
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import ScoreHead from '../components/ScoreHead'
import ScoreBody from '../components/ScoreBody'

export default {
  name: 'Sheet',
  components: {
    ScoreHead,
    ScoreBody,
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['players', 'totalScore', 'config']),
  },
  methods: {},
  beforeRouteEnter(to, from, next) {
    if (from.name === 'index') {
      next()
    } else {
      next({ path: '/' })
    }
  },
}
</script>

<style scoped lang="scss">
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
  width: 10em;
  background: #fff;
}
.score__body {
  padding-left: 10em;
  overflow-x: scroll;
}
</style>
