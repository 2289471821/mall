<template>
  <div class="goods-item" @click="skipDetailPage">
    <img :src="showImage" alt="" @load="imageLoad">
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
    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    filters: {
      getDollarSign(value) {
        return '￥' + value
      }
    },
    methods: {
      imageLoad() {
        this.$bus.$emit('itemImageLoad')
      },
      // 跳转到详情页面
      skipDetailPage() {
        this.$router.push({
          path: '/detail',
          query: {
            iid: this.goodsItem.iid
          }
        })
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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
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
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  .goods-collect::before {
    content: '';
    width: 0.3rem;
    height: 0.3rem;
    background-image: url('~assets/img/common/collect.png');
    background-size: cover;
  }
</style>