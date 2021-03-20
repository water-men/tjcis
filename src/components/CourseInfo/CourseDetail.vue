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
                <h1>{{ selectedCourse.course_name }}</h1>
              </template>
            </a-card-meta>   
         
            <a-button v-if="hasCollected" style="margin-top:8px;" type="primary" size="large" icon="star" @click="cancelCollect">取消收藏</a-button>
            <a-button v-else style="margin-top:8px;" size="large" icon="star" @click="collect">收藏</a-button>

          </a-card>
        </a-col>
        <a-col :span="1">
        </a-col>
        <a-col :span="14">
          <a-descriptions :column="{ xxl: 4, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }" layout="vertical" bordered>
            <a-descriptions-item label="课号" >
              <p class="descript"><span>{{ selectedCourse.course_no }}</span></p>
            </a-descriptions-item>
            <a-descriptions-item label="授课老师" >
              <p class="descript"><span>{{ selectedCourse.course_teacher }}</span></p>
            </a-descriptions-item>
            <a-descriptions-item label="开课院系" span="2">
              <p class="descript"><span>{{ selectedCourse.course_depart }}</span></p>
            </a-descriptions-item>
            <a-descriptions-item label="课程标签" span="2"> 
              <a-tag
                v-for="(tag,index) in course_tag"
                :key="index"
                :color="index%2 == 1 ? 'geekblue' : 'green'"
              >{{ tag.tag.toUpperCase() }}</a-tag>
            </a-descriptions-item>
            <a-descriptions-item label="综合评分" span="2"> 
              <a-rate :default-value="3" :value="(selectedCourse.course_score)/2" disabled allow-half />
              <a-statistic
                :value="selectedCourse.course_score"
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
        </a-col>
      </a-row>
      <a-divider />
      <!-- 文件列表 -->
      <a-row>
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
        course_no: '',
        course_name: '',
        course_teacher: '',
        course_depart: '',
        
        course_score: 5,
      }),
      require: true
    },
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
      hasCollected: null,
      fileList: [
        {
          uid: '1',
          name: '同济大学.jpeg',
          status: 'done',
          url: 'https://pic.rmb.bdstatic.com/3e1e0428904b2f2d0d091149013b4a2e.jpeg',
        },
        {
          uid: '2',
          name: 'char7 文件系统.pdf',
          status: 'done',
          url: 'https://xact02.baidupcs.com/file/36e9557a4ob8b4af661fb0af9074b9d8?bkt=en-2e2b5030dd6ff03746d50e029b6a282c1cd576e46beecc136d7f47d5c8ebf7441ce36281d08a5b5e&fid=2677412588-250528-213481191115575&time=1616082574&sign=FDTAXUGERQlBHSKfWqi-DCb740ccc5511e5e8fedcff06b081203-BPjt3MXjmIsHncFzm8g%2Bd0f7fGg%3D&to=126&size=5314914&sta_dx=5314914&sta_cs=0&sta_ft=pdf&sta_ct=0&sta_mt=0&fm2=MH%2CXian%2CAnywhere%2C%2Cshanghai%2Cct&ctime=1616082565&mtime=1616082565&resv0=-1&resv1=0&resv2=rlim&resv3=5&resv4=5314914&vuk=2677412588&iv=2&htype=&randtype=&newver=1&newfm=1&secfm=1&flow_ver=3&pkey=en-9d8f9e68e3bb47e10ebdf8deda1f67262f376ebc249c3c94f0cbe9ca9d219ad939f240c8123e125e&expires=8h&rt=pr&r=369251589&vbdid=3824128928&fin=char7+%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F.pdf&fn=char7+%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F.pdf&rtype=1&dp-logid=8703208379728400820&dp-callid=0.1&hps=1&tsl=0&csl=0&fsl=-1&csign=Z0OpMB5yEgDSNPe8ArNmK%2FiGU7s%3D&so=0&ut=1&uter=4&serv=0&uc=3612144501&ti=05df9239daa406474f5857e9faaba7908796852fdeb40bd5&hflag=30&from_type=1&adg=c_087c80186f9c349925923824eacfa177&reqlabel=250528_f_264d758315261fcecda6ca433a104e3f_-1_c54b5f8fe1d556f09e7ed9a1fa355874&by=themis',
        },
      ],
      course_tag: [
      ],
    }
  },
  beforeMount(){
    let submitObject = {
      user_no: this.userInfo.user_no,
      course_no: this.selectedCourse.course_no,
    };
    //let request = JSON.stringify(submitObject);
    this.$axios.post("/api/getCourseInfo",{course_no: this.selectedCourse.course_no}).then((response)=>{
      if(response.data.ret_code == 0)
      {
        this.course_tag = response.data.data.course_info.course_tag;
      }
    }).catch(()=>{
      this.$message.error("加载课程标签失败");
    })
    this.$axios.post("/api/isFavorite",submitObject).then((response)=>{
      if(response.data.ret_code == 0)
      {
        this.hasCollected = response.data.data.favorite;
      }
    });
  },
  methods:{
    collect(){
      this.hasCollected = true;
      let submitObject = {
        user_no: this.userInfo.user_no,
        course_no: this.selectedCourse.course_no,
      };
      //let collect_request = JSON.stringify(submitObject);
      this.$axios.post("/api/addToFavorite",submitObject);
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
