<template>
  <a-carousel autoplay>
    <div v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" :alt="item.title" @load="imageLoad">
      </a>
    </div>
  </a-carousel>
</template>

<script>
  export default {
    name: 'HomeCarousel',
    props: {
      banners: {
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
    },
    methods: {
      imageLoad() {
        if(!this.isLoad) {
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>
  img {
    width: 100%;
  }
</style>
