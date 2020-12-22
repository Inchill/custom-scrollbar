<template>
  <div id="custom-scrollbar-container">
    <div class="custom-scrollbar-content" ref="content">
      <slot name="content"></slot>
    </div>
    <div class="custom-scrollbar">
      <div class="custom-scrollbar-thumb">
        <div class="custom-scrollbar-track" ref="track"></div>
      </div>
    </div>
  </div>
</template>

<script>
const COMPONENT_NAME = 'custom-scrollbar'
export default {
  name: COMPONENT_NAME,
  mounted () {
    this.computeContentSize()
  },
  methods: {
    computeContentSize () {
      let content = this.$refs.content
      let track = this.$refs.track
      const scrollWidth = content.scrollWidth
      const clientWidth = content.clientWidth
      console.log('scrollWidth=', scrollWidth)
      console.log('clientWidth=', clientWidth)
    }
  }
}
</script>

<style lang="stylus">
.custom-scrollbar-content
  overflow scroll
  &::-webkit-scrollbar
    display none
</style>