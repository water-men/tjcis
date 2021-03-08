<template>
  <a-card :style="{ minHeight: '670px'}">
    <a-tabs default-active-key="1" align="left" size="large">
      <a-tab-pane key="1" tab="我的评价" >
        <a-card v-for="(item,index) in myComments" :title="item.cardTile" :key="index" style="margin-top:8px;text-align:left;">
          <a-comment >
            <template slot="actions">
              <span key="comment-basic-like">
                <a-icon :theme="outlined" type="like"/>
                <span style="padding-left: '8px';cursor: 'auto'">
                  {{ item.comm_positive }}
                </span>
              </span>
              <span key="comment-basic-dislike">
                <a-icon :theme="outlined" type="dislike" />
                <span style="padding-left: '8px';cursor: 'auto'">
                  {{ item.comm_negative }}
                </span>
              </span>
            </template>
            <a slot="author">{{ item.stu_username }}</a>
            <a-avatar
              slot="avatar"
              icon="user"
            />
            <p slot="content">
              {{ item.comm_title }}
              &nbsp;&nbsp;&nbsp;&nbsp;{{ item.comm_content }}
            </p>
            <span slot="datetime">{{ $moment(item.comm_time).fromNow() }}</span>
            <a-rate :value="(item.comm_score)/2" disabled allow-half></a-rate>&nbsp;&nbsp;
            <span>{{ item.comm_score }}/10分</span>
          </a-comment>
        </a-card>
      </a-tab-pane>
    </a-tabs>
  </a-card>
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
  data() {
    return {
      myComments:[
        // {
        //   Cmid:"1",
        //   Cno:'102021020',
        //   Cname:'离散数学',
        //   Tname:'王成',
        //   author: 'Zhu',
        //   title: 'Comment1',
        //   content:
        //     '阿巴阿巴',
        //   score: 7,
        //   likes: 0,
        //   dislikes: 0,
        //   Cmtime: '2012-02-21 22:11:33',
        // },
        // {
        //   Cmid:"2",
        //   Cno:'10086',
        //   Cname:'电信',
        //   Tname:'王朝和马汉',
        //   author: 'Jiang Hao',
        //   title: 'Comment2',
        //   content:
        //     '哈哈哈哈哈',
        //   score: 10,
        //   likes: 0,
        //   dislikes: 0,
        //   Cmtime: '2013-04-02 10:12:53',
        // },
      ],
    };
  },
  beforeMount(){
    let submitObject = {
      user_no: this.userInfo.user_no,
    };
    let submitData = JSON.stringify(submitObject);
    this.$axios.post("/api/getMyComments",submitData).then((response) => {
      if(response.ret_msg == "success") {
        this.myComments = response.data.comments;
      }
      else
        this.$message.error("获取我的评价失败");
    }).catch(() => { this.$message.error("获取我的评价失败"); }); //获取我的评价

    for(let i=0;i<this.myComments.length;i++)
    {
      this.myComments[i].cardTile = '课号：'+this.myComments[i].course_no+' 课程名称：'+this.myComments[i].course_name+' 授课老师：'+this.myComments[i].course_teacher;
    }
  },
  methods: {
  }
}
</script>

<style>

</style>