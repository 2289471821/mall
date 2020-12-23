<template>
  <div class="bottom-bar">
    <div class="item">
      <img src="~assets/img/detail/kefu.svg" alt="">
      <div class="item-text">客服</div>
    </div>
    <div class="item">
      <img src="~assets/img/detail/dianpu.svg" alt="">
      <div class="item-text">店铺</div>
    </div>
    <div class="item">
      <img src="~assets/img/detail/shoucang.svg" alt="">
      <div class="item-text">收藏</div>
    </div>
    <div class="item item-flex item-add" @click="addToCart">加入购物车</div>
    <div class="item item-flex item-buy">购买</div>
  </div>
</template>

<script>
  export default {
    name: 'DetailBottomBar',
    methods: {
      addToCart() {
        this.$emit('addCart')
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 0.98rem;
    background-color: #ffffff;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -0.02rem 0.02rem rgba(100, 100, 100, .1);
    display: flex;
    text-align: center;
  }
  .item {
    flex: 1;
  }
  .item img {
    width: 30%;
    margin-top: 0.1rem;
  }
  .item .item-text, .item-add, .item-buy {
    font-size: 0.26rem;
  }
  .item-flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-add {
    background-color: #ffdf15;
    font-weight: bold;
  }
  .item-buy {
    background-color: #ff769d;
    color: #ffffff;
    font-weight: bold;
  }
</style>