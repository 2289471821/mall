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

    <tab-control class="home-tab-control" :titles="['流行', '新款', '精选']"></tab-control>

    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
      <li>11</li>
      <li>12</li>
      <li>13</li>
      <li>14</li>
      <li>15</li>
      <li>16</li>
      <li>17</li>
      <li>18</li>
      <li>19</li>
      <li>20</li>
      <li>21</li>
      <li>22</li>
      <li>23</li>
      <li>24</li>
      <li>25</li>
      <li>26</li>
      <li>27</li>
      <li>28</li>
      <li>29</li>
      <li>30</li>
      <li>31</li>
      <li>32</li>
      <li>33</li>
      <li>34</li>
      <li>35</li>
      <li>36</li>
      <li>37</li>
      <li>38</li>
      <li>39</li>
      <li>40</li>
      <li>41</li>
      <li>42</li>
      <li>43</li>
      <li>44</li>
      <li>45</li>
      <li>46</li>
      <li>47</li>
      <li>48</li>
      <li>49</li>
      <li>50</li>
    </ul>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'

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
      TabControl
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': { page: 0, list: [] },
          'new': { page: 0, list: [] },
          'sell': { page: 0, list: [] },
        }
      }
    },
    created() {
      // 请求轮播图数据及推荐数据
      this.getMultidata()
      // 请求商品数据
      this.getGoodsData('pop')
      // this.getGoodsData('new')
      // this.getGoodsData('sell')
    },
    methods: {
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
      }
    }
  }
</script>

<style scoped>
  #home {
    padding: 0.88rem 0 1rem;
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
  }
</style>
