<template>
  <div class="welcom">
    <a-layout>
      <a-layout-header></a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0', minHeight: '670px' }">
        <br />
        <br />
        <a-row>
          <a-col :span="6"/>
          <a-col :span="12">
            <a-card :style="{ margin: '24px 16px 0', minHeight: '480px' }" hoverable style="width: flex">
              <div>
                <img slot="cover" alt="example" src="@/assets/logo-tj.png" />
                <br />
                <img slot="cover" alt="example" src="@/assets/logo-cis.png" />
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <!-- 登录按钮弹窗 -->
              <a-button type="primary" shape="round" @click="() => (loginVisible = true)">登录</a-button>
              <a-modal
                v-model="loginVisible"
                footer
                centered
                @ok="() => (loginVisible = false)"
              >
                <login></login>
              </a-modal>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <!-- 注册按钮弹窗 -->
              <a-button type="normal" shape="round" @click="() => (registerVisible = true)">注册</a-button>
              <a-modal
                v-model="registerVisible"
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
  beforeMount:function() {
    if(JSON.parse(sessionStorage.getItem("username")) != null) {
      this.$router.push({name:"home"});
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
</style>
