<template>
    <transition>
      <div class="modal">
        <div class="modal__bg"></div>
        <div class='modal__inner'>
          <h2 class="modal__title">サーブ権</h2>
          <ul>
            <li>
              Aさん
              <select name=''>
                <option value=''></option>
                <option value='S' selected>S</option>
                <option value='R'>R</option>
              </select>
            </li>
            <li>
              Bさん
              <select name=''>
                <option value=''></option>
                <option value='S'>S</option>
                <option value='R'>R</option>
              </select>
            </li>
            <li>
              Cさん
              <select name=''>
                <option value=''></option>
                <option value='S'>S</option>
                <option value='R' selected>R</option>
              </select>
            </li>
            <li>
              Dさん
              <select name=''>
                <option value=''></option>
                <option value='S'>S</option>
                <option value='R'>R</option>
              </select>
            </li>
          </ul>
          <div class="modal__btns">
            <div class="modal__btn">
              <button>変更する</button>
            </div>
            <div class="modal__btn">
              <button>閉じる</button>
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
  props: [],
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
}
.modal__btns {
  display: flex;
  justify-content: center;
}
</style>
