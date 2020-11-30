<template>
  <div>
    <a-card>
      <a-tabs default-active-key="1" align="left" size="large">
        <a-tab-pane key="1" tab="选择开课学院" >
          <a-card >
            <a-card-grid v-for="depart in departlist" :key="depart.id" :class="{active : active == depart.name}" hoverable style="
        width: 20%;
        text-align: center;
        font-size: 1.2rem;
        font-weight: bolder;
      "><div @click="selectDepart(depart)">
        {{ depart.name }}
            </div></a-card-grid>
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </a-card>
    <br />
    <a-card>
      <!-- 引入courselist checktype参数为depart 同时传入选择的depart 使用 v-on="$listeners" 把Home中的getCourse事件绑定到CourseList组件-->
      <course-list :checktype="checktype" :filter-content="selecteddepart" v-on="$listeners"></course-list>
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
      selecteddepart: {id:0, name:'所有'},
      departlist:[
        {id:1, name:'建筑与城市规划学院'},
        {id:2, name:'土木工程学院'},
        {id:3, name:'机械与能源工程学院'},
        {id:4, name:'经济与管理学院'},
        {id:5, name:'环境科学与工程学院'},
        {id:6, name:'材料科学与工程学院'},
        {id:7, name:'电子与信息工程学院'},
        {id:8, name:'人文学院'},
        {id:9, name:'外国语学院'},
        {id:10, name:'法学院'},
        {id:11, name:'马克思主义学院'},
        {id:12, name:'政治与国际关系学院'},
      ],
      active:'',
    }
  },
  methods: {
    selectDepart (selected) {
      this.selecteddepart = selected;
      this.active = selected.name;
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