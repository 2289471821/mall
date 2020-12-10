<template>
  <div id="home">
    <!-- 顶部导航栏展示部分 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <!-- 首页滚动区域 -->
    <scroll class="content">
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
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goodsList/GoodsList'

  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommend from './childComps/HomeRecommend'
  import HomePopular from './childComps/HomePopular'

  import { getHomeMultidata, getHomeGoods } from 'network/home'

  export default {
    name: 'Home',
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommend,
      HomePopular,
      TabControl,
      GoodsList,
      Scroll
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
        currentType: 'pop'
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
    methods: {
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
        this.goods[type].list.push(...this.goods[type].list, ...result.list)
        this.goods[type].page += 1
      },

      /**
       * 事件监听相关的方法
       */
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
  .content {
    position: absolute;
    top: 0.88rem;
    bottom: 0.98rem;
    left: 0;
    right: 0;
  }
</style>
