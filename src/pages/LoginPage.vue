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
        <a-card title="로그인">
          <a-form
              :model="formState"
              name="basic"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
              autocomplete="off"
          >
            <a-form-item
                label="아이디"
                name="id"
                @input="formState.id = $event.target.value"
                :rules="[{ required: true, message: '아이디를 입력해주세요!' }]"
            >
              <a-input v-model="formState.username" />
            </a-form-item>

            <a-form-item
                label="비밀번호"
                name="password"
                @input="formState.password = $event.target.value"
                :rules="[{ required: true, message: '비밀번호를 입력해주세요!' }]"
            >
              <a-input-password v-model="formState.password" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
              <AButton @click="loginPost">Submit</AButton>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </a-config-provider>
</template>

<script setup>
import {reactive, ref} from 'vue'
import { useRouter } from 'vue-router'
import axios from "axios";

const alertShow = ref(false)
const alertMessage = ref('')

const formState = reactive({
  id: '',
  password: '',
})

const router = useRouter()

const loginPost = async e => {
  let result = await axios.post(process.env.VUE_APP_API_SERVER_URL + '/api/auth/signin', formState)
      .then(r => r.data)
      .catch(err => err.response.data)

  if (!result.success) {
    alertShow.value = true
    alertMessage.value = result.message
    return
  }

  localStorage.setItem('accessToken', result.access_token)
  await router.replace('/upload')
}

</script>

<style scoped>

</style>