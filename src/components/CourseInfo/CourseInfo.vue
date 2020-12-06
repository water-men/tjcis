<template>
  <div>
    <a-layout>
      <a-layout>       
        <a-layout-content :style="{ margin: '8px 10px 0', minHeight: '670px',background: 'white'}">
          <a-card>
            <!-- 展示课程信息组件 将当前选择的课号和课程名称作为一个对象传进去 不需要用户信息-->
            <course-detail :selected-course="selectedCourse"></course-detail>
            <a-divider />
            <!-- 写评价按钮及弹出表单 将课号和课程名称作为一个对象selectedCourse传进去 将用户信息作为userInfo传进去 -->
            <write-comment :selected-course="selectedCourse" :user-info="userInfo"></write-comment>
            <a-divider />
            <!-- 展示课程评价列表组件 将课号和课程名称作为一个对象selectedCourse传进去 将用户信息作为userInfo传进去(点赞等操作需要使用) -->
            <comment-list :selected-course="selectedCourse" :user-info="userInfo"></comment-list>
            <a-row>
            </a-row>
          </a-card>
        </a-layout-content>
      </a-layout>
      <a-layout-sider :style="{ margin: '8px 10px 0', minHeight: '670px',background: 'white' }">
        <a-card>
          <!-- 展示相关课程列表组件 将课号和课程名称作为一个对象传进去 不需要用户信息-->
          <related-list v-on="$listeners"></related-list>
        </a-card>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script>
import CourseDetail from "@/components/CourseInfo/CourseDetail"
import CommentList from "@/components/CourseInfo/CommentList"
import RelatedList from "@/components/CourseInfo/RelatedList"
import WriteComment from "@/components/CourseInfo/WriteComment"
export default {
  components: {
    CourseDetail,
    CommentList,
    RelatedList,
    WriteComment,
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
    userInfo: {
      type: Object,
      default: () => ({
        Sno:'',
        username:'',
      }),
      require: true
    },
  },
}
</script>

<style>
</style>