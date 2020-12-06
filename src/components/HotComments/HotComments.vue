<template>
  <a-card :style="{ minHeight: '670px'}">
    <a-tabs default-active-key="1" align="left" size="large">
      <a-tab-pane key="1" tab="近期热门评价" >
        <a-list :grid="{ gutter: 16, column: 3 }" :data-source="data">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-card :title="item.title" hoverable>
              课程名称:{{ item.Cname }}
              授课老师:{{ item.Tname }}
              评价内容:{{ item.content }}
              综合评分:{{ item.score }}
            </a-card>
          </a-list-item>
        </a-list>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>
<script>
const data = [
  {
    Cmid: '1',
    title: '评价标题1',
    content: '评价内容1',
    username:'tohka',
    score: 9,
    Cname:'Course1',
    Tname:'Teacher1'
  },
  {
    Cmid: '2',
    title: '评价标题2',
    content: '评价内容2',
    username:'tenka',
    score: 9,
    Cname:'Course1',
    Tname:'Teacher1'
  },
  {
    Cmid: '3',
    title: '评价标题3',
    content: '评价内容3',
    username:'tohka',
    score: 9,
    Cname:'Course2',
    Tname:'Teacher1'
  },
  {
    Cmid: '4',
    title: '评价标题4',
    content: '评价内容4',
    username:'aliver',
    score: 9,
    Cname:'Course3',
    Tname:'Teacher1'
  },
];
export default {
  data() {
    return {
      data,
    };
  },
};
</script>
<style></style>