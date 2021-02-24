<template>
  <a-tabs default-active-key="1" align="left" size="large">
    <a-tab-pane key="1" tab="课程详情" >
      <a-row>
        <a-col :span="9" >
          <a-card hoverable style="width: flex;" >
            <img
              slot="cover"
              alt="图片无法显示"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
            <a-card-meta title="课程名称">
              <template slot="description">
                {{ selectedCourse.Cname }}
              </template>
            </a-card-meta>
          </a-card>
        </a-col>
        <a-col :span="1">
        </a-col>
        <a-col :span="14">
          <a-descriptions :column="{ xxl: 4, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }" layout="vertical" bordered>
            <a-descriptions-item label="课号" >
              <p class="descript"><span>{{ selectedCourse.Cno }}</span></p>
            </a-descriptions-item>
            <a-descriptions-item label="授课老师" >
              <p class="descript"><span>{{ selectedCourse.Tname }}</span></p>
            </a-descriptions-item>
            <a-descriptions-item label="开课院系" span="2">
              <p class="descript"><span>{{ selectedCourse.Dname }}</span></p>
            </a-descriptions-item>
            <a-descriptions-item label="课程标签" span="2"> 
              <a-tag
                v-for="(tag,index) in selectedCourse.tags"
                :key="index"
                :color="index%2 == 1 ? 'geekblue' : 'green'"
              >{{ tag.toUpperCase() }}</a-tag>
            </a-descriptions-item>
            <a-descriptions-item label="综合评分" span="2"> 
              <a-rate :default-value="3" :value="(selectedCourse.Cscore)/2" disabled allow-half />
              <a-statistic
                :value="selectedCourse.Cscore"
                :precision="0"
                :value-style="{ color: '#3f8600' }"
                suffix="/10"
                style="margin-right: 50px"
              >
                <template #prefix>
                  <a-icon type="trophy" />
                </template>
              </a-statistic>
            </a-descriptions-item>
          </a-descriptions>
          <a-card style="margin-top:8px;">
            <a-upload
              :multiple="true"
              :file-list="fileList"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              @change="handleChange"
            >
              <a-button> <a-icon type="upload" /> 上传文件 </a-button>
            </a-upload>
          </a-card>
          <a-button v-if="hasCollected" style="margin-top:8px;" type="primary" size="large" icon="star" @click="cancelCollect">取消收藏</a-button>
          <a-button v-else style="margin-top:8px;" size="large" icon="star" @click="collect">收藏</a-button>
        </a-col>
      </a-row>
    </a-tab-pane>
  </a-tabs>
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
    collected: {
      type: Boolean,
      default: false,
      require: true
    },
  },
  data() {
    return {
      hasCollected: this.collected,
      fileList: [
        {
          uid: '1',
          name: '课程信息.pdf',
          status: 'done',
          url: 'http://www.baidu.com/课程信息.pdf',
        },
        {
          uid: '2',
          name: '第一次作业.pdf',
          status: 'done',
          url: 'http://www.baidu.com/第一次作业.pdf',
        },
        {
          uid: '3',
          name: 'chapter1.ppt',
          status: 'done',
          url: 'http://www.baidu.com/chapter1.ppt',
        },
      ],
    }
  },
  beforeMount(){
    console.log(this.collected);
  },
  methods:{
    collect(){
      this.hasCollected = true;
    },
    cancelCollect(){
      this.hasCollected = false;
    },
    handleChange(info) {
      let fileList = [...info.fileList];

      // read from response and show file link
      fileList = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }
        return file;
      });

      this.fileList = fileList;
    },
  },
}

</script>

<style>

</style>
