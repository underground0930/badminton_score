<template>
  <main>
    <alert-modal
      :error="error"
      :errorText="errorText"
      @closeError="error = false"
    />
    <ul class="lists">
      <li class="list">
        <dl class="list__child">
          <dt class="subheading">●種目</dt>
          <dd>
            <v-radio-group v-model="config.type" @change="updatePlayers">
              <v-radio label="シングルス" :value="0"></v-radio>
              <v-radio label="ダブルス" :value="1"></v-radio>
            </v-radio-group>
          </dd>
        </dl>
      </li>
      <li class="list">
        <dl class="list__child">
          <dt class="subheading">●メンバー【名前は必須、チーム名は省略可】</dt>
          <dd class="member">
            <div>
              <v-text-field
                label="チームA"
                v-model="players[0].team"
              ></v-text-field>
              <v-text-field
                label="名前1"
                v-model="players[0].name"
              ></v-text-field>
            </div>
            <div v-if="config.type === 1">
              <v-text-field
                label="チームA"
                v-model="players[1].team"
              ></v-text-field>
              <v-text-field
                label="名前2"
                v-model="players[1].name"
              ></v-text-field>
            </div>
            <div :class="['pt-3']" class="text-xs-center headline">VS</div>
            <div>
              <v-text-field
                :class="['pt-0']"
                label="チームB"
                v-model="players[config.type === 1 ? 2 : 1].team"
              ></v-text-field>
              <v-text-field
                label="名前3"
                v-model="players[config.type === 1 ? 2 : 1].name"
              ></v-text-field>
            </div>
            <div v-if="config.type === 1">
              <v-text-field
                label="チームB"
                v-model="players[3].team"
              ></v-text-field>
              <v-text-field
                label="名前4"
                v-model="players[3].name"
              ></v-text-field>
            </div>
          </dd>
        </dl>
      </li>
      <li class="list">
        <dl class="list__child">
          <dt class="subheading">●セティング</dt>
          <dd>
            <v-radio-group v-model="config.setting">
              <v-radio label="なし" :value="0"></v-radio>
              <v-radio label="あり" :value="1"></v-radio>
            </v-radio-group>
          </dd>
        </dl>
      </li>
      <li class="list" v-if="config.setting === 1">
        <dl class="list__child">
          <dt class="subheading">
            ●セティング時の上限【1ゲームの得点より大きくする】
          </dt>
          <dd>
            <v-radio-group v-model="config.maxSetting">
              <v-radio label="21点" :value="21"></v-radio>
              <v-radio label="30点" :value="30"></v-radio>
            </v-radio-group>
          </dd>
        </dl>
      </li>
      <li class="list">
        <dl>
          <dt class="subheading">
            ●1ゲームの得点<span>{{
              `【${maxPointRange[0]} ~ ${maxPointRange[1]}点の間で指定】`
            }}</span>
          </dt>
          <dd>
            <v-text-field
              type="number"
              :max="maxPointRange[1]"
              :min="maxPointRange[0]"
              v-model="config.maxPoint"
            ></v-text-field>
          </dd>
        </dl>
      </li>
    </ul>
    <div class="btnWrap">
      <v-btn color="success" :append="true" to="/sheet">スコアをつける</v-btn>
    </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex'
import AlertModal from '../components/AlertModal'
export default {
  name: 'Index',
  components: {
    AlertModal,
  },
  data() {
    return {
      config: {
        type: 0,
        setting: 1,
        maxPoint: 21,
        maxSetting: 30,
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
  mounted() {
    this.$vuetify.goTo(0, { duration: 100 })
  },
  methods: {
    validateName() {
      const result = this.players.every((v) => {
        return v.name.trim() !== ''
      })
      if (!result) {
        this.errorText = 'メンバーの名前が空欄の箇所があります。'
        return (this.error = true)
      }
    },
    validateMaxPoint() {
      const p = this.config.maxPoint
      const min = this.maxPointRange[0]
      const max = this.maxPointRange[1]
      const result = p <= max && min <= p
      if (!result) {
        this.errorText = `「1ゲームの得点」は${this.maxPointRange[0]}点以上${this.maxPointRange[1]}点以下にしてください。`
        return (this.error = true)
      }
    },
    validateMaxSetting() {
      const setting = this.config.setting
      const p = this.config.maxPoint
      const s = this.config.maxSetting
      console.log(p, s)
      if (setting && p > s) {
        this.errorText =
          '「セティング時の上限」は「1ゲームの得点」以上の点数にしてください'
        return (this.error = true)
      }
    },
    validateNumOnly() {
      const p = String(this.config.maxPoint)
      if (!p.match(/^[0-9]*$/) || p.trim() === '') {
        this.errorText = '「1ゲームの得点」は半角英数字のみです'
        return (this.error = true)
      }
    },
    validateAll() {
      return [
        this.validateName,
        this.validateNumOnly,
        this.validateMaxPoint,
        this.validateMaxSetting,
      ].some((v) => v())
    },
    makePlayer(num) {
      return [...Array(num)].map((v, i) => {
        return { team: '', name: '', index: i }
      })
    },
    updatePlayers() {
      if (this.config.type === 0) {
        this.players = this.makePlayer(2)
      } else {
        this.players = this.makePlayer(4)
      }
    },
    ...mapActions(['init']),
  },
  beforeRouteLeave(to, from, next) {
    if (this.validateAll()) return

    if (confirm('上記の設定でスコアシートを作成しますか？')) {
      this.init({ config: this.config, players: this.players })
      next()
      return
    }
    next(false)
  },
}
</script>

<style scoped lang="scss">
ul {
  padding-left: 0;
}
.btnWrap {
  display: flex;
  justify-content: center;
}
</style>
