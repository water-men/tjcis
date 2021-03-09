<template>
  <div>
    <a-tabs default-active-key="1" align="left" size="large">
      <a-tab-pane key="1" tab="评价列表" >
        <a-card v-for="(item,index) in showList" :key="index" style="margin-top:8px;">
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
        <div style="text-align:center;margin-top:8px;">
          <a-button v-if="showLoadMore" @click="loadMore">加载更多</a-button>
          <span v-else style="margin:auto;">已经到底啦</span>
        </div>
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
        course_tag: [
        ],
        course_score: 5,
      }),
      require: true
    },
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
      commentlist:[
      ],
      showList:[
      ],
      showCount:0,
      showLoadMore:false,
      collected: null,
    };
  },
  beforeMount(){
    let submitObject = {
      course_no : this.selectedCourse.course_no,
    };
    //let request = JSON.stringify(submitObject);
    this.$axios.post("/api/getCourseComments",submitObject).then((response)=>{
      if(response.data.ret_code == 0)
      {
        this.commentlist = response.data.comments;
        for(let i=0;i<this.commentlist.length;i++)
        {
          this.commentlist[i].action = null;
        }
        this.showList = this.commentlist.slice(0,8);
        this.showCount = this.showList.length;
        this.showLoadMore = !(this.showList.length==this.commentlist.length);
      }
      else
        this.$message.error("获取评价列表失败");
    }).catch(()=>{this.$message.error("获取评价列表失败");});
  },
  methods: {
    like(index) {
      if(this.commentlist[index].action=='liked')
      {
        this.commentlist[index].comm_positive--;
        this.commentlist[index].action=null;
        let submitData = new Object();
        submitData.user_no = this.HotComments[index].user_no;
        submitData.course_no = this.HotComments[index].course_no;
        submitData.positive = false;
        //let request = JSON.stringify(submitData);
        this.$axios.post("/api/positive",submitData);
      }
      else 
      {
        if(this.commentlist[index].action=='disliked')
        {
          this.commentlist[index].dislikes--;
          let dislike = new Object();
          dislike.user_no = this.HotComments[index].user_no;
          dislike.course_no = this.HotComments[index].course_no;
          dislike.negative = false;
          //let request = JSON.stringify(dislike);
          this.$axios.post("/api/negative",dislike);
        }  
        this.commentlist[index].likes++;
        this.commentlist[index].action = 'liked';
        let submitData = new Object();
        submitData.user_no = this.HotComments[index].user_no;
        submitData.course_no = this.HotComments[index].course_no;
        submitData.positive = true;
        //let like_request = JSON.stringify(submitData);
        this.$axios.post("/api/positive",submitData);
      }
    },
    dislike(index) {
      if(this.commentlist[index].action=='disliked')
      {
        this.commentlist[index].dislikes--;
        this.commentlist[index].action=null;
        let submitData = new Object();
        submitData.user_no = this.commentlist[index].user_no;
        submitData.course_no = this.commentlist[index].course_no;
        submitData.negative = false;
        //let request = JSON.stringify(submitData);
        this.$axios.post("/api/negative",submitData);
      }
      else 
      {
        if(this.commentlist[index].action=='liked')
        {
          this.commentlist[index].likes--;
          let like = new Object();
          like.user_no = this.commentlist[index].user_no;
          like.course_no = this.commentlist[index].course_no;
          like.positive = false;
          //let request = JSON.stringify(like);
          this.$axios.post("/api/positive",like);
        }  
        this.commentlist[index].dislikes++;
        this.commentlist[index].action = 'disliked';
        let submitData = new Object();
        submitData.user_no = this.commentlist[index].user_no;
        submitData.course_no = this.commentlist[index].course_no;
        submitData.negative = true;
        //let dislike_request = JSON.stringify(submitData);
        this.$axios.post("/api/negative",submitData);
      }
    },
    loadMore(){
      this.showList = this.showList.concat(this.commentlist.slice(this.showCount,this.showCount+8));
      this.showCount = this.showList.length;
      this.showLoadMore = !(this.showCount==this.commentlist.length);
    },
  }
};
</script>

<style>

</style>