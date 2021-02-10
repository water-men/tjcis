<template>
  <div>
    <a-tabs default-active-key="1" align="left" size="large">
      <a-tab-pane key="1" tab="课程列表" >
        <h2>{{ filterContent.name }}课程列表</h2>
        <a-row>
          <a-col :span="12">
            <a-input-search
              v-model="searchCourse"
              placeholder="课程模糊搜索"
              enter-button
              @search="onSearch"
            />
          </a-col>
          <!-- <a-col :span="12">
            查找类型{{ checkType }}
          </a-col> -->
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
                v-for="(tag,index) in tags"
                :key="index"
                :color="index%2 == 1 ? 'geekblue' : 'green'"
              >{{ tag.toUpperCase() }}</a-tag>
            </span>
          </a-table>
        </a-row>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
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
        name:'',
      }),
    }
  },
  data () {
    return {
      searchCourse: '',
      courseList: [
        // {
        //   key: '1',
        //   Cid: '',
        //   Cno: '10038802',
        //   Cname: '离散数学',
        //   Tname: '王成',
        //   Dname: '电子与信息工程学院',
        //   tags: ['nice', 'developer','jsjsjsjs','djsjdjsdjs','dj1djs','djsj2sdjs'],
        //   Cscore: 9,
        // },
        // {
        //   key: '2',
        //   Cid: '',
        //   Cno: '10038901',
        //   Cname: '数据结构',
        //   Tname: '武研',
        //   Dname: '电子与信息工程学院',
        //   tags: ['hello'],
        //   Cscore: 8,
        // },
        // {
        //   key: '3',
        //   Cid: '',
        //   Cno: '10034005',
        //   Cname: '计算机网络',
        //   Tname: '沈',
        //   Dname: '电子与信息工程学院',
        //   tags: ['cool', 'teacher'],
        //   Cscore: 7,
        // },
        // {
        //   key: '4',
        //   Cid: '',
        //   Cno: '10034005',
        //   Cname: '计算机网络',
        //   Tname: '沈',
        //   Dname: '电子与信息工程学院',
        //   tags: ['cool', 'teacher'],
        //   Cscore: 7,
        // },
        // {
        //   key: '5',
        //   Cid: '',
        //   Cno: '10034005',
        //   Cname: '计算机网络',
        //   Tname: '沈',
        //   Dname: '电子与信息工程学院',
        //   tags: ['cool', 'teacher'],
        //   Cscore: 7,
        // },
        // {
        //   key: '6',
        //   Cid: '',
        //   Cno: '10034005',
        //   Cname: '计算机网络',
        //   Tname: '沈',
        //   Dname: '电子与信息工程学院',
        //   tags: ['cool', 'teacher'],
        //   Cscore: 7,
        // },
        // {
        //   key: '7',
        //   Cid: '',
        //   Cno: '10034005',
        //   Cname: '计算机网络',
        //   Tname: '沈',
        //   Dname: '电子与信息工程学院',
        //   tags: ['cool', 'teacher'],
        //   Cscore: 7,
        // },
        // {
        //   key: '8',
        //   Cid: '',
        //   Cno: '10034005',
        //   Cname: '计算机网络',
        //   Tname: '沈',
        //   Dname: '电子与信息工程学院',
        //   tags: ['cool', 'teacher'],
        //   Cscore: 7,
        // },
        // {
        //   key: '9',
        //   Cid: '',
        //   Cno: '10034005',
        //   Cname: '计算机网络',
        //   Tname: '沈',
        //   Dname: '电子与信息工程学院',
        //   tags: ['cool', 'teacher'],
        //   Cscore: 7,
        // },
        // {
        //   key: '10',
        //   Cid: '',
        //   Cno: '10034005',
        //   Cname: '计算机网络',
        //   Tname: '沈',
        //   Dname: '电子与信息工程学院',
        //   tags: ['cool', 'teacher'],
        //   Cscore: 7,
        // },
        // {
        //   key: '11',
        //   Cid: '',
        //   Cno: '10034005',
        //   Cname: '计算机网络',
        //   Tname: '沈',
        //   Dname: '电子与信息工程学院',
        //   tags: ['cool', 'teacher'],
        //   Cscore: 7,
        // },
        // {
        //   key: '12',
        //   Cid: '',
        //   Cno: '10034005',
        //   Cname: '计算机网络',
        //   Tname: '沈',
        //   Dname: '电子与信息工程学院',
        //   tags: ['cool', 'teacher'],
        //   Cscore: 7,
        // },
        // {
        //   key: '13',
        //   Cid: '',
        //   Cno: '10034005',
        //   Cname: '计算机网络',
        //   Tname: '沈',
        //   Dname: '电子与信息工程学院',
        //   tags: ['cool', 'teacher'],
        //   Cscore: 7,
        // },
        // {
        //   key: '14',
        //   Cid: '',
        //   Cno: '10034005',
        //   Cname: '计算机网络',
        //   Tname: '沈',
        //   Dname: '电子与信息工程学院',
        //   tags: ['cool', 'teacher'],
        //   Cscore: 7,
        // },
        // {
        //   key: '15',
        //   Cid: '',
        //   Cno: '10034005',
        //   Cname: '计算机网络',
        //   Tname: '沈',
        //   Dname: '电子与信息工程学院',
        //   tags: ['cool', 'teacher'],
        //   Cscore: 7,
        // },
        // {
        //   key: '16',
        //   Cid: '',
        //   Cno: '10034005',
        //   Cname: '计算机网络',
        //   Tname: '沈',
        //   Dname: '电子与信息工程学院',
        //   tags: ['cool', 'teacher'],
        //   Cscore: 7,
        // },
      ],
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
          title: '开课学院',
          dataIndex: 'Dname',
          key: 'Dname',
        },
        {
          title: '课程标签',
          key: 'tags',
          dataIndex: 'tags',
          scopedSlots: { customRender: 'tags' },
        },
      ],
      datalt:[
      ],
    };
  },
  watch: {
    filterContent() {
      this.getCourseList();
      this.datalt=this.courseList;
    }
  },
  beforeMount() {
    this.getCourseList();
    this.datalt=this.courseList;
  },
  methods: {
    selectCourse(record){
        return {
            on: {
               click: () => {
                  this.$listeners.getCourse(record);
               }
            }
        }
    },
    onSearch() {
      if (this.searchCourse && this.searchCourse !== '') {
        this.datalt = this.courseList.filter(
          (p) => (p.Cname.indexOf(this.searchCourse) !== -1)|(p.Cno.indexOf(this.searchCourse)!== -1)|(p.Dname.indexOf(this.searchCourse)!== -1)|(p.Tname.indexOf(this.searchCourse)!== -1)
        )
      } else {
        this.datalt = this.courseList
      }
    },
    getCourseList() {
      let submitData = new Object();
      if(this.checkType == "all" || this.filterContent.name == "所有")
      {
        submitData.select_code = 0;
        submitData.depart = "null";
      }
      else
      {
        submitData.select_code = 1;
        submitData.depart = this.filterContent.name;
      }
      let request = JSON.stringify(submitData);
      this.$axios.post("/api/getCoursesList ", request).then((response) => {
        if(response.ret_msg=="success")
        {
          this.courseList=response.data.courses;
          for(let i=0;i<this.courseList.length;i++)
          {
           this.courseList[i].key=toString(i+1);
          }
        }
        else
          this.$message.error("获取课程列表失败");
      }).catch(()=>{this.$message.error("获取课程列表失败");});
      
    },
  }
};
</script>