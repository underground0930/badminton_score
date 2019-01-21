<template>
    <v-dialog
      v-model="modal"
      width="280"
      >
      <v-card>
        <v-card-title
          class="title grey lighten-2 text-xs-center"
          primary-title
        >
          サーブ権 {{game + 1}}ゲーム目
        </v-card-title>
        <v-card-text>
          <ul class="modal__lists">
            <li class="modal__list">
              <span class="subTitle">【S】サーブ</span>
              <v-select
                v-model.number="serveS"
                :items="players"
                item-text="name"
                item-value="index"
                label="[S]サーブ"
                single-line
              ></v-select>
            </li>
            <li class="modal__list">
              <span class="subTitle">【R】レシーブ</span>
              <v-select
                v-model.number="serveR"
                :items="players"
                item-text="name"
                item-value="index"
                label="[R]レシーブ"
                single-line
              ></v-select>
            </li>
          </ul>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="updateServe"
          >
            変更する
          </v-btn>
          <v-btn
            color="primary"
            flat
            @click="closeModal"
          >
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ServeModal',
  data() {
    return {
      serveS: '',
      serveR: '',
    }
  },
  created() {
    this.initModal(this.game)
  },
  props: ['game', 'modal'],
  computed: {
    ...mapState(['players', 'serves']),
  },
  methods: {
    ...mapActions(['initGameData']),
    initModal(game) {
      let count = 0
      const len = this.serves[game].length
      this.serves[game].forEach(v => {
        if (v === 0) {
          this.serveS = count
        } else if ((len === 2 && v === 1) || v === 3) {
          this.serveR = count
        }
        count++
      })
    },
    closeModal() {
      this.$emit('close')
    },

    checkSubmit() {
      if (this.serveS === this.serveR) {
        alert('サーバーとレシーバーが同一人物です')
        return false
      }
      if (this.players.length === 4) {
        if (
          this.serveS + this.serveR === 1 ||
          this.serveS + this.serveR === 5
        ) {
          alert('同チームでのサービス、レシーブは不正です')
          return false
        }
      }
      return true
    },
    updateServe() {
      if (!this.checkSubmit()) return
      if (!confirm('点数が0にリセットされますがよろしいですか？')) return

      let newServe = []
      if (this.players.length === 2) {
        // singles
        if (this.serveS === 0) {
          newServe = [0, 1]
        } else {
          newServe = [1, 0]
        }
      } else {
        // doubles
        if (this.serveS === 0 && this.serveR === 2) {
          newServe = [0, 2, 3, 1]
        } else if (this.serveS === 0 && this.serveR === 3) {
          newServe = [0, 2, 1, 3]
        } else if (this.serveS === 1 && this.serveR === 2) {
          newServe = [2, 0, 3, 1]
        } else if (this.serveS === 1 && this.serveR === 3) {
          newServe = [2, 0, 1, 3]
        } else if (this.serveS === 2 && this.serveR === 0) {
          newServe = [3, 1, 0, 2]
        } else if (this.serveS === 2 && this.serveR === 1) {
          newServe = [1, 3, 0, 2]
        } else if (this.serveS === 3 && this.serveR === 0) {
          newServe = [3, 1, 2, 0]
        } else if (this.serveS === 3 && this.serveR === 1) {
          newServe = [1, 3, 2, 0]
        }
      }

      // 初期化処理
      this.initGameData({ game: this.game, serve: newServe, add: false }).then(
        () => {
          this.closeModal()
        }
      )
    },
  },
}
</script>

<style scoped lang="scss">
ul {
  padding-left: 0;
}
</style>
