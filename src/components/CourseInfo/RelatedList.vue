<template>
  <div>
    <a-tabs default-active-key="1" align="left" size="large">
      <a-tab-pane key="1" tab="相关课程" >
        <p v-for="course in relatedlist" :gutter="16" :key="course.key" :bordered="true" :span="8" hoverable>
          <a-card hoverable>
            <div @click="selectCourse(course)">
              <h3>{{ course.Cname }}</h3>
              <a-divider />
              <!-- 点击推荐列表中的项目转到对应的课程页面 -->
              授课老师:{{ course.Tname }}
            </div>
          </a-card>
        </p>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
data () {
    return {
      //推荐课程列表，先写死数据，以后要加载时发送请求，根据用户信息从后台获取
      relatedlist:[
        {
          key: '1',
          Cno: '10038834',
          Cname: '计算机科学导论',
          Tname: '臧笛',
        },
        {
          key: '2',
          Cno: '10038901',
          Cname: '数据结构',
          Tname: '武研',
        },
        {
          key: '3',
          Cno: '10064005',
          Cname: '计算机网络',
          Tname: '沈坚',
        },
        {
          key: '4',
          Cno: '10788901',
          Cname: '计算机组成原理',
          Tname: '郝泳涛',
        },
        {
          key: '5',
          Cno: '10035605',
          Cname: '计算机系统结构',
          Tname: '秦国峰',
        },
      ],
    }
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