import Vue from 'vue'
const App = () => import('./App.vue')

new Vue({
  el: '#app',
  render: h => h(App)
})
