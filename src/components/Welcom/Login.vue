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
            <a-form-model-item ref="name" :wrapper-col="{ span: 18, offset: 0 }" has-feedback label="用户名" prop="name">
              <a-input v-model="ruleForm.name" />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 18, offset: 0 }" has-feedback label="密码" prop="pass">
              <a-input v-model="ruleForm.pass" type="password" autocomplete="off" />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 16, offset: 6 }">
              <a-button type="primary" shape="round" size="normal" @click="submitForm('ruleForm')">
                立即登录
              </a-button>
              <a-button style="margin-left: 50px;" shape="round" size="normal" @click="resetForm('ruleForm')">
                重置表单
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-card>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  data () {
    let validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the name'));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    return {
      ruleForm: {
        name: '',
        pass: '',
      },
      rules: {
        name: [{ validator: validateName, trigger: 'change' }],
        pass: [{ validator: validatePass, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
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