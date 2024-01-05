import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '@/views/MainLayout.vue'

import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import ClassificationPage from '@/pages/ClassificationPage'
import ImagePage from '@/pages/ImagePage'
import UploadPage from '@/pages/UploadPage'
import AnalyticsPage from '@/pages/AnalyticsPage'

// 로그인 및 등록 페이지를 위한 경로 정의
const authRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  },
]

// 메인 레이아웃과 그 하위 페이지들을 위한 경로 정의
const mainLayoutRoutes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '', // 메인 레이아웃의 루트 경로
        redirect: '/upload', // 기본적으로 업로드 페이지로 리다이렉트
      },
      {
        path: '/upload',
        name: 'Upload',
        component: UploadPage,
      },
      {
        path: '/classification',
        name: 'Classification',
        component: ClassificationPage,
      },
      {
        path: '/analytics',
        name: 'Analytics',
        component: AnalyticsPage,
      },
      {
        path: '/classfication_images/:id',
        name: 'ImagePage',
        component: ImagePage
      },
    ],
  },
]

const routes = [
  ...authRoutes,
  ...mainLayoutRoutes,
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
