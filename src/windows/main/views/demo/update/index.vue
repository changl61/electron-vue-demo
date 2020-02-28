<style lang="less">
  @import "index.less";
</style>

<template>
  <div :class="NAME">
    <Form :label-width="80" style="width: 80%; padding-top: 20px;">
      <FormItem label="">
        <Button type="primary" @click="check">检查更新</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  const NAME = 'view-demo-hello';
  import { ipcRenderer } from 'electron';
  
  export default {
    name: NAME,
    data () {
      return {
        NAME,
        form: {
          title: 'Welcome',
          body: 'Hello, im a test Notification.'
        }
      };
    },
    methods: {
      check() {
        ipcRenderer.send("checkForUpdate");
        console.log('--------------------');
        console.log('send:', 'checkForUpdate');
        console.log('--------------------');
      }
    },
    mounted() {
      ipcRenderer.on("message", (event, text) => {
        console.log('--------------------');
        console.log('message:', text);
        console.log('--------------------');
      });
      
      ipcRenderer.on("downloadProgress", (event, text) => {
        console.log('--------------------');
        console.log('downloadProgress:', text);
        console.log('--------------------');
      });
      
      ipcRenderer.on("isUpdateNow", (event, text) => {
        this.$Modal.confirm({
          title: '确定更新吗？',
          content: '新的版本已下载，可以现在安装',
          onOk: () => {
            this.$Message.info('正在准备安装，请稍后 ...');
            ipcRenderer.send("updateNow");
          },
        });
      });
    },
    destroyed() {
    
    }
  }
</script>
