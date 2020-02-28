<style lang="less">
  @import "index.less";
</style>

<template>
  <div class="app-nav">
    <div class="avatar">
      <img alt="头像" :src="defaultAvatar" />
    </div>
    <div class="nav-list">
      <RouterLink to="/home" class="nav-item">
        <Icon class="nav-item-icon" type="ios-home" />
        <div class="nav-item-text">欢迎</div>
      </RouterLink>
      <RouterLink to="/demo" class="nav-item">
        <Icon class="nav-item-icon" type="ios-videocam" />
        <div class="nav-item-text">演示</div>
      </RouterLink>
    </div>
  </div>
</template>

<script>
  import defaultAvatar from '~/assets/images/default-avatar.png';
  export default {
    name: 'app',
    data() {
      return {
        defaultAvatar,
      };
    },
    created() {
    
    },
  };
</script>
