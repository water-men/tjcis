<template>
  <div>
    <a-row>
      <a-col :span="8">
        <a-input-search
          v-model="searchName"
          placeholder="课程名称模糊搜索"
          enter-button
          @search="onSearch"
        />
      </a-col>
      <a-col :span="8">
        查找类型{{ checktype }}
      </a-col>
      <!-- 测试爷孙传值用按钮 -->
      <a-col :span="8">
        <a-button @click="selectCourse">传值给home实现跳转</a-button>
      </a-col>
    </a-row>
    <a-divider />
    <a-row style="min-height: 0.9rem; font-size: 0.4rem;">
      <a-table :columns="columns" :data-source="data">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="customTitle">Name</span>
        <span slot="tags" slot-scope="tags">
          <a-tag
            v-for="tag in tags"
            :key="tag"
            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
          >{{ tag.toUpperCase() }}</a-tag>
        </span>
        <span slot="action" slot-scope="text, record">
          <a>Invite 一 {{ record.name }}</a>
          <a-divider type="vertical" />
          <a>Delete</a>
          <a-divider type="vertical" />
          <a class="ant-dropdown-link">
            More actions
            <a-icon type="down" />
          </a>
        </span>
      </a-table>
    </a-row>
  </div>
</template>
<script>
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tags' },
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default {
  props: {
    checktype: {
      type: String,
      default: "all",
      require: true
    },
  },
  data () {
    return {
      data,
      columns,
      selectedcourse: 'hello',
    };
  },
  methods: {
    selectCourse () {
      this.$listeners.getCourse(this.selectedcourse)
    }
  }
};
</script>