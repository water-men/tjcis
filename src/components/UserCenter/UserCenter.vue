<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="12" :style="{ minWidth: '540px'}">  
        <a-card :style="{ minHeight: '670px'}"> 
          <a-avatar :size="96" icon="user" />
          <p class="name"><span>{{ userInfo.username }}</span></p> 
          <a-divider />
          <a-descriptions :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }" title="个人信息" layout="vertical" bordered>
            <a-descriptions-item label="姓名">
              <p class="descript"><span>{{ realname }}</span></p>
            </a-descriptions-item>
            <a-descriptions-item label="学号">
              <p class="descript"><span>{{ userInfo.user_no }}</span></p>
            </a-descriptions-item>
            <a-descriptions-item label="所在院系" span="2">
              <p class="descript"><span>{{ depart }}</span></p>
            </a-descriptions-item>
            <a-descriptions-item label="签名" span="3">
              <p class="descript"><span>{{ slogan }}</span></p>
            </a-descriptions-item>
          </a-descriptions>
          <br />
          <a-divider />
          <br />
          <!-- 修改个人信息按钮 弹出抽屉中包含表单 -->
          <a-button :size="btnsize" type="primary" shape="round" @click="() => (editUserinfo = true)"><a-icon type="edit" />修改个人信息</a-button>
          <a-drawer
            :width="420"
            :visible="editUserinfo"
            :body-style="{ paddingBottom: '80px' }"
            title="修改个人信息"
            @close="() => (editUserinfo = false)"
          >
            <a-form :form="formUserInfo" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleUserInfoSubmit">
              <a-form-item label="签名">
                <a-input
                  v-decorator="['slogan', { rules: [{ required: false }] }]"
                />
              </a-form-item>
              <a-form-item label="学院">
                <a-select
                  v-decorator="['depart', { rules: [{ required: false }] }]"
                  placeholder="请选择新的学院"
                >
                  <a-select-option v-for="item in Department" :key="item" :value="item">
                    {{ item }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-button type="primary" html-type="submit">
                  更新信息
                </a-button>
              </a-form-item>
            </a-form>
          </a-drawer>
          &nbsp;&nbsp;&nbsp;
          <!-- 重置账户密码按钮 弹出抽屉中包含表单 -->
          <a-button :size="btnsize" type="danger" shape="round" @click="() => (changePassword = true)"><a-icon type="redo" />重置账户密码</a-button>
          <a-drawer
            :width="420"
            :visible="changePassword"
            :body-style="{ paddingBottom: '80px' }"
            title="修改账户密码"
            @close="() => (changePassword = false)"
          >
            <a-form :form="formUserPass" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleUserPassSubmit">
              <a-form-item label="用户名">
                <a-input 
                  v-model="username" disabled="disabled"
                />
              </a-form-item>
              <a-form-item label="原密码" has-feedback>
                <a-input
                  v-decorator="[
                    'oldpass',
                    {
                      rules: [
                        {
                          required: true,
                          message: '请输入原密码',
                        },
                      ],
                    },
                  ]"
                  type="password"
                />
              </a-form-item>
              <a-form-item label="新密码" has-feedback>
                <a-input
                  v-decorator="[
                    'newpass',
                    {
                      rules: [
                        {
                          required: true,
                          message: '请输入新密码',
                        },
                        {
                          validator: validateToNextPassword,
                        },
                      ],
                    },
                  ]"
                  type="password"
                />
              </a-form-item>
              <a-form-item label="再次确认" has-feedback>
                <a-input
                  v-decorator="[
                    'confirm',
                    {
                      rules: [
                        {
                          required: true,
                          message: '请再次输入新密码！',
                        },
                        {
                          validator: compareToFirstPassword,
                        },
                      ],
                    },
                  ]"
                  type="password"
                />
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-button type="primary" html-type="submit">
                  更新信息
                </a-button>
                <a-alert v-if="(ret.ret_code==1||ret.ret_code==2)" :message="ret.ret_msg" type="error" />
              </a-form-item>
            </a-form>
          </a-drawer>
        </a-card>
      </a-col>
      <a-col :span="12" :style="{ minWidth: '540px'}">
        <a-row>   
          <a-card :style="{ minHeight: '670px'}">
            <a-row :gutter="16">
              <a-col :span="8">
                <div @click="gotoMyComments()">
                  <a-card hoverable>
                    <a-statistic
                      :value="12"
                      :value-style="{ color: '#3f8600' }"
                      title="我的评价"
                      suffix="条"
                      style="margin-right: 50px"
                    >
                      <template #prefix>
                        <a-icon type="arrow-right" />
                      </template>
                    </a-statistic>
                  </a-card>
                </div>
              </a-col>
              <a-col :span="8">
                <div @click="gotoMyFavorite()">
                  <a-card hoverable>
                    <a-statistic
                      :value="5"
                      :value-style="{ color: '#cf1322' }"
                      title="我的收藏"
                      suffix="个"
                    >
                      <template #prefix>
                        <a-icon type="arrow-right" />
                      </template>
                    </a-statistic>
                  </a-card>
                </div>
              </a-col>
              <a-col :span="8">
                <div @click="gotoScheduleTable()">
                  <a-card hoverable>
                    <a-statistic
                      :value="5"
                      :value-style="{ color: '#cf1322' }"
                      title="待办"
                      suffix="个"
                    >
                      <template #prefix>
                        <a-icon type="arrow-right" />
                      </template>
                    </a-statistic>
                  </a-card>
                </div>
              </a-col>
            </a-row>
            <a-divider />
            <a-row :gutter="16">
              <a-col>
                <!-- 看着好看先放上来占个位置 并没有什么屌用 -->
                <cardDragger :data="cardList" :col-num="1"
                             :card-outside-width="480"
                             :card-inside-width="460"
                             :card-outside-height="110"
                             :card-inside-height="100">
                </cardDragger>
              </a-col>
            </a-row>
          </a-card>
        </a-row>
        <a-row>
        </a-row>
        <br />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { cardDragger } from 'carddragger'
