<template>
  <custom-scrollbar class="my-scrollbar">
    <template v-slot:content>
      <img src="./images/bg-snow.jpg" alt="" srcset="">
    </template>
  </custom-scrollbar>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus">
.my-scrollbar
  width 200px
  height 100px
  margin 200px auto
</style>