// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {
  DatePicker, Button, Layout, Menu, List, Steps,
  Breadcrumb, Icon, Form, Input, Row, Col, Tabs,
  Radio, Modal, Tag, Card, Table, Descriptions, Dropdown,
  Popconfirm, FormModel, Select, Progress, Statistic, Rate,
  BackTop, Divider, Avatar, Drawer, Carousel, Calendar, Comment,Alert,Badge,
  Space,message,Upload,Timeline,
} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { installCardDragger } from 'carddragger' //卡片拖拽组件
import App from './App'
import router from './router'
import axios from 'axios'
import moment from 'moment'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$moment = moment
Vue.prototype.$message = message
axios.defaults.baseURL = 'http://112.126.93.26:7001'

Vue.use(Timeline)
Vue.use(Upload)
Vue.use(Space)
Vue.use(Badge)
Vue.use(Button)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Breadcrumb)
Vue.use(Icon)
Vue.use(Form)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Radio)
Vue.use(Modal)
Vue.use(Tag)
Vue.use(Card)
Vue.use(Table)
Vue.use(Descriptions)
Vue.use(Popconfirm)
Vue.use(FormModel)
Vue.use(Select)
Vue.use(DatePicker)
Vue.use(Progress)
Vue.use(Statistic)
Vue.use(BackTop)
Vue.use(Divider)
Vue.use(Avatar)
Vue.use(Drawer)
Vue.use(Dropdown)
Vue.use(Carousel)
Vue.use(Calendar)
Vue.use(List)
Vue.use(Tabs)
Vue.use(Rate)
Vue.use(Comment)
Vue.use(Steps)
Vue.use(Alert)

Vue.use(installCardDragger)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