export default {
  components: {
    cardDragger,
  },
  props: {
    userInfo: {
      type: Object,
      default: () => ({
        user_no: null,
        username: null,
      }),
      require: true
    },
  },
  data () {
    return {
      btnsize:'large',         //按钮大小
      editUserinfo: false,     //修改弹出抽屉是否显示
      changePassword: false,     //弹出抽屉是否显示
      realname:'',
      depart:'',
      slogan:'',
      formUserInfo: this.$form.createForm(this),
      formUserPass: this.$form.createForm(this),
      ret:{
        ret_code: null,
        ret_msg: '',
      },
      Department:[
        '建筑与城市规划学院','土木工程学院','机械与能源工程学院','经济与管理学院','环境科学与工程学院','材料科学与工程学院','电子与信息工程学院','人文学院','外国语学院',
        '法学院','马克思主义学院','政治与国际关系学院','理学部','海洋与地球科学学院','航空航天与力学学院','数学科学学院','物理科学与工程学院','化学科学与工程学院',
        '汽车学院','交通运输工程学院','软件学院','测绘与地理信息学院','生命科学与技术学院','医学院','设计创意学院','口腔医学院','艺术与传媒学院','体育教学部','铁道与城市轨道交通研究院',
        '女子学院','职业技术教育学院','国际文化交流学院','中德学院','中法工程和管理学院','中德工程学院','中意学院','联合国环境规划署-同济大学环境与可持续发展学院',
        '中芬中心','新生院','中西学院','新农村发展研究院','国际足球学院','上海国际知识产权学院','创新创业学院',
      ],
      cardList: [
        {
          positionNum: 1,
          name: "演示卡片1",
          id: "card1",
        },
        {
          positionNum: 2,
          name: "演示卡片2",
          id: "card2",
        },
        {
          positionNum: 3,
          name: "演示卡片3",
          id: "card3",
        },
        {
          positionNum: 4,
          name: "演示卡片4",
          id: "card4",
        },
      ],
    }
  },
  beforeMount: function() {
    let request = {
      user_no: this.userInfo.user_no,
    }
    let submitData = JSON.stringify(request);

    this.$axios.post("/api/getUserInfo",submitData).then((response) => {
      if(response.ret_code == 0) {
        this.realname = response.data.stu_name;
        this.slogan = response.data.stu_slogan;
        this.depart = response.data.stu_depart;
      }
    }).catch(() => { this.$message.error('获取用户个人信息失败!') }); //获取推荐课程列表
  },
  methods: {
    gotoMyComments(){
        this.$emit('toMyComments')
    },
    gotoMyFavorite(){
        this.$emit('toMyFavorite')
    },
    gotoScheduleTable(){
        this.$emit('toScheduleTable')
    },
    handleUserInfoSubmit(e) {
      e.preventDefault();
      this.formUserInfo.validateFields((err, values) => {
        if (!err) {
          if(values.depart == null && values.slogan == null)
          {
            this.editUserinfo = false;
            return;
          }
          let submitObject = new Object();
          submitObject.user_no = this.userInfo.user_no;
          submitObject.username = this.userInfo.username;
          if(values.depart != null)
            submitObject.depart = values.depart;
          else
            submitObject.depart = this.depart;
          if(values.slogan != null)
            submitObject.stu_slogan = values.slogan;
          else
            submitObject.stu_slogan = this.slogan;
          let submitForm = JSON.stringify(submitObject);
          this.$axios.post("/api/updateUserInfo", submitForm).then((response) => {
            if(response.ret_code == 0) {
              if(values.depart != null)
                this.depart = values.depart;
              if(values.slogan != null)
                this.slogan = values.slogan;
              this.$message.success('修改成功');
            }
          }).catch(()=>{this.$message.error('修改失败，请重试');});
        }
      });
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.formUserPass;
      if (value && value !== form.getFieldValue('newpass')) {
        callback('输入的两次新密码不一致!');
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.formUserPass;
      if (form.getFieldValue('confirm') != null) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
    handleUserPassSubmit(e) {
      e.preventDefault();
      this.formUserPass.validateFields((err, values) => {
        if (!err) {
          let submitObject = new Object();
          submitObject.user_no = this.userInfo.user_no;
          submitObject.oldPassword = values.oldpass;
          submitObject.newPassword = values.newpass;
          let submitForm = JSON.stringify(submitObject);
          this.$axios.post("/api/updateUserPassword", submitForm).then((response) => {
            if(response.ret_code == 0) {
              this.$message.success('修改成功');
            }
            else
            {
              this.ret.ret_code = response.ret_code;
              this.ret.ret_msg = response.ret_msg;
            }
          }).catch(()=>{this.$message.error('修改失败，请重试')});
        }
      });
    },
  }
}
</script>

<style>
p.name span {
	font-weight:bold;
  font-size: 42px;
	color:#ff9955;
	}
p.descript span {
	font-weight:bold;
  font-size: 18px;
	color:#aabbee;
	}

</style>