import { debounce } from './utils'
export const itemListerMixin = {
  data() {
    return {
      itemImgLister: null
    }
  },
  mounted() {
    // 监听 goodsItem 中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh)
    this.itemImgLister = () => refresh()
    this.$bus.$on('itemImageLoad', this.itemImgLister)
  }
}

import BackTop from 'components/content/backTop/BackTop'
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    // 点击返回顶部
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    listerShowBackTop(pos) {
      // 返回顶部按钮的显示与隐藏
      this.isShowBackTop = -pos.y > 800 ? true:false
    }
  }
}
