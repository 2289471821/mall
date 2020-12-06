<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
    props: {
      path: String,
      activeColor: {
        type: String,
        default: '#d81e06'
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        this.$router.push(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    height: 0.98rem;
    text-align: center;
    font-size: 0.28rem;
    color: #2c2c2c;
    font-weight: 600;
  }
  .tab-bar-item img {
    width: 0.48rem;
    height: 0.48rem;
    vertical-align: middle;
    margin-top: 0.06rem;
    margin-bottom: 0.04rem;
  }
</style>
