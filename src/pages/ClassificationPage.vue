<template>
  <ALayout>
    <h2>프로젝트를 선택해주세요.</h2>

    <ARow :gutter="16" class="row-gap">
      <ACol
          :span="12"
          v-for="(item, idx) in mock"
          :key="idx"
          @click="router.push('/classfication_images/' + item.id)">
        <ACard :title="item.title" :bordered="false">
          <p>{{ item.desc }}</p>
        </ACard>
      </ACol>
    </ARow>
  </ALayout>
</template>

<script setup>
import { ref } from 'vue'
import {useRouter} from "vue-router";
const mock = ref([
  {
    title: 'Project 1',
    desc: '프로젝트 1의 설명입니다.',
    id: '1'
  },
  {
    title: 'Project 2',
    desc: '프로젝트 2의 설명입니다.',
    id: '2'
  },
  {
    title: 'Project 3',
    desc: '프로젝트 3의 설명입니다.',
    id: '3'
  }
])

const router = useRouter()
</script>

<style scoped>
h2 {
  font-size: 1rem;
  font-weight: 900;
  margin-bottom: 12px;
}

.row-gap {
  row-gap: 16px;
}
</style>