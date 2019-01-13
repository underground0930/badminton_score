<template>
  <main>
    <ul class="lists">
      <li class="list">
        <dl class="list__child">
          <dt>■種目</dt>
          <dd>
            <label>
              <input
                type='radio'
                value="0"
                v-model.number="config.type"
              > シングルス
            </label>
          </dd>
          <dd>
            <label>
              <input
                type='radio'
                value="1"
                v-model.number="config.type"
              > ダブルス
            </label>
          </dd>
        </dl>
      </li>
      <li class="list">
        <dl class="list__child">
          <dt>■メンバー</dt>
          <dd class="member">
            <ul>
              <li>
                <input type='text' v-model="players[0].team" placeholder="チーム名"><br>
                <input type='text' v-model="players[0].name" placeholder="名前1">
              </li>
              <li v-if="config.type === 1">
                <input type='text' v-model="players[2].team" placeholder="チーム名"><br>
                <input type='text' v-model="players[2].name" placeholder="名前3">
              </li>
            </ul>
            <p>vs</p>
            <ul>
              <li>
                <input type='text' v-model="players[1].team" placeholder="チーム名"><br>
                <input type='text' v-model="players[1].name" placeholder="名前2">
              </li>
              <li v-if="config.type === 1">
                <input type='text' v-model="players[3].team" placeholder="チーム名"><br>
                <input type='text' v-model="players[3].name" placeholder="名前4">
              </li>
            </ul>
          </dd>
        </dl>
      </li>
      <li class="list">
        <dl class="list__child">
          <dt>■セティング</dt>
          <dd>
            <label>
              <input
                type='radio'
                value="0"
                v-model.number="config.setting"
              > なし
            </label>
          </dd>
          <dd>
            <label>
              <input
                type='radio'
                value="1"
                v-model.number="config.setting"
              > あり
            </label>
          </dd>
        </dl>
      </li>
      <li class="list">
        <dl>
          <dt>■1ゲームの得点(11 ~ 30)</dt>
          <dd>
            <input
              type='number'
              max="30"
              min="11"
              v-model.number="config.point"
            > 点
          </dd>
        </dl>
      </li>
    </ul>
    <div>
      <router-link to="/sheet" tag="button">スコアをつける</router-link>
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
        point: 21,
      },
      players: [
        {
          name: '',
          team: '',
        },
        {
          name: '',
          team: '',
        },
        {
          name: '',
          team: '',
        },
        {
          name: '',
          team: '',
        },
      ],
    }
  },
  methods: {
    ...mapMutations(['init']),
  },
  beforeRouteLeave(to, from, next) {
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
.list {
  margin: 0 0 20px;
  dt {
    font-weight: bold;
    margin: 0 0 5px;
  }
  li {
    font-size: 16px;
    &:last-child {
      margin: 10px 0 0;
    }
  }
}
.member {
  display: flex;
  align-items: center;
  p {
    padding: 0 10px 0;
    font-weight: bold;
    font-size: 16px;
  }
}
</style>
