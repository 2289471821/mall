<template>
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span class="discount" v-if="goods.discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length - 1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length - 1" :key="index">
        <img :src="goods.services[index - 1].icon" alt="" v-if="goods.services[index - 1].icon">
        <span>{{goods.services[index - 1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailBaseInfo',
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info {
    margin-top: 0.3rem;
    padding: 0 0.16rem;
    color: #999;
    border-bottom: 0.1rem solid #f2f5f8;
  }
  .info-title {
    color: #222;
  }
  .info-price {
    margin-top: 0.2rem;
  }
  .info-price .new-price {
    font-size: 0.5rem;
    color: var(--color-high-text);
  }
  .info-price .old-price {
    font-size: 0.26rem;
    margin-left: 0.1rem;
    text-decoration: line-through;
  }
  .info-price .discount {
    font-size: 0.24em;
    padding: 0.04rem 0.1rem;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: 8px;
    margin-left: 0.1rem;
    position: relative;
    top: -0.16rem;
  }
  .info-other {
    font-size: 0.3rem;
    margin-top: 0.3rem;
    line-height: 0.6rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 0.02rem solid rgba(100, 100, 100, .1);
  }
  .info-service {
    display: flex;
    justify-content: space-between;
    line-height: 1.2rem;
  }
  .info-service-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .info-service-item img {
    width: 0.3rem;
    height: 0.3rem;
  }
  .info-service-item span {
    font-size: 0.3rem;
    color: #333;
  }
</style>
