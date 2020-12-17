<template>
  <div ref="wrapper" class="scroll-wrapper">
    <div class="scroll-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from '@better-scroll/core'
  import Pullup from '@better-scroll/pull-up'
  import PullDown from '@better-scroll/pull-down'
  
  BScroll.use(Pullup)
  BScroll.use(PullDown)

  export default {
    name: 'Scroll',
    data() {
      return {
        bscroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      },
      pullDownRefresh: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      // 初始化BScroll
      this.initBScroll()
    },
    beforeDestroy() {
      // 销毁 BetterScroll，解绑事件
      this.bscroll.destroy()
    },
    methods: {
      initBScroll() {
        // 实例化BScroll对象
        this.bscroll = new BScroll(this.$refs.wrapper, {
          scrollY: true,
          probeType: this.probeType,
          click: true,
          pullUpLoad: this.pullUpLoad,
          pullDownRefresh: this.pullDownRefresh
        })

        // 监听滚动的位置
        if(this.probeType === 2 || this.probeType === 3) {
          this.bscroll.on('scroll', pos => {
            this.$emit('scroll', pos)
          })          
        }

        // 监听上拉加载更多
        if(this.pullUpLoad) {
          this.bscroll.on('pullingUp', () => {
            this.$emit('pullingUp')
          })
        }
      },
      scrollTo(x, y, time=300) {
        this.bscroll && this.bscroll.scrollTo(x, y, time)
      },
      refresh() {
        this.bscroll && this.bscroll.refresh()
      },
      finishPullUp() {
        this.bscroll && this.bscroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>
</style>
