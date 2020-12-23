<template>
  <a-carousel autoplay>
    <div v-for="(item, index) in topImages" :key="index">
      <img :src="item" alt="">
    </div>
  </a-carousel>
</template>

<script>
  export default {
    name: 'DetailCarousel',
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isLoad: false
      }
    }
  }
</script>

<style scoped>
  .ant-carousel {
    height: 6rem;
    overflow: hidden;
  }
  .ant-carousel >>> .slick-slide {
    height: 6rem;
  }
  img {
    width: 100%;
    height: 100%;
  }
</style>
