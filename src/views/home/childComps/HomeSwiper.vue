<template>
  <div>
    轮播图
  </div>
</template>

<script>
  export default {
    name: 'HomeSwiper',
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
</style>
