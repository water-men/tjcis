<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="12" :style="{ minWidth: '540px'}">  
        <a-card :style="{ minHeight: '670px'}"> 
          <a-avatar :size="96" icon="user" />
          <p class="name"><span>{{ userinfo.username }}</span></p> 
          <a-divider />
          <a-descriptions :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }" title="个人信息" layout="vertical" bordered>
            <a-descriptions-item label="姓名">
              <p class="descript"><span>{{ realname }}</span></p>
            </a-descriptions-item>
            <a-descriptions-item label="学号">
              <p class="descript"><span>{{ userinfo.userid }}</span></p>
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
            <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
              <a-form-item label="签名">
                <a-input
                  v-decorator="['slogan', { rules: [{ required: true, message: '请输入新的签名!' }] }]"
                />
              </a-form-item>
              <a-form-item label="学院">
                <a-select
                  v-decorator="[
                    '学院',
                    { rules: [{ required: true, message: '请选择新的学院' }] },
                  ]"
                  placeholder="Select a option and change input text above"
                  @change="handleSelectChange"
                >
                  <a-select-option value="1">
                    建筑与城市规划学院
                  </a-select-option>
                  <a-select-option value="2">
                    土木工程学院
                  </a-select-option>
                  <a-select-option value="3">
                    机械与能源工程学院
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
            <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
              <a-form-item label="用户名">
                <a-input
                  v-decorator="['username', { rules: [{ required: true, message: '请输入用户名!' }] }]"
                />
              </a-form-item>
              <a-form-item label="原密码">
                <a-puint
                  ref="oldpass"
                />
              </a-form-item>
              <a-form-item label="新密码">
                <a-puint
                  ref="newpass"
                />
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-button type="primary" html-type="submit">
                  更新信息
                </a-button>
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
              </a-col>
              <a-col :span="8">
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
              </a-col>
              <a-col :span="8">
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
    userinfo: {
      type: Object,
      default: () => ({
        userid:'',
        username:'',
      }),
      require: true
    },
  },
  data () {
    return {
      btnsize:'large',         //按钮大小
      editUserinfo: false,     //修改弹出抽屉是否显示
      changePassword: false,     //弹出抽屉是否显示
      realname:'朱世轩',
      depart:'电子与信息工程学院',
      slogan:'你好，很高兴认识你',
      username:'',
      oldpass:'',
      newpass:'',
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
  methods: {
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