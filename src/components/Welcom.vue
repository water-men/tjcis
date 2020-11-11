<template>
  <div>
    <a-layout>
      <a-layout-header></a-layout-header>
      <a-layout-content>
        <br /><br />
        <a-row>
          <a-col :span="8" />
          <a-col :span="8">
            <a-card hoverable style="width: flex">
              <div>
                <img slot="cover" alt="example" src="@/assets/logo.png" />
                <h1 style="font-size: 28px; font-weight: bolder; color: white">
                  欢迎使用 课程信息平台
                </h1>
              </div>
              <!-- 登录按钮弹窗 -->
              <a-button type="primary" @click="() => (loginVisible = true)">
                登录
              </a-button>
              <a-modal
                v-model="loginVisible"
                title="课程信息推荐系统"
                footer=""
                centered
                @ok="() => (loginVisible = false)"
              >
                <login></login>
              </a-modal>
              <br /><br />
              <!-- 注册按钮弹窗 -->
              <a-button type="primary" @click="() => (registerVisible = true)">
                注册
              </a-button>
              <a-modal
                v-model="registerVisible"
                title="课程信息推荐系统"
                footer=""
                centered
                @ok="() => (registerVisible = false)"
              >
                <register></register>
              </a-modal>
            </a-card>
          </a-col>
          <a-col :span="8" />
        </a-row>
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import Login from "@/components/Login"
import Register from "@/components/Register"
export default {
  components: {
    Login,
    Register,
  },
  data () {
    return {
      loginVisible: false,
      registerVisible: false
    }
  },
}
</script>

<style>
.ant-card {
  border-radius: 5px;
  background-color: bisque;
}
img {
  width: auto;
  height: auto;
  margin: 0 auto;
  max-width: 50%;
  max-height: 50%;
}
</style>