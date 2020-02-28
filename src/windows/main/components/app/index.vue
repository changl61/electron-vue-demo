<style lang="less">
  @import "index.less";
</style>

<template>
  <div id="app" class="app">
    <Nav />
    <Main />
  </div>
</template>

<script>
  import Nav from './nav';
  import Main from './main';
  export default {
    name: 'app',
    components: { Nav, Main },
  };
</script>
