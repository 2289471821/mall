<template>
  <div id="home">
    <!-- 顶部导航栏展示部分 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <!-- 首页滚动区域 -->
    <scroll class="scroll-content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll" @pullingUp="loadMore">
      <!-- 首页轮播图展示部分 -->
      <home-swiper :banners="banners"></home-swiper>
      <!-- 首页推荐展示部分 -->
      <home-recommend :recommends="recommends"></home-recommend>
      <!-- 首页本周流行展示部分 -->
      <home-popular></home-popular>
      <!-- 首页商品列表展示部分 -->
      <tab-control class="home-tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick"></tab-control>
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
  import BackTop from 'components/content/backTop/BackTop'

  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommend from './childComps/HomeRecommend'
  import HomePopular from './childComps/HomePopular'

  import { getHomeMultidata, getHomeGoods } from 'network/home'
  import { debounce } from 'common/utils'

  export default {
    name: 'Home',
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommend,
      HomePopular,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': { page: 0, list: [] },
          'new': { page: 0, list: [] },
          'sell': { page: 0, list: [] },
        },
        currentType: 'pop',
        isShowBackTop: false
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
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 1)
      // 监听goodsItem中图片加载完成
      this.$bus.$on('itemImageLoad', () => refresh())
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
      },
      // 返回顶部
      backTop() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      // 返回顶部按钮的显示与隐藏
      contentScroll(pos) {
        this.isShowBackTop = -pos.y > 800 ? true:false
      },
      // 上拉加载更多
      loadMore() {
        this.getGoodsData(this.currentType)
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
    padding-top: 0.88rem;
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    font-size: 0.32rem;
    font-weight: 600;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
  }
  .home-tab-control {
    position: sticky;
    top: 0.88rem;
    z-index: 99;
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
