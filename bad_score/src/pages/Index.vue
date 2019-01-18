<template>
  <main>
    <v-dialog
      v-model="error"
      width="500"
      >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          入力内容に不備があります
        </v-card-title>
        <v-card-text>{{errorText}}</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="error = false"
          >
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <ul class="lists">
      <li class="list">
        <dl class="list__child">
          <dt class="subheading">●種目</dt>
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
          <dt class="subheading">●メンバー【名前は必須、チーム名は省略可】</dt>
          <dd class="member">
            <div>
              <v-text-field label="チームA" v-model="players[0].team"></v-text-field>
              <v-text-field label="名前1" v-model="players[0].name"></v-text-field>
            </div>
            <div v-if="config.type === 1">
              <v-text-field label="チームA" v-model="players[1].team"></v-text-field>
              <v-text-field label="名前2" v-model="players[1].name"></v-text-field>
            </div>
            <div :class="['pt-3']" class="text-xs-center headline">VS</div>
            <div>
              <v-text-field :class="['pt-0']" label="チームB" v-model="players[config.type === 1 ? 2 : 1].team"></v-text-field>
              <v-text-field label="名前3" v-model="players[config.type === 1 ? 2 : 1].name"></v-text-field>
            </div>
            <div v-if="config.type === 1">
              <v-text-field label="チームB" v-model="players[3].team"></v-text-field>
              <v-text-field label="名前4" v-model="players[3].name"></v-text-field>
            </div>
          </dd>
        </dl>
      </li>
      <li class="list">
        <dl class="list__child">
          <dt class="subheading">●セティング<span>【max30点で終了です】</span></dt>
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
          <dt class="subheading">●1ゲームの得点<span>{{`【${maxPointRange[0]} ~ ${maxPointRange[1]}点の間で指定してください】`}}</span></dt>
          <dd>
            <v-text-field type="number" :max="maxPointRange[1]" :min="maxPointRange[0]" v-model="config.maxPoint"></v-text-field>
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
      maxPointRange: [5, 30],
      error: false,
      errorText: '',
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
    validateMaxPoint() {
      const p = this.config.maxPoint
      const min = this.maxPointRange[0]
      const max = this.maxPointRange[1]
      return p <= max || p <= min
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
      this.errorText = 'メンバーの名前が空欄の箇所があります。'
      this.error = true
      return
    } else if (!this.validateMaxPoint()) {
      this.errorText = `ゲームポイントは${this.maxPointRange[0]}点以上${
        this.maxPointRange[1]
      }点以下にしてください。`
      this.error = true
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
</style>
