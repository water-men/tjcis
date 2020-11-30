<template>
  <div>
    <a-layout>
      <a-layout>       
        <a-layout-content :style="{ margin: '8px 10px 0', minHeight: '670px',background: 'white'}">
          <a-card>
            <!-- 展示课程信息组件 将课号和课程名称作为一个对象传进去-->
            <course-detail :selected-course="selectedCourse"></course-detail>
            <a-divider />
            <!-- 展示课程评价列表组件 将课号和课程名称作为一个对象传进去-->
            <comment-list :selected-course="selectedCourse"></comment-list>
            <a-row>
            </a-row>
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
import CourseDetail from "@/components/CourseInfo/CourseDetail"
import CommentList from "@/components/CourseInfo/CommentList"
export default {
  components: {
    CourseDetail,
    CommentList,
  },
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