<template>
  <div ref="wrapper" class="scroll-wrapper">
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
    props: {
      probeType: {
        type: Number,
        default: 0
      }
    },
    mounted() {
      // 初始化BScroll
      this.initBScroll()
    },
    beforeDestroy() {
      this.bscroll.destroy()
    },
    methods: {
      initBScroll() {
        // 创建BScroll对象
        this.bscroll = new BScroll(this.$refs.wrapper, {
          scrollY: true,
          probeType: this.probeType,
          click: true
        })

        // 监听滚动的位置
        this.bscroll.on('scroll', pos => {
          this.$emit('scroll', pos)
        })
      },
      scrollTo(x, y, time=300) {
        this.bscroll.scrollTo(x, y, time)
      }
    }
  }
</script>

<style scoped>
</style>
