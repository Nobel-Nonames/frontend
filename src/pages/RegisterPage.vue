<template>
  <a-alert
      v-if="alertShow"
      message="오류"
      :description="alertMessage"
      type="error"
      closable
      @close="alertShow = false"
  />
  <a-config-provider>
    <a-row justify="center" align="middle" style="height: 100vh">
      <a-col>
        <a-card title="회원가입">
          <AForm
              :model="formState"
              name="basic"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
              autocomplete="off"
          >
            <a-form-item
                label="아이디"
                name="id"
                :rules="[{ required: true, message: '아이디를 입력해주세요!' }]"
            >
              <a-input :value="formState.username" @input="formState.id = $event.target.value" />
            </a-form-item>

            <a-form-item
                label="비밀번호"
                name="password"
                :rules="[{ required: true, message: '비밀번호를 입력해주세요!' }]"
            >
              <a-input-password :value="formState.password" @input="formState.password = $event.target.value" />
            </a-form-item>

            <a-form-item
                label="비밀번호 확인"
                name="password"
                :rules="[{ required: true, message: '비밀번호를 재입력해주세요!' }]"
            >
              <a-input-password :value="formState.passwordRe" @input="formState.passwordRe = $event.target.value" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
              <a-button @click="authPost">Submit</a-button>
            </a-form-item>
          </AForm>
        </a-card>
      </a-col>
    </a-row>
  </a-config-provider>
</template>


<script setup>
import {reactive, ref} from 'vue'
import { useRouter } from 'vue-router'
import axios from "axios";
const router = useRouter()

const formState = reactive({
  id: '',
  password: '',
  passwordRe: '',
})

const alertShow = ref(false)
const alertMessage = ref('')

const authPost = async e => {
  if (formState.password !== formState.passwordRe) {
    alertShow.value = true
    alertMessage.value = '비밀번호가 일치하지 않습니다. 재확인 비밀번호를 확인해주세요.'
    return
  }

  let result = await axios.post(process.env.VUE_APP_API_SERVER_URL + '/api/auth/signup', {
    username: formState.id,
    password: formState.password,
    name: 'User',
    type: 'user'
  })
      .then(r => r.data)
      .catch(err => {
        return err.response.data
      })

  if (!result.success) {
    alertShow.value = true
    alertMessage.value = result.message
    return
  }

  await router.replace('/login')
}

</script>

<style scoped>

</style>