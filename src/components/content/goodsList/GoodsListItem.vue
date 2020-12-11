<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="">
    <div class="goods-info">
      <p class="goods-title">{{goodsItem.title}}</p>
      <span class="goods-price">{{goodsItem.price | getDollarSign}}</span>
      <span class="goods-collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsListItem',
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      getDollarSign(value) {
        return '￥' + value
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    width: 48%;
    text-align: center;
    padding-bottom: 0.4rem;
  }
  .goods-item img {
    width: 100%;
    border-radius: 0.1rem;
  }
  .goods-info {
    font-size: 0.24rem;
    overflow: hidden;
  }
  .goods-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0.1rem;
  }
  .goods-price {
    color: var(--color-high-text);
    margin-right: 0.4rem;
  }
  .goods-collect {
    position: relative;
  }
  .goods-collect::before {
    content: '';
    position: absolute;
    top: 0;
    left: -0.3rem;
    width: 0.3rem;
    height: 0.3rem;
    background: url('~assets/img/common/collect.png') 0 0/0.3rem 0.3rem;
  }
</style>