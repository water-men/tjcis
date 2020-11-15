<template>
  <div>
    <a-card title="请选择开课学院">
      <a-card-grid
        style="
        width: 20%;
        text-align: center;
        font-size: 16px;
        font-weight: bolder;
      "
      >hi</a-card-grid>
      <a-card-grid style="width: 20%; text-align: center">Content</a-card-grid>
      <a-card-grid style="width: 20%; text-align: center">Content</a-card-grid>
      <a-card-grid style="width: 20%; text-align: center">Content</a-card-grid>
      <a-card-grid style="width: 20%; text-align: center">Content</a-card-grid>
      <a-card-grid style="width: 20%; text-align: center">Content</a-card-grid>
      <a-card-grid style="width: 20%; text-align: center">Content</a-card-grid>
      <a-card-grid style="width: 20%; text-align: center">Content</a-card-grid>
      <a-card-grid v-for="(n, key) in [1, 3, 5]" :key="key">{{ n }}</a-card-grid>
    </a-card>
    <a-card>
      <h2>学院的课程</h2>
      <a-divider />
      <!-- 计划 直接引入courselist 参数为depart -->
      <course-list :checktype="checktype"></course-list>
    </a-card>
  </div>
  <!-- 计划 引入courselist组件 点击某个学院后显示列表 参数为depart和对应学院编号-->
</template>

<script>
import CourseList from "@/components/CheckCourse/CourseList"
export default {
  components: {
    CourseList
  },
  data() {
    return {
      checktype: "depart"
    }
  }
}
</script>

<style>
</style>