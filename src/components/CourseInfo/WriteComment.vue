<template>
  <div>
    <a-button :disabled="disableComment" type="primary" block @click="showDrawer">
      <a-icon type="edit" />为这门课写一个评价吧~
    </a-button>
    <a-drawer
      :closable="false"
      :visible="visible"
      :height="410"
      title="编写评价"
      placement="bottom"
      @close="onClose"
    >
      <a-spinning :spinning="pending">
        <div>
          <a-steps :current="current">
            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
          </a-steps>
          <div class="steps-content">
            <template v-if="current==0">
              <span>请给这门课程评一个分:</span>&nbsp;
              <a-rate v-model="rate" allow-half/>
              &nbsp;&nbsp;<span>{{ rate*2 }}分</span>
              <a-input v-model="title" :max-length="30" allow-clear placeholder="在这里输入评论的标题" />
              <a-textarea v-model="content" :max-length="400" :auto-size="{minRows:7,maxRow:7}" style="margin-top:8px;" allow-clear placeholder="在这里输入评论内容，最多可输入400个字哟" @change="onChange" />
            </template>
            <template v-if="current==1">
              <div style="margin-top:8px;border-bottom:1px solid #d6d6d69c;height:50px;text-align:left;">
                <a-space size="middle" align="center">
                  <a-button type="primary" shape="round" icon="plus" @click="showInput=!showInput" >添加自定义标签（上限5个）</a-button>
                  <a-button shape="round" @click="clearAll">清空全部</a-button>
                  <a-input 
                    v-show="showInput" 
                    v-model="tempTag"
                    :max-length="12" 
                    :disabled="disabledInput"
                    style="width: 250px;" 
                    allow-clear 
                    placeholder="输入标签内容，上限12个字哟" 
                    @keyup.enter="add">
                  </a-input>
                  <a-button v-show="showInput" :disabled="disabledInput" icon="check" @click="add">添加</a-button>
                  <span style="color:red;">{{ errMsg }}</span>
                  <a-popconfirm
                    v-for="(tag,index) in addTags"
                    :key="index"
                    title="你确定要删除这个标签吗?"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="remove(index)"
                  >
                    <a-button 
                      :key="tag.name" 
                      type="primary" 
                      shape="round" >
                      {{ tag.name }}
                      <a-icon type="close"/>
                    </a-button>
                  </a-popconfirm>
                </a-space>
              </div>
              <a-button 
                v-for="(tag,index) in tags" 
                :key="index" 
                :type="tagsStyle[index].type" 
                :disabled="tagsStyle[index].disable"
                shape="round" 
                style="margin-left:8px;margin-top:8px"
                @click="tagset(index)">
                {{ tag.tag_content }}
              </a-button>
            </template>
          </div>
          <div class="steps-action">
            <a-button v-if="current < steps.length - 1" type="primary" @click="next">
              下一步
            </a-button>
            <a-button
              v-if="current == steps.length - 1"
              type="primary"
              @click="showConfirm"
            >
              提交
            </a-button>
            <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
              上一步
            </a-button>
          </div>
        </div>
      </a-spinning>
    </a-drawer>
  </div>
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
      showInput: false,
      disableComment: true,
      disabledInput: false,
      visible: false,
      current: 0,
      title:null,
      content:null,
      tempTag:'',
      errMsg:'',
      rate: 2.5,
      activeCount:0,
      pending: false,
      submitFail: false,
      steps: [
        {
          title: '评分与写评论',
          content: 'First-content',
        },
        {
          title: '选择课程标签',
          content: 'Second-content',
        },
      ],
      tags: [
        // {
        //   name: '老师人很好',
        // },
        // {
        //   name: '作业多',
        // },
        // {
        //   name: '讲课认真',
        // },
        // {
        //   name: '讲课水1',
        // },
        // {
        //   name: '讲课水2',
        // },
        // {
        //   name: '讲课水3',
        // },
        // {
        //   name: '讲课水4',
        // },
        // {
        //   name: '讲课水5',
        // },
      ],
      tagsStyle: [
      ],
      addTags: [
      ],
    };
  },
  beforeMount() {
    let submitObject = {
      user_no: this.userInfo.user_no,
      course_no: this.selectedCourse.course_no,
    };
    //let request = JSON.stringify(submitObject);
    this.$axios.post("/api/isComment",submitObject).then((response)=>{
      if(response.data.ret_code == 0)
      {
        this.disableComment = response.data.data.commented;
        if(this.disableComment == false)
        {
          this.$axios.get("/api/getTag").then((response)=>
          {
            if(response.data.ret_code==0)
            {
              this.tags = response.data.data.tag_set;
              for(let i=0;i<this.tags.length;i++) {
                this.tagsStyle.push({
                  type: "dashed",
                  value: 0,
                  disable: false,
                });
              }
            }
            else
              this.$message.error('初始化标签列表失败');
          }).catch(()=>{this.$message.error('初始化标签列表失败')});
        }
      }
    });   
  },
  methods: {
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    onChange(e) {
      this.placement = e.target.value;
    },
    next() {
      this.current++;
    },
    prev() {
      this.current--;
    },
    tagset(index) {
      if(this.tagsStyle[index].value==0) {
        this.tagsStyle[index].type="primary";
        this.tagsStyle[index].value=1;
        this.activeCount++;
        if(this.activeCount==5)
        {
          for(let i=0;i<this.tagsStyle.length;i++)
          {
            if(this.tagsStyle[i].value==0)
              this.tagsStyle[i].disable=true;
          }
        }
      }
      else {
        this.tagsStyle[index].type="dashed";
        this.tagsStyle[index].value=0;
        if(this.activeCount==5)
        {
          for(let i=0;i<this.tagsStyle.length;i++)
          {
            if(this.tagsStyle[i].disable==true)
              this.tagsStyle[i].disable=false;
          }
        }
        this.activeCount--;
      }
      this.$set(this.tagsStyle,index,this.tagsStyle[index]); 
    },
    add() {
      if(this.tempTag=='')
      {
        this.errMsg='标签内容不能为空';
      }
      else
      {
        for(let i=0;i<this.addTags.length;i++)
        {
          if(this.addTags[i].name==this.tempTag)
          {
            this.errMsg='标签已存在，请勿重复添加';
            return;
          }
        }
        for(let i=0;i<this.tags.length;i++)
        {
          if(this.tags[i].name==this.tempTag)
          {
            this.errMsg='标签已存在，请勿重复添加';
            return;
          }
        }
        this.addTags.push({
          name: this.tempTag,
        });
        this.tempTag='';
        this.errMsg='';
        if(this.addTags.length==5){
          this.disabledInput=true;
        }
      }
    },
    clearAll(){
      if(this.addTags.length>0){
        this.addTags.splice(0);
      }
    },
    reset() {
      this.tempTag = '';
    },
    remove(index) {
      this.addTags.splice(index,1);
      if(this.disabledInput==true){
        this.disabledInput=false;
      }
    },
    async submitComment(){
      this.pending = true;
      if(this.addTags.length>0)//需要自定义标签
      {
        let res = await this.addNewTags();//先添加自定义标签
        console.log(res);
        if(this.submitFail == true || res.data.ret_code != 0)
        {
          this.$message.error("评论提交失败，请重试");
          this.pending = false;
          return;
        }
        else
        {
          let ret = await this.getTagsAgain();//再获取一次标签列表
          if(this.submitFail == true || ret.data.ret_code != 0)
          {
            this.$message.error("评论提交失败，请重试");
            this.pending = false;
            return;
          }
          let beforeLen = this.tags.length;
          this.tags = ret.data.data.tag_set;
          for(let i=beforeLen;i<this.tags.length;i++) {
            this.tagsStyle.push({
              type: "primary",
              value: 1,
              disable: true,
            });
          }
          this.addTags.splice(0,this.addTags.length);
        }
      }

      let selectedTags = [];
      for(let i=0;i<this.tags.length;i++)
      {
        if(i<this.tagsStyle.length)
        {
          if(this.tagsStyle[i].value == 1)
            selectedTags.push(this.tags[i].tag_index);
        }
        else 
        {
          if(this.addTags.length>0)
          {  
            if(this.addTags.name.indexOf(this.tags[i].tag_content,0) != -1)
            {
              selectedTags.push(this.tags[i].tag_index);
            }
          }
        }
      }//找出所有已选标签的索引

      if(this.title == '' || this.title == null)
      {
        this.title = "默认标题";
      }
      if(this.content == '' || this.content == null)
      {
        this.content = "这个人很懒，什么也没有写";
      }
      let submitObject = {
        user_no: this.userInfo.user_no,
        course_no: this.selectedCourse.course_no,
        comm_title: this.title,
        comm_content: this.content,
        comm_score: this.rate*2,
        comm_tag: selectedTags,
      };
      this.$axios.post("/api/writeComments",submitObject).then((response)=>{
        if(response.data.ret_code == 0)
        {
          this.$message.success("评论提交成功!");
          this.disableComment=true;
          this.visible=false;
        }
        else
        {
          this.$message.error("评论提交失败，请重试");
        }
        this.pending = false;
      }).catch(()=>{
        this.$message.error("评论提交失败，请重试");
        this.pending = false;
      });//提交评论
      
    },
    addNewTags(){    
      for(let i=0;i<this.addTags.length-1;i++)
      {
        let submitObject = {
          tag_name: this.addTags[i].name,
        };
        this.$axios.post("/api/addTag",submitObject);
      }//先添加n-1个自定义标签，不用阻塞
      let submitObject = {
        tag_name: this.addTags[this.addTags.length-1].name,
      }//阻塞在最后一个标签这里
      return new Promise((resolve,reject)=>{
        this.$axios.post("/api/addTag",submitObject).then((response)=>{
          resolve(response);
          this.submitFail = false;
        }).catch((err)=>{
          reject(err);
          this.submitFail = true;
        });
      })
    },
    getTagsAgain(){
      return new Promise((resolve,reject)=>{
        this.$axios.get("/api/getTag").then((response)=>{
          resolve(response);
          this.submitFail = false;
        }).catch((err)=>{
          reject(err);
          this.submitFail = true;
        })
      })
    },
    showConfirm(){
      this.$confirm({
        title:'确定要提交吗',
        okText:'确认',
        cancelText:'取消',
        onOk:() => {
          this.submitComment();
        },
        onCancel() {},
      })
    },
  },
}
</script>

<style>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  height: 200px;
  text-align: center;
  overflow-x: hidden;
  overflow-y: auto;
}

.steps-content-chooseTag {
  margin-top: 8px;
  border: 2px solid #d6d6d69c;
  height: 20px;
  text-align: left;
}

.steps-action {
  margin-top: 24px;
}

</style>