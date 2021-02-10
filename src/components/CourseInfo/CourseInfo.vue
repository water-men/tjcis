<template>
  <div>
    <a-layout>
      <a-layout>       
        <a-layout-content :style="{ margin: '8px 10px 0', minHeight: '670px',background: 'white'}">
          <a-card>
            <!-- 展示课程信息组件 将当前选择的课号和课程名称作为一个对象传进去 不需要用户信息-->
            <course-detail :selected-course="selectedCourse" :collected="collected"></course-detail>
            <a-divider />
            <!-- 写评价按钮及弹出表单 将课号和课程名称作为一个对象selectedCourse传进去 将用户信息作为userInfo传进去 -->
            <write-comment :selected-course="selectedCourse" :user-info="userInfo" :my_comment="my_comment"></write-comment>
            <a-divider />
            <!-- 展示课程评价列表组件 将课号和课程名称作为一个对象selectedCourse传进去 将用户信息作为userInfo传进去(点赞等操作需要使用) -->
            <comment-list :selected-course="selectedCourse" :user-info="userInfo" :comment-list="commentList"></comment-list>
            <a-row>
            </a-row>
          </a-card>
        </a-layout-content>
      </a-layout>
      <a-layout-sider :style="{ margin: '8px 10px 0', minHeight: '670px',background: 'white' }">
        <a-card>
          <!-- 展示相关课程列表组件 将课号和课程名称作为一个对象传进去 不需要用户信息-->
          <related-list :selected-course="selectedCourse" v-on="$listeners"></related-list>
        </a-card>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script>
