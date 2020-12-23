<template>
  <div id="detail">
    <!-- 导航栏展示部分 -->
    <detail-nav-bar @themeClick="themeClick" ref="navbar"></detail-nav-bar>

    <!-- 滚动区域 -->
    <scroll class="scroll-content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!-- 轮播图展示部分 -->
      <detail-carousel :top-images="topImages"></detail-carousel>
      <!-- 商品基本信息展示部分 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺信息展示部分 -->
      <detail-shop-info :shops="shops"></detail-shop-info>
      <!-- 商品详情信息展示部分 -->
      <detail-goods-info :detail-info="detailInfo" @imageLoad="goodsImageLoad"></detail-goods-info>
      <!-- 商品参数信息展示部分 -->
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <!-- 商品评论信息展示部分 -->
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <!-- 推荐商品展示部分 -->
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>

    <!-- 返回顶部 -->
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
    <!--  -->
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailCarousel from './childComps/DetailCarousel'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goodsList/GoodsList'

  import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'
  import { debounce } from 'common/utils'
  import { itemListerMixin, backTopMixin } from 'common/mixin'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailCarousel,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList,
      DetailBottomBar
    },
    mixins: [itemListerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shops: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeOffSetTop: [],
        currentIndex: 0
      }
    },
    created() {
      this.iid = this.$route.query.iid

      // 请求商品详情数据
      this.getDetailData(this.iid)
      // 请求推荐数据
      this.getRecommendData()
    },
    destroyed() {
      // 取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.itemImgLister)
    },
    methods: {
      async getDetailData(iid) {
        // 获取信息
        const { result } = await getDetail(iid)

        // 获取顶部轮播数据
        this.topImages = result.itemInfo.topImages

        // 获取商品基本数据
        this.goods = new Goods(result.itemInfo, result.columns, result.shopInfo.services)

        // 获取店铺数据
        this.shops = new Shop(result.shopInfo)

        // 获取商品详情数据
        this.detailInfo = result.detailInfo

        // 获取商品参数数据
        this.paramInfo = new GoodsParam(result.itemParams.info, result.itemParams.rule)

        // 获取商品评论数据
        if(result.rate.cRate !== 0) {
          this.commentInfo = result.rate.list[0]
        }
      },
      async getRecommendData() {
        const { data: res } = await getRecommend()
        this.recommends = res.list
      },

      goodsImageLoad() {
        this.$refs.scroll.refresh()
        
        this.$nextTick(() => {
          this.themeOffSetTop.push(0)
          this.themeOffSetTop.push(this.$refs.param.$el.offsetTop)
          this.themeOffSetTop.push(this.$refs.comment.$el.offsetTop)
          this.themeOffSetTop.push(this.$refs.recommend.$el.offsetTop)
        })
      },
      themeClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeOffSetTop[index], 500)
      },
      contentScroll(pos) {
        // 返回顶部按钮的显示与隐藏
        this.listerShowBackTop(pos)

        // 获取滚动的距离
        const posY = -pos.y

        const length = this.themeOffSetTop.length
        // 判断滚动的距离
        this.themeOffSetTop.forEach((value, index, arr) => {
          if(this.currentIndex !== index && ((index < length - 1 && posY >= arr[index] && posY < arr[index + 1]) || (index === length -1 && posY >= arr[index]))) {
            this.currentIndex = index
            this.$refs.navbar.currentIndex = this.currentIndex
          }
        })
      },
      addToCart() {
        // 获取购物车需要的信息
        const product = {}
        product.iid = this.iid
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice

        // 将商品添加到购物车

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
