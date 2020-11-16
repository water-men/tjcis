<template>
  <a-layout id="components-layout-demo-responsive">
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <div class="logo-sider">
        <img slot="cover" src="@/assets/logo-tj.png" />
      </div>
      <a-menu
        :default-selected-keys="['home-page']"
        theme="dark"
        mode="inline"
        @select="itemSelected"
      >
        <a-menu-item key="home-page">
          <a-icon type="home" />
          <span class="nav-text">主页</span>
        </a-menu-item>
        <a-sub-menu key="check-course">
          <span slot="title"><a-icon type="search" /> 查找课程</span>
          <a-menu-item key="check-course-all">所有课程</a-menu-item>
          <a-menu-item key="check-course-depart">按学院查找</a-menu-item>
          <a-menu-item key="check-course-type">按类别查找</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="3">
          <a-icon type="mail" />
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
          <a-col :span="12" align="left">
            <a-button ghost type="link" @click="toHomeView">
              <!-- <h1 style="font-size: 24px; font-weight: bolder; color: white">
                课程信息平台
              </h1> -->
              <div class="logo-header">
                <img slot="cover" src="@/assets/logo-cis.png" />
              </div>
            </a-button>
          </a-col>
          <a-col :span="8" align="right">
            <h3 style="color: white">
              欢迎您， {{ username }}
              ！
            </h3>
          </a-col>
          <a-col :span="4" align="right">
            <router-link to="/Welcom" style="color: white">
              <a-icon type="logout" />&nbsp;注销&nbsp;&nbsp;&nbsp;
            </router-link>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <a-card
          :style="{ padding: '24px', background: '#fff', minHeight: '600px' }"
        >
          <!-- 页面主要内容部分 根据菜单选择显示不同的组件 -->
          <home-page v-if="currentContent == 'home-page' "></home-page>
          <check-course-all v-if="currentContent == 'check-course-all' "></check-course-all>
          <check-course-depart v-if="currentContent == 'check-course-depart' "></check-course-depart>
          <check-course-type v-if="currentContent == 'check-course-type' "></check-course-type>
        </a-card>
      </a-layout-content>
      <a-back-top />
      <a-layout-footer style="textalign: center">
        TJ course information system ©2020 Created by water-man
      </a-layout-footer>
    </a-layout>
  </a-layout>
  
</template>
<script>
import HomePage from "@/components/HomePage/HomePage"
import CheckCourseAll from "@/components/CheckCourse/CheckCourseAll"
import CheckCourseDepart from "@/components/CheckCourse/CheckCourseDepart"
import CheckCourseType from "@/components/CheckCourse/CheckCourseType"
export default {
  components: {
    CheckCourseAll,
    CheckCourseDepart,
    CheckCourseType,
    HomePage,
  },
  data () {
    return {
      currentContent: "home-page",
      username: "zsx"
    }
  },
  methods: {
    //将显示内容currentContent设置为菜单选中的key
    itemSelected (selected) {
      this.currentContent = selected.key;
      console.log(this.currentContent);
    },
    toHomeView(){
      this.currentContent = "home-page";
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
#components-layout-demo-responsive .logo-sider {
  height: 64px;
  /* background: rgba(255, 255, 255, 0.2); */
  margin: 16px;
}

#components-layout-demo-responsive .logo-header {
  height: 200px;
  /* background: rgba(255, 255, 255, 0.2); */
  margin: 16px;
}

img {
  width: auto;
  height: 48px;
  margin: -6px;
}
</style>
