<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"/>
      </div>
    </div>

    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt=""/>
      <span>{{commentInfo.user.uname}}</span>
    </div>

    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img :src="item" alt="" v-for="(item, index) in commentInfo.images" :key="index"/>
      </div>
    </div>
  </div>
  <div class="comment-info" style="color: red;" v-else>暂无用户评论</div>
</template>

<script>
  import { formatDate } from 'common/utils'

  export default {
    name: 'DetailCommentInfo',
    props: {
      commentInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      showDate(value) {
        // 将时间戳转成date对象
        const date = new Date(value * 1000)
        // 将date进行格式化
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    }
  }
</script>

<style scoped>
  .comment-info {
    padding: 0.1rem 0.24rem;
    color: #333333;
    border-bottom: 0.1rem solid #f2f5f8;
    margin-bottom: 0.2rem;
  }
  .info-header {
    line-height: 1rem;
    height: 1rem;
    border-bottom: 0.02rem solid rgba(0, 0, 0, 0.1);
  }
  .header-title {
    font-size: 0.3rem;
    float: left;
  }
  .header-more {
    font-size: 0.26rem;
    float: right;
    margin-right: 0.2rem;
  }
  .info-user {
    padding: 0.2rem 0 0.1rem;
  }
  .info-user img {
    width: 0.82rem;
    height: 0.82rem;
    border-radius: 50%;
  }
  .info-user span {
    font-size: 0.3rem;
    margin-left: 0.2rem;
  }
  .info-detail {
    padding: 0 0.1rem 0.3rem;
  }
  .info-detail p {
    font-size: 0.28rem;
    line-height: 1.5;
    color: #777777;
  }
  .info-detail .info-other {
    font-size: 0.24rem;
    margin-top: 0.2rem;
    color: #999999;
  }
  .info-other .date {
    margin-right: 0.16rem;
  }
  .info-imgs {
    margin-top: 0.2rem;
  }
  .info-imgs img {
    width: 1.4rem;
    height: 1.4rem;
    margin-right: 0.1rem;
  }
</style>
