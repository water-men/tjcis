<template>
  <div>
    <!-- 推荐课程卡片 -->
    <a-card>
      <a-tabs default-active-key="1" align="left" size="large">
        <a-tab-pane key="1" tab="课程推荐" >
          <h2 align="left">根据您近期的浏览和评价，为您推荐以下课程</h2>
          <a-row :gutter="16" >
            <a-col v-for="(course,index) in recommendlist" :key="index" :bordered="true" :span="8" >
              <div @click="selectCourse(course)">
                <a-card hoverable>
                  <h3>{{ course.course_name }}</h3>
                  <a-divider />
                  授课老师:{{ course.course_teacher }}
                  <a-divider />
                  课程标签:
                  <a-tag
                    v-for="tag in course.course_tag"
                    :key="tag"
                    :color="tag === tag.length > 5 ? 'geekblue' : 'green'"
                  >{{ tag.tag_content.toUpperCase() }}</a-tag>    
                </a-card>
              </div>
            </a-col> 
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="2" tab="公告信息" >
          <div align="center">
            <a-list :data-source="noticelist" item-layout="horizontal">
              <a-list-item slot="renderItem" slot-scope="item">
                <a slot="title">{{ item.not_title }}</a>
                <a slot="content">{{ item.not_content }}</a>
              </a-list-item>
            </a-list>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-card>
    <br />
    <!-- 功能选单卡片 -->
    <a-card>
      <a-tabs default-active-key="1" align="left" size="large">
        <a-tab-pane key="1" tab="功能选单" >
          <a-row :gutter="16">
            <a-col :span="8">
              <div @click="gotoMyComments()">
                <a-card hoverable>
                  <a-statistic
                    :value-style="{ color: '#3f8600' }"
                    :value="mycommentnum"
                    title="我的评价"
                    suffix="条"
                    style="margin-right: 50px"
                  >
                    <template #prefix>
                      <a-icon type="arrow-right" />
                    </template>
                  </a-statistic>
                </a-card>
              </div>
            </a-col>
            <a-col :span="8">
              <div @click="gotoMyFavorite()">
                <a-card hoverable>
                  <a-statistic
                    :value="myfavornum"
                    :value-style="{ color: '#cf1322' }"
                    title="我的收藏"
                    suffix="个"
                  >
                    <template #prefix>
                      <a-icon type="arrow-right" />
                    </template>
                  </a-statistic>
                </a-card>
              </div>
            </a-col>
            <a-col :span="8">
              <div @click="gotoScheduleTable()">
                <a-card hoverable>
                  <a-statistic
                    :value="myshedulenum"
                    :value-style="{ color: '#cf1322' }"
                    title="待办"
                    suffix="个"
                  >
                    <template #prefix>
                      <a-icon type="arrow-right" />
                    </template>
                  </a-statistic>
                </a-card>
              </div>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </a-card>
    <br />
    <!-- 统计数据卡片 -->
    <a-card>
      <a-tabs default-active-key="1" align="left" size="large">
        <a-tab-pane key="1" tab="统计数据" >
          <div align="center">
            <a-progress :percent="13" :format="percent => `${percent} 条评论`" type="circle" />
            <a-progress :percent="7" :format="percent => `${percent}个上传文件`" type="circle" />
            <a-progress :percent="76" :format="percent => `${percent}次获赞`" type="circle">
              <template #format="percent">
                <span style="color: red">{{ percent }}</span>
              </template>
            </a-progress>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-card>
    <br />
  </div>
</template>

<script>

export default {
  props: {
    userInfo: {
      type: Object,
      default: () => ({
        user_no:'',
        username:'',
      }),
      require: true
    },
  },
  data () {
    return {
      //推荐课程列表，先写死数据，以后要加载时发送请求，根据用户信息从后台获取
      recommendlist:[
        // {
        //   key: '1',
        //   Cno: '10038802',
        //   Cname: '离散数学',
        //   Tname: '王成',
        //   tags: ['nice', 'developer'],
        // },
        // {
        //   key: '2',
        //   Cno: '10038901',
        //   Cname: '数据结构',
        //   Tname: '武研',
        //   tags: ['hello'],
        // },
        // {
        //   key: '3',
        //   Cno: '10034005',
        //   Cname: '计算机网络',
        //   Tname: '沈坚',
        //   tags: ['cool', 'teacher'],
        // },
      ],
      //通知列表
      noticelist:[
      ],
      mycommentnum: 12,
      myfavornum: 5,
      myshedulenum: 5,
    }
  },
  beforeMount: function() {
    let submitObject = {
      user_no: this.userInfo.user_no,
    }
    let submitData = JSON.stringify(submitObject);

    this.$axios.post("/api/getRecommendCoursesList",submitData).then((response) => {
      if(response.ret_msg == "success") {
        this.recommendlist = response.data.courses;
      }
      // else
      //   this.$message.error('获取推荐课程列表失败')
    }).catch(() => { 
      //this.$message.error('获取推荐课程列表失败') 
    }); //获取推荐课程列表

    // this.$axios.get("/api/").then((response) => {
    //   if(response.ret_msg == "success") {
    //     this.noticelist = response.data.notices;
    //   }
    //   else
    //     this.$message.error('获取公告失败');
    // }).catch(() => { this.$message.error('获取公告失败') }); //获取公告
  },
  methods: {
    selectCourse(record){
        this.$emit('getCourse',record)
    },
    gotoMyComments(){
        this.$emit('toMyComments')
    },
    gotoMyFavorite(){
        this.$emit('toMyFavorite')
    },
    gotoScheduleTable(){
        this.$emit('toScheduleTable')
    },
  },
}
</script>

<style scoped>
div.ant-progress-circle,
div.ant-progress-line {
  margin-right: 8px;
  margin-bottom: 8px;
}

/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}

</style>