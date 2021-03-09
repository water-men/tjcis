<template>
  <div>
    <a-tabs default-active-key="1" align="left" size="large">
      <a-tab-pane key="1" tab="注册" >
        <a-card :bordered="false" style="width: 100%" >
          <a-form-model
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            v-bind="layout"
          >
            <a-form-model-item ref="user_no" :wrapper-col="{ span: 18, offset: 0 }" has-feedback label="学号" prop="user_no">
              <a-input v-model="ruleForm.user_no" type="string" />
            </a-form-model-item>
            <a-form-model-item ref="username" :wrapper-col="{ span: 18, offset: 0 }" has-feedback label="用户名" prop="username">
              <a-input v-model="ruleForm.username" />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 18, offset: 0 }" has-feedback label="密码" prop="password">
              <a-input v-model="ruleForm.password" type="password" autocomplete="off" />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 18, offset: 0 }" has-feedback label="确认密码" prop="checkPass">
              <a-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
            </a-form-model-item>
            <a-form-model-item ref="name" :wrapper-col="{ span: 18, offset: 0 }" has-feedback label="姓名" prop="name">
              <a-input v-model="ruleForm.name" />
            </a-form-model-item>
            <a-form-model-item ref="stu_slogan" :wrapper-col="{ span: 18, offset: 0 }" label="个人签名" prop="stu_slogan" >
              <a-input v-model="ruleForm.stu_slogan" placeholder="这个人很懒，什么都没有写"/>
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 18, offset: 0 }" label="所在学院" prop="depart">
              <a-select v-model="ruleForm.depart" placeholder="请选择">
                <a-select-option v-for="item in Department" :key="item" :value="item">{{ item }}</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 16, offset: 6 }">
              <a-button type="primary" shape="round" size="default" @click="submitForm('ruleForm')">
                立即注册
              </a-button>
              <a-button style="margin-left: 50px;" shape="round" size="default" @click="resetForm('ruleForm')">
                重置表单
              </a-button>
              
            </a-form-model-item>
          </a-form-model>
          <a-alert v-if="(ret.ret_code==1)" :message="ret.ret_msg" type="error" />
        </a-card>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  data () {
    let validateuser_no = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('学号不能为空'));
      } else if (isNaN(value)) {
        callback(new Error('学号只能由数字组成'));
      } else if ( value<1000000 || value > 9999999 ) {
        callback(new Error('学号有误，请重新检查'));
      } else {
        callback();
      }
    };
    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空'));
      } else {
        callback();
      }
    };
    let validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('姓名不能为空'));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    let validateDepart = (rule, value, callback) => {
      if (value === '' || typeof(value)=='undefined') {
        callback(new Error('学院不能为空'));
      } else {
        callback();
      }
    };
    let validateSlogan = (rule, value, callback) => {
      callback();
    }
    return {
      ruleForm: {
        username: '',
        password: '',
        user_no: '',
        name: '',
        depart: undefined,
        stu_slogan:'',
        checkPass: '',
      },
      rules: {
        user_no: [{ validator: validateuser_no, trigger: 'change' }],
        username: [{ validator: validateUsername, trigger: 'change' }],
        password: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        name: [{ validator: validateName, trigger: 'change' }],
        depart: [{ validator: validateDepart, trigger: 'change' }],
        stu_slogan: [{ validator: validateSlogan, trigger: 'change' }]
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      ret:{
        ret_code: undefined,
        ret_msg: '',
        data: {},
      },
      Department:[
        '建筑与城市规划学院','土木工程学院','机械与能源工程学院','经济与管理学院','环境科学与工程学院','材料科学与工程学院','电子与信息工程学院','人文学院','外国语学院',
        '法学院','马克思主义学院','政治与国际关系学院','理学部','海洋与地球科学学院','航空航天与力学学院','数学科学学院','物理科学与工程学院','化学科学与工程学院',
        '汽车学院','交通运输工程学院','软件学院','测绘与地理信息学院','生命科学与技术学院','医学院','设计创意学院','口腔医学院','艺术与传媒学院','体育教学部','铁道与城市轨道交通研究院',
        '女子学院','职业技术教育学院','国际文化交流学院','中德学院','中法工程和管理学院','中德工程学院','中意学院','联合国环境规划署-同济大学环境与可持续发展学院',
        '中芬中心','新生院','中西学院','新农村发展研究院','国际足球学院','上海国际知识产权学院','创新创业学院',
      ],
    };
  },
  methods: {
    submitForm (formName) {
      let submit_form = {
        username: this.ruleForm.username,
        password: this.ruleForm.password,
        user_no: this.ruleForm.user_no,
        name: this.ruleForm.name,
        depart: this.ruleForm.depart,
        slogan: this.ruleForm.stu_slogan,
      }
      if (submit_form.stu_slogan === '')
        submit_form.stu_slogan='这个人很懒，什么都没有写';
      //let formData = JSON.stringify(submit_form); //取得注册表单中的数据并转化为JSON字符串
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/api/register", submit_form).then((response) => {
            this.ret.ret_code=response.data.ret_code;
            this.ret.ret_msg=response.data.ret_msg;
            this.ret.data=response.data.data;
            if (this.ret.ret_code==0) {
              sessionStorage.setItem("user_no",this.ruleForm.user_no);
              sessionStorage.setItem("username",this.ruleForm.username);
              this.$router.push({name: 'home',});
            }
          }).catch((err)=>{console.log(err)});
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
</style>