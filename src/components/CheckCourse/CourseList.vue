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
        </a-row>
        <a-divider />
        <a-row style="min-height: 0.9rem; font-size: 0.4rem;">
          <a-table :columns="columns" :data-source="datalt" :custom-row="selectCourse">
            <span slot="course_tag" slot-scope="course_tag">
              <a-tag
                v-for="(tag,index) in course_tag"
                :key="index"
                :color="index%2 == 1 ? 'geekblue' : 'green'"
              >{{ tag.tag_content.toUpperCase() }}</a-tag>
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
        //   course_no: '10038802',
        //   course_name: '离散数学',
        //   course_teacher: '王成',
        //   course_depart: '电子与信息工程学院',
        //   course_tag: [{tag_content:'developer'}, {tag_content:'jsjsjsjs'},{tag_content:'djsjdjsdjs'},{tag_content:'dj1djs'},{tag_content:'djsj2sdjs'}],
        //   course_score: 9,
        // },
        // {
        //   key: '2',
        //   course_no: '10038901',
        //   course_name: '数据结构',
        //   course_teacher: '武研',
        //   course_depart: '电子与信息工程学院',
        //   course_tag: [{tag_content:'hello'}],
        //   course_score: 8,
        // },
      ],
      columns: [
        {
          title: '课程号',
          dataIndex: 'course_no',
          key: 'course_no',
        },
        {
          title: '课程名称',
          dataIndex: 'course_name',
          key: 'course_name',
        },
        {
          title: '授课老师',
          dataIndex: 'course_teacher',
          key: 'course_teacher',
        },
        {
          title: '开课学院',
          dataIndex: 'course_depart',
          key: 'course_depart',
        },
        {
          title: '课程标签',
          key: 'course_tag',
          dataIndex: 'course_tag',
          scopedSlots: { customRender: 'course_tag' },
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
      if (this.searchCourse) {
        this.datalt = this.courseList.filter(
          (p) => (p.course_name.indexOf(this.searchCourse) !== -1)|(p.course_no.indexOf(this.searchCourse)!== -1)|(p.course_depart.indexOf(this.searchCourse)!== -1)|(p.course_teacher.indexOf(this.searchCourse)!== -1)
        )
      } else {
        this.datalt = this.courseList
      }
    },
    getCourseList() {
      let submitData = new Object();
      if(this.checkType == "all" || this.filterContent.name == "所有")
      {
        submitData.depart = null;
      }
      else
      {
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