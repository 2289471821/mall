<template>
  <div class="tab-control">
    <div 
      class="tab-control-item" 
      v-for="(item, index) in titles" 
      :key="index" 
      :class="{active: index === currentIndex}"
      @click="tabClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabControl',
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      tabClick(index) {
        this.currentIndex = index
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    font-size: 0.3rem;
    height: 0.8rem;
    background-color: #fff;
  }
  .tab-control-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tab-control-item span {
    padding: 0.1rem 0;
    border-bottom: 0.06rem solid #fff;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 0.06rem solid var(--color-tint);
  }
</style>
