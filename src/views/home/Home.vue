<template>
  <div id="home">
    <!-- 顶部导航栏展示部分 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>

    <!-- 首页滚动区域 -->
    <scroll 
      class="scroll-content"
      ref="scroll" 
      :probe-type="3" 
      :pull-up-load="true" 
      :pull-down-refresh="true" 
      @scroll="contentScroll" 
      @pullingUp="loadMore" 
      @pullingDown="refresh"
    >
      <!-- 首页轮播图展示部分 -->
      <home-carousel :banners="banners" @swiperImageLoad="swiperImageLoad"></home-carousel>
      <!-- 首页推荐展示部分 -->
      <home-recommend :recommends="recommends"></home-recommend>
      <!-- 首页本周流行展示部分 -->
      <home-popular></home-popular>
      <!-- 首页商品列表展示部分 -->
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- 返回顶部 -->
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goodsList/GoodsList'

  import HomeCarousel from './childComps/HomeCarousel'
  import HomeRecommend from './childComps/HomeRecommend'
  import HomePopular from './childComps/HomePopular'

  import { getHomeMultidata, getHomeGoods } from 'network/home'
  import { debounce } from 'common/utils'
  import { itemListerMixin, backTopMixin } from 'common/mixin'

  export default {
    name: 'Home',
    components: {
      NavBar,
      HomeCarousel,
      HomeRecommend,
      HomePopular,
      TabControl,
      GoodsList,
      Scroll
    },
    mixins: [itemListerMixin, backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': { page: 0, list: [] },
          'new': { page: 0, list: [] },
          'sell': { page: 0, list: [] }
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 请求轮播图数据及推荐数据
      this.getMultidata()

      // 请求商品数据
      this.getGoodsData('pop')
      this.getGoodsData('new')
      this.getGoodsData('sell')
    },
    deactivated() {
      // 取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.itemImgLister)
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      // 商品列表切换
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      // 监听滚动区域的滚动事件
      contentScroll(pos) {
        // 返回顶部按钮的显示与隐藏
        this.listerShowBackTop(pos)

        // tabControl 的吸顶效果(position: fixed)
        this.isTabFixed = (-pos.y) >= this.tabOffsetTop ? true:false
      },
      // 上拉加载更多
      loadMore() {
        this.getGoodsData(this.currentType)
      },
      // 下拉刷新
      refresh() {
        this.banners = []
        this.recommends = []
        this.goods = {
          'pop': { page: 0, list: [] },
          'new': { page: 0, list: [] },
          'sell': { page: 0, list: [] }
        }
        // 请求轮播图数据及推荐数据
        this.getMultidata()
        // 请求商品数据
        this.getGoodsData('pop')
        this.getGoodsData('new')
        this.getGoodsData('sell')
        // 关闭下拉刷新
        this.$refs.scroll.finishPullDown()
      },
      // 获取 tabControl 的offectTop(距离上方或上层控件的位置)
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      /**
       * 网络请求相关的方法
       */
      async getMultidata() {
        const { data: result } = await getHomeMultidata()
        this.banners = result.banner.list
        this.recommends = result.recommend.list
      },
      async getGoodsData(type) {
        let page = this.goods[type].page + 1
        const { data: result } = await getHomeGoods(type, page)
        this.goods[type].list.push(...result.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    font-size: 0.32rem;
    font-weight: 600;
  }
  .scroll-content {
    position: absolute;
    top: 0.88rem;
    bottom: 0.98rem;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .tab-control {
    position: relative;
    z-index: 99;
  }
</style>
