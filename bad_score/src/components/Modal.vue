<template>
    <transition>
      <div class="modal">
        <div class="modal__bg"></div>
        <div class='modal__inner'>
          <h2 class="modal__title">サーブ権 {{game + 1}}ゲーム目</h2>
          <ul class="modal__lists">
            <li class="modal__list">
              <span>[S]サーブ</span>
              <select name='serve' v-model.number="serveS">
                <option v-for="(player,index) in players" :key="index" :value="index"><span v-if="player.team">{{player.team}}・</span>{{player.name}}</option>
              </select>
            </li>
            <li class="modal__list">
              <span>[R]レシーブ</span>
              <select name='recieve' v-model.number="serveR">
                <option v-for="(player,index) in players" :key="index" :value="index"><span v-if="player.team">{{player.team}}・</span>{{player.name}}</option>
              </select>
            </li>
          </ul>
          <div class="modal__btns">
            <div class="modal__btn">
              <button @click="updateServe">変更する</button>
            </div>
            <div class="modal__btn">
              <button @click="closeModal">閉じる</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Modal',
  data() {
    return {
      serveS: '',
      serveR: '',
    }
  },
  created() {
    this.initModal(this.game)
  },
  props: ['game'],
  computed: {
    ...mapState(['players', 'serves']),
  },
  methods: {
    ...mapActions(['setServe', 'clearScore']),
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
          this.serveS + this.serveR === 2 ||
          this.serveS + this.serveR === 4
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
        if (this.serveS === 0) {
          newServe = [0, 1]
        } else {
          newServe = [1, 0]
        }
      } else {
        newServe[this.serveS] = 0
        newServe[this.serveR] = 3
        if (this.serveS > 1 && this.serveR > 1) {
          newServe[this.serveS - 2] = 2
          newServe[this.serveR - 2] = 1
        } else if (this.serveS <= 1 && this.serveR <= 1) {
          newServe[this.serveS + 2] = 2
          newServe[this.serveR + 2] = 1
        } else if (this.serveS <= 1 && this.serveR > 1) {
          newServe[this.serveS + 2] = 2
          newServe[this.serveR - 2] = 1
        } else if (this.serveS > 1 && this.serveR <= 1) {
          newServe[this.serveS - 2] = 2
          newServe[this.serveR + 2] = 1
        }
      }
      this.clearScore({ game: this.game, serve: newServe })
      this.setServe({ game: this.game, serve: newServe }).then(() => {
        alert('サーブ権を変更しました')
        this.closeModal()
      })
    },
  },
}
</script>

<style scoped lang="scss">
/* modal */
.modal {
}
.modal__bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: rgba(0, 0, 0, 0.3);
}
.modal__inner {
  position: fixed;
  width: 400px;
  height: 200px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 2;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
}
.modal__title {
  text-align: center;
  font-weight: bold;
  padding: 15px 0 15px;
  margin: 0 0 15px;
  border-bottom: 1px dotted #000;
}
.modal__btns {
  display: flex;
  justify-content: center;
}
.modal__btn {
  margin: 0 5px 0;
}
.modal__list {
  display: flex;
  justify-content: center;
  margin: 0 0 10px;
  span {
    display: inline-block;
    padding: 0 5px;
  }
}
select {
  font-size: 16px;
}
option {
  font-size: 16px;
}
</style>
