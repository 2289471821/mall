<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <p class="key">{{paramInfo.size_key}}</p>
    <table class="info-size" v-for="(table, index) in paramInfo.size" :key="index">
      <tr v-for="(tr, indey) in table" :key="indey">
        <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>

    <p class="key protuct_key">{{paramInfo.protuct_key}}</p>
    <table class="info-param">
      <tr v-for="(info, index) in paramInfo.set" :key="index">
        <td class="info-param-key">{{info.key}}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>

    <div class="info-img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  }
};
</script>

<style scoped>
  .param-info {
    font-size: 0.28rem;
    padding: 0.4rem 0.3rem;
    border-bottom: 0.1rem solid #f2f5f8;
  }
  .key {
    font-size: 0.3rem;
    margin-bottom: 0.2rem;
  }
  .protuct_key {
    padding-top: 0.4rem;
  }
  .param-info table {
    width: 100%;
    border-collapse: collapse;
  }
  .param-info table tr {
    height: 0.84rem;
  }
  .param-info table tr td {
    border-bottom: 0.02rem solid rgba(100, 100, 100, 0.1);
  }
  .info-param-key {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 1.9rem;
  }
  .info-param {
    border-bottom: 0.02rem solid rgba(0, 0, 0, 0.1);
  }
  .param-value {
    color: #eb4868;
  }
  .info-img img {
    width: 100%;
  }
</style>