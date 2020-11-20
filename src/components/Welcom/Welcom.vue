<template>
  <div class="welcom">
    <a-layout>
      <a-layout-header></a-layout-header>
      <a-layout-content>
        <br />
        <br />
        <a-row>
          <a-col :span="6"/>
          <a-col :span="12">
            <a-card hoverable style="width: flex">
              <div>
                <img slot="cover" alt="example" src="@/assets/logo-tj.png" />
                <br />
                <img slot="cover" alt="example" src="@/assets/logo-cis.png" />
              </div>
              <br />
              <br />
              <!-- 登录按钮弹窗 -->
              <a-button type="primary" size="large" @click="() => (loginVisible = true)">登录</a-button>
              <a-modal
                v-model="loginVisible"
                title="课程信息推荐系统"
                footer
                centered
                @ok="() => (loginVisible = false)"
              >
                <login></login>
              </a-modal>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <!-- 注册按钮弹窗 -->
              <a-button type="normal" size="large" @click="() => (registerVisible = true)">注册</a-button>
              <a-modal
                v-model="registerVisible"
                title="课程信息推荐系统"
                footer
                centered
                @ok="() => (registerVisible = false)"
              >
                <register></register>
              </a-modal>
            </a-card>
          </a-col>
          <a-col :span="6" />
        </a-row>
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import Login from "@/components/Welcom/Login"
import Register from "@/components/Welcom/Register"
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
}
.welcom {
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