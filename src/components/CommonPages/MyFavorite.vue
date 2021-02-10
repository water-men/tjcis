<template>
  <a-card :style="{ minHeight: '670px'}">
    <a-tabs default-active-key="1" align="left" size="large">
      <a-tab-pane key="1" tab="我的收藏" >
        <a-card>
          <a-table :columns="columns" :data-source="myFavorite" :custom-row="selectCourse">
            <span slot="tags" slot-scope="tags">
              <a-tag
                v-for="(tag,index) in tags"
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
    };
  },
  beforeMount(){
    let submitData = JSON.stringify(this.userInfo);
    this.$axios.post("/api/getMyFavorite",submitData).then((response) => {
      if(response.ret_msg == "success") {
        this.myFavorite = response.data.courses;
      }
      else
        this.$message.error("获取我的收藏失败");
    }).catch(() => { this.$message.error("获取我的收藏失败"); }); //获取我的评价
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