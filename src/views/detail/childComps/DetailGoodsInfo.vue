<template>
  <div class="goods-info" v-if="Object.keys(detailInfo).length !== 0">
    <div class="info-desc clear-fix">
      <div class="desc-header"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="desc-footer"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imageLoad" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailGoodsInfo',
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        counter: 0,
        imagesLength: 0
      }
    },
    watch: {
      detailInfo() {
        this.imagesLength = this.detailInfo.detailImage[0].list.length
      }
    },
    methods: {
      imageLoad() {
        if(++this.counter === this.imagesLength) {
          this.$emit('imageLoad')
        }
      }
    }
  }
</script>

<style scoped>
  .goods-info {
    padding: 0.4rem 0;
    border-bottom: 0.1rem solid #f2f5f8;
  }
  .info-desc {
    padding: 0 0.3rem;
  }
  .desc-header,
  .desc-footer {
    position: relative;
    width: 1.8rem;
    height: 0.02rem;
    background-color: #a3a3a5;
  }
  .desc-header {
    float: left;
  }
  .desc-footer {
    float: right;
  }
  .desc-header::before,
  .desc-footer::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 0.1rem;
    height: 0.1rem;
    background-color: #333;
  }
  .clear-fix {
    clear: both;
  }
  .desc {
    font-size: 0.28rem;
    padding: 0.3rem 0;
  }  
  .info-key {
    font-size: 0.3rem;
    margin: 0.2rem 0 0.2rem 0.3rem;
    color: #333;
  }
  .info-list img {
    width: 100%;
    padding: 0 0.1rem 0.2rem;
  }
</style>