<template>
  <div>
    <a-layout>
      <a-layout>       
        <a-layout-content :style="{ margin: '8px 10px 0', minHeight: '670px',background: 'white'}">
          <a-card>
            {{ selectedCourse.Cname }}课程信息页面
          </a-card>
        </a-layout-content>
      </a-layout>
      <a-layout-sider :style="{ margin: '8px 10px 0', minHeight: '670px',background: 'white' }">
        <a-card>
          相关课程列表
        </a-card>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script>
export default {
  props: {
    selectedCourse: {
      type: Object,
      default: () => ({
        Cno:'',
        Cname:'',
      }),
      require: true
    },
  },
}
</script>

<style>

</style>