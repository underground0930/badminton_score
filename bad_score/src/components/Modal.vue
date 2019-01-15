<template>
    <transition>
      <div class="modal">
        <div class="modal__bg"></div>
        <div class='modal__inner'>
          <h2 class="modal__title">サーブ権 {{game + 1}}ゲーム目</h2>
          <ul class="modal__lists">
            <li class="modal__list">
              <span>[S]サーブ</span>
              <select name='serve'>
                <option v-for="(player,index) in players" :key="index" :value="index">{{player.team}}・{{player.name}}</option>
              </select>
            </li>
            <li class="modal__list">
              <span>[R]レシーブ</span>
              <select name='recieve'>
                <option v-for="(player,index) in players" :key="index" :value="index">{{player.team}}・{{player.name}}</option>
              </select>
            </li>
          </ul>
          <div class="modal__btns">
            <div class="modal__btn">
              <button>変更する</button>
            </div>
            <div class="modal__btn">
              <button @click="close">閉じる</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
export default {
  name: 'Modal',
  data() {
    return {}
  },
  props: ['players', 'serves', 'game'],
  methods: {
    close() {
      this.$emit('close')
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
</style>
