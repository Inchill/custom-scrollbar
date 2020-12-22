const CustomScrollbar = () => import('./components/custom-scrollbar.vue')

const customScrollbar = {
  version: __VERSION__,
  CustomScrollbar,
  install
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

export default customScrollbar

function install(Vue) {
  if (install.installed) {
    return
  }
  Vue.component(CustomScrollbar.name, CustomScrollbar)
}

