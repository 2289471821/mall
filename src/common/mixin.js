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
