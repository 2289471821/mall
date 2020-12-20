<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shops.logo" alt="">
      <span class="shop-name">{{shops.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">{{shops.sells | sellCountFilter}}</div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">{{shops.goodsCount}}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shops.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more': item.isBetter}">
              <span>{{item.isBetter ? '高':'低'}}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailShopInfo',
    props: {
      shops: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      sellCountFilter(value) {
        if(value < 10000) return value
        return (value/10000).toFixed(1) + '万'
      }
    }
  }
</script>

<style scoped>
  .shop-info {
    padding: 0.5rem 0.16rem;
    border-bottom: 0.1rem solid #f2f5f8;
  }
  .shop-top {
    line-height: 0.9rem;
    display: flex;
    align-items: center;
  }
  .shop-top img {
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 50%;
    border: 0.02rem solid rgba(0, 0, 0, .1)
  }
  .shop-top .shop-name {
    margin-left: 0.2rem;
  }
  .shop-middle {
    margin-top: 0.3rem;
    display: flex;
    align-items: center;
  }
  .shop-middle-item {
    flex: 1;
  }
  .shop-middle-left {
    display: flex;
    justify-content: space-evenly;
    color: #333;
    text-align: center;
    border-right: 0.02rem solid rgba(0, 0, 0, .1);
  }
  .sells-count, .goods-count {
    font-size: 0.36rem;
  }
  .sells-text, .goods-text {
    font-size: 0.24rem;
    margin-top: 0.2rem;
  }
  .shop-middle-right {
    font-size: 0.26rem;
    color: #333;
  }
  .shop-middle-right table {
    width: 2.4rem;
    margin-left: 0.6rem;
  }
  .shop-middle-right table td {
    padding: 0.1rem 0;
  }
  .shop-middle-right .score {
    color: #5ea732;
  }
  .shop-middle-right .score-better {
    color: #f13e3a;
    text-align: center;
  }
  .shop-middle-right .better span {
    background-color: #5ea732;
    color: #fff;
    text-align: center;
    padding: 0.05rem;
  }
  .shop-middle-right .better-more span {
    background-color: #f13e3a;
  }
  .shop-bottom {
    text-align: center;
  }
  .enter-shop {
    display: inline-block;
    background-color: #f2f2f2;
    font-size: 0.24rem;
    padding: 0.12rem 0.6rem;
    border-radius: 100px;
    margin: 0.2rem;
  }
</style>
