<template>
  <div>
    <a-tabs default-active-key="1" align="left" size="large">
      <a-tab-pane key="1" tab="评价列表" >
        <a-list
          :header="`课号${selectedCourse.Cno} 名称${selectedCourse.Cname} 共有 ${data.length} 条评价`"
          :data-source="data"
          class="comment-list"
          item-layout="horizontal"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <a-comment :author="item.author" :avatar="item.avatar">
              <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
              <a slot="author">{{ item.author }}</a>
              <p slot="content">
                {{ item.content }}
              </p>
            </a-comment>
          </a-list-item>
        </a-list>
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
        Cno:'',
        Cname:'',
      }),
      require: true
    },
  },
  data() {
    return {
      data: [
        {
          Cmid:"1",
          author: 'Zhu',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        },
        {
          Cmid:"2",
          author: 'Jiang Hao',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        },
      ],
    };
  },
};
</script>

<style>

</style>