<template>
  <div id="app">
    <v-app>
    <div class="wrapper">
      <!-- <v-icon class="infoBtn" large>info</v-icon> -->
      <h1 class="mainTitle">バドミントンスコアシート</h1>
      <router-view />
      <footer class="footer">
        <ul class="footer__links">
          <li>developer : <a href='https://twitter.com/resistance_gowy' target="_blank">@resistance_gowy</a></li>
          <li>github : <a href='https://github.com/underground0930/badminton_score' target="_blank">underground0930</a></li>
          <li><a :href="twitterLink" target="_blank">Share on Twitter</a> | <a :href="facebookLink" target="_blank">Share on Facebook</a></li>
        </ul>
        <small>
          Copyright © 2019 htmlgo.site All rights reserved.
        </small>
        </footer>
    </div>
    </v-app>
  </div>
</template>

<script>
import './assets/css/reset.css'
const url = 'https://badminton.htmlgo.site/'
export default {
  name: 'app',
  data: function() {
    return {
      twitterLink: '',
      facebookLink: '',
    }
  },
  methods: {
    makeSnsUrl(baseUrl, params) {
      const paramArray = []
      for (var key in params) {
        paramArray.push(key + '=' + encodeURIComponent(params[key]))
      }
      return baseUrl + paramArray.join('&')
    },
    makeTwitterLink() {
      const baseUrl = 'https://twitter.com/intent/tweet?'
      const params = {
        text:
          document.title +
          ' | ' +
          document.getElementsByName('description').item(0).content,
        url: url,
      }
      this.twitterLink = this.makeSnsUrl(baseUrl, params)
    },
    makeFacebookLink() {
      const baseUrl = 'https://www.facebook.com/dialog/share?'
      const params = {
        app_id: document.querySelector('meta[property="fb:app_id"]').content,
        display: 'popup',
        href: url,
      }
      this.facebookLink = this.makeSnsUrl(baseUrl, params)
    },
  },
  created() {
    this.makeTwitterLink()
    this.makeFacebookLink()
  },
}
</script>

<style scoped lang="scss">
/* 全体 */
.wrapper {
  padding: 20px 30px;
  border: 5px solid #007c3e;
}
.mainTitle {
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 20px;
  text-align: center;
}
.infoBtn {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
.footer {
  padding: 30px 0 0;
  text-align: center;
}
.footer__links {
  margin: 0 0 10px;
  li {
    text-align: center;
  }
}
</style>