import CourseDetail from "@/components/CourseInfo/CourseDetail"
import CommentList from "@/components/CourseInfo/CommentList"
import RelatedList from "@/components/CourseInfo/RelatedList"
import WriteComment from "@/components/CourseInfo/WriteComment"
export default {
  components: {
    CourseDetail,
    CommentList,
    RelatedList,
    WriteComment,
  },
  props: {
    selectedCourse: {
      type: Object,
      default: () => ({
        Cid: '',
        Cno: '',
        Cname: '',
        Tname: '',
        Dname: '',
        tags: [
        ],
        Cscore: undefined,
      }),
      require: true
    },
    userInfo: {
      type: Object,
      default: () => ({
        username:'',
      }),
      require: true
    },
  },
  data(){
    return{
      commentList: [
        // {
        //   Cmid:"1",
        //   Cno:'',
        //   author: 'Zhu',
        //   title: 'Comment1',
        //   content:
        //     '阿巴阿巴',
        //   score: 7,
        //   likes: 0,
        //   dislikes: 0,
        //   Cmtime: '2012-02-21 22:11:33',
        //   action:null,
        // },
        // {
        //   Cmid:"2",
        //   Cno:'',
        //   author: 'Jiang Hao',
        //   title: 'Comment2',
        //   content:
        //     '哈哈哈哈哈',
        //   score: 10,
        //   likes: 0,
        //   dislikes: 0,
        //   Cmtime: '2013-04-02 10:12:53',
        //   action:null,
        // },
        // {
        //   Cmid:"3",
        //   Cno:'',
        //   author: 'Jiang Hao',
        //   title: 'Comment3',
        //   content:
        //     '哈哈哈哈哈',
        //   score: 10,
        //   likes: 0,
        //   dislikes: 0,
        //   Cmtime: '2013-04-02 10:12:53',
        //   action:null,
        // },
        // {
        //   Cmid:"4",
        //   Cno:'',
        //   author: 'Jiang Hao',
        //   title: 'Comment4',
        //   content:
        //     '哈哈哈哈哈',
        //   score: 10,
        //   likes: 0,
        //   dislikes: 0,
        //   Cmtime: '2013-04-02 10:12:53',
        //   action:null,
        // },
        // {
        //   Cmid:"5",
        //   Cno:'',
        //   author: 'Jiang Hao',
        //   title: 'Comment5',
        //   content:
        //     '哈哈哈哈哈',
        //   score: 10,
        //   likes: 0,
        //   dislikes: 0,
        //   Cmtime: '2013-04-02 10:12:53',
        //   action:null,
        // },
        // {
        //   Cmid:"6",
        //   Cno:'',
        //   author: 'Jiang Hao',
        //   title: 'Comment6',
        //   content:
        //     '哈哈哈哈哈',
        //   score: 10,
        //   likes: 0,
        //   dislikes: 0,
        //   Cmtime: '2013-04-02 10:12:53',
        //   action:null,
        // },
        // {
        //   Cmid:"7",
        //   Cno:'',
        //   author: 'Jiang Hao',
        //   title: 'Comment7',
        //   content:
        //     '哈哈哈哈哈',
        //   score: 10,
        //   likes: 0,
        //   dislikes: 0,
        //   Cmtime: '2013-04-02 10:12:53',
        //   action:null,
        // },
        // {
        //   Cmid:"8",
        //   Cno:'',
        //   author: 'Jiang Hao',
        //   title: 'Comment8',
        //   content:
        //     '哈哈哈哈哈',
        //   score: 10,
        //   likes: 0,
        //   dislikes: 0,
        //   Cmtime: '2013-04-02 10:12:53',
        //   action:null,
        // },
        // {
        //   Cmid:"9",
        //   Cno:'',
        //   author: 'Jiang Hao',
        //   title: 'Comment9',
        //   content:
        //     '哈哈哈哈哈',
        //   score: 10,
        //   likes: 0,
        //   dislikes: 0,
        //   Cmtime: '2013-04-02 10:12:53',
        //   action:null,
        // },
        // {
        //   Cmid:"10",
        //   Cno:'',
        //   author: 'Jiang Hao',
        //   title: 'Comment10',
        //   content:
        //     '哈哈哈哈哈',
        //   score: 10,
        //   likes: 0,
        //   dislikes: 0,
        //   Cmtime: '2013-04-02 10:12:53',
        //   action:null,
        // },
        // {
        //   Cmid:"11",
        //   Cno:'',
        //   author: 'Jiang Hao',
        //   title: 'Comment11',
        //   content:
        //     '哈哈哈哈哈',
        //   score: 10,
        //   likes: 0,
        //   dislikes: 0,
        //   Cmtime: '2013-04-02 10:12:53',
        //   action:null,
        // },
        // {
        //   Cmid:"12",
        //   Cno:'',
        //   author: 'Jiang Hao',
        //   title: 'Comment12',
        //   content:
        //     '哈哈哈哈哈',
        //   score: 10,
        //   likes: 0,
        //   dislikes: 0,
        //   Cmtime: '2013-04-02 10:12:53',
        //   action:null,
        // },
        // {
        //   Cmid:"13",
        //   Cno:'',
        //   author: 'Jiang Hao',
        //   title: 'Comment13',
        //   content:
        //     '哈哈哈哈哈',
        //   score: 10,
        //   likes: 0,
        //   dislikes: 0,
        //   Cmtime: '2013-04-02 10:12:53',
        //   action:null,
        // },
      ],
      my_comment: null,
      collected: null,
    };
  },
  beforeMount(){
    let that = this;
    let submitData = new Object();
    submitData.course_id = this.selectedCourse.Cid;
    submitData.username = this.userInfo.username;
    let request = JSON.stringify(submitData);
    this.$axios.post("/api/getCourseComments",request).then((response)=>{
      if(response.ret_msg == "success")
      {
        that.my_comment = response.my_comment;
        that.commentList = response.data.comments;
        that.collected = response.collected;
      }
      else
        this.$message.error("获取课程评价列表失败");
    }).catch(()=>{this.$message.error("获取课程评价列表失败");});
  },
  methods:{

  },
}
</script>

<style>
</style>