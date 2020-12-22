<template>
  <div>
    <a-card>
      <h1>我的收藏--{{ userInfo.username }}</h1>
      <a-comment>
        <template slot="actions">
          <span key="comment-basic-like">
            <a-tooltip title="Like">
              <a-icon :theme="action === 'liked' ? 'filled' : 'outlined'" type="like" @click="like" />
            </a-tooltip>
            <span style="padding-left: '8px';cursor: 'auto'">
              {{ likes }}
            </span>
          </span>
          <span key="comment-basic-dislike">
            <a-tooltip title="Dislike">
              <a-icon
                :theme="action === 'disliked' ? 'filled' : 'outlined'"
                type="dislike"
                @click="dislike"
              />
            </a-tooltip>
            <span style="padding-left: '8px';cursor: 'auto'">
              {{ dislikes }}
            </span>
          </span>
          <span key="comment-basic-reply-to">Reply to</span>
        </template>
        <a slot="author">Han Solo</a>
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
        <p slot="content">
          We supply a series of design principles, practical patterns and high quality design resources
          (Sketch and Axure), to help people create their product prototypes beautifully and
          efficiently.
        </p>
      </a-comment>
    </a-card>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      default: () => ({
        Sno:'',
        username:'',
      }),
      require: true
    },
  },
  data() {
    return {
      likes: 0,
      dislikes: 0,
      action: null,
    };
  },
  methods: {
    like() {
      this.likes = 1;
      this.dislikes = 0;
      this.action = 'liked';
    },
    dislike() {
      this.likes = 0;
      this.dislikes = 1;
      this.action = 'disliked';
    },
  },
}
</script>

<style>

</style>