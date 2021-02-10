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
              {{ tag.name }}
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
    </a-drawer>
  </div>
</template>

<script>
export default {
  props: {
    selectedCourse: {
      type: Object,
      default: () => ({
        Cno:'',
        Cname:'',
      }),
      require: true
    },
    userInfo: {
      type: Object,
      default: () => ({
        username:'',
      }),
      require: true
    },
    my_comment: {
      type: Boolean,
      default: false,
      require: true
    }
  },
  data() {
    return {
      showInput: false,
      disableComment: this.my_comment,
      disabledInput: false,
      visible: false,
      current: 0,
      title:null,
      content:null,
      tempTag:'',
      errMsg:'',
      rate: 2.5,
      activeCount:0,
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
    this.$axios.get("/api/getTag").then((response)=>
    {
      if(response.ret_msg=="success")
      {
        this.tags = response.data.tags;
      }
      else
        this.$message.error('初始化标签列表失败');
    }).catch(()=>{this.$message.error('初始化标签列表失败')});
    for(let i=0;i<this.tags.length;i++) {
      this.tagsStyle.push({
        type: "dashed",
        value: 0,
        disable: false,
      });
    }
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
    submitComment(){
      if(this.addTags.length>0)
      {
        let submitData = new Object();
        submitData.addTags = this.addTags;
        let request = JSON.stringify(submitData);
        this.$axios.post("/api/addTags",request).then((response)=>{
          if(response.ret_msg=="success")
          {
            this.$axios.get("/api/getTag").then((response)=>{
              if(response.ret_msg=="success")
              {
                this.tags=response.data.tags;
                for(let i=this.tagsStyle.length;i<this.tags.length;i++) {
                  this.tagsStyle.push({
                  type: "dashed",
                  value: 0,
                  disable: false,
                  });
                  for(let j=0;j<this.addTags.length;i++)
                  {
                    if(this.addTags[j].name == this.tags[i].name)
                    {
                      this.tagsStyle[i].type="primary";
                      this.tagsStyle[i].value=1;
                      break;
                    }
                  }
                }
                //接下来发写评论请求
                submitData = {
                  username: this.userInfo.username,
                  course_id: this.selectedCourse.Cid,
                  comm_title: this.title,
                  comm_content: this.content,
                  comm_score: this.rate,
                  //标签
                }
                request = JSON.stringify(submitData);
                this.$axios.post("/api/writeComments",request).then((response)=>{
                  if(response.ret_msg=="success")
                  {
                    this.$message.success("提交成功");
                    this.disableComment = true;
                  }  
                  else
                    this.$message.error("提交失败，请稍后重试");
                }).catch(()=>{this.$message.error("提交失败，请稍后重试")});
              }
            })
          }
          else
            this.$message.error('提交失败，请稍后重试');
        }).catch(()=>{this.$message.error('提交失败，请稍后重试');});
      }
      else
      {
        let submitData = {
          username: this.userInfo.username,
          course_id: this.selectedCourse.Cid,
          comm_title: this.title,
          comm_content: this.content,
          comm_score: this.rate,
          //标签
        }
        let request = JSON.stringify(submitData);
        this.$axios.post("/api/writeComments",request).then((response)=>{
          if(response.ret_msg=="success")
            this.$message.success("提交成功");
          else
            this.$message.error("提交失败，请稍后重试");
        }).catch(()=>{this.$message.error("提交失败，请稍后重试")});
      }
      this.visible = false;
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