<template>
  <div>
    <a-tabs default-active-key="1" align="left" size="large">
      <a-tab-pane key="1" tab="课程列表" >
        <h2>{{ filterContent.name }} 课程列表</h2>
        <a-row>
          <a-col :span="12">
            <a-input-search
              v-model="searchCourse"
              placeholder="课程模糊搜索"
              enter-button
              @search="onSearch"
            />
          </a-col>
          <a-col :span="12">
            查找类型{{ checkType }}
          </a-col>
          <!-- 测试爷孙传值用按钮 -->
          <!-- <a-col :span="8">
        <a-button @click="selectCourse">传值给home实现跳转</a-button>
      </a-col> -->
        </a-row>
        <a-divider />
        <a-row style="min-height: 0.9rem; font-size: 0.4rem;">
          <a-table :columns="columns" :data-source="datalt" :custom-row="selectCourse">
            <span slot="tags" slot-scope="tags">
              <a-tag
                v-for="tag in tags"
                :key="tag"
                :color="tag.length > 5 ? 'geekblue' : 'green'"
              >{{ tag.toUpperCase() }}</a-tag>
            </span>
          </a-table>
        </a-row>
      </a-tab-pane>
    </a-tabs>
  </div> 
</template>
<script>
var courseList = [
        {
          key: '1',
          Cno: '10038802',
          Cname: '离散数学',
          Tname: '王成',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          Cno: '10038901',
          Cname: '数据结构',
          Tname: '武研',
          tags: ['hello'],
        },
        {
          key: '3',
          Cno: '10034005',
          Cname: '计算机网络',
          Tname: '沈坚',
          tags: ['cool', 'teacher'],
        },
      ]
export default {
  props: {
    //课程筛选方式，取值all为不进行筛选直接展示全部列表，depart为按照院系进行筛选，type为按照类型进行筛选
    checkType: {
      type: String,
      default: "all",
      require: true
    },
    //若筛选方式为all，该参数忽略；如果为depart，该参数对象中id为院系编号，name为院系名称；如果为type，该参数对象id为类型编号，name为类型名称
    filterContent: {
      type: Object,
      default: () => ({
        id:'',
        name:'',
      }),
    }
  },
  data () {
    return {
      searchCourse: '',
      courseList,
      columns: [
        {
          title: '课程号',
          dataIndex: 'Cno',
          key: 'Cno',
        },
        {
          title: '课程名称',
          dataIndex: 'Cname',
          key: 'Cname',
        },
        {
          title: '授课老师',
          dataIndex: 'Tname',
          key: 'Tname',
        },
        {
          title: '课程标签',
          key: 'tags',
          dataIndex: 'tags',
          scopedSlots: { customRender: 'tags' },
        },
      ],
      datalt: courseList,
    };
  },
  methods: {
    selectCourse(record, index){
        return {
            on: {
               click: () => {
                    console.log(record,index)
                    console.log(record.Cno)
                    console.log(record.Cname)
                    this.$listeners.getCourse(record)
               }
            }
        }
    },
    onSearch() {
      if (this.searchCourse && this.searchCourse !== '') {
        this.datalt = this.courseList.filter(
          (p) => (p.Cname.indexOf(this.searchCourse) !== -1)|(p.Cno.indexOf(this.searchCourse)!== -1)|(p.Tname.indexOf(this.searchCourse)!== -1)
        )
      } else {
        this.datalt = this.courseList
      }
    },
  }
};
</script>