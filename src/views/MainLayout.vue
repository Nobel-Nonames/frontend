<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider ref="sider" v-model:collapsed="collapsed" collapsible>
      <div class="logo">
        <h1>생태통로 카메라</h1>
      </div>

      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item v-for="item in routerList" :key="item" @click="router.push(`${item.url}`)">
          <pie-chart-outlined />
          <span>{{ item.name  }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout-header style="background: #fff; padding: 0" />
    <a-layout-content style="margin: 0 16px">
      <a-breadcrumb style="margin: 16px 0">

        <a-page-header
            :title="selectedKeys[0].name"
            :sub-title="selectedKeys[0].desc"
            @back="() => router.go(-1)"/>

      </a-breadcrumb>
      <router-view/>
    </a-layout-content>
  </a-layout>
</template>
<script setup>
import {onMounted, ref, watch} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {useAuthCheck} from '@/hooks/useAuthCheck'
const route = useRoute()
const router = useRouter()

const routerList = ref([
  {
    name : '업로드',
    desc: '사진을 업로드하는 페이지입니다.',
    url : '/upload'
  },
  {
    name: '분류',
    desc: '찍힌 동물을 분류하는 페이지입니다.',
    url: '/classification'
  },
  {
    name: '통계',
    desc: '통계를 확인할 수 있는 페이지입니다.',
    url: '/analytics'
  },
  {
    name: '사용자 관리',
    desc: '사용자를 관리하는 페이지입니다..',
    url: '/users'
  },
])

const lastUri = '/' + location.href.split('/')[location.href.split('/').length-1]

const selectedKeys = ref(null)
selectedKeys.value = routerList.value.filter(i => i.url == lastUri)

if (selectedKeys.value.length === 0)
  selectedKeys.value = [routerList.value[1]]

watch(route, () => {
  const lastUri = '/' + route.fullPath.split('/')[route.fullPath.split('/').length-1]
  selectedKeys.value = routerList.value.filter(i => i.url == lastUri)

  if (selectedKeys.value.length === 0)
    selectedKeys.value = [routerList.value[1]]
})

onMounted(async () => {
  let { isLoggedIn, result } = await useAuthCheck()

  if (!isLoggedIn) {
    router.replace('/login')
  }
})

</script>


<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}

.logo {
  margin: 10px;
}

.logo h1 {
  color: white;
}

</style>