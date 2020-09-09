import Vue from 'vue'
import App from './App.vue'
import VueS3FileUploader from '../src'

Vue.use(VueS3FileUploader)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
