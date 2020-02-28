<style lang="less">
  @import "index.less";
</style>

<template>
  <div :class="NAME">
    <div class="content">
      <h1>Hello World</h1>
      <p>Powered by Electron, Webpack and Vue.js.</p>
    </div>
  </div>
</template>

<script>
  const NAME = 'view-home';
  export default {
    name: NAME,
    data () {
      return {
        NAME,
      };
    },
    methods: {
    
    },
    mounted() {
    
    }
  }
</script>
