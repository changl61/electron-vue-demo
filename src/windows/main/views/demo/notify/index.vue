<style lang="less">
  @import "index.less";
</style>

<template>
  <div :class="NAME">
    <Form :label-width="80" style="width: 80%; padding-top: 20px;">
      <FormItem label="标题">
        <Input v-model="form.title" placeholder="请输入" />
      </FormItem>
      <FormItem label="内容">
        <Input v-model="form.body" placeholder="请输入" />
      </FormItem>
      <FormItem label="">
        <Button type="primary" @click="send">发送通知</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  const NAME = 'view-demo-hello';
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
      send() {
        let msg = new Notification(
          this.form.title,
          {
            body: this.form.body,
          }
        );

        msg.onclick = () => {
          console.log('通知被点击')
        }
      }
    },
    mounted() {
    
    }
  }
</script>
