<template>
  <div>
    <a-tabs default-active-key="1" align="left" size="large">
      <a-tab-pane key="1" tab="相关课程" >
        <a-spin :spinning="isLoading">
          <p v-for="course in relatedlist" :gutter="16" :key="course.key" :bordered="true" :span="8" hoverable>
            <a-card hoverable>
              <div @click="selectCourse(course)">
                <h3>{{ course.course_name }}</h3>
                <a-divider />
                <!-- 点击推荐列表中的项目转到对应的课程页面 -->
                授课老师:{{ course.course_teacher }}
              </div>
            </a-card>
          </p>
        </a-spin>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  props: {
    selectedCourse: {
      type: Object,
      default: () => ({
        course_no: '',
        course_name: '',
        course_teacher: '',
        course_depart: '',
        course_score: 5,
      }),
      require: true
    },
  },
  data () {
    return {
      isLoading:null,
      //推荐课程列表，先写死数据，以后要加载时发送请求，根据用户信息从后台获取
      relatedlist:[
        // {
        //   key: '1',
        //   Cno: '10038834',
        //   Cname: '计算机科学导论',
        //   Tname: '臧笛',
        // },
        // {
        //   key: '2',
        //   Cno: '10038901',
        //   Cname: '数据结构',
        //   Tname: '武研',
        // },
        // {
        //   key: '3',
        //   Cno: '10064005',
        //   Cname: '计算机网络',
        //   Tname: '沈坚',
        // },
        // {
        //   key: '4',
        //   Cno: '10788901',
        //   Cname: '计算机组成原理',
        //   Tname: '郝泳涛',
        // },
        // {
        //   key: '5',
        //   Cno: '10035605',
        //   Cname: '计算机系统结构',
        //   Tname: '秦国峰',
        // },
      ],
    }
  },
  beforeMount(){
    this.isLoading = true;
    let submitData = {
      course_no: this.selectedCourse.course_no,
    }
    //let request = JSON.stringify(submitData);
    this.$axios.post("/api/getSimilarCoursesList",submitData).then((response)=>{
      if(response.data.ret_code==0)
      {
        this.relatedlist = response.data.data.courses_list;
        this.isLoading = false;
      }
      else
        this.$message.error("获取相关课程失败");
    }).catch(()=>{this.$message.error("获取相关课程失败");});
  },
  methods: {
    selectCourse(record){
        this.$listeners.getCourse(record);
    },
  }
}
</script>

<style>

</style>