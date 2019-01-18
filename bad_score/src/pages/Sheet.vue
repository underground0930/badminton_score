<template>
  <main>
    <!-- modal -->
    <Modal :game="game" :modal="modal" @close="hideModal" />
    <!--/ modal -->
    <!-- setting -->
    <div class="text-xs-center">セティング : <b>{{config.setting ? 'あり' : 'なし'}}</b></div>
    <div class="text-xs-center mb-3">1ゲームの点数 : <b>{{config.maxPoint}}</b></div>
    <!--/ setting -->
    <!-- header -->
    <header class="header">
      <div class="header__names">
        <div class="header__name">
          <span v-if="getPlayer(0).team">{{getPlayer(0).team}}・</span>{{getPlayer(0).name}}
        </div>
        <div class="header__name" v-if="config.type === 1">
          <span v-if="getPlayer(1).team">{{getPlayer(1).team}}・</span>{{getPlayer(1).name}}
        </div>
      </div>
      <div class="header__winGames">{{gamesResults[0]}}</div>
      <div class="header__results">
        <div class="header__result" v-for="n in [0,1,2]" :key="n">
          <span>{{totalScore(n,0)}}</span> - <span>{{totalScore(n,1)}}</span>
        </div>
      </div>
      <div class="header__winGames">{{gamesResults[1]}}</div>
      <div class="header__names">
        <div class="header__name">
          <span v-if="getPlayer(config.type === 1 ? 2 : 1).team">{{getPlayer(config.type === 1 ? 2 : 1).team}}・</span>{{getPlayer(config.type === 1 ? 2 : 1).name}}
        </div>
        <div class="header__name" v-if="config.type === 1">
          <span v-if="getPlayer(3).team">{{getPlayer(3).team}}・</span>{{getPlayer(3).name}}
        </div>
      </div>
    </header>
    <!--/ header -->
    <!-- score -->
    <div class="score">
      <section class="score__section">
        <header class="score__header">
          <h2 class="score__title title">■1ゲーム目</h2>
          <v-btn color="info" @click="showModal(0)">サーブ権を変更する</v-btn>
        </header>
        <div class="score__child">
          <div class="score__head">
            <ScoreHead :game="0" :player="0" />
            <ScoreHead :game="0" :player="1" />
            <ScoreHead :game="0" :player="2" v-if="config.type === 1" />
            <ScoreHead :game="0" :player="3" v-if="config.type === 1" />
          </div>
          <div class="score__body">
            <ScoreBody :game="0" :player="0" />
            <ScoreBody :game="0" :player="1" />
            <ScoreBody :game="0" :player="2" v-if="config.type === 1" />
            <ScoreBody :game="0" :player="3" v-if="config.type === 1" />
          </div>
        </div>
      </section>
      <section class="score__section">
        <header class="score__header">
          <h2 class="score__title title">■2ゲーム目</h2>
          <v-btn color="info" @click="showModal(1)">サーブ権を変更する</v-btn>
        </header>
        <div class="score__child">
          <div class="score__head">
            <ScoreHead :game="1" :player="0" />
            <ScoreHead :game="1" :player="1" />
            <ScoreHead :game="1" :player="2" v-if="config.type === 1" />
            <ScoreHead :game="1" :player="3" v-if="config.type === 1" />
          </div>
          <div class="score__body">
            <ScoreBody :game="1" :player="0" />
            <ScoreBody :game="1" :player="1" />
            <ScoreBody :game="1" :player="2" v-if="config.type === 1" />
            <ScoreBody :game="1" :player="3" v-if="config.type === 1" />
          </div>
        </div>
      </section>
      <section class="score__section">
        <header class="score__header">
          <h2 class="score__title title">■3ゲーム目</h2>
          <v-btn color="info" @click="showModal(2)">サーブ権を変更する</v-btn>
        </header>
        <div class="score__child">
          <div class="score__head">
            <ScoreHead :game="2" :player="0" />
            <ScoreHead :game="2" :player="1" />
            <ScoreHead :game="2" :player="2" v-if="config.type === 1" />
            <ScoreHead :game="2" :player="3" v-if="config.type === 1" />
          </div>
          <div class="score__body">
            <ScoreBody :game="2" :player="0" />
            <ScoreBody :game="2" :player="1" />
            <ScoreBody :game="2" :player="2" v-if="config.type === 1" />
            <ScoreBody :game="2" :player="3" v-if="config.type === 1" />
          </div>
        </div>
      </section>
    </div>
    <!--/ score -->
  </main>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ScoreHead from '../components/ScoreHead'
import ScoreBody from '../components/ScoreBody'
import Modal from '../components/Modal'

export default {
  name: 'Sheet',
  components: {
    ScoreHead,
    ScoreBody,
    Modal,
  },
  data() {
    return {
      modal: false,
      game: 0,
    }
  },
  mounted() {
    /// /////
  },
  computed: {
    ...mapState(['players', 'serves', 'config', 'gamesResults']),
    ...mapGetters(['getPlayer', 'totalScore']),
  },
  methods: {
    showModal(game) {
      this.game = game
      this.modal = true
    },
    hideModal(game) {
      this.modal = false
    },
  },
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
.header__result {
  text-align: center;
}
/* score */
.score__section {
  margin: 0 0 20px;
}
.score__header {
  display: flex;
  align-items: center;
  margin: 0 0 10px;
}
.score__title {
  margin: 0 10px 0 0;
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
