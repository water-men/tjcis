<template>
  <a-layout id="layout-responsive">
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
          <!-- <a-menu-item key="check-course-type" @click="itemSelected">按类别查找</a-menu-item> -->
        </a-sub-menu>
        <a-menu-item key="hot-comments" @click="itemSelected">
          <a-icon type="mail" />
          <span class="nav-text">热门评价</span>
        </a-menu-item>
        <a-menu-item key="user-center" @click="itemSelected">
          <a-icon type="user" />
          <span class="nav-text">个人中心</span>
        </a-menu-item>
        <a-menu-item key="schedule-table" @click="itemSelected">
          <a-icon type="calendar" />
          <span class="nav-text">待办事项</span>
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
          <a-col :span="6" align="right">
            <h3 style="color: white;font-size:125%">
              <a-avatar icon="user" />{{ userInfo.username }}
            </h3>
          </a-col>
          <a-col :span="4">
            <a style="color: white;font-size:125%" @click="logOutWeb">
              <a-icon type="logout" />
            </a>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0', minHeight: '670px' }">  
        <!-- 页面主要内容部分 根据菜单选择显示不同的组件 -->
        <home-page v-if="currentContent == 'home-page' " :user-info="userInfo" @getCourse="getCourse" @toMyComments="toMyComments" @toMyFavorite="toMyFavorite" @toScheduleTable="toScheduleTable"></home-page>
        <check-course-all v-if="currentContent == 'check-course-all' " @getCourse="getCourse"></check-course-all>
        <check-course-depart v-if="currentContent == 'check-course-depart' " @getCourse="getCourse"></check-course-depart>
        <!-- <check-course-type v-if="currentContent == 'check-course-type' " @getCourse="getCourse"></check-course-type> -->
        <course-info v-if="currentContent =='course-info'" :selected-course="selectedCourse" :user-info="userInfo" @getCourse="getCourse"></course-info>
        <user-center v-if="currentContent == 'user-center' " :user-info="userInfo" @toMyComments="toMyComments" @toMyFavorite="toMyFavorite" @toScheduleTable="toScheduleTable"></user-center>
        <hot-comments v-if="currentContent == 'hot-comments' " :user-info="userInfo"></hot-comments>
        <schedule-table v-if="currentContent == 'schedule-table' " :user-info="userInfo"></schedule-table>
        <my-comments v-if="currentContent == 'my-comments' " :user-info="userInfo"></my-comments>
        <my-favorite v-if="currentContent == 'my-favorite' " :user-info="userInfo" @getCourse="getCourse"></my-favorite>
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
import HotComments from "@/components/HotComments/HotComments"
import ScheduleTable from "@/components/ScheduleTable/ScheduleTable"
import MyComments from "@/components/CommonPages/MyComments"
import MyFavorite from "@/components/CommonPages/MyFavorite"

export default {
  components: {
    CheckCourseAll,
    CheckCourseDepart,
    CheckCourseType,
    CourseInfo,
    HomePage,
    UserCenter,
    HotComments,
    ScheduleTable,
    MyComments,
    MyFavorite,
  },
  data () {
    return {
      currentContent: "home-page",
      selectedCourse: {
      },
      selectedComment: "",
      userInfo:{user_no: null,username: null},
    }
  },
  beforeMount:function(){
    // sessionStorage.setItem("user_no","1750000");//后面要删掉 现在测试
    // sessionStorage.setItem("username","zsx");
    this.userInfo.user_no = sessionStorage.getItem("user_no");
    this.userInfo.username = sessionStorage.getItem("username");
    if(this.userInfo.user_no == null)
    {
      this.$router.push({name:"Welcom"});
    }
  },
  methods: {
    //将显示内容currentContent设置为菜单选中的key
    itemSelected (selected) {
      this.currentContent = selected.key;
    },
    //绑定的自定义事件，用于在CourseList和CourseInfo中触发，获取选中的课程(params)并显示课程信息子页面组件
    getCourse (params) {
      this.currentContent = "course-info";
      this.selectedCourse = params;
      /* alert("收到了来自CourseList的信息"+this.selectedCourse.Cno)  */
    },
    //绑定的自定义事件，用于在HomePage中触发 显示对应子页面组件
    toMyComments () {
      this.currentContent = "my-comments";
    },
    toMyFavorite () {
      this.currentContent = "my-favorite";
    },
    toScheduleTable () {
      this.currentContent = "schedule-table";
    },
    toHomeView(){
      this.currentContent = "home-page";
    },
    logOutWeb () {
      sessionStorage.clear();
      this.$router.push({name: "Welcom"});
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
#layout-responsive .logo-sider {
  height: 64px;
  margin: 16px;
}

#layout-responsive .logo-header {
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
