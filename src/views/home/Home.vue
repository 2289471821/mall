<template>
  <div id="home">
    <!-- 顶部导航栏展示部分 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 首页轮播图展示部分 -->
    <home-swiper :banners="banners"></home-swiper>
    <!-- 首页推荐展示部分 -->
    <home-recommend :recommends="recommends"></home-recommend>
    <!-- 首页本周流行展示部分 -->
    <home-popular></home-popular>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommend from './childComps/HomeRecommend'
  import HomePopular from './childComps/HomePopular'

  import { getHomeMultidata } from 'network/home'

  export default {
    name: 'Home',
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommend,
      HomePopular
    },
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    methods: {
      async getHomeData() {
        const { data:res } = await getHomeMultidata()
        this.banners = res.banner.list
        this.recommends = res.recommend.list
      }
    },
    created() {
      this.getHomeData()
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    font-size: 0.32rem;
    font-weight: 500;
  }
</style>
