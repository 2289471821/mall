<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar'
  import HomeSwiper from './childComps/HomeSwiper'
  import { getHomeMultidata } from '@/network/home'

  export default {
    name: 'Home',
    components: {
      NavBar,
      HomeSwiper
    },
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    created() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      }).catch(err => {
        console.log(err);
      })
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    font-size: 18px;
  }
</style>
