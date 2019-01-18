<template>
  <main>

    <ul class="lists">
      <li class="list">
        <dl class="list__child">
          <dt class="title">■種目</dt>
          <dd>
            <v-radio-group v-model="config.type" @change="updatePlayers">
              <v-radio
                label="シングルス"
                :value="0"
              ></v-radio>
              <v-radio
                label="ダブルス"
                :value="1"
              ></v-radio>
            </v-radio-group>
          </dd>
        </dl>
      </li>
      <li class="list">
        <dl class="list__child">
          <dt class="title">■メンバー</dt>
          <dd class="member">
            <ul>
              <li>
                <v-text-field label="チーム名" v-model="players[0].team"></v-text-field>
                <v-text-field label="名前" v-model="players[0].name"></v-text-field>
              </li>
              <li v-if="config.type === 1">
                <v-text-field label="チーム名" v-model="players[1].team"></v-text-field>
                <v-text-field label="名前" v-model="players[1].name"></v-text-field>
              </li>
            </ul>
            <p>vs</p>
            <ul>
              <li>
                <v-text-field label="チーム名" v-model="players[config.type === 1 ? 2 : 1].team"></v-text-field>
                <v-text-field label="名前" v-model="players[config.type === 1 ? 2 : 1].name"></v-text-field>
              </li>
              <li v-if="config.type === 1">
                <v-text-field label="チーム名" v-model="players[3].team"></v-text-field>
                <v-text-field label="名前" v-model="players[3].name"></v-text-field>
              </li>
            </ul>
          </dd>
        </dl>
      </li>
      <li class="list">
        <dl class="list__child">
          <dt class="title">■セティング<span>(max30点で終了です)</span></dt>
          <dd>
            <v-radio-group v-model="config.setting">
              <v-radio
                label="なし"
                :value="0"
              ></v-radio>
              <v-radio
                label="あり"
                :value="1"
              ></v-radio>
            </v-radio-group>
          </dd>
        </dl>
      </li>
      <li class="list">
        <dl>
          <dt class="title">■1ゲームの得点<span>(11 ~ 30)</span></dt>
          <dd>
            <input
              type='number'
              max="30"
              min="11"
              v-model.number="config.maxPoint"
            > 点
          </dd>
        </dl>
      </li>
    </ul>
    <div>
      <v-btn color="success" :append="true" to="/sheet">スコアをつける</v-btn>
    </div>

  </main>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Index',
  components: {},
  data() {
    return {
      config: {
        type: 0,
        setting: 1,
        maxPoint: 21,
      },
      players: [],
    }
  },
  created() {
    this.updatePlayers()
  },
  methods: {
    validateName() {
      return this.players.every(v => {
        return v.name.trim() !== ''
      })
    },
    makePlayer(num) {
      return [...Array(num)].map(v => {
        return { team: '', name: '' }
      })
    },
    updatePlayers() {
      if (this.config.type === 0) {
        this.players = this.makePlayer(2)
      } else {
        this.players = this.makePlayer(4)
      }
    },
    ...mapMutations(['init']),
  },
  beforeRouteLeave(to, from, next) {
    if (!this.validateName()) {
      alert('メンバーの名前が空欄の箇所があります。')
      return
    }
    if (confirm('上記の設定でスコアシートを作成しますか？')) {
      this.init({ config: this.config, players: this.players })
      next()
    } else {
      next(false)
    }
  },
}
</script>

<style scoped lang="scss">
ul {
  padding-left: 0;
}
.list {
}
.member {
  display: flex;
  align-items: center;
  p {
    padding: 0 10px 0;
    font-weight: bold;
    font-size: 20px;
  }
}
input[type='text'],
input[type='number'] {
  font-size: 16px;
}
</style>
