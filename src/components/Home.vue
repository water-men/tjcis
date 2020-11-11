<template>
  <a-layout id="components-layout-demo-responsive">
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <div class="logo">
        <img slot="cover" src="@/assets/logo.png" />
      </div>
      <a-menu
        :default-selected-keys="['hello-world']"
        theme="dark"
        mode="inline"
        @select="itemSelected"
      >
        <a-menu-item key="hello-world">
          <a-icon type="user" />
          <span class="nav-text">主页</span>
        </a-menu-item>
        <a-menu-item key="depart-list">
          <a-icon type="video-camera" />
          <span class="nav-text">查找课程</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="upload" />
          <span class="nav-text">热门评价</span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="user" />
          <span class="nav-text">个人中心</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#ccc', padding: 0 }">
        <a-row>
          <a-col :span="6">
            <a-button ghost type="link" @click="toHomeView">
              <h1 style="font-size: 28px; font-weight: bolder; color: white">
                课程信息平台
              </h1>
            </a-button>
          </a-col>
          <a-col :span="3" :offset="11">
            <h3 style="color: white">
              欢迎您，<!-- {{ username }} -->
              ！
            </h3>
          </a-col>
          <a-col :span="2"> </a-col>
          <a-col :span="2">
            <router-link to="/Welcom" style="color: white">
              <a-icon type="logout" />&nbsp;退出登录
            </router-link>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          <!-- 页面主要内容部分 根据菜单选择显示不同的组件 -->
          <hello-world v-if="currentContent == 'hello-world'"></hello-world>
          <depart-list v-if="currentContent == 'depart-list'"></depart-list>
        </div>
      </a-layout-content>
      <a-layout-footer style="textalign: center">
        TJ course information system ©2020 Created by water-man
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import HelloWorld from "@/components/HelloWorld"
import DepartList from "@/components/DepartList"
export default {
  components: {
    HelloWorld,
    DepartList,
  },
  data () {
    return {
      currentContent: "hello-world",
    }
  },
  methods: {
    //将显示内容currentContent设置为菜单选中的key
    itemSelected (selected) {
      this.currentContent = selected.key;
      // console.log(this.currentContent)
    },
    onCollapse (collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint (broken) {
      console.log(broken);
    },
  },
};
</script>

<style>
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

img {
  width: auto;
  height: 25px;
  margin: 0 auto;
}
</style>
