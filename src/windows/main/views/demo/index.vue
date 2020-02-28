<style lang="less">
  @import "index.less";
</style>

<template>
  <div :class="NAME">
    <div :class="`${NAME}-menu`">
      <RouterLink
        v-for="(menu, i) in menus" :key="i"
        :to="menu.path"
        class="menu-item">
        {{ menu.meta.title }}
      </RouterLink>
    </div>
    <div :class="`${NAME}-body`">
      <RouterView />
    </div>
  </div>
</template>

<script>
  const NAME = 'view-demo';
  export default {
    name: NAME,
    data () {
      return {
        NAME,
      };
    },
    computed: {
      menus() {
        let thisRoute = this.$router.options.routes.find(item => item.path === '/demo');
        return thisRoute ? thisRoute.children : [];
      },
    },
    mounted() {
    
    }
  }
</script>
