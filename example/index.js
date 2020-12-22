import Vue from 'vue'
import CustomScrollbar from '../src/index'
const App = () => import('./App.vue')

Vue.use(CustomScrollbar)

new Vue({
  el: '#app',
  render: h => h(App)
})
