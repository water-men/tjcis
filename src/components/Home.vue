<template>
  <a-layout id="components-layout-demo-responsive">
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <div class="logo-sider">
        <img slot="cover" src="@/assets/logo-tj.png" class="logo-tj"/>
      </div>
      <a-menu
        :default-selected-keys="['home-page']"
        theme="dark"
        mode="inline"
        @select="itemSelected"
      >
        <a-menu-item key="home-page" @click="itemSelected">
          <a-icon type="home" />
          <span class="nav-text">主页</span>
        </a-menu-item>
        <a-sub-menu key="check-course">
          <span slot="title"><a-icon type="search" /> 查找课程</span>
          <a-menu-item key="check-course-all" @click="itemSelected">所有课程</a-menu-item>
          <a-menu-item key="check-course-depart" @click="itemSelected">按学院查找</a-menu-item>
          <a-menu-item key="check-course-type" @click="itemSelected">按类别查找</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="hot-comments" @click="itemSelected">
          <a-icon type="mail" />
          <span class="nav-text">热门评价</span>
        </a-menu-item>
        <a-menu-item key="user-center" @click="itemSelected">
          <a-icon type="user" />
          <span class="nav-text">个人中心</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#ccc', padding: 0, minHeight:'75px'}">
        <a-row>
          <a-col :span="12" align="left">
            <a-button ghost type="link" @click="toHomeView">
              <!-- <h1 style="font-size: 24px; font-weight: bolder; color: white">
                课程信息平台
              </h1> -->
              <div class="logo-header">
                <img slot="cover" src="@/assets/logo-cis.png" class="logo-cis"/>
              </div>
            </a-button>
          </a-col>
          <a-col :span="8" align="right">
            <h3 style="color: white">
              欢迎,{{ username }}
            </h3>
          </a-col>
          <a-col :span="4">
            <router-link to="/Welcom" style="color: white">
              <a-icon type="logout" />&nbsp;注销&nbsp;&nbsp;&nbsp;
            </router-link>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <a-card
          :style="{ padding: '24px', background: '#fff', minHeight: '670px' }"
        >
          <!-- 页面主要内容部分 根据菜单选择显示不同的组件 -->
          <home-page v-if="currentContent == 'home-page' "></home-page>
          <check-course-all v-if="currentContent == 'check-course-all' " @getCourse="getCourse"></check-course-all>
          <check-course-depart v-if="currentContent == 'check-course-depart' " @getCourse="getCourse"></check-course-depart>
          <check-course-type v-if="currentContent == 'check-course-type' " @getCourse="getCourse"></check-course-type>
          <course-info v-if="currentContent =='course-info'"></course-info>
          <user-center v-if="currentContent == 'user-center' "></user-center>
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
import CourseInfo from "@/components/CourseInfo/CourseInfo"

import UserCenter from "@/components/UserCenter/UserCenter"


export default {
  components: {
    CheckCourseAll,
    CheckCourseDepart,
    CheckCourseType,
    CourseInfo,
    HomePage,
    UserCenter,
  },
  data () {
    return {
      currentContent: "home-page",
      selectedCourse: "",
      selectedComment: "",
      username: "zsx"
    }
  },
  methods: {
    //将显示内容currentContent设置为菜单选中的key
    itemSelected (selected) {
      this.currentContent = selected.key;
      console.log(this.currentContent);
    },
    //绑定的自定义事件，用于在CourseList中触发，获取选中的课程(params)并跳转到课程信息页面
    getCourse (params) {
      /* alert("收到了来自CourseList的信息") */
      this.currentContent = "course-info";
      this.selectedCourse = params;
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
  margin: 16px;
}

#components-layout-demo-responsive .logo-header {
  height: 200px;
  margin: 16px;
}

.logo-tj {
  width: auto;
  height: 48px;
  margin-top: 0px;
}
.logo-cis {
  width: auto;
  height: 64px;
  margin-top: -12px;
  margin-left: -20px;
}
</style>
