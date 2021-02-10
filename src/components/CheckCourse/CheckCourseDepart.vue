<template>
  <div>
    <a-card>
      <a-tabs default-active-key="1" align="left" size="large">
        <a-tab-pane key="1" tab="选择开课学院" >
          <a-card >
            <a-card-grid v-for="depart in departlist" :key="depart.name" :class="{active : active == depart.name}" hoverable style="
        width: 20%;
        text-align: center;
        font-size: 1.2rem;
        font-weight: bolder;
      " @click="selectDepart(depart)"><div>
        {{ depart.name }}
            </div></a-card-grid>
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </a-card>
    <br />
    <a-card>
      <!-- 引入courselist checktype参数为depart 同时传入选择的depart 使用 v-on="$listeners" 把Home中的getCourse事件绑定到CourseList组件-->
      <course-list :check-type="checktype" :filter-content="selecteddepart" v-on="$listeners"></course-list>
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
      selecteddepart: {name:'所有'},
      departlist:[
        {name:'创新创意学院'},
        {name:'荣誉课程'},
        {name:'数学科学学院'},
        {name:'化学科学与工程学院'},
        {name:'体育教学部'},
        {name:'外国语学院'},
        {name:'经济与管理学院'},
        {name:'建筑与城市规划学院'},
        {name:'土木工程学院'},
        {name:'机械与能源工程学院'},
        {name:'环境科学与工程学院'},
        {name:'政治与国际关系学院'},
        {name:'材料科学与工程学院'},
        {name:'电子与信息工程学院'},
        {name:'人文学院'},
        {name:'医学院'},
        {name:'口腔医学院'},
        {name:'交通运输工程学院'},
        {name:'女子学院'},
        {name:'生命科学与技术学院'},
        {name:'汽车学院'},
        {name:'新生院'},
        {name:'海洋与地球科学学院'},
        {name:'武装部'},
        {name:'航空航天与力学学院'},
        {name:'艺术与传媒学院'},
        {name:'职业技术教育学院'},
        {name:'中德学院'},
        {name:'法学院'},
        {name:'马克思主义学院'},
        {name:'设计创意学院'},
        {name:'测绘与地理信息学院'},
        {name:'物理科学与工程学院'},
        {name:'创新创业学院'},
        {name:'铁道与城市轨道交通研究院'},
      ],
      active:'',
    }
  },
  methods: {
    selectDepart (selected) {
      if(this.selecteddepart == selected)
      {
        this.selecteddepart = {name:'所有'};
        this.active = this.selecteddepart.name;
      }
      else
      {
        this.selecteddepart = selected;
        this.active = selected.name;
      }
      
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