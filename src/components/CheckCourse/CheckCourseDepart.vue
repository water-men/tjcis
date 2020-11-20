<template>
  <div>
    <a-card title="请选择开课学院">
      <a-card-grid v-for="depart in departlist" :key="depart.id" :class="{active : active == depart.Dname}" hoverable style="
        width: 20%;
        text-align: center;
        font-size: 16px;
        font-weight: bolder;
      "><div @click="selectDepart(depart)">
        {{ depart.Dname }}
      </div></a-card-grid>
    </a-card>
    <a-card>
      <h2>{{ selecteddepart.Dname }}学院的课程</h2>
      <a-divider />
      <!-- 引入courselist checktype参数为depart 使用 v-on="$listeners" 把Home中的getCourse事件绑定到CourseList组件-->
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
      checktype: "depart",
      selecteddepart: {id:0, Dname:'所有'},
      departlist:[
        {id:1, Dname:'建筑与城市规划学院'},
        {id:2, Dname:'土木工程学院'},
        {id:3, Dname:'机械与能源工程学院'},
        {id:4, Dname:'经济与管理学院'},
        {id:5, Dname:'环境科学与工程学院'},
        {id:6, Dname:'材料科学与工程学院'},
        {id:7, Dname:'电子与信息工程学院'},
        {id:8, Dname:'人文学院'},
        {id:9, Dname:'外国语学院'},
        {id:10, Dname:'法学院'},
        {id:11, Dname:'马克思主义学院'},
        {id:12, Dname:'政治与国际关系学院'},
      ],
      active:'',
    }
  },
  methods: {
    selectDepart (selected) {
      this.selecteddepart = selected;
      this.active = selected.Dname;
    },
  }
}
</script>

<style>
.active {
   background: #fd7522;
   color: #fff;
 }
</style>