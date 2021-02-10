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
    commentList: {
      type: Array,
      default:() => (
      []
      ),
      require:true,
    }
  },
  data() {
    return {
      commentlist: this.commentList,
      showList:[
      ],
      showCount:0,
      showLoadMore:false,
      collected: null,
    };
  },
  beforeMount(){
    this.showList = this.commentlist.slice(0,8);
    this.showCount = this.showList.length;
    this.showLoadMore = !(this.showList.length==this.commentlist.length);
  },
  methods: {
    like(index) {
      if(this.commentlist[index].action=='liked')
      {
        this.commentlist[index].likes--;
        this.commentlist[index].action=null;
        let submitData = new Object();
        submitData.comment_id = this.commentlist[index].Cmid;
        submitData.positive = -1;
        let request = JSON.stringify(submitData);
        this.$axios.post("/api/positive",request);
      }
      else 
      {
        if(this.commentlist[index].action=='disliked')
        {
          this.commentlist[index].dislikes--;
          let dislike = new Object();
          dislike.comment_id = this.commentlist[index].Cmid;
          dislike.negative = -1;
          let request = JSON.stringify(dislike);
          this.$axios.post("/api/negative",request);
        }  
        this.commentlist[index].likes++;
        this.commentlist[index].action = 'liked';
        let submitData = new Object();
        submitData.comment_id = this.commentlist[index].Cmid;
        submitData.positive = 1;
        let like_request = JSON.stringify(submitData);
        this.$axios.post("/api/positive",like_request);
      }
    },
    dislike(index) {
      if(this.commentlist[index].action=='disliked')
      {
        this.commentlist[index].dislikes--;
        this.commentlist[index].action=null;
        let submitData = new Object();
        submitData.comment_id = this.commentlist[index].Cmid;
        submitData.negative = -1;
        let request = JSON.stringify(submitData);
        this.$axios.post("/api/negative",request);
      }
      else 
      {
        if(this.commentlist[index].action=='liked')
        {
          this.commentlist[index].likes--;
          let like = new Object();
          like.comment_id = this.commentlist[index].Cmid;
          like.positive = -1;
          let request = JSON.stringify(like);
          this.$axios.post("/api/positive",request);
        }  
        this.commentlist[index].dislikes++;
        this.commentlist[index].action = 'disliked';
        let submitData = new Object();
        submitData.comment_id = this.commentlist[index].Cmid;
        submitData.negative = 1;
        let dislike_request = JSON.stringify(submitData);
        this.$axios.post("/api/negative",dislike_request);
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