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
                  {{ item.likes }}
                </span>
              </span>
              <span key="comment-basic-dislike" @click="dislike(index)" >
                <a-icon :theme="item.action === 'disliked' ? 'filled' : 'outlined'" type="dislike" />
                <span style="padding-left: '8px';cursor: 'auto'">
                  {{ item.dislikes }}
                </span>
              </span>
            </template>
            <a slot="author">{{ item.author }}</a>
            <a-avatar
              slot="avatar"
              icon="user"
            />
            <p slot="content">
              {{ item.title }}
              &nbsp;&nbsp;&nbsp;&nbsp;{{ item.content }}
            </p>
            <span slot="datetime">{{ $moment(item.Cmtime).fromNow() }}</span>
            <a-rate :value="(item.score)/2" disabled allow-half></a-rate>&nbsp;&nbsp;
            <span>{{ item.score }}/10分</span>
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
        {
          Cmid:"1",
          Cno:'102021020',
          Cname:'离散数学',
          Tname:'王成',
          author: 'Zhu',
          title: 'Comment1',
          content:
            '阿巴阿巴',
          score: 7,
          likes: 0,
          dislikes: 0,
          Cmtime: '2012-02-21 22:11:33',
          action:null,
        },
        {
          Cmid:"2",
          Cno:'10086',
          Cname:'电信',
          Tname:'王朝和马汉',
          author: 'Jiang Hao',
          title: 'Comment2',
          content:
            '哈哈哈哈哈',
          score: 10,
          likes: 0,
          dislikes: 0,
          Cmtime: '2013-04-02 10:12:53',
          action:null,
        },
      ],
    };
  },
  beforeMount(){
    let that = this;
    this.$axios.get("/api/getHotComments").then((response)=>{
      if(response.ret_msg=="success")
      {
        that.HotComments = response.data.comments;
      }
      else
        this.$message.error("获取热门评价失败");
    }).catch(()=>{this.$message.error("获取热门评价失败");});

    for(let i=0;i<this.HotComments.length;i++)
    {
      that.HotComments[i].cardTile = '课号：'+that.HotComments[i].Cno+' 课程名称：'+that.HotComments[i].Cname+' 授课老师：'+that.HotComments[i].Tname;
    }
  },
  methods: {
    like(index) {
      if(this.HotComments[index].action=='liked')
      {
        this.HotComments[index].likes--;
        this.HotComments[index].action=null;
        let submitData = new Object();
        submitData.comment_id = this.HotComments[index].Cmid;
        submitData.positive = -1;
        let request = JSON.stringify(submitData);
        this.$axios.post("/api/positive",request);
      }
      else 
      {
        let that = this;
        if(this.HotComments[index].action=='disliked')
        {
          this.HotComments[index].dislikes--;
          let dislike = new Object();
          dislike.comment_id = this.HotComments[index].Cmid;
          dislike.negative = -1;
          let request = JSON.stringify(dislike);
          this.$axios.post("/api/negative",request);
        }  
        that.HotComments[index].likes++;
        that.HotComments[index].action = 'liked';
        let submitData = new Object();
        submitData.comment_id = this.HotComments[index].Cmid;
        submitData.positive = 1;
        let like_request = JSON.stringify(submitData);
        this.$axios.post("/api/positive",like_request);
      }
    },
    dislike(index) {
      if(this.HotComments[index].action=='disliked')
      {
        this.HotComments[index].dislikes--;
        this.HotComments[index].action=null;
        let submitData = new Object();
        submitData.comment_id = this.HotComments[index].Cmid;
        submitData.negative = -1;
        let request = JSON.stringify(submitData);
        this.$axios.post("/api/negative",request);
      }
      else 
      {
        let that = this;
        if(this.HotComments[index].action=='liked')
        {
          this.HotComments[index].likes--;
          let like = new Object();
          like.comment_id = this.HotComments[index].Cmid;
          like.positive = -1;
          let request = JSON.stringify(like);
          this.$axios.post("/api/positive",request);
        }  
        that.HotComments[index].dislikes++;
        that.HotComments[index].action = 'disliked';
        let submitData = new Object();
        submitData.comment_id = this.HotComments[index].Cmid;
        submitData.negative = 1;
        let dislike_request = JSON.stringify(submitData);
        this.$axios.post("/api/negative",dislike_request);
      }
    },
  }
};
</script>
<style></style>