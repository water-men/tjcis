<template>
  <div>
    <a-card>
      <!-- 引入courselist checktype参数为all 使用 v-on="$listeners" 把 Home中的getCourse事件绑定到CourseList  -->
      <course-list :checktype="checktype" v-on="$listeners"></course-list>
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