<template>
  <div ref="scroll" class="scroll-wrapper">
    <div class="scroll-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from '@better-scroll/core'
  // import ObserveDom from '@better-scroll/observe-dom'
  // BScroll.use(ObserveDOM)

  export default {
    name: 'Scroll',
    data() {
      return {

      }
    },
    mounted() {
      this.init()
    },
    beforeDestroy() {
      this.scroll.destroy()
    },
    methods: {
      init() {
        this.scroll = new BScroll(this.$refs.scroll, {
          scrollY: true,
          click: true,
          probeType: 3
        })
      }
    }
  }
</script>

<style scoped>

</style>
