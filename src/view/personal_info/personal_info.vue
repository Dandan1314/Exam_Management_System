<template>
  <div>
    <Card shadow>
      <Form ref="userInfo" :model="userInfo" :rules="rule" label-position="right" :label-width="100" style="width: 400px">
        <FormItem label="姓名" prop="name">
          <Input type="text" v-model="userInfo.name" :readonly="!!CurrentUserNameAuthStatus"></Input>
        </FormItem>
        <FormItem label="性别" prop="sex">
          <RadioGroup v-model="userInfo.sex">
            <Radio label="1" :disabled="!!CurrentUserNameAuthStatus">
              <span>男</span>
            </Radio>
            <Radio label="2" :disabled="!!CurrentUserNameAuthStatus">
              <span>女</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="手机号" prop="tel">
          <Input type="text" v-model="userInfo.tel"></Input>
        </FormItem>
        <FormItem label="email" prop="email">
          <Input type="text" v-model="userInfo.email"></Input>
        </FormItem>
        <FormItem label="身份证号" prop="id_card">
          <Input type="text" v-model="userInfo.id_card" :readonly="!!CurrentUserNameAuthStatus"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="saveUserInfo('userInfo')">保存</Button>
          <Button type="error" style="margin-left: 10px" :disabled="!!CurrentUserNameAuthStatus" @click="readNameAuth">实名认证</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import { getUserInfo, submitUserInfo, submitRealNameAuth } from '@/api/data'
import { mapGetters, mapActions } from 'vuex'
// import * as store from '../../store/module/user'
export default {
  name: 'personal_info_child',
  data () {
    return {
      userInfo: {
        name: null,
        sex: null,
        tel: null,
        email: null,
        id_card: null
      },
      rule: {
        name: [
          { required: true, message: '请填输入姓名', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入正确的手机号', trigger: 'blur', max: 11, min: 11 }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' }
        ],
        id_card: [
          { required: true, message: '请输入正确的身份证号', trigger: 'blur', max: 18, min: 18 }
        ]
      }
    }
  },
  methods: {
    ...mapActions([
      'setUserRealNameAuth'
    ]),
    saveUserInfo (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.SubmitUserInfo()
        } else {
          this.$Message.error('信息验证失败!')
        }
      })
    },
    SubmitUserInfo () {
      submitUserInfo(this.userInfo)
        .then(res => {
          this.$Message.success('保存成功!')
        })
        .catch(() => {
          this.$Message.error('保存失败!')
        })
    },
    readNameAuth () {
      submitRealNameAuth(this.userInfo)
        .then(res => {
          this.$Message.success('实名认证成功!')
          this.setUserRealNameAuth()
        })
        .catch(err => {
          this.$Message.error('实名认证失败!')
          console.log('err => ', err)
        })
    }
  },
  created () {
    const vm = this
    getUserInfo()
      .then(res => {
        vm.userInfo = Object.assign(vm.userInfo, res.data.data.userInfo)
        vm.userInfo.sex = String(vm.userInfo.sex) // 性别改成字符串的，处理iview的坑
      })
      .catch(err => {
        console.log('err => ', err)
      })
  },
  computed: {
    ...mapGetters([
      'CurrentUserNameAuthStatus'
    ])
  }
  // beforeRouteLeave (to, from, next) {
  //   const realNameAuth = store.default.state.realNameAuth - 0
  //   if (!realNameAuth) {
  //     console.log('未通过实名认证')
  //     next(false)
  //   } else {
  //     next()
  //   }
  // }
}
</script>
