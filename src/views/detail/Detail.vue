<template>
  <div id="detail">
    <!-- 详情页导航栏展示部分 -->
    <detail-nav-bar></detail-nav-bar>

    <!-- 详情页滚动区域 -->
    <scroll 
      class="scroll-content"
      ref="scroll"
      :probe-type="3"
    >
      <!-- 详情页轮播图展示部分 -->
      <detail-carousel :top-images="topImages" @carouselImageLoad="carouselImageLoad"></detail-carousel>
      <!-- 详情页商品信息展示部分 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 详情页店铺信息展示部分 -->
      <detail-shop-info :shops="shops"></detail-shop-info>      
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailCarousel from './childComps/DetailCarousel'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'

  import Scroll from 'components/common/scroll/Scroll'

  import { getDetail, Goods, Shop } from 'network/detail'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailCarousel,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shops: {}
      }
    },
    created() {
      this.iid = this.$route.query.iid

      this.getDetailData(this.iid)
    },
    methods: {
      async getDetailData(iid) {
        const { result } = await getDetail(iid)
        console.log(result)
        // 获取顶部轮播数据
        this.topImages = result.itemInfo.topImages
        // 获取商品信息
        this.goods = new Goods(result.itemInfo, result.columns, result.shopInfo.services)
        // 获取店铺信息
        this.shops = new Shop(result.shopInfo)
      },
      carouselImageLoad() {
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh;
  }
  .scroll-content {
    position: absolute;
    top: 0.88rem;
    bottom: 0.98rem;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style> 
