<template>
  <a-card :style="{ minHeight: '670px'}">
    <a-tabs default-active-key="1" align="left" size="large">
      <a-tab-pane key="1" tab="我的收藏" >
        <a-card>
          <a-table :columns="columns" :data-source="myFavorite" :custom-row="selectCourse">
            <span slot="course_tag" slot-scope="course_tag">
              <a-tag
                v-for="(tag,index) in course_tag"
                :key="index"
                :color="index%2 == 1 ? 'geekblue' : 'green'"
              >{{ tag.toUpperCase() }}</a-tag>
            </span>
          </a-table>
        </a-card>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
export default {
  props: {
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
      myFavorite:[
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
    };
  },
  beforeMount(){
    let submitObject = {
      user_no: this.userInfo.user_no,
    };
    //let submitData = JSON.stringify(submitObject);
    this.$axios.post("/api/getMyFavorite",submitObject).then((response) => {
      if(response.data.ret_code == 0) {
        this.myFavorite = response.data.data.courses;
      }
      else
        this.$message.error("获取我的收藏失败");
    }).catch(() => { this.$message.error("获取我的收藏失败"); }); //获取我的收藏
  },
  methods: {
    selectCourse(record){
      return {
            on: {
               click: () => {
                  this.$emit('getCourse',record);
               }
            }
        }
    },
  },
}
</script>

<style>

</style>