<template>
  <div
  class="flex items-center justify-center w-full">
    <label class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div v-if="selectedFile == null" class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span>
            or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>

        <div class="flex flex-col itmes-center justify-center" v-else>
          <p class="mb-2 text-sm text-gray-400">
            Selected file:
          </p>

          <p class="font-semibold mb-2 text-sm dark:text-gray-400 text-gray-500 pt-1 pb-1">
            {{ selectedFile.map(l => l.name).join(", ") }}
          </p>
        </div>
        
        <input v-bind="getInputProps()" />
    </label>
</div>

<AButton>업로드</AButton>
</template>

<script setup>
  import { useDropzone } from 'vue3-dropzone'
  import {ref} from 'vue'

  const selectedFile = ref(null)

  function onDrop(acceptFiles, rejectReasons) {

    for (let file of acceptFiles) {
      const rejected = file.path.endsWith('.png') ||
          file.path.endsWith('.jpg') ||
          file.path.endsWith('.jpeg')

      if (!rejected) {
        alert('지원하지 않는 파일 형식입니다!')
        return
      }
    }

    console.log(acceptFiles)
    console.log(rejectReasons)

    if (acceptFiles.length != 0)
      selectedFile.value = acceptFiles
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

</script>


<style scoped>

</style>