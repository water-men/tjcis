<template>
  <div>
    <a-tabs default-active-key="1" align="left" size="large">
      <a-tab-pane key="1" tab="登录" >
        <a-card :bordered="false" style="width: 100%">
          <a-form-model
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            v-bind="layout"
          >
            <a-form-model-item ref="user_no" :wrapper-col="{ span: 18, offset: 0 }" label="学号" prop="user_no">
              <a-input v-model="ruleForm.user_no" />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 18, offset: 0 }" label="密码" prop="password">
              <a-input v-model="ruleForm.password" type="password" autocomplete="off" />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 16, offset: 6 }">
              <a-button type="primary" shape="round" size="default" @click="submitForm('ruleForm')">
                立即登录
              </a-button>
              <a-button style="margin-left: 50px;" shape="round" size="default" @click="resetForm('ruleForm')">
                重置
              </a-button>
            </a-form-model-item>
            <a-alert v-if="(ret.ret_code==1)" :message="ret.ret_msg" type="error" />
          </a-form-model>
        </a-card>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  data () {
    let validateStuNo = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('学号不能为空'));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        user_no: '',
        password: '',
      },
      rules: {
        user_no: [{ validator: validateStuNo, trigger: 'change' }],
        password: [{ validator: validatePass, trigger: 'change' }],
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
    };
  },
  methods: {
    submitForm (formName) {
      //let formData = JSON.stringify(this.ruleForm); 
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/api/login", this.ruleForm).then((response) =>{ 
            this.ret.ret_code=response.ret_code;
            this.ret.ret_msg=response.ret_msg;
            this.ret.data=response.data;
            console.log(response);
            if (this.ret.ret_code==0) {
              sessionStorage.setItem("user_no",this.ruleForm.user_no);
              sessionStorage.setItem("username",this.ret.data.stu_username);
              this.$router.push({name: 'home',});
            }
          });
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