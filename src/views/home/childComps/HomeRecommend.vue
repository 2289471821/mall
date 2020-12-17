<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends" :key="item.sort">
      <a :href="item.link">
        <img :src="item.image" :alt="item.title">
        <div class="title">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HomeRecommend',
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    width: 100%;
    display: flex;
    font-size: 0.32rem;
    padding: 0.2rem 0 0.4rem;
    border-bottom: 0.16rem solid #eeeeee;
  }
  .recommend-item a {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .recommend-item img {
    width: 80%;
    margin-bottom: 0.2rem;
  }
  .title {
    color: #666666;
  }
</style>
