<template>
  <div>
    <a-card>
      <h2>所有课程</h2>
      <a-divider />
      <!-- 计划 直接引入courselist 参数为all -->
      <course-list :checktype="checktype"></course-list>
    </a-card>
  </div>
</template>

<script>
import CourseList from "@/components/CheckCourse/CourseList"
export default {
  components: {
    CourseList
  },
  data() {
    return {
      checktype: "all"
    }
  }
}
</script>

<style>
</style>