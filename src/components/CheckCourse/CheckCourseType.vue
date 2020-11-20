<template>
  <div>
    <a-card title="请选择课程类别">
      <!--使用active标签类 在data中定义即将渲染的数据active 在点击事件中动态改变active类名 实现点击card后高亮-->
      <a-card-grid v-for="type in coursetype" :key="type.id" 
                   :class="{active : active == type.name}"
                   style="
        width: 25%;
        text-align: center;
        font-size: 16px;
        font-weight: bolder;
      "
      ><div @click="selectType(type)">
        {{ type.name }}
      </div>
      </a-card-grid>
    </a-card>
    <a-card>
      <h2>{{ selectedtype.name }}类别的课程</h2>
      <a-divider />
      <!-- 计划 直接引入courselist checktype参数为type 把Home中的getCourse事件绑定到CourseList -->
      <course-list :checktype="checktype" v-on="$listeners"></course-list>
    </a-card>
  </div>
  <!-- 计划 引入courselist组件 点击某个类别后显示列表 参数为type和对应类别-->
</template>

<script>
import CourseList from "@/components/CheckCourse/CourseList"
export default {
  components: {
    CourseList
  },
  data() {
    return {
      checktype: "type",
      selectedtype: {id:0, name:'所有'},
      coursetype:[
        {id:1, name:'公共基础课'},
        {id:2, name:'公共选修课'},
        {id:3, name:'艺术类选修课'},
        {id:4, name:'创新创业类选修课'},
        {id:5, name:'专业必修课'},
        {id:6, name:'专业选修课'},
      ],
      active:'',
    }
  },
  methods: {
    selectType (selected) {
      this.selectedtype = selected;
      this.active = selected.name;
    },
  }
}
</script>

<style>
.active {
   background: #aaaaee;
   color: #fff;
 }
</style>