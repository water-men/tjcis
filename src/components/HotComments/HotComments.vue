<template>
  <a-card :style="{ minHeight: '670px'}">
    <a-tabs default-active-key="1" align="left" size="large">
      <a-tab-pane key="1" tab="近期热门评价" >
        <a-card v-for="(item,index) in HotComments" :title="item.cardTile" :key="index" style="margin-top:8px;">
          <a-comment >
            <template slot="actions">
              <span key="comment-basic-like" @click="like(index)" >
                <a-icon :theme="item.action === 'liked' ? 'filled' : 'outlined'" type="like"/>
                <span style="padding-left: '8px';cursor: 'auto'">
                  {{ item.comm_positive }}
                </span>
              </span>
              <span key="comment-basic-dislike" @click="dislike(index)" >
                <a-icon :theme="item.action === 'disliked' ? 'filled' : 'outlined'" type="dislike" />
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
  data() {
    return {
      HotComments:[
        // {
        //   user_no: '12345678',
        //   course_no:'102021020',
        //   course_name:'离散数学',
        //   course_teacher:'王成',
        //   stu_username: 'Zhu',
        //   comm_title: 'Comment1',
        //   comm_content:
        //     '阿巴阿巴',
        //   comm_score: 7,
        //   comm_positive: 0,
        //   comm_negative: 0,
        //   comm_time: '2012-02-21 22:11:33',
        //   action:null,
        // },
        // {
        //   user_no: '123',
        //   course_no:'10086',
        //   course_name:'电信',
        //   course_teacher:'王朝和马汉',
        //   stu_username: 'Jiang Hao',
        //   comm_title: 'Comment2',
        //   comm_content:
        //     '哈哈哈哈哈',
        //   comm_score: 10,
        //   comm_positive: 0,
        //   comm_negative: 0,
        //   comm_time: '2013-04-02 10:12:53',
        //   action:null,
        // },
      ],
    };
  },
  beforeMount(){
    this.$axios.get("/api/getHotComments").then((response)=>{
      if(response.data.ret_code == 0)
      {
        this.HotComments = response.data.data.commentsList;
        for(let i=0;i<this.HotComments.length;i++)
        {
          this.HotComments[i].cardTile = '课号：'+this.HotComments[i].course_no+' 课程名称：'+this.HotComments[i].course_name+' 授课老师：'+this.HotComments[i].course_teacher;
          this.HotComments[i].action = null;
        }
      }
      else
        this.$message.error("获取热门评价失败");
    }).catch(()=>{this.$message.error("获取热门评价失败");});
  },
  methods: {
    like(index) {
      if(this.HotComments[index].action=='liked')
      {
        this.HotComments[index].comm_positive--;
        this.HotComments[index].action=null;
        let submitData = new Object();
        submitData.user_no = this.HotComments[index].stu_no;
        submitData.course_no = this.HotComments[index].course_no;
        submitData.positive = 0;
        //let request = JSON.stringify(submitData);
        this.$axios.post("/api/positive",submitData);
      }
      else 
      {
        if(this.HotComments[index].action=='disliked')
        {
          this.HotComments[index].comm_negative--;
          let dislike = new Object();
          dislike.user_no = this.HotComments[index].stu_no;
          dislike.course_no = this.HotComments[index].course_no;
          dislike.negative = 0;
          //let request = JSON.stringify(dislike);
          this.$axios.post("/api/negative",dislike);
        }  
        this.HotComments[index].comm_positive++;
        this.HotComments[index].action = 'liked';
        let submitData = new Object();
        submitData.user_no = this.HotComments[index].stu_no;
        submitData.course_no = this.HotComments[index].course_no;
        submitData.positive = 1;
        //let like_request = JSON.stringify(submitData);
        this.$axios.post("/api/positive",submitData);
      }
    },
    dislike(index) {
      if(this.HotComments[index].action=='disliked')
      {
        this.HotComments[index].comm_negative--;
        this.HotComments[index].action=null;
        let submitData = new Object();
        submitData.user_no = this.HotComments[index].stu_no;
        submitData.course_no = this.HotComments[index].course_no;
        submitData.negative = 0;
        //let request = JSON.stringify(submitData);
        this.$axios.post("/api/negative",submitData);
      }
      else 
      {
        let that = this;
        if(this.HotComments[index].action=='liked')
        {
          this.HotComments[index].comm_positive--;
          let like = new Object();
          like.user_no = this.HotComments[index].stu_no;
          like.course_no = this.HotComments[index].course_no;
          like.positive = 0;
          //let request = JSON.stringify(like);
          this.$axios.post("/api/positive",like);
        }  
        that.HotComments[index].comm_negative++;
        that.HotComments[index].action = 'disliked';
        let submitData = new Object();
        submitData.user_no = this.HotComments[index].stu_no;
        submitData.course_no = this.HotComments[index].course_no;
        submitData.negative = 1;
        //let dislike_request = JSON.stringify(submitData);
        this.$axios.post("/api/negative",submitData);
      }
    },
  }
};
</script>
<style></style>